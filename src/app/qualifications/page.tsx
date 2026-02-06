import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Qualifications",
  description:
    "What we look for in BorderlessPress editorial contributors.",
};

export default function QualificationsPage() {
  return (
    <>
      <PageHeader
        title="Qualifications"
        subtitle="What we look for in editorial contributors."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-xl font-bold text-brand-charcoal">Required</h2>
          <ul className="mt-4 space-y-3">
            {[
              "Lived experience in the country you want to write about (as an immigrant, expat, or long-term resident)",
              "Strong written English (or the guide's primary language)",
              "Ability to explain practical topics clearly and concisely",
              "Willingness to work collaboratively and accept editorial feedback",
              "Reliable follow-through — you meet deadlines or communicate early when you can't",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-gray-700">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-accent text-xs text-white">
                  &#10003;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-brand-charcoal">
            Nice to Have
          </h2>
          <ul className="mt-4 space-y-3">
            {[
              "Experience with Markdown and/or GitHub",
              "Background in writing, journalism, technical writing, or education",
              "Familiarity with immigration processes from a personal or professional perspective",
              "Multilingual abilities (especially for guides targeting non-English-speaking countries)",
              "Experience with fact-checking or research",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-gray-700">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600">
                  +
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="text-center">
          <p className="mb-4 text-gray-600">
            Think you&apos;re a good fit? We&apos;d love to hear from you.
          </p>
          <Link href="/apply">
            <Button size="lg">Apply to Contribute</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
