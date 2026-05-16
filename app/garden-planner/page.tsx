import type { Metadata } from "next";
import GardenPlannerClient from "@/components/GardenPlannerClient";

export const metadata: Metadata = {
  title: "Hummingbird Garden Planner – Plant Finder, Bloom Calendar & Layout Tool",
  description: "Design the perfect hummingbird garden with our interactive planner. Filter plants by USDA zone, bloom month, sun and water needs. Build a bloom calendar and visualize your garden layout.",
  keywords: ["hummingbird garden","hummingbird plants","what flowers attract hummingbirds","USDA zone plants","hummingbird garden planner","bloom calendar","pollinator garden","native hummingbird plants"],
  alternates: { canonical: "https://hummingbirdwatcher.com/garden-planner" },
};

export default function GardenPlannerPage() {
  return <GardenPlannerClient />;
}
