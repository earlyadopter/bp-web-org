import { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "About BorderlessPress and our mission.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About BorderlessPress"
        subtitle="Free relocation guides, built by people who've been there."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700">
            BorderlessPress is an open-access publishing project that creates
            comprehensive relocation guides for people moving to new countries.
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand-charcoal">
            Our Mission
          </h2>
          <p className="mt-3 text-gray-700">
            Moving to a new country is one of the most significant decisions a
            person can make. Yet reliable, practical information is often
            scattered across forums, outdated blog posts, and expensive
            consultants. We believe everyone deserves access to clear,
            trustworthy guidance — regardless of their budget.
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand-charcoal">
            How We Work
          </h2>
          <p className="mt-3 text-gray-700">
            Our guides are written and maintained by editorial contributors with
            real-world experience living in the countries they write about. We
            use a collaborative editorial process — similar to open-source
            software — where contributors write, review, and improve each
            other&apos;s work.
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand-charcoal">
            BorderlessPress Publishing
          </h2>
          <p className="mt-3 text-gray-700">
            This contributor platform is part of the larger BorderlessPress
            publishing initiative. To learn more about our published guides and
            the organization, visit{" "}
            <a
              href="https://borderlesspress.com"
              className="text-brand-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              borderlesspress.com
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
