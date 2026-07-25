// stress-test.js
// Run with: k6 run stress-test.js
// Run against production: k6 run -e BASE_URL=https://your-backend.up.railway.app stress-test.js

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:4000';
const FRONTEND_URL = __ENV.FRONTEND_URL || 'http://localhost:3000';

// Custom metrics to track error rate and response time separately per endpoint
const errorRate = new Rate('errors');
const contentDuration = new Trend('content_duration');
const productsDuration = new Trend('products_duration');

export const options = {
    // Staged ramp: gradually increase load, hold, then ramp down.
    // This reveals the point where performance starts degrading, not just a single snapshot.
    stages: [
        { duration: '30s', target: 20 },   // warm up: 20 concurrent users
        { duration: '1m', target: 50 },    // ramp to 50
        { duration: '2m', target: 50 },    // hold steady at 50 — your realistic "busy day" baseline
        { duration: '1m', target: 150 },   // stress: push to 150
        { duration: '2m', target: 150 },   // hold at 150 — see if it stabilizes or degrades
        { duration: '30s', target: 0 },    // ramp down
    ],
    thresholds: {
        // Fail the test explicitly if these aren't met — gives you a pass/fail signal, not just numbers to eyeball
        http_req_duration: ['p(95)<800'],   // 95% of requests should complete under 800ms
        http_req_failed: ['rate<0.01'],     // error rate should stay under 1%
        errors: ['rate<0.01'],
    },
};

export default function () {
    // --- Test 1: Backend content endpoint directly (bypasses Next.js caching entirely) ---
    const contentRes = http.get(`${BASE_URL}/api/content?key=homepage`);
    contentDuration.add(contentRes.timings.duration);
    const contentOk = check(contentRes, {
        'content status is 200': (r) => r.status === 200,
        'content has body': (r) => r.body && r.body.length > 0,
    });
    errorRate.add(!contentOk);

    sleep(1);

    // --- Test 2: Backend products endpoint ---
    const productsRes = http.get(`${BASE_URL}/api/products`);
    productsDuration.add(productsRes.timings.duration);
    const productsOk = check(productsRes, {
        'products status is 200': (r) => r.status === 200,
    });
    errorRate.add(!productsOk);

    sleep(1);

    // --- Test 3: Frontend static/cached homepage (should be fast regardless of backend load) ---
    const homeRes = http.get(FRONTEND_URL);
    check(homeRes, {
        'homepage status is 200': (r) => r.status === 200,
    });

    sleep(2);
}
