import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import Link from "@modules/common/components/localized-client-link"
import NewsletterForm from "./newsletter-form"

export default async function Footer() {
  const productCategories = await listCategories()
  const { collections } = await listCollections()
  const topCategories = productCategories?.filter(c => !c.parent_category_id) || []

  return (
    <footer className="w-full bg-black text-white">
      {/* Main Grid */}
      <div className="content-container py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">

          {/* Column 1: Jupiter Stuff */}
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Jupiter Stuff
            </p>
            
            <div className="flex flex-col gap-6">
              {collections.length > 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Collections</p>
                  <ul className="flex flex-col gap-2">
                    {collections.map((collection) => (
                      <li key={collection.id}>
                        <Link
                          href={`/collections/${collection.handle}`}
                          className="text-sm hover:text-white transition-colors duration-200"
                        >
                          {collection.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Categories</p>
                <ul className="flex flex-col gap-2">
                  {topCategories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={
                          category.handle === "coming-soon"
                            ? "/coming-soon"
                            : `/store?category_id=${category.id}`
                        }
                        className="text-sm hover:text-white transition-colors duration-200"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 2: Nerdy Stuff */}
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Nerdy Stuff
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm  hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm  hover:text-white transition-colors duration-200"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm  hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sm  hover:text-white transition-colors duration-200"
                >
                  Returns &amp; Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Follow Us
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://www.tiktok.com/@jupiterwardrobe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm  hover:text-white transition-colors duration-200"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/jupiterwardrobe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm  hover:text-white transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61578116953462"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm  hover:text-white transition-colors duration-200"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/jupiter-wardrobe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm  hover:text-white transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Join Our List
            </p>
            <p className="text-sm  leading-relaxed">
              Front-row seat to the latest drops and VIP-only perks. Sign up today for exclusive offers, sneak peeks & much more.
            </p>
            <NewsletterForm />
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="content-container py-6 flex items-center justify-center">
          <p className="text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Jupiter. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
