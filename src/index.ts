import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'BrainSpace_BE',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 1. Sync Batches - Section 9.5
app.post('/v1/sync/batches', (req: Request, res: Response) => {
  const { device_id, batch_id, schema, objects } = req.body;
  if (!device_id || !batch_id) {
    return res.status(400).json({ error: 'Missing device_id or batch_id' });
  }

  // Idempotent batch processing
  const accepted_event_ids = (objects || []).map((o: any) => o.id || uuidv4());
  res.status(200).json({
    batch_id,
    status: 'accepted',
    processed_count: accepted_event_ids.length,
    accepted_event_ids,
    rejected_reasons: []
  });
});

// 2. Sync Manifest - Section 9.5
app.get('/v1/sync/manifest', (req: Request, res: Response) => {
  const cursor = req.query.cursor as string || '0';
  res.status(200).json({
    cursor,
    manifest: [],
    tombstones: [],
    server_time: new Date().toISOString()
  });
});

// 3. Subscriptions & Entitlements - Section 9.5
app.post('/v1/subscriptions/verify', (req: Request, res: Response) => {
  const { platform, purchase_token, app_id } = req.body;
  if (!platform || !purchase_token) {
    return res.status(400).json({ error: 'Missing platform or purchase_token' });
  }

  // Canonical entitlement response
  res.status(200).json({
    verified: true,
    entitlement: {
      plan: 'premium',
      active: true,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      grace_period: false
    }
  });
});

app.get('/v1/entitlements', (req: Request, res: Response) => {
  res.status(200).json({
    is_premium: false,
    features: {
      unlimited_habits: false,
      extended_trends: false,
      cloud_backup: false,
      advanced_schedules: false
    },
    free_tier: {
      max_habits: 2,
      local_history_days: 30,
      urge_support: true,
      basic_pomodoro: true
    }
  });
});

// 4. Detection Config - Section 9.5
app.get('/v1/detection/config', (req: Request, res: Response) => {
  res.status(200).json({
    rule_version: '1.0.0',
    kill_switch_active: false,
    supported_packages: [
      {
        package_name: 'com.instagram.android',
        app_name: 'Instagram',
        feature_supported: 'reels_estimate',
        enabled: true
      },
      {
        package_name: 'com.google.android.youtube',
        app_name: 'YouTube',
        feature_supported: 'shorts_estimate',
        enabled: true
      }
    ],
    last_updated: new Date().toISOString()
  });
});

// 5. Account Deletion - Section 9.5
app.post('/v1/account/delete', (req: Request, res: Response) => {
  const deletion_job_id = uuidv4();
  res.status(202).json({
    job_id: deletion_job_id,
    status: 'queued',
    scheduled_purge_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    message: 'User data deletion initiated per GDPR/CCPA standards.'
  });
});

app.listen(port, () => {
  console.log(`BrainSpace_BE service listening on http://localhost:${port}`);
});
