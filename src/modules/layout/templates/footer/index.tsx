import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import Link from "@modules/common/components/localized-client-link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import NewsletterForm from "./newsletter-form"

export default async function Footer() {
  // const { collections } = await listCollections({
  //   fields: "*products",
  // })
  const productCategories = await listCategories()
  const topCategories = productCategories?.filter(c => !c.parent_category_id).slice(0, 6) || []

  return (
    <footer className="w-full bg-white border-t border-gray-200 pt-20 pb-10">
      <div className="content-container flex flex-col gap-16">
        <div className="flex flex-col md:flex-row justify-between gap-x-12 gap-y-16">
          {/* Brand & Newsletter Section */}
          <div className="flex gap-8 items-center">
            <Link href="/" className="inline-block">
              <img
                src="/logo.jpeg"
                alt="Jupiter"
                className="h-20 w-auto object-contain rounded-full"
              />
            </Link>

            <div className="flex flex-col gap-4 max-w-sm">
              <h1 className="text-xs font-bold uppercase tracking-widest text-gray-900">
                Subscribe to our newsletter
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                Stay updated with our latest collections, exclusive offers, and behind-the-scenes stories.
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-16 md:gap-24">
            {/* Shop Column */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">
                Shop
              </h3>
              <ul className="flex flex-col gap-3">
                {topCategories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/categories/${c.handle}`}
                      className="text-sm text-gray-500 hover:text-black hover:underline underline-offset-4 transition-all"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Column */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">
                About
              </h3>
              <ul className="flex flex-col gap-3">
                {/* <li>
                  <Link href="/about" className="text-sm text-gray-500 hover:text-black hover:underline underline-offset-4 transition-all">
                    Our Story
                  </Link>
                </li> */}
                <li>
                  <Link href="/terms" className="text-sm text-gray-500 hover:text-black hover:underline underline-offset-4 transition-all">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-gray-500 hover:text-black hover:underline underline-offset-4 transition-all">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-sm text-gray-500 hover:text-black hover:underline underline-offset-4 transition-all">
                    Returns & Exchanges
                  </Link>
                </li>
              </ul>
            </div>


          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-400">
            © {new Date().getFullYear()} Jupiter. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
              <Twitter size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
              <Facebook size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
