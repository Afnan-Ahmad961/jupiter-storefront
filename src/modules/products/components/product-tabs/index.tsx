"use client"

import { clx } from "@medusajs/ui"
import { useState } from "react"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const description = product.description || ""
  const [productDesc, productDetails] = description.split("---")

  const MarkdownContent = ({ content }: { content: string }) => (
    <div className="prose prose-sm max-w-none py-4 text-ui-fg-base leading-6">
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml={true}>
        {content}
      </ReactMarkdown>
    </div>
  )

  const tabs = [
    {
      label: "Description",
      component: <MarkdownContent content={productDesc} />,
    },
    {
      label: "Details",
      component: <MarkdownContent content={productDetails} />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full border-t border-ui-border-base pt-6">
      <div className="flex items-center gap-x-8 border-b border-ui-border-base">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={clx(
              "text-[10px] uppercase font-bold tracking-widest pb-3 transition-all duration-150 relative -mb-[1px]",
              {
                "text-black border-b-2 border-black": activeTab === i,
                "text-ui-fg-muted hover:text-black": activeTab !== i,
              }
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs[activeTab].component}
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-sm leading-6 py-4 flex flex-col gap-y-4">
      <p>
        Please allow 3-5 business days for your order to be processed and shipped.
      </p>
      <p>
        Returns are accepted within 30 days of purchase. Items must be in original condition with tags attached.
      </p>
    </div>
  )
}

export default ProductTabs
