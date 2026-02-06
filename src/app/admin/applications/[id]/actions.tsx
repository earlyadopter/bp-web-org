"use client";

import { useState } from "react";
import { updateApplicationStatus } from "@/actions/applications";
import { Button } from "@/components/ui/button";

interface ApplicationActionsProps {
  applicationId: string;
  currentStatus: string;
  currentNotes: string;
}

export function ApplicationActions({
  applicationId,
  currentStatus,
  currentNotes,
}: ApplicationActionsProps) {
  const [notes, setNotes] = useState(currentNotes);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");

  const handleAction = async (
    status: "approved" | "rejected" | "info_requested" | "pending"
  ) => {
    setIsPending(true);
    setMessage("");
    const result = await updateApplicationStatus(applicationId, status, notes);
    setMessage(result.message || "");
    setIsPending(false);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="font-semibold text-brand-charcoal">Actions</h2>

      {message && (
        <div className="mt-3 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
          {message}
        </div>
      )}

      <div className="mt-4">
        <label
          htmlFor="adminNotes"
          className="block text-sm font-medium text-gray-700"
        >
          Admin Notes
        </label>
        <textarea
          id="adminNotes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent"
          placeholder="Internal notes about this application..."
        />
      </div>

      <div className="mt-4 space-y-2">
        {currentStatus !== "approved" && (
          <Button
            onClick={() => handleAction("approved")}
            disabled={isPending}
            className="w-full bg-brand-success hover:bg-green-700"
          >
            Approve
          </Button>
        )}
        {currentStatus !== "rejected" && (
          <Button
            onClick={() => handleAction("rejected")}
            disabled={isPending}
            variant="danger"
            className="w-full"
          >
            Reject
          </Button>
        )}
        {currentStatus !== "info_requested" && (
          <Button
            onClick={() => handleAction("info_requested")}
            disabled={isPending}
            variant="secondary"
            className="w-full"
          >
            Request Info
          </Button>
        )}
        {currentStatus !== "pending" && (
          <Button
            onClick={() => handleAction("pending")}
            disabled={isPending}
            variant="ghost"
            className="w-full"
          >
            Reset to Pending
          </Button>
        )}
      </div>
    </div>
  );
}
