#!/usr/bin/env node
/**
 * Website Performance & SEO Test Script
 * ---------------------------------------
 * Runs two things against a target URL, from your local machine:
 *   1. A load test (simulated heavy traffic) using autocannon
 *   2. A Lighthouse audit (Performance / SEO / Accessibility / Best Practices)
 *
 * SETUP (run once, in an empty folder):
 *   npm init -y
 *   npm install autocannon lighthouse chrome-launcher
 *   (You need Google Chrome installed locally — lighthouse drives it headlessly)
 *
 * USAGE:
 *   node perf-seo-test.js <url> [connections] [durationSeconds]
 *
 * EXAMPLES:
 *   node perf-seo-test.js https://winnerpack.vercel.app
 *   node perf-seo-test.js https://winnerpack.vercel.app 100 30
 *   node perf-seo-test.js http://localhost:3000 200 60   // your local dev server
 *
 * NOTE: connections/duration control how hard you hit the server.
 * Start low (50 conn / 20s), then scale up. Don't load-test a site
 * you don't own/have permission to test.
 */

const autocannon = require('autocannon');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const url = process.argv[2];
const connections = parseInt(process.argv[3]) || 50;
const duration = parseInt(process.argv[4]) || 20;

if (!url) {
  console.error('Usage: node perf-seo-test.js <url> [connections] [durationSeconds]');
  process.exit(1);
}

function printBar(label, value, max, width = 30) {
  const filled = Math.round((value / max) * width);
  const bar = '█'.repeat(Math.max(0, filled)) + '░'.repeat(Math.max(0, width - filled));
  console.log(`${label.padEnd(16)} ${bar} ${value}`);
}

async function runLoadTest() {
  console.log('\n=== LOAD TEST (simulated heavy traffic) ===');
  console.log(`Target: ${url}`);
  console.log(`Connections: ${connections} | Duration: ${duration}s\n`);

  const result = await autocannon({
    url,
    connections,
    duration,
    pipelining: 1,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    },
  });

  console.log('\n--- Load Test Results ---');
  console.log(`Requests/sec (avg): ${result.requests.average}`);
  console.log(`Latency (avg):      ${result.latency.average} ms`);
  console.log(`Latency (p99):      ${result.latency.p99} ms`);
  console.log(`Throughput (avg):   ${(result.throughput.average / 1024 / 1024).toFixed(2)} MB/s`);
  console.log(`2xx responses:      ${result['2xx']}`);
  console.log(`Errors/timeouts:    ${result.errors}`);
  console.log(`Non-2xx responses:  ${result.non2xx}`);
  console.log(`Total requests:     ${result.requests.total}`);

  if (result.statusCodeStats) {
    console.log('\n--- Status code breakdown ---');
    Object.entries(result.statusCodeStats).forEach(([code, stats]) => {
      console.log(`  ${code}: ${stats.count}`);
    });
  }

  if (result.errors > 0 || result.non2xx > 0) {
    const blockedRate = result.non2xx / result.requests.total;
    if (blockedRate > 0.3) {
      console.log(
        '\n⚠️  A large share of requests were non-2xx. This usually means the *hosting platform* ' +
        '(Vercel edge / bot-protection / rate limiting) is blocking the flood, not your app failing under real load. ' +
        'Check the status code breakdown above — 403/429 points to platform-level blocking, not a server crash. ' +
        'For genuine server-capacity testing, run this against your local dev server instead (see localhost example above).'
      );
    } else {
      console.log('\n⚠️  Some errors/non-2xx responses — check server logs, rate limits, or connection pool sizing.');
    }
  } else {
    console.log('\n✓ Server held up cleanly at this load level. Try increasing connections to find the breaking point.');
  }

  return result;
}

async function runLighthouseAudit() {
  console.log('\n=== LIGHTHOUSE AUDIT (Performance + SEO) ===');

  const { default: lighthouse } = await import('lighthouse');
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'error',
    output: 'html',
    onlyCategories: ['performance', 'seo', 'accessibility', 'best-practices'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);
  await chrome.kill();

  const { categories } = runnerResult.lhr;
  console.log('\n--- Scores (0-100) ---');
  printBar('Performance', Math.round(categories.performance.score * 100), 100);
  printBar('SEO', Math.round(categories.seo.score * 100), 100);
  printBar('Accessibility', Math.round(categories.accessibility.score * 100), 100);
  printBar('Best Practices', Math.round(categories['best-practices'].score * 100), 100);

  const reportPath = path.join(process.cwd(), `lighthouse-report-${Date.now()}.html`);
  fs.writeFileSync(reportPath, runnerResult.report);
  console.log(`\nFull visual report saved to: ${reportPath}`);
  console.log('(open it in a browser for waterfall, Core Web Vitals, and fix suggestions)');

  const seoAudits = runnerResult.lhr.categories.seo.auditRefs;
  console.log('\n--- SEO issues found ---');
  let issuesFound = false;
  seoAudits.forEach((ref) => {
    const audit = runnerResult.lhr.audits[ref.id];
    if (audit.score !== null && audit.score < 1) {
      issuesFound = true;
      console.log(`✗ ${audit.title}`);
    }
  });
  if (!issuesFound) console.log('✓ No SEO issues detected.');

  return runnerResult.lhr;
}

(async () => {
  try {
    await runLoadTest();
    await runLighthouseAudit();
    console.log('\n✅ Done. Re-run with higher connections/duration to push harder, or against localhost before you deploy.');
  } catch (err) {
    console.error('Error running tests:', err.message);
    process.exit(1);
  }
})();
