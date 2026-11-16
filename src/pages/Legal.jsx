import InfoPage from "../components/InfoPage";
import { useSeo } from "../hooks/useSeo";

const UPDATED = "10 November 2026";
const h2 = "font-headline-sm text-headline-sm font-bold text-on-surface mt-8 mb-2";
const p = "text-on-surface-variant leading-relaxed";
const ul = "list-disc pl-5 space-y-1.5 text-on-surface-variant";

const Business = () => (
  <>MM Kitchen World (GLEN Exclusive Store), No. MIG-45, KHB Colony 2nd Stage, Basaveshwara Nagar, Bangalore - 560079 (GSTIN 29BYFPK5802C1ZM), email <a className="text-primary underline" href="mailto:mmkitchenworld.glen@gmail.com">mmkitchenworld.glen@gmail.com</a>, phone +91 97432 33729 / +91 96630 78780.</>
);

export function Privacy() {
  useSeo({ title: "Privacy Policy", description: "How MM Kitchen World collects, uses and protects your information." });
  return (
    <InfoPage eyebrow="Legal" title="Privacy Policy" intro={`Last updated: ${UPDATED}`}>
      <p className={p}>This policy explains what information this website collects and how we use it. The website is operated by <Business /></p>

      <h2 className={h2}>What we collect</h2>
      <ul className={ul}>
        <li><strong>Enquiry taps.</strong> When you tap a WhatsApp or enquiry button, we record which product and button it was, without your name, number or any other personal detail.</li>
        <li><strong>Your saved list and comparison.</strong> "My List" and "Compare" are saved in your own browser and are not sent to us until you choose to message us.</li>
        <li><strong>Website analytics.</strong> If enabled, we may use Google Analytics with IP anonymisation to understand which pages are visited. This uses cookies set by Google.</li>
      </ul>

      <h2 className={h2}>How we use it</h2>
      <p className={p}>We use enquiry and analytics data only to improve the website and the products we stock. We do not sell your information.</p>

      <h2 className={h2}>WhatsApp and third parties</h2>
      <p className={p}>When you message us on WhatsApp, the conversation is handled by WhatsApp under its own terms and privacy policy. Links to Google Maps, Instagram and our Google Business Profile open services run by those companies.</p>

      <h2 className={h2}>Your choices</h2>
      <p className={p}>You can ask us to see, correct or delete the information we hold about you by contacting us using the details above.</p>

      <h2 className={h2}>Changes</h2>
      <p className={p}>We may update this policy from time to time. The date at the top shows when it was last changed.</p>
    </InfoPage>
  );
}

export function Terms() {
  useSeo({ title: "Terms of Service", description: "Terms for using the MM Kitchen World website." });
  return (
    <InfoPage eyebrow="Legal" title="Terms of Service" intro={`Last updated: ${UPDATED}`}>
      <p className={p}>By using this website you agree to these terms. The website is operated by <Business /></p>

      <h2 className={h2}>About this website</h2>
      <p className={p}>This website is an online catalogue of GLEN appliances available at our showroom. It is not an online shop: you cannot place or pay for an order here. Purchases are agreed with our team in person, by phone or on WhatsApp.</p>

      <h2 className={h2}>Product information and prices</h2>
      <ul className={ul}>
        <li>We take care to keep specifications, images and prices accurate, but they come from the manufacturer's catalogue and may change without notice. Photos are for illustration.</li>
        <li>Prices and offers shown are subject to change and availability. The price confirmed by our team at the time of purchase applies.</li>
        <li>Offers are valid for the dates shown and while stock lasts.</li>
      </ul>

      <h2 className={h2}>Enquiries are not orders</h2>
      <p className={p}>Messaging us, saving a product to My List or calling us is an enquiry only. A sale is made only when we confirm the product, price and terms with you.</p>

      <h2 className={h2}>Warranty</h2>
      <p className={p}>Warranty on GLEN products is provided by the manufacturer on its own terms. Ask our team for the warranty details for your model.</p>

      <h2 className={h2}>Brands and content</h2>
      <p className={p}>GLEN and other brand names, logos and product images belong to their respective owners and are used here to describe the products we sell. Please do not copy this website's content without our permission.</p>

      <h2 className={h2}>Limitation</h2>
      <p className={p}>We provide this website "as is" and are not liable for losses arising from reliance on the information on it, to the extent permitted by law. Guidance tools such as the chimney size guide give general suggestions only.</p>

      <h2 className={h2}>Governing law</h2>
      <p className={p}>These terms are governed by the laws of India.</p>
    </InfoPage>
  );
}
