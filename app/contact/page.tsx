import type { Metadata } from "next";

import { ContactHero } from "@/components/sections/contact-hero";
import { ContactServices } from "@/components/sections/contact-services";
import { ContactSteps } from "@/components/sections/contact-steps";
import { Contact } from "@/components/sections/contact";
import { ServiceFaq } from "@/components/sections/service-faq";
import { SiteHeader } from "@/components/sections/site-header";
import {
  getContactPage,
  getServiceDetailSlugs,
  getServices,
  site,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Tech Monkeys what you're building. One message reaches the person who would actually build it — no account-manager layer, no sales pitch.",
};

/**
 * Dedicated /contact route. Previously "Contact" in the nav only pointed at
 * the homepage's closing `#contact` section — fine as a footer sign-off,
 * but a nav item with no page of its own gave a visitor arriving with
 * intent to reach out nowhere to land except mid-scroll on the homepage.
 *
 * `ServiceFaq` is reused as-is: its prop shape (`{question, answer}[]`)
 * already matches `content/contact.ts`'s `ContactFaq`, so this is the same
 * accordion pattern as every service page rather than a parallel one.
 *
 * Closes on the full `Contact` section (CTA + footer) rather than
 * `ServiceCta` + `Contact(showCta=false)` like /about and /projects do —
 * `ServiceCta`'s "Got a site that needs to work harder?" is the right hook
 * to pull a visitor *toward* contact from elsewhere, but redundant on the
 * page they already reached. `Contact`'s own "Move quickly. Build
 * something that lasts." CTA closes it out instead.
 *
 * `ctaHref` is overridden to a direct mailto here: `Contact`'s default
 * sends every other page to /contact, but a visitor already on /contact
 * who scrolled past the form without using it needs an actual alternative,
 * not a link back to the page they're standing on.
 */
export default function ContactPage() {
  const contact = getContactPage();

  return (
    <>
      <SiteHeader
        services={getServices()}
        serviceDetailSlugs={getServiceDetailSlugs()}
      />

      <ContactHero />
      <ContactSteps steps={contact.steps} />
      <ContactServices
        services={getServices()}
        serviceDetailSlugs={getServiceDetailSlugs()}
      />
      <ServiceFaq faqs={contact.faqs} eyebrow="Questions" />

      <Contact ctaEyebrow="Start here" ctaHref={`mailto:${site.email}`} />
    </>
  );
}
