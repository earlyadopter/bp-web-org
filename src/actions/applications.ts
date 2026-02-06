"use server";

import { getDb } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { applicationSchema } from "@/lib/validations";
import {
  sendApplicationConfirmation,
  sendNewApplicationNotification,
} from "@/lib/email";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function submitApplication(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    countries: formData.getAll("countries") as string[],
    languages: formData.get("languages") as string,
    interestedGuideIds: formData.getAll("interestedGuideIds") as string[],
    proposeNewGuide: formData.get("proposeNewGuide") as string,
    background: formData.get("background") as string,
    markdownFamiliarity: formData.get("markdownFamiliarity") as string,
    githubFamiliarity: formData.get("githubFamiliarity") as string,
  };

  const result = applicationSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
      message: "Please fix the errors below.",
    };
  }

  try {
    const db = getDb();
    await db.insert(applications).values({
      name: result.data.name,
      email: result.data.email,
      countries: result.data.countries,
      languages: result.data.languages,
      interestedGuideIds:
        result.data.interestedGuideIds &&
        result.data.interestedGuideIds.length > 0
          ? result.data.interestedGuideIds
          : null,
      proposeNewGuide: result.data.proposeNewGuide || null,
      background: result.data.background,
      markdownFamiliarity: result.data.markdownFamiliarity,
      githubFamiliarity: result.data.githubFamiliarity,
    });

    await sendApplicationConfirmation(result.data.email, result.data.name);
    await sendNewApplicationNotification(result.data.name, result.data.email);

    return { success: true, message: "Application submitted successfully!" };
  } catch (error) {
    console.error("Failed to submit application:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function updateApplicationStatus(
  applicationId: string,
  status: "pending" | "approved" | "rejected" | "info_requested",
  adminNotes?: string
): Promise<FormState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const db = getDb();
    await db
      .update(applications)
      .set({
        status,
        adminNotes: adminNotes ?? null,
        updatedAt: new Date(),
      })
      .where(eq(applications.id, applicationId));

    revalidatePath("/admin/applications");
    revalidatePath(`/admin/applications/${applicationId}`);

    return { success: true, message: `Application ${status}.` };
  } catch (error) {
    console.error("Failed to update application:", error);
    return {
      success: false,
      message: "Failed to update application status.",
    };
  }
}
