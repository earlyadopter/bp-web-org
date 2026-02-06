import { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Applications",
};

const statusTabs = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "info_requested", label: "Info Requested" },
];

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

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: filterStatus } = await searchParams;

  const db = getDb();
  const allApplications = await db
    .select()
    .from(applications)
    .orderBy(desc(applications.createdAt));

  const filtered =
    filterStatus && filterStatus !== "all"
      ? allApplications.filter((a) => a.status === filterStatus)
      : allApplications;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-charcoal">Applications</h1>

      {/* Filter tabs */}
      <div className="mt-4 flex gap-2 border-b border-gray-200">
        {statusTabs.map((tab) => (
          <Link
            key={tab.value}
            href={`/admin/applications${tab.value === "all" ? "" : `?status=${tab.value}`}`}
            className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              (filterStatus || "all") === tab.value
                ? "border-brand-accent text-brand-accent"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            {tab.label}
            {tab.value === "all" && (
              <span className="ml-1 text-xs text-gray-400">
                ({allApplications.length})
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Applications list */}
      <div className="mt-6">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No applications found.
          </p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Countries
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="font-medium text-brand-accent hover:underline"
                      >
                        {app.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {app.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {app.countries.join(", ")}
                    </td>
                    <td className="px-6 py-4">{statusBadge(app.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {app.createdAt.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
