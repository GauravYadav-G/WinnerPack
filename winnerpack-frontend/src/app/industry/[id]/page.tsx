import IndustryDetailClient from "./IndustryDetailClient";
import { industryVerticals } from "@/data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const industry = industryVerticals.find((ind) => ind.id === id);

  if (!industry) {
    return {
      title: "Industry Applications | Winner Pack Technologies",
      description: "Industrial B2B packaging solutions tailored for Indian manufacturing plants.",
    };
  }

  return {
    title: `${industry.name} Packaging Solutions | Winner Pack Tech`,
    description: `${industry.heroHeadline}. Explore recommended packaging materials, buyer outcomes, and technical spec sheets.`,
  };
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <IndustryDetailClient params={params} />;
}
