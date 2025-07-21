# Environment Variables Setup Guide

## How to Configure Environment Variables in Vercel

### Step 1: Access Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project: `wroclaw-legacy-explorer`
3. Click on **Settings** tab
4. Click on **Environment Variables** in the sidebar

### Step 2: Add Required Variables

#### PayU Configuration
Add these environment variables one by one:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `PAYU_CLIENT_ID` | Your PayU client ID | Production |
| `PAYU_CLIENT_SECRET` | Your PayU client secret | Production |
| `PAYU_POS_ID` | Your PayU POS ID | Production |
| `PAYU_SIGNATURE_KEY` | Your PayU signature key | Production |
| `PAYU_ENVIRONMENT` | `sandbox` or `production` | Production |

#### Email Configuration
| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `EMAIL_HOST` | `mail-serwer345814.lh.pl` | Production |
| `EMAIL_PORT` | `465` | Production |
| `EMAIL_USER` | `kontakt@projektdawnywroclaw.pl` | Production |
| `EMAIL_PASSWORD` | Your email password | Production |
| `EMAIL_FROM_NAME` | `Projekt Dawny Wrocław` | Production |
| `EMAIL_FROM` | `kontakt@projektdawnywroclaw.pl` | Production |

### Step 3: Redeploy
After adding environment variables:
```bash
vercel --prod
```

### Step 4: Verify Configuration
Test email service:
```bash
curl https://www.projektdawnywroclaw.pl/api/test-email
```

Should return:
```json
{
  "connected": true,
  "config": {
    "host": "mail-serwer345814.lh.pl",
    "port": "465",
    "user": "kontakt@projektdawnywroclaw.pl",
    "hasPassword": true
  }
}
```

## Troubleshooting

### If email connection fails:
1. Verify email password is correct
2. Check if email server allows connections from Vercel IPs
3. Test with a simple email client first

### If PayU integration fails:
1. Verify all PayU credentials are correct
2. Check PayU environment setting (sandbox vs production)
3. Verify webhook URL is accessible from PayU servers

## Security Notes
- Never commit environment variables to Git
- Use Vercel's encrypted environment variable storage
- Rotate credentials regularly
- Use different credentials for development/production
