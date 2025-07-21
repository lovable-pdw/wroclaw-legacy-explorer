import { NextRequest, NextResponse } from 'next/server';
import { getWebhookLogs } from '../shared/webhook-logs';

export async function GET(request: NextRequest) {
  try {
    const logs = getWebhookLogs();
    
    return NextResponse.json({
      count: logs.length,
      logs: logs.slice(-20) // Return last 20 logs
    });
  } catch (error) {
    console.error('❌ Error fetching webhook logs:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to fetch webhook logs',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
