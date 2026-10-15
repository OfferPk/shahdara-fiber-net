import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load business configuration
const configPath = path.resolve(__dirname, '../config/business.json');
let businessConfig = {};
try {
  const raw = fs.readFileSync(configPath, 'utf8');
  businessConfig = JSON.parse(raw);
} catch (err) {
  console.error('Warning: could not read config/business.json, using defaults:', err.message);
  businessConfig = {
    company: { name: 'Shahdara Fiber Net', phone: '+92-XXX-XXXXXXX' },
    packages: [],
    coverageAreas: [],
    paymentMethods: [],
    faqs: []
  };
}

export function createApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // In-memory data store for connection requests and tickets (persists while server runs)
  const connectionRequests = [];
  const complaintTickets = [];

  // Seed sample mock bill records for customer lookup testing
  const mockBills = [
    {
      customerId: 'SFN-1001',
      customerName: 'Muhammad Ali',
      phone: '03001234567',
      address: 'House 42, St 3, Saeed Park, Shahdara',
      packageName: 'Ultra Streamer Fiber (40 Mbps)',
      monthlyAmount: 'PKR 0000 - EDIT ME',
      currentStatus: 'Paid',
      dueDate: '10th of every month',
      billingPeriod: 'Current Month',
      lastPaymentDate: '2026-10-05'
    },
    {
      customerId: 'SFN-1002',
      customerName: 'Fatima Zahra',
      phone: '03219876543',
      address: 'Shop 12, Main GT Road, Shahdara',
      packageName: 'Business & Commercial Fiber (150 Mbps+)',
      monthlyAmount: 'PKR 0000 - EDIT ME',
      currentStatus: 'Due',
      dueDate: '2026-10-20',
      billingPeriod: 'October 2026',
      lastPaymentDate: '2026-09-08'
    }
  ];

  // Helper validation
  function isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const clean = phone.replace(/[\s\-\+\(\)]/g, '');
    return clean.length >= 10 && clean.length <= 15;
  }

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Shahdara Fiber Net API',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/config', (req, res) => {
    res.json(businessConfig);
  });

  app.get('/api/packages', (req, res) => {
    res.json(businessConfig.packages || []);
  });

  app.get('/api/coverage', (req, res) => {
    const q = (req.query.q || '').toString().toLowerCase().trim();
    const areas = businessConfig.coverageAreas || [];
    if (!q) {
      return res.json(areas);
    }
    const filtered = areas.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.zone.toLowerCase().includes(q) ||
        a.status.toLowerCase().includes(q)
    );
    res.json(filtered);
  });

  // POST /api/connections
  app.post('/api/connections', (req, res) => {
    const { fullName, phone, address, area, packageId, preferredTime, notes } = req.body || {};

    const errors = [];
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      errors.push('Full name is required (at least 2 characters).');
    }
    if (!isValidPhone(phone)) {
      errors.push('Valid mobile phone number is required (10-15 digits).');
    }
    if (!address || typeof address !== 'string' || address.trim().length < 5) {
      errors.push('Complete street address is required.');
    }
    if (!packageId || typeof packageId !== 'string') {
      errors.push('A valid fiber package selection is required.');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
        message: 'Validation failed for new connection request.'
      });
    }

    const pkg = (businessConfig.packages || []).find((p) => p.id === packageId) || {
      id: packageId,
      name: packageId,
      speed: 'Fiber'
    };

    const refNumber = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `SFN-CONN-${Date.now().toString().slice(-4)}${refNumber}`;

    const newRecord = {
      referenceId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      area: (area || 'Shahdara Area').trim(),
      package: pkg,
      preferredTime: preferredTime || 'Anytime during working hours',
      notes: notes || '',
      status: 'Pending Verification',
      submittedAt: new Date().toISOString()
    };

    connectionRequests.push(newRecord);

    res.status(201).json({
      success: true,
      referenceId,
      data: newRecord,
      message: 'New connection request received successfully! Our technician team will call to schedule the optical fiber installation.'
    });
  });

  // POST /api/complaints
  app.post('/api/complaints', (req, res) => {
    const { customerIdOrPhone, issueCategory, urgency, description } = req.body || {};

    const errors = [];
    if (!customerIdOrPhone || typeof customerIdOrPhone !== 'string' || customerIdOrPhone.trim().length < 3) {
      errors.push('Customer ID or registered phone number is required.');
    }
    if (!issueCategory || typeof issueCategory !== 'string') {
      errors.push('Please select an issue category.');
    }
    if (!description || typeof description !== 'string' || description.trim().length < 5) {
      errors.push('Please describe the issue in detail (at least 5 characters).');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
        message: 'Validation failed for complaint submission.'
      });
    }

    const randId = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `SFN-TCK-${randId}`;

    const newTicket = {
      ticketId,
      customerIdOrPhone: customerIdOrPhone.trim(),
      issueCategory: issueCategory.trim(),
      urgency: urgency || 'Normal',
      description: description.trim(),
      status: 'Received - Assigned to Network Team',
      createdAt: new Date().toISOString(),
      updates: [
        {
          timestamp: new Date().toISOString(),
          note: 'Ticket logged automatically. Technician notified.'
        }
      ]
    };

    complaintTickets.push(newTicket);

    res.status(201).json({
      success: true,
      ticketId,
      data: newTicket,
      message: 'Support ticket generated successfully. Use your Ticket ID to track progress.'
    });
  });

  // GET /api/complaints/:id
  app.get('/api/complaints/:id', (req, res) => {
    const id = req.params.id;
    const ticket = complaintTickets.find((t) => t.ticketId.toLowerCase() === id.toLowerCase());
    if (ticket) {
      return res.json({ success: true, ticket });
    }
    // Return simulated lookup if not in memory
    if (id.toUpperCase().startsWith('SFN-TCK-')) {
      return res.json({
        success: true,
        ticket: {
          ticketId: id.toUpperCase(),
          status: 'In Progress - Technician Dispatched',
          issueCategory: 'Network Line Inspection',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          updates: [
            {
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              note: 'Ticket received by Shahdara dispatch desk.'
            },
            {
              timestamp: new Date(Date.now() - 1800000).toISOString(),
              note: 'Optical signal testing completed from OLT. Fiber lineman dispatched.'
            }
          ]
        }
      });
    }
    res.status(404).json({ success: false, message: 'Ticket not found.' });
  });

  // GET /api/bills/lookup
  app.get('/api/bills/lookup', (req, res) => {
    const query = (req.query.query || '').toString().trim();
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query parameter is required.' });
    }

    const cleanQuery = query.replace(/[\s\-\+]/g, '');
    const found = mockBills.find(
      (b) =>
        b.customerId.toLowerCase() === query.toLowerCase() ||
        b.phone.replace(/[\s\-\+]/g, '').includes(cleanQuery)
    );

    if (found) {
      return res.json({ success: true, bill: found });
    }

    // Dynamic simulated bill response for any valid phone or ID format so the user always experiences a full flow
    const simBill = {
      customerId: query.toUpperCase().startsWith('SFN-') ? query.toUpperCase() : `SFN-${Math.floor(2000 + Math.random() * 8000)}`,
      customerName: 'Valued Shahdara Fiber Subscriber',
      phone: query,
      address: 'Shahdara Town, Lahore',
      packageName: 'Ultra Streamer Fiber (40 Mbps)',
      monthlyAmount: 'PKR 0000 - EDIT ME',
      currentStatus: 'Active / Paid',
      dueDate: '10th of next month',
      billingPeriod: 'Current Month',
      lastPaymentDate: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0]
    };

    res.json({ success: true, bill: simBill });
  });

  // Static files fallback if www exists
  const wwwPath = path.resolve(__dirname, '../www');
  if (fs.existsSync(wwwPath)) {
    app.use(express.static(wwwPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.sendFile(path.join(wwwPath, 'index.html'));
    });
  }

  return app;
}
