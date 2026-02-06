import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const FROM_EMAIL = process.env.SES_FROM_EMAIL || "noreply@borderlesspress.org";

function getSesClient() {
  return new SESClient({
    region: process.env.AWS_SES_REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
}

async function sendEmail(to: string, subject: string, body: string) {
  // Fall back to console.log if SES is not configured
  if (!process.env.AWS_ACCESS_KEY_ID) {
    console.log(`=== EMAIL (stubbed) ===`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
    console.log(`=======================`);
    return;
  }

  const ses = getSesClient();
  await ses.send(
    new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject },
        Body: {
          Text: { Data: body },
        },
      },
    })
  );
}

export async function sendApplicationConfirmation(to: string, name: string) {
  await sendEmail(
    to,
    `Thanks for applying, ${name}!`,
    `We've received your application to the BorderlessPress Editorial Contributor Program.\n\nWe'll review it and get back to you within a few days.\n\n— The BorderlessPress Team`
  );
}

export async function sendNewApplicationNotification(
  applicantName: string,
  applicantEmail: string
) {
  const adminEmail = process.env.ADMIN_EMAIL || "yuri@borderlesspress.org";
  await sendEmail(
    adminEmail,
    `New application from ${applicantName}`,
    `${applicantName} (${applicantEmail}) has submitted an application.\n\nLog in to the admin dashboard to review it:\nhttps://borderlesspress.org/admin/applications`
  );
}

export async function sendMagicLink(to: string, url: string) {
  await sendEmail(
    to,
    "Sign in to BorderlessPress Admin",
    `Click the link below to sign in:\n\n${url}\n\nThis link expires in 24 hours. If you didn't request this, you can safely ignore this email.`
  );
}
