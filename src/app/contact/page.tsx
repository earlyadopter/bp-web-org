import { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the BorderlessPress team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Have a question? We'd love to hear from you."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-gray-200 bg-white p-8">
          <h2 className="text-lg font-semibold text-brand-charcoal">
            General Inquiries
          </h2>
          <p className="mt-2 text-gray-600">
            For questions about the contributor program, our guides, or anything
            else, reach out to us at:
          </p>
          <p className="mt-4">
            <a
              href="mailto:yuri@borderlesspress.org"
              className="text-brand-accent hover:underline"
            >
              yuri@borderlesspress.org
            </a>
          </p>

          <h2 className="mt-8 text-lg font-semibold text-brand-charcoal">
            Want to Contribute?
          </h2>
          <p className="mt-2 text-gray-600">
            If you&apos;re interested in becoming an editorial contributor,
            please use our{" "}
            <a href="/apply" className="text-brand-accent hover:underline">
              application form
            </a>{" "}
            instead. It helps us review candidates efficiently and ensures we
            have all the information we need.
          </p>
        </div>
      </div>
    </>
  );
}
