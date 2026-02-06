# Deploying BorderlessPress.org to Vercel

## Prerequisites

- A GitHub account with this repo pushed to it
- A Vercel account (sign up at vercel.com — free tier works)
- Your Neon `DATABASE_URL` (already set up)
- Your `AUTH_SECRET` (already generated)

---

## 1. Push the repo to GitHub

If you haven't already:

```bash
git remote add origin git@github.com:earlyadopter/bp-web-org.git
git push -u origin main
```

---

## 2. Import the project in Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your GitHub account and find the `bp-web-org` repo
4. Click **Import**

### Configure the project

On the import screen:

- **Framework Preset**: Next.js (should auto-detect)
- **Root Directory**: `.` (leave default)
- **Build Command**: `next build` (leave default)
- **Output Directory**: leave default

### Add environment variables

Before clicking Deploy, expand **Environment Variables** and add:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Neon connection string (the `postgresql://...` URL) |
| `AUTH_SECRET` | Your generated secret |
| `AUTH_URL` | `https://borderlesspress.org` |
| `ADMIN_EMAIL` | `yuri@borderlesspress.org` |

> **Important**: Set `AUTH_URL` to `https://borderlesspress.org` (not localhost).

Click **Deploy**. Wait for the build to complete.

---

## 3. Connect the custom domain

Once the project is deployed:

1. Go to your project dashboard in Vercel
2. Click **Settings** > **Domains**
3. Enter `borderlesspress.org` and click **Add**
4. Vercel will show you DNS records to configure. You need to set these at your domain registrar:

### DNS configuration

**Option A — Using Vercel nameservers (recommended)**

At your domain registrar, change the nameservers to:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B — Using DNS records**

If you prefer to keep your current DNS provider, add these records:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

5. Also add `www.borderlesspress.org` in the Vercel Domains settings — Vercel will auto-redirect it to the apex domain

6. Wait for DNS propagation (usually a few minutes, can take up to 48 hours)

7. Vercel automatically provisions an SSL certificate once DNS is verified

---

## 4. Verify the deployment

After DNS propagates:

- `https://borderlesspress.org` — should show the landing page
- `https://borderlesspress.org/guides` — should show seeded guides
- `https://borderlesspress.org/admin` — should redirect to login
- `https://borderlesspress.org/apply` — should show the application form

---

## Redeploying

After the initial setup, every push to `main` on GitHub will automatically trigger a new deployment on Vercel. No manual steps needed.

To manually redeploy (e.g., after changing env vars):

1. Go to your project in Vercel
2. Click **Deployments** > **...** menu on the latest deployment > **Redeploy**

---

## Troubleshooting

**Build fails with "DATABASE_URL" error**
- Make sure the `DATABASE_URL` env var is set in Vercel project settings (not just locally)

**Auth redirects don't work / CSRF errors**
- Make sure `AUTH_URL` is set to `https://borderlesspress.org` (with https, no trailing slash)

**Magic link doesn't arrive**
- Email is currently stubbed (console.log only). Check Vercel function logs: project dashboard > **Logs**
- To wire up real email later, integrate Resend and update the `sendMagicLink` function in `src/lib/email.ts`
