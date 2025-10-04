import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useState } from "react";

const AffiliateDisclaimer = () => {
  const [siteName] = useState("Peak Reviews"); // Will come from config later
  const [contactEmail] = useState("contact@peakreviews.com"); // Will come from config later
  const [effectiveDate] = useState("January 1, 2025"); // Will come from config later

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        siteName={siteName}
        navItems={[
          { label: "Home", path: "/" },
          { label: "Blog", path: "/blog" },
        ]}
        showSearch={true}
      />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Affiliate Disclaimer</h1>
          <p className="text-muted-foreground mb-8">
            Last Updated: {effectiveDate}
          </p>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">FTC Disclosure</h2>
              <p>
                In accordance with the Federal Trade Commission (FTC) guidelines, we want to be completely transparent about our 
                affiliate relationships and how we earn revenue from this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">What Are Affiliate Links?</h2>
              <p>
                {siteName} participates in various affiliate marketing programs. This means that when you click on certain links on 
                our website and make a purchase, we may receive a commission from the merchant at no additional cost to you.
              </p>
              <p className="mt-4">
                These affiliate links help support our website and allow us to continue providing free, high-quality content and 
                product reviews to our readers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Our Affiliate Partnerships</h2>
              <p>
                We maintain affiliate relationships with various companies and merchants, which may include but are not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Amazon Associates Program</li>
                <li>ShareASale</li>
                <li>Commission Junction (CJ)</li>
                <li>Impact Radius</li>
                <li>Individual brand affiliate programs</li>
                <li>Other affiliate networks and programs</li>
              </ul>
              <p className="mt-4">
                When you click on an affiliate link and make a purchase, the merchant pays us a small commission. This commission 
                varies by product and merchant, but it never affects the price you pay.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment to You</h2>
              <p>
                While we do earn commissions from affiliate links, this does not influence our editorial content, product reviews, 
                or recommendations. We are committed to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Honest Reviews:</strong> All product reviews reflect our genuine opinions and experiences</li>
                <li><strong>Editorial Independence:</strong> Our content decisions are not influenced by potential commission earnings</li>
                <li><strong>Transparency:</strong> We clearly disclose our affiliate relationships and how we earn revenue</li>
                <li><strong>Value First:</strong> We only recommend products we believe will provide value to our readers</li>
                <li><strong>Accuracy:</strong> We strive to provide accurate, up-to-date information about products and prices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">How We Choose Products to Review</h2>
              <p>
                Our product selection and review process is based on several factors:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reader interest and requests</li>
                <li>Product quality and reputation</li>
                <li>Market popularity and trends</li>
                <li>Value for money</li>
                <li>Innovation and unique features</li>
              </ul>
              <p className="mt-4">
                We do NOT base our product selection solely on commission rates. A product offering a higher commission does not 
                automatically receive a better review or more prominent placement on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Price and Availability</h2>
              <p>
                Please note that product prices, availability, and specifications can change without notice. While we make every effort 
                to keep our content up-to-date, we cannot guarantee that the information displayed on our website reflects the most 
                current pricing or availability on merchant websites.
              </p>
              <p className="mt-4">
                We recommend verifying all product details, prices, and availability directly with the merchant before making a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Amazon Associates Disclosure</h2>
              <p>
                {siteName} is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to 
                provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
              </p>
              <p className="mt-4">
                As an Amazon Associate, we earn from qualifying purchases made through our Amazon affiliate links.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">No Guarantees</h2>
              <p>
                While we conduct thorough research and testing when possible, we cannot guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>That a product will meet your specific needs or expectations</li>
                <li>That you will achieve the same results as described in our reviews</li>
                <li>That product features or specifications won't change after our review</li>
                <li>That merchants will honor their advertised prices or promotions</li>
              </ul>
              <p className="mt-4">
                Individual experiences with products may vary based on many factors including personal preferences, usage patterns, 
                and individual circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Your Responsibility</h2>
              <p>
                Before making any purchase decision, we encourage you to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conduct your own research and due diligence</li>
                <li>Read multiple reviews from various sources</li>
                <li>Check current prices and availability with merchants</li>
                <li>Review merchant return policies and warranties</li>
                <li>Consider your personal needs and budget</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Updates to This Disclosure</h2>
              <p>
                We may update this affiliate disclosure from time to time to reflect changes in our affiliate partnerships or to comply 
                with legal requirements. We encourage you to review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Questions?</h2>
              <p>
                If you have any questions about our affiliate relationships, commission structure, or how we select and review products, 
                please don't hesitate to contact us.
              </p>
              <p className="mt-4">
                Email: <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>
              </p>
              <p className="mt-4">
                Thank you for supporting {siteName} and allowing us to continue providing valuable content and honest product reviews.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AffiliateDisclaimer;
