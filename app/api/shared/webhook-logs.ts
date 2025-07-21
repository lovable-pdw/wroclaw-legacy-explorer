import { LogEntry } from './types';

// Store recent webhook calls for debugging
let webhookLogs: LogEntry[] = [];
const MAX_LOGS = 50;

export function addWebhookLog(logEntry: LogEntry): void {
  webhookLogs.push(logEntry);
  if (webhookLogs.length > MAX_LOGS) {
    webhookLogs = webhookLogs.slice(-MAX_LOGS);
  }
}

export function getWebhookLogs(limit: number = 20): LogEntry[] {
  return webhookLogs.slice(-limit);
}

export function getWebhookLogsCount(): number {
  return webhookLogs.length;
}
