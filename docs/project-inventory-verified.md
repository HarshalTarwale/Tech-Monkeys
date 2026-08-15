# Project inventory — verified against live deployments

Checked 2026-08-15. The client inventory (`techmonkeys-project-inventory.md`)
stated repos have "no homepage URLs set" and marked nearly every live URL
`TODO(client)`. That is **not** the case: 30 of 34 repos have a homepage set,
and 25 resolve HTTP 200. Titles and meta descriptions were read from the live
pages, which settles several open questions in that document.

## Corrections to the client inventory

| Inventory claim | Verified reality |
|---|---|
| "Live URLs are mostly unknown / TODO(client)" | 25 live URLs confirmed HTTP 200 |
| Continental URL "confirmed" | `continentalpremiumproperties.ae` does NOT resolve; the Vercel deploy does |
| Lumina may duplicate OnlineBlinds | Different products. Lumina = USA single-product DTC; OnlineBlinds = made-to-measure retailer |
| `B2B-Blinds` = generic B2B OMS | Real client: **Hyde Park Wood Ltd** trade portal |
| Fixnex "scope unclear, README one line" | **fixnex.ae** — live domain. AI maintenance platform |
| Cloak "scope unclear" | Digital cloakroom: QR ticketing + venue ops |
| Hometrack = PropTech | **hometrack.ae** — wealth management |
| Category 05 AI & Automation = NULL | **Not null.** FixNex ships AI booking, predictive analytics, IoT |
| ARK / Da-reality names | "ARK Vision", "Da Realty" (per live titles) |
| Priceless Blinds = generic | Dublin, Ireland market |
| Skyran "unconfirmed" | Live: "SKYRAN - Dubai's Premier Real Estate" |

## Verified live projects

| Project | Live URL | Sector | Category |
|---|---|---|---|
| Continental Premium Properties | continental-properties.vercel.app | Real estate UAE | Web |
| Sartawi Properties | sartawi-realestate-eosin.vercel.app | Real estate | Web |
| ARK Vision | ark-realestate.vercel.app | Real estate Dubai | Web |
| Da Realty | da-reality.vercel.app | Real estate Dubai | Web |
| SKYRAN | skyran-amber.vercel.app | Real estate Dubai | Web |
| Credence Realtor | credence-realtor.vercel.app | Real estate Dubai | Web |
| DMD Properties | dmd-properties-real-estate.vercel.app | Real estate | Web |
| Hometrack | **hometrack.ae** | Wealth management | Web |
| Pacific Pearl Hotels | pacific-pearl-hotels.vercel.app | Hospitality | Web |
| AutoBreeze | autobreezecarrental.vercel.app | Car rental | Web |
| Vedic Group of Institutions | harshaltarwale.github.io/Vedic-… | Education | Web |
| Enabled NGO | enabled-ngo.vercel.app | Nonprofit | Web |
| MindForge | mindforge-marketing.vercel.app | Marketing | Web |
| Copilot Labs | copilot-labs.vercel.app | Technology | Web |
| OnlineBlinds | online-blinds-express.vercel.app | Retail | E-commerce |
| Priceless Blinds | priceless-blinds.vercel.app | Retail (Dublin) | E-commerce |
| YourNextBlinds | yournextblinds-frontend.vercel.app | Retail | E-commerce |
| Lumina | lumina-eta-nine.vercel.app | DTC USA | E-commerce |
| NeuroHolistic | neuro-holistic.vercel.app | Wellness (Stripe) | E-commerce |
| Hyde Park Wood (B2B Blinds) | b2-b-blinds.vercel.app | Trade portal | Platform |
| Saabri | saabri-dun.vercel.app | CRM | Platform |
| Taldo | taldo-eta.vercel.app | Recruitment | Platform |
| Cloak | cloak-bice.vercel.app | Venue ops | Platform |
| **FixNex** | **fixnex.ae** | PropTech | AI / Platform |

## Dead — do not publish

`nexus`, `partyfud-frontend`, `enabled`, `enabled-ngo` → 404.
`Zaak` (Flutter) — default scaffold README, no deployment. Mobile remains thin;
confirm with client before claiming Mobile App Development as a headline service.

## Still needed from client

Client-name permission, outcome sentence, year, and cover image per project.
