import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server/app.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Business config validation', () => {
  const configPath = path.resolve(__dirname, '../config/business.json');
  assert.ok(fs.existsSync(configPath), 'config/business.json must exist');

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  assert.ok(config.company, 'Company details must exist');
  assert.equal(config.company.name, 'Shahdara Fiber Net');
  assert.equal(config.company.phone, '+92-XXX-XXXXXXX', 'Phone must use placeholder');
  assert.ok(Array.isArray(config.packages) && config.packages.length >= 3, 'Must have at least 3 packages');

  for (const pkg of config.packages) {
    assert.ok(pkg.id, 'Package must have id');
    assert.ok(pkg.name, 'Package must have name');
    assert.ok(pkg.speed, 'Package must have speed');
    assert.match(pkg.price, /EDIT ME/, 'Price must contain EDIT ME placeholder');
  }

  assert.ok(Array.isArray(config.coverageAreas) && config.coverageAreas.length >= 5, 'Must have coverage areas');
  assert.ok(Array.isArray(config.paymentMethods) && config.paymentMethods.length >= 3, 'Must have payment methods');
  assert.ok(Array.isArray(config.faqs) && config.faqs.length >= 3, 'Must have FAQs');
});

test('API endpoints with mocked fetch / simulated requests', async () => {
  const app = createApp();
  const server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // 1. Health check
    const healthRes = await fetch(`${baseUrl}/api/health`);
    assert.equal(healthRes.status, 200);
    const healthJson = await healthRes.json();
    assert.equal(healthJson.status, 'ok');

    // 2. Config check
    const configRes = await fetch(`${baseUrl}/api/config`);
    assert.equal(configRes.status, 200);
    const configJson = await configRes.json();
    assert.equal(configJson.company.name, 'Shahdara Fiber Net');

    // 3. Packages
    const pkgRes = await fetch(`${baseUrl}/api/packages`);
    assert.equal(pkgRes.status, 200);
    const pkgJson = await pkgRes.json();
    assert.ok(pkgJson.length >= 3);

    // 4. Coverage search
    const covAllRes = await fetch(`${baseUrl}/api/coverage`);
    assert.equal(covAllRes.status, 200);
    const covAllJson = await covAllRes.json();
    assert.ok(covAllJson.length >= 5);

    const covSearchRes = await fetch(`${baseUrl}/api/coverage?q=saeed`);
    assert.equal(covSearchRes.status, 200);
    const covSearchJson = await covSearchRes.json();
    assert.equal(covSearchJson.length, 1);
    assert.equal(covSearchJson[0].name, 'Saeed Park');

    // 5. Connection request validation
    const badConnRes = await fetch(`${baseUrl}/api/connections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.equal(badConnRes.status, 400);
    const badConnJson = await badConnRes.json();
    assert.equal(badConnJson.success, false);
    assert.ok(badConnJson.errors.length >= 3);

    // Good connection request
    const goodConnRes = await fetch(`${baseUrl}/api/connections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Hamza Khan',
        phone: '0301-1234567',
        address: 'House 14, St 2, Shahdara Town',
        area: 'Shahdara Town',
        packageId: 'streamer-fiber',
        preferredTime: 'Morning (10:00 AM - 1:00 PM)',
        notes: 'Please install near main drawing room'
      })
    });
    assert.equal(goodConnRes.status, 201);
    const goodConnJson = await goodConnRes.json();
    assert.equal(goodConnJson.success, true);
    assert.match(goodConnJson.referenceId, /^SFN-CONN-/);

    // 6. Complaint validation and submission
    const badTicketRes = await fetch(`${baseUrl}/api/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.equal(badTicketRes.status, 400);

    const goodTicketRes = await fetch(`${baseUrl}/api/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerIdOrPhone: '0301-1234567',
        issueCategory: 'Red LOS Light / Optical Cut',
        urgency: 'High',
        description: 'Red light blinking on router since morning storm'
      })
    });
    assert.equal(goodTicketRes.status, 201);
    const goodTicketJson = await goodTicketRes.json();
    assert.equal(goodTicketJson.success, true);
    assert.match(goodTicketJson.ticketId, /^SFN-TCK-/);

    // 7. Complaint lookup
    const ticketLookupRes = await fetch(`${baseUrl}/api/complaints/${goodTicketJson.ticketId}`);
    assert.equal(ticketLookupRes.status, 200);
    const ticketLookupJson = await ticketLookupRes.json();
    assert.equal(ticketLookupJson.ticket.ticketId, goodTicketJson.ticketId);

    // 8. Bill lookup
    const billLookupRes = await fetch(`${baseUrl}/api/bills/lookup?query=03001234567`);
    assert.equal(billLookupRes.status, 200);
    const billLookupJson = await billLookupRes.json();
    assert.equal(billLookupJson.success, true);
    assert.equal(billLookupJson.bill.customerId, 'SFN-1001');

    const genericBillRes = await fetch(`${baseUrl}/api/bills/lookup?query=03450000000`);
    assert.equal(genericBillRes.status, 200);
    const genericBillJson = await genericBillRes.json();
    assert.equal(genericBillJson.success, true);
    assert.ok(genericBillJson.bill.customerId);

  } finally {
    server.close();
  }
});
