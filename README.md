<div align="center">

# ⚙️ BrainSpace_BE

### *Backend API Microservices for the BrainSpace Digital Wellness Platform*

Scalable, privacy-first synchronization, subscription entitlement verification, and dynamic configuration services built with Node.js, TypeScript, and Express.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![License](https://img.shields.io/badge/License-UNLICENSED-grey?style=for-the-badge)](LICENSE)

[Overview](#-overview) • [API Specification](#-api-specification) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Environment](#-environment-variables)

</div>

---

## 🌟 Overview

`BrainSpace_BE` serves as the companion backend service for the [BrainSpace Mobile Client](https://github.com/dhruviin/brainspace). Following the local-first philosophy outlined in Section 9.5 of the **Master Build Plan**, the backend is designed to be lightweight, secure, and respectful of user privacy.

### Key Capabilities
- **Idempotent Cloud Sync:** Accepts batched, client-side encrypted objects without server-side decryption of sensitive habit journals.
- **Entitlement Authority:** Validates Google Play Billing and App Store purchase tokens server-side before activating Pro features.
- **Dynamic Config & Kill Switch:** Provides versioned, signed detection rules and instant kill switches for feed detectors.
- **GDPR / CCPA Deletion Queue:** Handles complete user account and data purge jobs.

---

## 📡 API Specification

### Base URL
- Development: `http://localhost:4000`

### Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/health` | Service health status and timestamp |
| `POST` | `/v1/sync/batches` | Ingest idempotent synchronization event batches |
| `GET` | `/v1/sync/manifest` | Query versioned user objects and deletion tombstones |
| `POST` | `/v1/subscriptions/verify` | Verify Google Play Billing purchase tokens |
| `GET` | `/v1/entitlements` | Return canonical feature flags and subscription status |
| `GET` | `/v1/detection/config` | Fetch signed detection rules and kill switch flags |
| `POST` | `/v1/account/delete` | Queue complete user data purge job |

---

### Example Requests

#### 1. Service Health Check
```bash
curl http://localhost:4000/health
```
```json
{
  "status": "ok",
  "service": "BrainSpace_BE",
  "timestamp": "2026-11-21T11:40:00.000Z",
  "version": "1.0.0"
}
```

#### 2. Sync Event Batch (`POST /v1/sync/batches`)
```bash
curl -X POST http://localhost:4000/v1/sync/batches \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "device_uuid_123",
    "batch_id": "batch_uuid_456",
    "schema": 1,
    "objects": [{"id": "evt_001", "type": "focus_session"}]
  }'
```

#### 3. Fetch Detection Rule Config (`GET /v1/detection/config`)
```bash
curl http://localhost:4000/v1/detection/config
```

---

## 🏗️ Architecture

```text
BrainSpace_BE/
├── src/
│   └── index.ts          # Express application, routes, controllers & middleware
├── dist/                 # Compiled JavaScript bundle (tsc output)
├── .env.example          # Environment variables template
├── .gitignore            # Excludes node_modules, dist, logs, and secrets
├── package.json          # Node dependencies and build scripts
└── tsconfig.json         # Strict TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or higher)
- npm or yarn

### Installation & Execution

```bash
# Clone the repository
git clone https://github.com/dhruviin/BrainSpace_BE.git
cd BrainSpace_BE

# Install dependencies
npm install

# Run development server (live reloading with ts-node-dev)
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `PORT` | Listening server port | `4000` |
| `NODE_ENV` | Runtime environment (`development` / `production`) | `development` |
| `SUPABASE_URL` | Supabase project URL (optional cloud sync) | — |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for admin operations | — |
| `JWT_SECRET` | Secret token for session verification | — |

---

## 🔗 Related Repositories

- **Mobile Client:** [brainspace](https://github.com/dhruviin/brainspace) — React Native (Expo) app with native Android & iOS modules.

---

## 📄 License

UNLICENSED — All rights reserved. Built with ❤️ by **[Dhruvin](https://github.com/dhruviin)**.
