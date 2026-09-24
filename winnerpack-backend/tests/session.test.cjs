const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createSession, isValidSession, SESSION_MAX_AGE } = require('../dist/session');
const { requireAuth } = require('../dist/middleware/auth');

test('signed sessions reject forged, expired and changed-secret tokens', () => {
  process.env.SESSION_SECRET = 'test-only-secret';
  const now = Date.now();
  const token = createSession(now);
  assert.equal(isValidSession(token, now), true);
  for (const forged of ['true', undefined, {}, token + 'x', `9999999999999.${token.split('.')[1]}`]) {
    assert.equal(isValidSession(forged, now), false);
  }
  assert.equal(isValidSession(token, now + SESSION_MAX_AGE), false);
  process.env.SESSION_SECRET = 'different-test-secret';
  assert.equal(isValidSession(token, now), false);
});

test('auth middleware denies legacy cookie and accepts signed session', () => {
  process.env.SESSION_SECRET = 'test-only-secret';
  let status;
  let allowed = false;
  const response = { status(code) { status = code; return this; }, json() {} };
  requireAuth({ cookies: { admin_session: 'true' } }, response, () => { allowed = true; });
  assert.equal(status, 401);
  assert.equal(allowed, false);
  requireAuth({ cookies: { admin_session: createSession() } }, response, () => { allowed = true; });
  assert.equal(allowed, true);
});
