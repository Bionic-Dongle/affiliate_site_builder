import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useState } from "react";

const Terms = () => {
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
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">
            Effective Date: {effectiveDate}
          </p>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using {siteName}, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the terms of this agreement, you are not authorized to use or access this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily access the materials (information or software) on {siteName} for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this 
                license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                <li>Attempt to decompile or reverse engineer any software contained on our website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclaimer</h2>
              <p>
                The materials on {siteName} are provided on an 'as is' basis. {siteName} makes no warranties, expressed or implied, 
                and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions 
                of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="mt-4">
                Further, {siteName} does not warrant or make any representations concerning the accuracy, likely results, or reliability 
                of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Product Reviews and Recommendations</h2>
              <p>
                All product reviews, comparisons, and recommendations on {siteName} represent our honest opinions and experiences. 
                However, individual results and experiences may vary. We make no guarantees regarding the performance, quality, 
                or suitability of any products reviewed on this site.
              </p>
              <p className="mt-4">
                Users should conduct their own research and due diligence before making any purchase decisions. Product specifications, 
                prices, and availability are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Affiliate Relationships</h2>
              <p>
                {siteName} participates in various affiliate marketing programs. This means we may receive a commission when you click 
                on or make purchases via affiliate links on our website. These commissions come at no additional cost to you.
              </p>
              <p className="mt-4">
                Our affiliate relationships do not influence our editorial content or product recommendations. We maintain editorial 
                independence and only recommend products we believe will provide value to our readers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">6. User Content</h2>
              <p>
                If you submit comments, reviews, or other content to {siteName}, you grant us a non-exclusive, royalty-free, 
                perpetual, and worldwide license to use, reproduce, modify, and distribute such content.
              </p>
              <p className="mt-4">
                You represent and warrant that you own or control all rights to the content you submit and that such content does not 
                violate any third-party rights or applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Prohibited Uses</h2>
              <p>You may not use our website:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                <li>To impersonate or attempt to impersonate {siteName}, an employee, another user, or any other person or entity</li>
                <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Limitations</h2>
              <p>
                In no event shall {siteName} or its suppliers be liable for any damages (including, without limitation, damages for loss 
                of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, 
                even if {siteName} or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">9. External Links</h2>
              <p>
                {siteName} may contain links to external websites that are not provided or maintained by us. Please note that we do not 
                guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
              </p>
              <p className="mt-4">
                The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">10. Modifications</h2>
              <p>
                {siteName} may revise these terms of service at any time without notice. By using this website, you are agreeing to be 
                bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">11. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction and you 
                irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-4">
                Email: <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
