"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { submitApplication, type FormState } from "@/actions/applications";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Guide } from "@/lib/db/schema";

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "Australia",
  "Netherlands",
  "France",
  "Spain",
  "Japan",
  "New Zealand",
  "Other",
];

const FAMILIARITY_OPTIONS = [
  { value: "none", label: "None — I've never used it" },
  { value: "basic", label: "Basic — I know the basics" },
  { value: "comfortable", label: "Comfortable — I use it regularly" },
  { value: "expert", label: "Expert — I could teach others" },
];

interface ApplicationFormProps {
  guides: Guide[];
}

export function ApplicationForm({ guides }: ApplicationFormProps) {
  const router = useRouter();
  const [background, setBackground] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const initialState: FormState = { success: false };
  const [state, formAction, isPending] = useActionState(
    submitApplication,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push("/apply/success");
    }
  }, [state.success, router]);

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  return (
    <form action={formAction} className="space-y-6">
      {state.message && !state.success && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-brand-error">
          {state.message}
        </div>
      )}

      <Input
        id="name"
        name="name"
        label="Full name *"
        placeholder="Your full name"
        required
        error={state.errors?.name?.[0]}
      />

      <Input
        id="email"
        name="email"
        label="Email address *"
        type="email"
        placeholder="you@example.com"
        required
        error={state.errors?.email?.[0]}
      />

      {/* Countries multi-select as checkboxes */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Countries you have lived in or have deep knowledge of *
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {COUNTRIES.map((country) => (
            <label
              key={country}
              className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
                selectedCountries.includes(country)
                  ? "border-brand-accent bg-brand-accent-light text-brand-accent"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                type="checkbox"
                name="countries"
                value={country}
                checked={selectedCountries.includes(country)}
                onChange={() => toggleCountry(country)}
                className="sr-only"
              />
              {country}
            </label>
          ))}
        </div>
        {state.errors?.countries && (
          <p className="mt-1 text-sm text-brand-error">
            {state.errors.countries[0]}
          </p>
        )}
      </div>

      <Input
        id="languages"
        name="languages"
        label="Languages you speak *"
        placeholder="e.g., English (native), Spanish (fluent), French (conversational)"
        required
        error={state.errors?.languages?.[0]}
      />

      {/* Interested guides */}
      {guides.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Which guides are you interested in contributing to?
          </label>
          <div className="mt-2 space-y-2">
            {guides.map((guide) => (
              <label
                key={guide.id}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  name="interestedGuideIds"
                  value={guide.id}
                  className="rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
                />
                {guide.title}
              </label>
            ))}
          </div>
        </div>
      )}

      <Input
        id="proposeNewGuide"
        name="proposeNewGuide"
        label="Propose a new guide (optional)"
        placeholder="e.g., The Borderless Guide to Living in South Korea"
      />

      <Textarea
        id="background"
        name="background"
        label="Tell us about your background *"
        placeholder="Describe your experience living abroad, your writing background, and why you want to contribute..."
        rows={6}
        required
        value={background}
        onChange={(e) => setBackground(e.target.value)}
        charCount={background.length}
        maxChars={2000}
        error={state.errors?.background?.[0]}
      />

      <Select
        id="markdownFamiliarity"
        name="markdownFamiliarity"
        label="Markdown familiarity *"
        options={FAMILIARITY_OPTIONS}
        placeholder="Select your familiarity level"
        defaultValue=""
        required
        error={state.errors?.markdownFamiliarity?.[0]}
      />

      <Select
        id="githubFamiliarity"
        name="githubFamiliarity"
        label="GitHub familiarity *"
        options={FAMILIARITY_OPTIONS}
        placeholder="Select your familiarity level"
        defaultValue=""
        required
        error={state.errors?.githubFamiliarity?.[0]}
      />

      <div className="pt-4">
        <Button type="submit" size="lg" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
  );
}
