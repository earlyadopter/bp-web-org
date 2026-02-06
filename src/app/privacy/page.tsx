import { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "BorderlessPress privacy policy.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-gray-700">
          <p>
            <strong>Effective date:</strong> February 2026
          </p>

          <section>
            <h2 className="text-lg font-semibold text-brand-charcoal">
              What We Collect
            </h2>
            <p className="mt-2">
              When you submit an application through our contributor form, we
              collect the information you provide: your name, email address,
              country experience, language skills, background description, and
              familiarity with tools like Markdown and GitHub.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-charcoal">
              How We Use It
            </h2>
            <p className="mt-2">
              We use your information solely to evaluate your application,
              communicate with you about your candidacy, and — if accepted —
              coordinate your contributions. We do not sell, share, or rent your
              personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-charcoal">
              Data Storage
            </h2>
            <p className="mt-2">
              Your data is stored securely in our database hosted on Neon
              (PostgreSQL). Access is limited to authorized administrators.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-charcoal">
              Your Rights
            </h2>
            <p className="mt-2">
              You may request access to, correction of, or deletion of your
              personal data at any time by contacting us at{" "}
              <a
                href="mailto:yuri@borderlesspress.org"
                className="text-brand-accent hover:underline"
              >
                yuri@borderlesspress.org
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-charcoal">
              Changes
            </h2>
            <p className="mt-2">
              We may update this policy from time to time. Changes will be
              reflected on this page with an updated effective date.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
