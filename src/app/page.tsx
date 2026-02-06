import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-charcoal text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Help newcomers feel at home
            <br />
            <span className="text-blue-300">anywhere in the world.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            BorderlessPress creates open-access relocation guides for people
            moving to new countries. We&apos;re looking for editors and
            contributors with lived experience to join our team.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/apply">
              <Button size="lg">Apply to Contribute</Button>
            </Link>
            <Link href="/guides">
              <Button variant="outline" size="lg">
                View Guides in Progress
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-brand-charcoal sm:text-3xl">
            Why contribute to BorderlessPress?
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Real impact",
                description:
                  "Your knowledge helps thousands of people navigate one of the biggest transitions of their lives.",
              },
              {
                title: "Build your portfolio",
                description:
                  "Gain published editorial credits on professional, widely-used guides.",
              },
              {
                title: "Flexible commitment",
                description:
                  "Contribute on your own schedule. We work asynchronously and respect your time.",
              },
              {
                title: "Grow your skills",
                description:
                  "Sharpen your writing, editing, research, and collaboration skills with a supportive team.",
              },
              {
                title: "Join a global community",
                description:
                  "Work alongside contributors from around the world who share your passion for helping newcomers.",
              },
              {
                title: "Open access mission",
                description:
                  "Everything we publish is free and open. Your work reaches people who need it most.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-brand-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-charcoal sm:text-3xl">
            Ready to make a difference?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Check our qualifications, see how the process works, then apply to
            join the team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/qualifications">
              <Button variant="secondary">View Qualifications</Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="secondary">How It Works</Button>
            </Link>
            <Link href="/apply">
              <Button>Apply Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
