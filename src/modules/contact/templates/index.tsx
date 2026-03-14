"use client"

import { EnvelopeSolid, ChatBubbleLeftRightSolid } from "@medusajs/icons"
import { Heading, Text, clx } from "@medusajs/ui"
import Accordion from "@modules/products/components/product-tabs/accordion"

const faqs = [
  {
    category: "Shipping and Tracking",
    questions: [
      {
        question: "When will my order ship?",
        answer: "Orders are typically processed and shipped within 1-2 business days. During high-demand periods or sales, processing may take up to 3-5 business days. You will receive a tracking number once your order has been dispatched.",
      },
      {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you will receive an email with a tracking number and a link to monitor your shipment's progress. You can also view your order status in your account dashboard.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we focused on providing the best experience within our primary markets. Please check the checkout page for available shipping destinations and rates.",
      },
    ],
  },
  {
    category: "Return Policy",
    questions: [
      {
        question: "What is your return policy for online purchases?",
        answer: "We offer a 7-day return window for eligible online orders. Items must be in their original condition, unworn, unwashed, and with all tags attached. Some items may be final sale and not eligible for return – please check the product description.",
      },
      {
        question: "How do I initiate a return?",
        answer: "To start a return, please contact our support team via WhatsApp or Email with your order number. Our team will guide you through the process.",
      },
    ],
  },
  {
    category: "Orders & Processing",
    questions: [
      {
        question: "Why is my order still processing?",
        answer: "Processing involves verifying your information, preparing your items, and packing them for shipment. This normally takes 1-2 business days. If there is an issue with your order, we will reach out to you directly.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer: "We aim to process orders quickly. Once an order is placed, we can only cancel/modify it if it hasn't entered the processing stage. Please reach out to us immediately via WhatsApp for such requests.",
      },
    ],
  },
  {
    category: "Product & Sizing",
    questions: [
      {
        question: "How do I find my size?",
        answer: "Detailed measurements are provided on each product page. We recommend comparing these with a similar garment you already own. If you're between sizes, we generally suggest sizing up for a more relaxed fit.",
      },
    ],
  },
]

const ContactTemplate = () => {
  return (
    <div className="py-12 small:py-24 max-w-[1440px] mx-auto px-6">
      <div className="max-w-[800px] mx-auto">
        {/* FAQ Section */}
        <div className="mb-24">
          <Heading level="h1" className="text-4xl font-medium mb-16 tracking-tight">
            Frequently Asked Questions
          </Heading>

          {faqs.map((faqGroup, index) => (
            <div key={index} className="mb-16 last:mb-0">
              <Heading level="h2" className="text-xl font-medium mb-6 text-ui-fg-base">
                {faqGroup.category}
              </Heading>
              <div className="border-b border-gray-200">
                <Accordion type="multiple">
                  {faqGroup.questions.map((q, qIndex) => (
                    <Accordion.Item
                      key={qIndex}
                      title={q.question}
                      value={`fq-${index}-${qIndex}`}
                      className="border-gray-200"
                    >
                      <Text className="text-ui-fg-subtle pt-2 pb-8 leading-relaxed max-w-[90%]">
                        {q.answer}
                      </Text>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="pt-12 border-t border-gray-100">
          <Heading level="h2" className="text-3xl font-medium mb-12">
            Get support
          </Heading>

          <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
            {/* Email Card */}
            <a
              href="mailto:info@jupiterwardrobe.com"
              className="group flex flex-col justify-between p-8 border border-gray-200 rounded-xl hover:border-black transition-all duration-300 min-h-[220px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className="bg-gray-50 p-3 rounded-lg group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <EnvelopeSolid />
                  </div>
                  <span className="font-medium text-lg">Contact us</span>
                </div>
                <span className="text-gray-300 group-hover:text-black transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <div className="mt-8">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">Email</span>
                  <Text className="text-base font-medium">info@jupiterwardrobe.com</Text>
                </div>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/923114660101"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-8 border border-gray-200 rounded-xl hover:border-black transition-all duration-300 min-h-[220px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className="bg-gray-50 p-3 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                    <ChatBubbleLeftRightSolid />
                  </div>
                  <span className="font-medium text-lg">Chat with us</span>
                </div>
                <span className="text-gray-300 group-hover:text-black transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <div className="mt-8">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">Jupiter WhatsApp</span>
                  <Text className="text-lg font-bold tracking-tight">03114660101</Text>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactTemplate
