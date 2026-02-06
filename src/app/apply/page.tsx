import { Metadata } from "next";
import { getDb } from "@/lib/db";
import { guides } from "@/lib/db/schema";
import { PageHeader } from "@/components/layout/page-header";
import { ApplicationForm } from "@/components/application/application-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Apply to Contribute",
  description:
    "Apply to join the BorderlessPress editorial contributor program.",
};

export default async function ApplyPage() {
  const db = getDb();
  const allGuides = await db.select().from(guides).orderBy(guides.title);

  return (
    <>
      <PageHeader
        title="Apply to Contribute"
        subtitle="Tell us about yourself and how you'd like to help."
      />
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <ApplicationForm guides={allGuides} />
      </div>
    </>
  );
}
