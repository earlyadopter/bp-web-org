import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { guides, users } from "./schema";

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log("🌱 Seeding database...");

  // Seed admin user
  await db
    .insert(users)
    .values({
      name: "Yuri",
      email: "yuri@borderlesspress.org",
      role: "admin",
    })
    .onConflictDoNothing();

  console.log("✓ Admin user seeded");

  // Seed guides
  const guideData = [
    {
      title: "The Borderless Guide to Living in the United States",
      slug: "united-states",
      country: "United States",
      status: "published" as const,
      description:
        "A comprehensive guide covering immigration, housing, healthcare, banking, education, and daily life in the US.",
    },
    {
      title: "The Borderless Guide to Living in Canada",
      slug: "canada",
      country: "Canada",
      status: "in_development" as const,
      description:
        "Practical guide to immigration, settlement, and thriving in Canada.",
    },
    {
      title: "The Borderless Guide to Living in the United Kingdom",
      slug: "united-kingdom",
      country: "United Kingdom",
      status: "in_development" as const,
      description:
        "Everything you need to know about visas, housing, NHS, and British daily life.",
    },
    {
      title: "The Borderless Guide to Living in Germany",
      slug: "germany",
      country: "Germany",
      status: "in_development" as const,
      description:
        "Navigate Anmeldung, health insurance, work permits, and German bureaucracy.",
    },
    {
      title: "The Borderless Guide to Living in Australia",
      slug: "australia",
      country: "Australia",
      status: "in_development" as const,
      description:
        "From visas to vegemite — your guide to settling in Australia.",
    },
    {
      title: "The Borderless Guide to Living in the Netherlands",
      slug: "netherlands",
      country: "Netherlands",
      status: "in_development" as const,
      description:
        "BSN numbers, housing markets, Dutch culture, and more.",
    },
    {
      title: "The Borderless Guide to Living in France",
      slug: "france",
      country: "France",
      status: "in_development" as const,
      description:
        "Carte de séjour, social security, and settling into French life.",
    },
    {
      title: "The Borderless Guide to Living in Spain",
      slug: "spain",
      country: "Spain",
      status: "in_development" as const,
      description:
        "NIE, empadronamiento, healthcare, and daily life in Spain.",
    },
    {
      title: "The Borderless Guide to Living in Japan",
      slug: "japan",
      country: "Japan",
      status: "in_development" as const,
      description:
        "Residence cards, ward offices, cultural nuances, and life in Japan.",
    },
    {
      title: "The Borderless Guide to Living in New Zealand",
      slug: "new-zealand",
      country: "New Zealand",
      status: "in_development" as const,
      description:
        "Immigration pathways, Kiwi life, healthcare, and settlement tips.",
    },
  ];

  await db.insert(guides).values(guideData).onConflictDoNothing();

  console.log("✓ Guides seeded");
  console.log("🎉 Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
