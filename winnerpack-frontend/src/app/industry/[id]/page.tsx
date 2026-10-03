import IndustryDetailClient from "./IndustryDetailClient";
import { industryVerticals } from "@/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const industry = industryVerticals.find((ind) => ind.id === id);

  if (!industry) {
    return {
      title: "Industry Applications | Winner Pack Technologies",
      description: "Industrial B2B packaging solutions tailored for Indian manufacturing plants.",
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    title: `${industry.name} Packaging Solutions | Winner Pack Tech`,
    description: `${industry.heroHeadline}. Explore recommended packaging materials, buyer outcomes, and technical spec sheets.`,
    path: `/industry/${industry.id}`,
    image: industry.image,
  });
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!industryVerticals.some((industry) => industry.id === id)) notFound();

  return <IndustryDetailClient params={params} />;
}
