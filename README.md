# Shahdara Fiber Net 🚀🌐

Official customer app and self-service portal for **Shahdara Fiber Net** — next-generation Fiber-To-The-Home (FTTH) internet service provider delivering symmetrical gigabit speeds, ultra-low gaming latency, and 24/7 dedicated local support in Shahdara, Lahore.

**Live GitHub Pages Demo:** [https://offerpk.github.io/shahdara-fiber-net/](https://offerpk.github.io/shahdara-fiber-net/)  
**Android App Package:** `pk.offer.shahdarafibernet`

---

## 🌟 Key Features

- **🏠 Home & Speed Diagnostics:** Hero section, value propositions, quick action shortcuts, and an interactive real-time fiber latency & throughput speed tester.
- **⚡ Fiber Packages & Plans:** Dynamic comparison of plans (Home Starter 20 Mbps, Ultra Streamer 40 Mbps, Gamer Pro 75 Mbps, Business & Commercial 150 Mbps+) with clear feature matrices and 1-click plan selection.
- **🔌 Online Connection Booking:** Interactive application form with instant validation, drop cable scheduling, automatic reference tracking (`SFN-CONN-XXXX`), and 1-click pre-filled WhatsApp dispatch.
- **💳 Bill & Payment Center:** Instant invoice lookup by Customer ID or mobile number, with detailed guides for Easypaisa, JazzCash, 1Link Bank Transfers, and local cash collection desk.
- **🛠️ Complaints & Live Ticket Tracker:** Issue logging (Red LOS light, cable cut, high ping, router settings) with automated ticket numbers (`SFN-TCK-XXXX`), live progress timeline, and self-help troubleshooting FAQ accordion.
- **📍 Coverage Areas Directory:** Searchable directory of sectors across Shahdara (Begum Kot, Saeed Park, Wandala Road, Jia Musa, Match Factory Road, etc.) with availability filters and neighborhood survey request flow.
- **📞 Direct Contact Channels:** One-touch WhatsApp chat link, direct helpline telephone dialer, physical office address, and support hours.
- **📱 PWA & Capacitor Android:** Offline-ready service worker caching, Web App Manifest, responsive mobile-first UI, and Android build via Capacitor.
- **🌐 Dual-Mode Architecture:** Standalone Node/Express REST API server (`server/app.js`) when self-hosted, with automatic graceful fallback to client-side localStorage and WhatsApp integration when hosted on static GitHub Pages.

---

## ⚙️ Configuration Instructions (For John / ISP Owner)

All business details, package pricing, phone numbers, and payment details are stored in **ONE single configuration file**:

📁 [`config/business.json`](./config/business.json)

Clearly marked placeholders are ready to be filled in:

```json
{
  "company": {
    "phone": "+92-XXX-XXXXXXX",
    "whatsapp": "+92-XXX-XXXXXXX",
    "whatsappDigitsOnly": "923000000000",
    "email": "support@shahdarafiber.net - EDIT ME",
    "address": "Main GT Road, Shahdara Town, Lahore - EDIT ME"
  },
  "packages": [
    {
      "id": "starter-fiber",
      "price": "PKR 0000 - EDIT ME"
    }
  ],
  "paymentMethods": [
    {
      "id": "easypaisa",
      "accountNumber": "03XX-XXXXXXX - EDIT ME"
    }
  ]
}
```

After modifying `config/business.json`, run `npm run build` to update the static `www/` build assets.

---

## 💻 Local Development & Run

### Prerequisites
- Node.js (v18, v20, or v22+)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
npm test
```

### 3. Build Web Assets
```bash
npm run build
```

### 4. Start the Full Node/Express Backend Server
```bash
npm start
```
The server will start on `http://localhost:3000` serving both the REST API routes (`/api/*`) and static web files (`www/`).

---

## 📱 Android APK Build (Capacitor)

### 1. Build and Sync Web Assets
```bash
npm run build
npm run cap:sync
```

### 2. Assemble Debug APK
```bash
cd android
./gradlew assembleDebug
```
The output APK will be generated at:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🚀 Own-Server Deployment Steps (Documentation Only)

When you are ready to deploy to your own VPS or dedicated server (e.g., Ubuntu Linux with Nginx):

### 1. Server Environment Setup
```bash
sudo apt update && sudo apt install -y nodejs npm nginx git
sudo npm install -g pm2
```

### 2. Clone and Install
```bash
git clone https://github.com/OfferPk/shahdara-fiber-net.git /var/www/shahdara-fiber-net
cd /var/www/shahdara-fiber-net
npm ci --production
npm run build
```

### 3. Environment Variables
Create an `.env` file in the project root:
```env
PORT=3000
NODE_ENV=production
```

### 4. Process Management (PM2)
```bash
pm2 start server/index.js --name "shahdara-fiber-net"
pm2 save
pm2 startup
```

### 5. Nginx Reverse Proxy Configuration
Add to `/etc/nginx/sites-available/shahdara-fiber-net`:
```nginx
server {
    listen 80;
    server_name your-domain.com; # Replace with your domain

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
Enable the site and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/shahdara-fiber-net /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 📄 License

MIT License. Copyright (c) 2026 OfferPk.
