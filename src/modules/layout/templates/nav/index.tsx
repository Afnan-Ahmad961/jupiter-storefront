"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, User } from "lucide-react"
import SideMenu from "@modules/layout/components/side-menu"
import CartDrawer from "@modules/layout/components/cart-drawer"
import { HttpTypes } from "@medusajs/types"

export default function Nav({
  cart,
  customer,
  categories,
  collections,
}: {
  cart?: HttpTypes.StoreCart | null
  customer?: HttpTypes.StoreCustomer | null
  categories: HttpTypes.StoreProductCategory[]
  collections: HttpTypes.StoreCollection[]
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === "/" || pathname === "/en" || pathname === "/us" // Basic check, better if customized per region
  // More robust home page check for Medusa structure:
  const isHome = pathname.split("/").filter(Boolean).length <= 1

  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const shouldBeSolid = isScrolled || !isHome || isSideMenuOpen || isCartDrawerOpen

  return (
    <div
      className={`top-0 inset-x-0 z-50 transition-all duration-300 ${isHome ? "fixed" : "sticky"
        }`}
    >
      <header
        className={`relative h-16 mx-auto border-b duration-300 transition-all ${shouldBeSolid
          ? "bg-white border-gray-200 shadow-sm"
          : "bg-transparent border-transparent"
          }`}
      >
        <nav
          className={`content-container flex items-center justify-between w-full h-full transition-colors duration-300 ${shouldBeSolid ? "text-gray-900" : "text-white"
            }`}
        >
          {/* Left - Menu */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu
                customer={customer}
                categories={categories}
                collections={collections}
                onOpenChange={(open) => setIsSideMenuOpen(open)}
              />
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center h-full">
            <Link
              href="/"
              className="text-2xl font-bold tracking-widest uppercase transition-colors"
              data-testid="nav-store-link"
            >
              Jupiter
            </Link>
          </div>

          {/* Right - Account & Cart */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            {/* Desktop Account Link */}
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <Link
                className="hover:opacity-70 transition-opacity flex items-center gap-2"
                href="/account"
                data-testid="nav-account-link"
              >
                <User size={20} />
              </Link>
            </div>

            {/* Cart Button with Drawer */}
            <div className="h-full flex items-center">
              <CartDrawer
                cart={cart}
                onOpenChange={(open) => setIsCartDrawerOpen(open)}
              >
                <div
                  className="flex gap-2 transition-opacity relative hover:opacity-70 cursor-pointer"
                  data-testid="nav-cart-link"
                >
                  <ShoppingBag size={20} />
                  <span
                    className={`absolute -top-2 -right-2 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold transition-colors ${shouldBeSolid ? "bg-[#cd3b13]" : "bg-black"
                      }`}
                  >
                    {totalItems}
                  </span>
                </div>
              </CartDrawer>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
