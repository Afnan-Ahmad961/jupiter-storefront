import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | Jupiterwardrobe",
  description: "Terms and conditions for using the Jupiterwardrobe website and purchasing products.",
}

export default function TermsPage() {
  return (
    <div className="content-container py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold uppercase tracking-tight mb-10">
        Terms & Conditions
      </h1>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">1. General</h2>
          <p>
            By accessing and placing an order with Jupiterwardrobe, you confirm that you are in
            agreement with and bound by the terms and conditions contained herein. These terms
            apply to the entire website and any communication between you and Jupiterwardrobe.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Products & Pricing</h2>
          <p>
            All products are subject to availability. We reserve the right to discontinue any
            product at any time. Prices for our products are subject to change without notice.
            We reserve the right to modify or discontinue any product without notice. All prices
            are listed in the local currency of the region you are browsing from. Prices include
            applicable taxes unless stated otherwise.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Orders & Payment</h2>
          <p>
            When you place an order, you are offering to purchase a product on and subject to
            these terms and conditions. All orders are subject to availability and confirmation
            of the order price. We accept payment through the methods displayed at checkout.
            Your order will not be dispatched until payment has been received in full.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Shipping & Delivery</h2>
          <p>
            We aim to dispatch all orders within 2-3 business days. Delivery times may vary
            depending on your location. We are not responsible for delays caused by customs,
            courier services, or other factors outside our control. Shipping charges are
            calculated at checkout based on your delivery address.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Returns & Exchanges</h2>
          <p>
            We accept returns and exchanges within 7 days of delivery. Items must be unworn,
            unwashed, and in their original condition with all tags attached. Sale items and
            undergarments are final sale and cannot be returned or exchanged. To initiate a
            return, please visit our Returns & Exchanges page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images, and software,
            is the property of Jupiterwardrobe and is protected by applicable intellectual
            property laws. You may not reproduce, distribute, or create derivative works from
            any content without our express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
          <p>
            Jupiterwardrobe shall not be liable for any indirect, incidental, special, or
            consequential damages arising out of or in connection with the use of this website
            or the purchase of any products. Our total liability shall not exceed the amount
            paid by you for the specific product giving rise to the claim.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Changes to Terms</h2>
          <p>
            We reserve the right to update or modify these terms at any time without prior
            notice. Your continued use of the website following any changes constitutes your
            acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">9. Contact</h2>
          <p>
            If you have any questions regarding these terms, please reach out to us through
            our social media channels or the contact information provided on the website.
          </p>
        </section>
      </div>
    </div>
  )
}
