const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, fetch) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports, fetch, process: { env: {} }, console: { error() {}, warn() {} },
    require: () => ({ NextResponse: { json: (data, init) => Response.json(data, init) } }),
  });
  return exports;
}
const body = { name: 'Test', email: 'test@example.com', phone: '1234567890' };
const request = { json: async () => body };

test('browser reports failed delivery and makes only one request', async () => {
  for (const response of [Response.json({ error: 'failed' }, { status: 502 }), Response.json({ success: false })]) {
    let calls = 0;
    const api = load('src/lib/api.ts', async () => { calls++; return response; });
    assert.equal(await api.submitInquiryForm(body), false);
    assert.equal(calls, 1);
  }
  const api = load('src/lib/api.ts', async () => { throw new Error('offline'); });
  assert.equal(await api.submitInquiryForm(body), false);
});

test('browser accepts saved inquiry', async () => {
  const api = load('src/lib/api.ts', async () => Response.json({ _id: 'saved' }, { status: 201 }));
  assert.equal(await api.submitInquiryForm(body), true);
});

test('proxy does not duplicate accepted backend submissions', async () => {
  let calls = 0;
  const route = load('src/app/api/inquiries/route.ts', async () => { calls++; return Response.json({ _id: 'saved' }, { status: 201 }); });
  assert.equal((await route.POST(request)).status, 201);
  assert.equal(calls, 1);
});

test('proxy verifies fallback acceptance', async () => {
  for (const success of [false, 'false', true, 'true']) {
    let calls = 0;
    const route = load('src/app/api/inquiries/route.ts', async () => {
      if (++calls === 1) throw new Error('backend offline');
      return Response.json({ success });
    });
    assert.equal((await route.POST(request)).status, success === true || success === 'true' ? 200 : 502);
    assert.equal(calls, 2);
  }
});

test('proxy preserves backend validation failure without emailing', async () => {
  let calls = 0;
  const route = load('src/app/api/inquiries/route.ts', async () => { calls++; return Response.json({ error: 'invalid' }, { status: 400 }); });
  assert.equal((await route.POST(request)).status, 400);
  assert.equal(calls, 1);
  assert.equal((await route.POST({ json: async () => ({}) })).status, 400);
  assert.equal(calls, 1);
});
