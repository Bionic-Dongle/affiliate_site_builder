import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useState } from "react";
import { useTemplate } from "@/contexts/TemplateContext";
import TypographyStyles from "@/components/TypographyStyles";

const Privacy = () => {
  const { config } = useTemplate();
  const [contactEmail] = useState("contact@peakreviews.com"); // Will come from config later
  const [effectiveDate] = useState("January 1, 2025"); // Will come from config later

  return (
    <div className="min-h-screen flex flex-col">
      <TypographyStyles />
      {config.navbar?.enabled && (
        <Navbar
          siteName={config.navbar.siteName}
          logoType={config.navbar.logoType}
          logoImage={config.navbar.logoImage}
          navItems={config.navbar.navItems}
          showSearch={config.navbar.showSearch}
        />
      )}

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            Effective Date: {effectiveDate}
          </p>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to {config.navbar?.siteName}. We respect your privacy and are committed to protecting your personal data.
                This privacy policy will inform you about how we handle your personal data when you visit our website 
                and tell you about your privacy rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> First name, last name, username or similar identifier</li>
                <li><strong>Contact Data:</strong> Email address and telephone numbers</li>
                <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting, 
                browser plug-in types and versions, operating system and platform</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, products and services</li>
                <li><strong>Marketing and Communications Data:</strong> Your preferences in receiving marketing from us 
                and your communication preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
              <p>We use your personal data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
                <li>To provide you with news, special offers and general information about other goods, 
                services and events which we offer (unless you have opted not to receive such information)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
                Cookies are files with small amounts of data which may include an anonymous unique identifier.
              </p>
              <p className="mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
              <p className="mt-4">We use the following types of cookies:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the operation of our website</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements to you</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Third-Party Services</h2>
              <p>We may employ third-party companies and individuals to facilitate our service, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> To analyze website traffic and usage</li>
                <li><strong>Advertising Networks:</strong> To display relevant advertisements</li>
                <li><strong>Email Service Providers:</strong> To send newsletters and communications</li>
                <li><strong>Affiliate Networks:</strong> To track and manage affiliate partnerships</li>
              </ul>
              <p className="mt-4">
                These third parties have access to your personal data only to perform these tasks on our behalf 
                and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Affiliate Disclosure and Data</h2>
              <p>
                As an affiliate marketing website, we participate in various affiliate programs. When you click on 
                affiliate links and make purchases, we may receive a commission. This does not affect the price you pay.
              </p>
              <p className="mt-4">
                We may collect data about which affiliate links you click on to help us understand user preferences 
                and improve our recommendations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Data Security</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet 
                or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to 
                protect your personal data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Your Rights</h2>
              <p>Under data protection law, you have rights including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Your right of access:</strong> You have the right to ask us for copies of your personal information</li>
                <li><strong>Your right to rectification:</strong> You have the right to ask us to rectify information you think is inaccurate</li>
                <li><strong>Your right to erasure:</strong> You have the right to ask us to erase your personal information in certain circumstances</li>
                <li><strong>Your right to restriction of processing:</strong> You have the right to ask us to restrict the processing of your information</li>
                <li><strong>Your right to object to processing:</strong> You have the right to object to the processing of your personal data</li>
                <li><strong>Your right to data portability:</strong> You have the right to ask that we transfer the information you gave us to another organization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Children's Privacy</h2>
              <p>
                Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable 
                information from children under 13. If you are a parent or guardian and you are aware that your child has 
                provided us with personal data, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
              <p className="mt-4">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy 
                are effective when they are posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
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

export default Privacy;
