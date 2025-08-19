# Cloudflare Wrangler Secrets Setup Script
# Run this script to set up all required environment variables as secrets

Write-Host "Setting up Cloudflare secrets for ArkyDesk..." -ForegroundColor Green
Write-Host ""

# Required secrets for production
Write-Host "Setting up PRODUCTION secrets:" -ForegroundColor Yellow
Write-Host "Run these commands manually, entering the actual values when prompted:" -ForegroundColor Cyan
Write-Host ""

Write-Host "wrangler secret put SECRET_KEY --env production" -ForegroundColor White
Write-Host "wrangler secret put SESSION_SECRET --env production" -ForegroundColor White
Write-Host "wrangler secret put MONGODB_URI --env production" -ForegroundColor White
Write-Host "wrangler secret put MONGODB_DB --env production" -ForegroundColor White
Write-Host "wrangler secret put BASE_URL --env production" -ForegroundColor White
Write-Host ""

Write-Host "Optional SMTP secrets (if using email features):" -ForegroundColor Yellow
Write-Host "wrangler secret put SMTP_HOST --env production" -ForegroundColor White
Write-Host "wrangler secret put SMTP_PORT --env production" -ForegroundColor White
Write-Host "wrangler secret put SMTP_USER --env production" -ForegroundColor White
Write-Host "wrangler secret put SMTP_PASS --env production" -ForegroundColor White
Write-Host ""

Write-Host "Setting up PREVIEW secrets:" -ForegroundColor Yellow
Write-Host "wrangler secret put SECRET_KEY --env preview" -ForegroundColor White
Write-Host "wrangler secret put SESSION_SECRET --env preview" -ForegroundColor White
Write-Host "wrangler secret put MONGODB_URI --env preview" -ForegroundColor White
Write-Host "wrangler secret put MONGODB_DB --env preview" -ForegroundColor White
Write-Host "wrangler secret put BASE_URL --env preview" -ForegroundColor White
Write-Host ""

Write-Host "Setting up DEVELOPMENT secrets (for local development with Cloudflare):" -ForegroundColor Yellow
Write-Host "wrangler secret put SECRET_KEY --env development" -ForegroundColor White
Write-Host "wrangler secret put SESSION_SECRET --env development" -ForegroundColor White
Write-Host "wrangler secret put MONGODB_URI --env development" -ForegroundColor White
Write-Host "wrangler secret put MONGODB_DB --env development" -ForegroundColor White
Write-Host "wrangler secret put BASE_URL --env development" -ForegroundColor White
Write-Host ""

Write-Host "To list all secrets for an environment:" -ForegroundColor Green
Write-Host "wrangler secret list --env production" -ForegroundColor White
Write-Host "wrangler secret list --env preview" -ForegroundColor White
Write-Host "wrangler secret list --env development" -ForegroundColor White
Write-Host ""

Write-Host "To delete a secret:" -ForegroundColor Red
Write-Host "wrangler secret delete SECRET_NAME --env ENVIRONMENT" -ForegroundColor White
Write-Host ""

Write-Host "Example values:" -ForegroundColor Magenta
Write-Host "SECRET_KEY: A random 32+ character string for encryption" -ForegroundColor Gray
Write-Host "SESSION_SECRET: A random 32+ character string for session management" -ForegroundColor Gray
Write-Host "MONGODB_URI: mongodb+srv://username:password@cluster.mongodb.net/" -ForegroundColor Gray
Write-Host "MONGODB_DB: your-database-name" -ForegroundColor Gray
Write-Host "BASE_URL: https://your-domain.com (or https://arkydesk.pages.dev)" -ForegroundColor Gray
Write-Host ""

Write-Host "Note: After setting secrets, deploy your application:" -ForegroundColor Green
Write-Host "npm run deploy" -ForegroundColor White
