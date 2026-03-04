import { Metadata } from "next"
import ReturnsForm from "./returns-form"

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description: "Submit a return or exchange request for your Jupiter order.",
}

export default function ReturnsPage() {
  return (
    <div className="content-container py-20">
      <div className="max-w-2xl mx-auto flex flex-col gap-12">
        {/* Return Policy */}
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold uppercase tracking-widest text-gray-900">
            Returns & Exchanges
          </h1>

          <div className="flex flex-col gap-4 text-sm text-gray-600 leading-relaxed border border-gray-100 rounded p-6 bg-gray-50">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900">
              Our Return Policy
            </h2>
            <p>
              We want you to love every Jupiter piece. If you're not completely satisfied, we accept returns within <strong>14 days</strong> of delivery, provided items are unworn, unwashed, and in their original condition with tags attached.
            </p>
            <ul className="flex flex-col gap-2 list-disc list-inside text-gray-500">
              <li>Sale items and accessories are final sale and cannot be returned.</li>
              <li>Exchanges are subject to stock availability.</li>
              <li>Refunds are processed within 7–10 business days of receiving the returned item.</li>
              <li>Shipping costs for returns are the responsibility of the customer unless the item is defective.</li>
            </ul>
            <p className="text-gray-500">
              To begin a return or exchange, fill out the form below and our team will reach out with next steps.
            </p>
          </div>
        </div>

        {/* Return Form */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900">
            Submit a Return Request
          </h2>
          <ReturnsForm />
        </div>
      </div>
    </div>
  )
}
