import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Jupiterwardrobe",
  description: "Privacy policy for Jupiterwardrobe — how we collect, use, and protect your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="content-container py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold uppercase tracking-tight mb-10">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
          <p>
            When you visit our website or place an order, we collect certain information to
            process your transaction and improve your experience. This includes:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Personal details: name, email address, phone number, shipping and billing address</li>
            <li>Payment information: processed securely through our payment providers (we do not store card details)</li>
            <li>Browsing data: pages visited, products viewed, and interactions with our website</li>
            <li>Device information: browser type, IP address, and operating system</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders, returns, and inquiries</li>
            <li>Send newsletters and promotional offers (only if you have subscribed)</li>
            <li>Improve our website, products, and customer experience</li>
            <li>Prevent fraud and maintain the security of our platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may
            share your information with trusted service providers who assist us in operating
            our website, processing payments, and delivering orders. These providers are
            contractually obligated to keep your information confidential.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Payment Security</h2>
          <p>
            All payment transactions are processed through Stripe, a PCI-DSS compliant
            payment processor. Your payment details are encrypted and transmitted securely.
            We never store your full credit card number or CVV on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience, remember your preferences,
            and manage your shopping cart. Essential cookies are required for the website to
            function properly. You can manage cookie preferences through your browser settings,
            but disabling cookies may affect your ability to use certain features.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill the
            purposes outlined in this policy, comply with legal obligations, resolve disputes,
            and enforce our agreements. Order data is retained for record-keeping and tax
            compliance purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal data (subject to legal requirements)</li>
            <li>Unsubscribe from marketing communications at any time</li>
            <li>Request a copy of your data in a portable format</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Children&apos;s Privacy</h2>
          <p>
            Our website is not intended for children under the age of 13. We do not knowingly
            collect personal information from children. If we become aware that we have
            collected information from a child under 13, we will take steps to delete that
            information promptly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time to reflect changes in our
            practices or legal requirements. Any updates will be posted on this page. We
            encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">10. Contact Us</h2>
          <p>
            If you have any questions or concerns about this privacy policy or how we handle
            your personal data, please contact us through our social media channels or the
            contact information provided on the website.
          </p>
        </section>
      </div>
    </div>
  )
}
