"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingBag, User } from "lucide-react"
import { Suspense } from "react"
import SideMenu from "@modules/layout/components/side-menu"
import CartDrawer from "@modules/layout/components/cart-drawer"
import { HttpTypes } from "@medusajs/types"

export default function Nav({
  cart,
  customer,
}: {
  cart?: HttpTypes.StoreCart | null
  customer?: HttpTypes.StoreCustomer | null
}) {
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header
        className={`relative h-16 mx-auto border-b duration-200 transition-all ${isScrolled ? "bg-white border-gray-200 shadow-sm" : "bg-transparent border-transparent"
          }`}
      >
        <nav className="content-container text-xs text-gray-700 flex items-center justify-between w-full h-full">
          {/* Left - Menu */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu customer={customer} />
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center h-full">
            <Link
              href="/"
              className="text-2xl font-semibold hover:text-[#cd3b13] uppercase transition-colors"
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
                className="hover:text-[#cd3b13] transition-colors flex items-center gap-2"
                href="/account"
                data-testid="nav-account-link"
              >
                <User size={20} />
              </Link>
            </div>

            {/* Cart Button with Drawer */}
            <div className="h-full flex items-center">
              <CartDrawer cart={cart}>
                <div
                  className="hover:text-[#cd3b13] flex gap-2 transition-colors relative group-hover:text-[#cd3b13]"
                  data-testid="nav-cart-link"
                >
                  <ShoppingBag size={20} />
                  <span className="absolute -top-2 -right-2 bg-[#cd3b13] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
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
