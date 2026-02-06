import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BorderlessPress. All rights
            reserved.
          </p>
          <nav className="flex gap-6">
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-brand-charcoal"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-500 hover:text-brand-charcoal"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-brand-charcoal"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-brand-charcoal"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
