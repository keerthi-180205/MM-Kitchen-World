import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import InfoPage from "../components/InfoPage";
import { WhatsAppIcon } from "../components/BrandIcons";
import { whatsappUrl } from "../constants";
import { useSeo } from "../hooks/useSeo";

const FAQS = [
  {
    q: "Are the appliances genuine GLEN products?",
    a: "Yes. MM Kitchen World is a GLEN Exclusive Store, and every model on this website comes from GLEN's own product catalogue.",
  },
  {
    q: "What warranty do I get?",
    a: "Products carry GLEN's manufacturer warranty. The period depends on the model (for example, some chimneys list 7 years on the motor) and is shown on each product page. Please ask us to confirm the exact warranty terms for your model when you buy.",
  },
  {
    q: "Do you help with installation?",
    a: "Yes. Our team can guide you on fitting, ducting and installation. Message us your kitchen layout on WhatsApp and we'll explain what's needed before you buy.",
  },
  {
    q: "How do I find out the price?",
    a: "Prices change, so we share today's store price on request. Tap Enquire on any product to message us on WhatsApp, or request a call back. Models with a current offer show the offer price right on the card.",
  },
  {
    q: "Can I see the appliances before buying?",
    a: "Absolutely. Visit our showroom in Basaveshwara Nagar any day between 10:30 AM and 8:30 PM (open all days) to see and compare models in person.",
  },
  {
    q: "Do you take bulk orders or corporate gifting?",
    a: "Yes. For builders, interior designers, offices and gifting, message or call us and we'll share suitable options and special rates.",
  },
  {
    q: "Do you sell anything besides GLEN chimneys, hobs and ovens?",
    a: "Our showroom also carries cooktops, OTGs, cooking ranges, sinks, cookware, small appliances and water heaters. Ask us what's currently available.",
  },
  {
    q: "How do I get service or make a warranty claim?",
    a: "Call or message us with your product's model number and purchase invoice, and we'll guide you on the next step.",
  },
  {
    q: "Where are you located?",
    a: "No. MIG-45, KHB Colony 2nd Stage, Basaveshwara Nagar, Bangalore - 560079. You can call us on +91 97432 33729 or +91 96630 78780.",
  },
];

export default function Faq() {
  useSeo({
    title: "FAQ, Warranty & Service",
    description: "Answers about GLEN warranty, installation, prices, showroom visits and bulk orders at MM Kitchen World, Basaveshwara Nagar, Bangalore.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  });

  return (
    <InfoPage eyebrow="Help" title="FAQ, Warranty & Service" intro="Quick answers to what customers ask us most. Can't find yours? Message us and we'll help.">
      <div className="space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="group rounded-xl border border-outline-variant bg-surface-container-lowest open:shadow-sm">
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 font-semibold text-on-surface">
              {f.q}
              <Icon name="expand_more" className="text-xl text-primary transition-transform group-open:rotate-180 shrink-0" />
            </summary>
            <p className="px-5 pb-5 -mt-1 text-on-surface-variant">{f.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-10 rounded-2xl bg-surface-container-low border border-outline-variant p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-on-surface">Still have a question?</h2>
          <p className="text-sm text-on-surface-variant">We reply on WhatsApp during showroom hours.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={whatsappUrl("Hello MM Kitchen World, I have a question.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-tertiary text-white font-bold shadow-sm hover:brightness-105">
            <span className="[&_svg]:w-5 [&_svg]:h-5"><WhatsAppIcon /></span> Chat on WhatsApp
          </a>
          <Link to="/#callback" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-outline-variant text-primary font-bold hover:bg-white">Request a call back</Link>
        </div>
      </div>
    </InfoPage>
  );
}
