import type { Project } from "@/lib/content";

export const PROJECT_INDEX_FILTERS = [
  {
    key: "all",
    label: "All work",
    // "autobreeze" was already listed under "enterprises" but absent from
    // "All work" — the more visible inconsistency, since that tab's name
    // promises every project on show. Added here.
    //
    // "vedic-group" is deliberately absent from every group in this file,
    // at the client's explicit instruction ("dont add vedic group"). It
    // still lives in content/projects/index.ts and still passes the
    // publication gate — this page's curation is what excludes it, so
    // re-listing the slug here is all that's needed to bring it back.
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
      "autobreeze",
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
