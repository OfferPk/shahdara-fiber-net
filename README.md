# Shahdara Fiber Net — Customer App

Customer-facing web/mobile app for **Shahdara Fiber Net** (local fiber ISP).

**Live UI preview:** https://offerpk.github.io/shahdara-fiber-net/

## Screens / features
- **Home** — hero, why choose us, quick actions (New Connection, Complaint, Pay Bill, WhatsApp)
- **Packages** — speed plans with price, data, features (loaded from config)
- **New Connection** — form: name, phone, CNIC (optional), address, area, package; sends via WhatsApp / backend
- **Complaint / Support** — form with customer ID, issue type, details; ticket number shown
- **Bill Info** — look up bill by customer ID, payment methods (JazzCash / Easypaisa / bank) from config
- **Coverage** — list of covered areas + area checker
- **Contact** — phone, WhatsApp button, address, office hours, map link
- Urdu/English friendly, mobile-first, dark/light, offline-friendly (PWA)

## Config (placeholders — owner fills these)
All real business data lives in `config/config.json` (packages, prices, phone, WhatsApp number,
areas, payment accounts). Placeholder values are used until the owner fills them in.

## Structure (target)
- `frontend/` — static UI (deployed to GitHub Pages for preview)
- `backend/` — Node/Express API (connection requests, complaints, bills) with SQLite; not auto-deployed
- `config/` — editable business config

## Deploy
GitHub Pages is used only for UI preview. The backend is not auto-deployed; deploy to your own
server later (steps will be in `DEPLOY.md`).
