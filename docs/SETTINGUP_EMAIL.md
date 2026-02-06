# Setting Up Email with Amazon SES

Email is used for magic link authentication (admin login) and application notifications.

## 1. Create an IAM User

1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Click **Users** > **Create user**
3. Name it something like `borderlesspress-ses`
4. Attach the policy **AmazonSESFullAccess**
5. Create the user, then go to **Security credentials** > **Create access key**
6. Choose "Application running outside AWS" and create the key
7. Save the **Access Key ID** and **Secret Access Key**

## 2. Verify Your Domain in SES

1. Go to [Amazon SES Console](https://console.aws.amazon.com/ses/)
2. Make sure you're in the correct region (e.g. `us-east-1`)
3. Click **Verified identities** > **Create identity**
4. Choose **Domain** and enter `borderlesspress.org`
5. SES will give you DNS records (DKIM CNAME records) to add at your domain registrar
6. Add the DNS records and wait for verification (usually a few minutes)
7. Once verified, you can send from any address `@borderlesspress.org`

## 3. Request Production Access

New SES accounts start in **sandbox mode**, which only allows sending to verified email addresses. To send to anyone:

1. In the SES Console, go to **Account dashboard**
2. Click **Request production access**
3. Fill out the form — describe your use case (transactional emails for a contributor platform)
4. AWS typically approves within 24 hours

Until approved, you can test by verifying individual recipient emails in SES.

## 4. Add Environment Variables

Add these to your `.env.local` (for local dev) and to Vercel project settings (for production):

| Variable | Value |
|----------|-------|
| `AWS_ACCESS_KEY_ID` | From step 1 |
| `AWS_SECRET_ACCESS_KEY` | From step 1 |
| `AWS_SES_REGION` | The region where you verified your domain (e.g. `us-east-1`) |
| `SES_FROM_EMAIL` | `noreply@borderlesspress.org` (or any verified address) |

## 5. Test

- **Local**: Set the env vars in `.env.local`, run `npm run dev`, and try the admin login flow at `/admin/login`
- **Production**: Add the env vars in Vercel project settings, redeploy, and test

If `AWS_ACCESS_KEY_ID` is not set, emails fall back to console.log output — so local dev works without AWS credentials.
