import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "What Editors Get",
  description:
    "Benefits of contributing to BorderlessPress as an editorial contributor.",
};

export default function WhatEditorsGetPage() {
  const benefits = [
    {
      title: "Published credit",
      description:
        "Your name appears as a contributor on every guide you help create. Build a public portfolio of published editorial work.",
    },
    {
      title: "Real editorial experience",
      description:
        "Work on a real publication with real readers. Develop skills you can reference in future roles — writing, editing, research, and project management.",
    },
    {
      title: "A portfolio piece",
      description:
        "Each guide is a substantial, professional body of work. Link to it from your resume, LinkedIn, or personal site.",
    },
    {
      title: "Skill development",
      description:
        "Improve your writing, learn Markdown and GitHub workflows, practice giving and receiving editorial feedback, and develop cross-cultural communication skills.",
    },
    {
      title: "A global network",
      description:
        "Collaborate with contributors from around the world. Build professional connections with people who share your interests and values.",
    },
  ];

  return (
    <>
      <PageHeader
        title="What Editors Get"
        subtitle="Contributing to BorderlessPress is rewarding — here's what you get in return."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {benefits.map((benefit, i) => (
            <div key={benefit.title} className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-white">
                {i + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-charcoal">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/apply">
            <Button size="lg">Apply to Contribute</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
