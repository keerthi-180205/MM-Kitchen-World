import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/storefront/Hero";
import Categories from "../components/storefront/Categories";
import Catalogue from "../components/storefront/Catalogue";
import Installations from "../components/storefront/Installations";
import WhyGlen from "../components/storefront/WhyGlen";
import Showroom from "../components/storefront/Showroom";
import ContactSection from "../components/storefront/ContactSection";
import SpecialOffers from "../components/storefront/SpecialOffers";
import Reveal from "../components/Reveal";
import { GMB_URL, normalizeCategory } from "../constants";
import { useSeo } from "../hooks/useSeo";

const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  name: "MM Kitchen World",
  alternateName: "MM Kitchen World - GLEN Exclusive Store",
  description: "GLEN Exclusive Store in Basaveshwara Nagar, Bangalore: chimneys, gas stoves, hobs, geysers, sinks, ovens, microwaves, water heaters, dishwashers, cooking range and small appliances.",
  telephone: ["+91 97432 33729", "+91 96630 78780"],
  email: "mmkitchenworld.glen@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. MIG-45, KHB Colony, 2nd Stage, Basaveshwara Nagar",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560079",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 12.9869979, longitude: 77.5375902 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:30",
      closes: "20:30",
    },
  ],
  hasMap: GMB_URL,
  sameAs: [GMB_URL, "https://www.instagram.com/mmkitchenworld.glenchimneyshop"],
};

export default function Storefront() {
  const [params, setParams] = useSearchParams();
  const rawRequested = params.get("category");
  const [activeCategory, setActiveCategory] = useState(normalizeCategory(rawRequested) || "ALL");

  // Keep active category in sync with URL search params
  useEffect(() => {
    setActiveCategory(normalizeCategory(rawRequested) || "ALL");
  }, [rawRequested]);

  const handleSelectCategory = (cat) => {
    setActiveCategory(cat);
    const newParams = new URLSearchParams(params);
    if (cat === "ALL") {
      newParams.delete("category");
    } else {
      newParams.set("category", cat);
    }
    setParams(newParams, { replace: true });
  };

  useSeo({
    jsonLd: LOCAL_BUSINESS,
    description:
      "Shop 283+ genuine GLEN chimneys, gas stoves, hobs, water heaters, sinks, ovens, microwaves, dishwashers, cooking range and small appliances at MM Kitchen World, the GLEN Exclusive Store in Basaveshwara Nagar, Bangalore. See them live or enquire on WhatsApp.",
  });

  return (
    <>
      <Hero />
      <Reveal>
        <Categories onSelectCategory={handleSelectCategory} />
      </Reveal>
      <Reveal>
        <SpecialOffers />
      </Reveal>
      <Reveal>
        <Catalogue activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />
      </Reveal>
      <Reveal>
        <Installations />
      </Reveal>
      <Reveal>
        <WhyGlen />
      </Reveal>
      <Reveal>
        <Showroom />
      </Reveal>
      <Reveal>
        <ContactSection />
      </Reveal>
    </>
  );
}
