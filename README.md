# BrainSpace_BE — Backend API Microservices

<div align="center">
  <h3>Scalable, Local-First Sync & Entitlement Backend for BrainSpace</h3>
  <p>Node.js • TypeScript • Express • Supabase & PostgreSQL Architecture</p>
</div>

---

## 🌟 Overview

`BrainSpace_BE` provides the backend synchronization, receipt verification, and remote configuration services for the BrainSpace mobile client, adhering strictly to Section 9.5 of the **Master Build Plan**.

### Core Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Service health status and versioning |
| `POST` | `/v1/sync/batches` | Idempotent event batch ingestion for opt-in cloud sync |
| `GET` | `/v1/sync/manifest` | Synchronized user object versions and tombstones |
| `POST` | `/v1/subscriptions/verify` | Server-side Google Play purchase verification |
| `GET` | `/v1/entitlements` | Canonical feature entitlement flags and plan tiers |
| `GET` | `/v1/detection/config` | Signed rule versions and kill switches for feed detectors |
| `POST` | `/v1/account/delete` | GDPR/CCPA compliant user data deletion job queue |

---

## 🏗️ Architecture

```text
BrainSpace_BE/
├── src/
│   └── index.ts        # Express server, route controllers & request loggers
├── dist/               # Compiled JavaScript bundle
├── .env.example        # Environment variables template
├── package.json        # Dependencies & scripts
└── tsconfig.json       # TypeScript configuration (ES2022 / CommonJS)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Run

```bash
# Install dependencies
npm install

# Run development server with live reload
npm run dev

# Compile TypeScript to production bundle
npm run build

# Run production server
npm run start
```

Default port is `4000`. Test via:
```bash
curl http://localhost:4000/health
```

---

## 📄 License
UNLICENSED — All rights reserved.
