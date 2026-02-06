import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The 5-step process for becoming a BorderlessPress editorial contributor.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Apply",
      description:
        "Fill out our application form with your background, the countries you know, and which guides interest you. It takes about 10 minutes.",
    },
    {
      title: "Review",
      description:
        "We review your application within a few days. We're looking for lived experience, clear writing, and a genuine interest in helping newcomers.",
    },
    {
      title: "Onboard",
      description:
        "If accepted, we'll walk you through the project structure, our style guide, and the tools we use (Markdown + GitHub). No prior Git experience required — we'll help you get set up.",
    },
    {
      title: "Contribute",
      description:
        "Pick up sections to write or review. Work at your own pace, asynchronously. Get feedback from the editorial team and refine your contributions.",
    },
    {
      title: "Get credited",
      description:
        "Your name goes on every guide you contribute to. Build a portfolio of published work that you can share publicly.",
    },
  ];

  return (
    <>
      <PageHeader
        title="How It Works"
        subtitle="From application to published contributor in 5 steps."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-charcoal text-lg font-bold text-white">
                {i + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-charcoal">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/apply">
            <Button size="lg">Start Your Application</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
