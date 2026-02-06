import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { applications, guides } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { ApplicationActions } from "./actions";

export const metadata: Metadata = {
  title: "Application Detail",
};

function statusBadge(status: string) {
  switch (status) {
    case "pending":
      return <Badge variant="warning">Pending</Badge>;
    case "approved":
      return <Badge variant="success">Approved</Badge>;
    case "rejected":
      return <Badge variant="error">Rejected</Badge>;
    case "info_requested":
      return <Badge variant="info">Info Requested</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();

  const result = await db
    .select()
    .from(applications)
    .where(eq(applications.id, id))
    .limit(1);

  if (result.length === 0) {
    notFound();
  }

  const app = result[0];

  // Fetch guide names if interested guides exist
  let interestedGuides: { id: string; title: string }[] = [];
  if (app.interestedGuideIds && app.interestedGuideIds.length > 0) {
    interestedGuides = await db
      .select({ id: guides.id, title: guides.title })
      .from(guides)
      .where(inArray(guides.id, app.interestedGuideIds));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">
            {app.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Applied {app.createdAt.toLocaleDateString()} &middot;{" "}
            {statusBadge(app.status)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Application details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-semibold text-brand-charcoal">
              Contact Information
            </h2>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900">
                  <a
                    href={`mailto:${app.email}`}
                    className="text-brand-accent hover:underline"
                  >
                    {app.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Countries
                </dt>
                <dd className="text-sm text-gray-900">
                  {app.countries.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Languages
                </dt>
                <dd className="text-sm text-gray-900">{app.languages}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-semibold text-brand-charcoal">Background</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm text-gray-700">
              {app.background}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-semibold text-brand-charcoal">
              Guide Interests
            </h2>
            <div className="mt-3 space-y-2">
              {interestedGuides.length > 0 ? (
                <ul className="list-inside list-disc text-sm text-gray-700">
                  {interestedGuides.map((g) => (
                    <li key={g.id}>{g.title}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No specific guides selected.
                </p>
              )}
              {app.proposeNewGuide && (
                <div className="mt-3">
                  <dt className="text-sm font-medium text-gray-500">
                    Proposed new guide
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {app.proposeNewGuide}
                  </dd>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-semibold text-brand-charcoal">
              Tool Familiarity
            </h2>
            <dl className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Markdown</dt>
                <dd className="capitalize text-gray-900">
                  {app.markdownFamiliarity}
                </dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">GitHub</dt>
                <dd className="capitalize text-gray-900">
                  {app.githubFamiliarity}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Actions sidebar */}
        <div>
          <ApplicationActions
            applicationId={app.id}
            currentStatus={app.status}
            currentNotes={app.adminNotes ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
