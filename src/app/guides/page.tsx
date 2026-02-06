import { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { guides } from "@/lib/db/schema";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Guides in Progress",
  description:
    "See all BorderlessPress relocation guides — published, in development, and proposed.",
};

export default async function GuidesPage() {
  const db = getDb();
  const allGuides = await db.select().from(guides).orderBy(guides.title);

  const published = allGuides.filter((g) => g.status === "published");
  const inDevelopment = allGuides.filter((g) => g.status === "in_development");
  const proposed = allGuides.filter((g) => g.status === "proposed");

  const statusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge variant="success">Published</Badge>;
      case "in_development":
        return <Badge variant="info">In Development</Badge>;
      case "proposed":
        return <Badge variant="warning">Proposed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const GuideList = ({
    items,
  }: {
    items: typeof allGuides;
  }) => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((guide) => (
        <div
          key={guide.id}
          className="rounded-lg border border-gray-200 bg-white p-5"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-brand-charcoal">
              {guide.country}
            </h3>
            {statusBadge(guide.status)}
          </div>
          {guide.description && (
            <p className="mt-2 text-sm text-gray-600">{guide.description}</p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <PageHeader
        title="Guides in Progress"
        subtitle="See what we're working on — and where we need help."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {published.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-brand-charcoal">
              Published
            </h2>
            <GuideList items={published} />
          </section>
        )}

        {inDevelopment.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-brand-charcoal">
              In Development
            </h2>
            <GuideList items={inDevelopment} />
          </section>
        )}

        {proposed.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-brand-charcoal">
              Proposed
            </h2>
            <GuideList items={proposed} />
          </section>
        )}

        <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-brand-charcoal">
            Don&apos;t see your country?
          </h3>
          <p className="mt-2 text-gray-600">
            You can propose a new guide as part of your application.
          </p>
          <Link href="/apply" className="mt-4 inline-block">
            <Button>Apply to Contribute</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
