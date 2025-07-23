import { VercelRequest, VercelResponse } from '@vercel/node';

// Store recent webhook calls for debugging
let webhookLogs: any[] = [];
const MAX_LOGS = 50;

export function addWebhookLog(logEntry: any) {
  webhookLogs.push(logEntry);
  if (webhookLogs.length > MAX_LOGS) {
    webhookLogs = webhookLogs.slice(-MAX_LOGS);
  }
}

export function getWebhookLogs() {
  return webhookLogs;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const logs = getWebhookLogs();
    
    return res.status(200).json({
      count: logs.length,
      logs: logs.slice(-20) // Return last 20 logs
    });
  } catch (error) {
    console.error('❌ Error fetching webhook logs:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      error: 'Failed to fetch webhook logs',
      details: errorMessage 
    });
  }
}
