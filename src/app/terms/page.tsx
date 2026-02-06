import { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Terms of Participation",
  description: "Terms of participation for BorderlessPress contributors.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Participation" />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-gray-700">
          <p>
            <strong>Effective date:</strong> February 2026
          </p>

          <section>
            <h2 className="text-lg font-semibold text-brand-charcoal">
              Overview
            </h2>
            <p className="mt-2">
              By applying to and participating in the BorderlessPress Editorial
              Contributor Program, you agree to the following terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-charcoal">
              Contributions
            </h2>
            <p className="mt-2">
              All content you contribute to BorderlessPress guides is published
              under an open-access license. You retain attribution credit for
              your contributions, but grant BorderlessPress the right to publish,
              edit, and distribute the content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-charcoal">
              Conduct
            </h2>
            <p className="mt-2">
              Contributors are expected to communicate respectfully, meet
              commitments or communicate early when unable to, and produce
              original work. Plagiarism, harassment, or misrepresentation will
              result in removal from the program.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-charcoal">
              Voluntary Participation
            </h2>
            <p className="mt-2">
              Participation in the contributor program is voluntary and unpaid.
              Contributors may leave the program at any time. BorderlessPress
              reserves the right to end a contributor&apos;s participation at any
              time, with notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-charcoal">
              Accuracy
            </h2>
            <p className="mt-2">
              Contributors should make their best effort to provide accurate,
              up-to-date information. However, BorderlessPress guides are
              informational resources, not legal or professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-charcoal">
              Changes
            </h2>
            <p className="mt-2">
              We may update these terms from time to time. Active contributors
              will be notified of material changes.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
