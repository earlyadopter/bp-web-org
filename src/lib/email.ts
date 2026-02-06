// Stubbed email functions — replace with Resend later

export async function sendApplicationConfirmation(to: string, name: string) {
  console.log("=== EMAIL: Application Confirmation ===");
  console.log(`To: ${to}`);
  console.log(`Subject: Thanks for applying, ${name}!`);
  console.log(
    `Body: We've received your application to the BorderlessPress Editorial Contributor Program. We'll review it and get back to you within a few days.`
  );
  console.log("========================================");
}

export async function sendNewApplicationNotification(
  applicantName: string,
  applicantEmail: string
) {
  const adminEmail = process.env.ADMIN_EMAIL || "yuri@borderlesspress.org";
  console.log("=== EMAIL: New Application Notification ===");
  console.log(`To: ${adminEmail}`);
  console.log(`Subject: New application from ${applicantName}`);
  console.log(
    `Body: ${applicantName} (${applicantEmail}) has submitted an application. Log in to the admin dashboard to review it.`
  );
  console.log("============================================");
}

export async function sendMagicLink(to: string, url: string) {
  console.log("=== EMAIL: Magic Link ===");
  console.log(`To: ${to}`);
  console.log(`Subject: Sign in to BorderlessPress Admin`);
  console.log(`Body: Click the link below to sign in:\n${url}`);
  console.log("=========================");
}
