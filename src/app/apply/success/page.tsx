import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Application Submitted",
  description: "Your application has been received.",
};

export default function ApplySuccessPage() {
  return (
    <>
      <PageHeader title="Application Submitted!" />
      <div className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6 lg:px-8">
        <div className="rounded-lg border border-green-200 bg-green-50 p-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-green-800">
            Thank you for applying!
          </h2>
          <p className="mt-3 text-green-700">
            We&apos;ve received your application and will review it within a few
            days. You&apos;ll hear back from us via email.
          </p>
        </div>

        <div className="mt-8">
          <Link href="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
