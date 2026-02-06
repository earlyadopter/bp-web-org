import { Metadata } from "next";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-center text-2xl font-bold text-brand-charcoal">
            Admin Login
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in with your admin email address.
          </p>

          <form
            className="mt-6 space-y-4"
            action={async (formData: FormData) => {
              "use server";
              const email = formData.get("email") as string;
              await signIn("email", { email, redirectTo: "/admin" });
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@borderlesspress.org"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>
            <Button type="submit" className="w-full">
              Send Magic Link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
