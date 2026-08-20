import type { Project } from "@/lib/content";

export const PROJECT_INDEX_FILTERS = [
  {
    key: "all",
    label: "All work",
    slugs: [
      "cloak",
      "dmd-properties",
      "onlineblinds",
      "neuroholistic",
      "skyran",
      "fixnex",
      "hometrack",
      "lumina",
      "sartawi-properties",
      "yournextblinds",
      "continental-premium-properties",
      "ark-vision",
      "taldo",
      "saabri",
      "hyde-park-wood",
      "credence-realtor",
      "da-realty",
      "copilot-labs",
      "priceless-blinds",
      "mindforge",
      "enabled",
      "pacific-pearl-hotels",
    ],
  },
  {
    key: "corporates",
    label: "Corporates",
    slugs: [
      "dmd-properties",
      "skyran",
      "hometrack",
      "continental-premium-properties",
      "sartawi-properties",
      "ark-vision",
      "saabri",
      "credence-realtor",
      "da-realty",
    ],
  },
  {
    key: "enterprises",
    label: "Enterprises",
    slugs: [
      "onlineblinds",
      "fixnex",
      "neuroholistic",
      "lumina",
      "autobreeze",
      "yournextblinds",
      "taldo",
      "hyde-park-wood",
      "copilot-labs",
      "priceless-blinds",
      "mindforge",
      "pacific-pearl-hotels",
    ],
  },
  {
    key: "startups",
    label: "Startups",
    slugs: ["cloak"],
  },
  {
    key: "non-profit",
    label: "Non-profit",
    slugs: ["enabled"],
  },
] as const;

export type ProjectIndexFilter = (typeof PROJECT_INDEX_FILTERS)[number]["key"];

export function arrangeProjectsForProjectIndex(
  projects: Project[],
  filter: ProjectIndexFilter,
): Project[] {
  const projectBySlug = new Map(projects.map((project) => [project.slug, project]));
  const group = PROJECT_INDEX_FILTERS.find((item) => item.key === filter);

  return (
    group?.slugs
      .map((slug) => projectBySlug.get(slug))
      .filter((project): project is Project => Boolean(project)) ?? []
  );
}

export function getProjectIndexFilters(projects: Project[]) {
  return PROJECT_INDEX_FILTERS.map(({ key, label }) => ({
    key,
    label,
    count: arrangeProjectsForProjectIndex(projects, key).length,
  }));
}
