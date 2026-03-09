"use client"

import { Popover, PopoverPanel, Transition, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Fragment, useEffect } from "react"
import Link from "next/link"
import { clx } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

const MainLinks = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
  // { name: "About Us", href: "/store" },
]

const SideMenu = ({
  customer,
  categories,
  collections,
  onOpenChange,
}: {
  customer?: HttpTypes.StoreCustomer | null
  categories: HttpTypes.StoreProductCategory[]
  collections: HttpTypes.StoreCollection[]
  onOpenChange?: (open: boolean) => void
}) => {
  // Lock body scroll when menu is open
  const toggleScroll = (open: boolean) => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => {
            // Handle scroll lock and report state change
            useEffect(() => {
              toggleScroll(open)
              onOpenChange?.(open)
              return () => {
                toggleScroll(false)
                onOpenChange?.(false)
              }
            }, [open, onOpenChange])

            return (
              <>
                <div className="relative flex h-full">
                  <Popover.Button
                    data-testid="nav-menu-button"
                    className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-gray-500"
                    aria-label="Toggle menu"
                  >
                    {open ? <X size={24} /> : <Menu size={24} />}
                  </Popover.Button>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0 -translate-x-full"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 -translate-x-full"
                >
                  <PopoverPanel className="fixed top-16 bottom-0 left-0 w-full sm:w-[400px] z-[40] bg-white text-black border-r border-gray-100 shadow-xl overflow-hidden">
                    <div
                      data-testid="nav-menu-popup"
                      className="flex flex-col h-full justify-between p-6 overflow-hidden"
                    >
                      <div className="flex-1 overflow-y-auto no-scrollbar">
                        <ul className="flex flex-col gap-6 items-start justify-start mb-8">
                          {MainLinks.map((item) => (
                            <li key={item.name} className="w-full">
                              <Link
                                href={item.href}
                                className="text-base uppercase tracking-widest font-medium hover:underline underline-offset-4 block w-full"
                                onClick={close}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-col gap-4 border-t border-gray-300 pt-6">
                          {["Men", "Women"].map((category) => (
                            <Disclosure key={category}>
                              {({ open }) => (
                                <>
                                  <DisclosureButton className="flex justify-between items-center w-full text-base uppercase tracking-widest font-medium hover:underline underline-offset-4 py-2">
                                    <span>{category}</span>
                                    <ChevronDown
                                      size={16}
                                      className={clx("transition-transform duration-200", {
                                        "rotate-180": open,
                                      })}
                                    />
                                  </DisclosureButton>
                                  <DisclosurePanel className="pl-4 flex flex-col gap-3 pb-2 text-gray-600">
                                    {categories?.map((link) => (
                                      <Link
                                        key={link.id}
                                        href={link.handle === "coming-soon" ? "/coming-soon" : `/store?category_id=${link.id}`}
                                        className="text-sm uppercase tracking-wider hover:underline underline-offset-4"
                                        onClick={close}
                                      >
                                        {link.name}
                                      </Link>
                                    ))}
                                  </DisclosurePanel>
                                </>
                              )}
                            </Disclosure>
                          ))}

                          <Disclosure>
                            {({ open }) => (
                              <>
                                <DisclosureButton className="flex justify-between items-center w-full text-base uppercase tracking-widest font-medium hover:underline underline-offset-4 py-2">
                                  <span>Collections</span>
                                  <ChevronDown
                                    size={16}
                                    className={clx("transition-transform duration-200", {
                                      "rotate-180": open,
                                    })}
                                  />
                                </DisclosureButton>
                                <DisclosurePanel className="pl-4 flex flex-col gap-3 pb-2 text-gray-600">
                                  {collections?.map((collection) => (
                                    <Link
                                      key={collection.id}
                                      href={`/collections/${collection.handle}`}
                                      className="text-sm uppercase tracking-wider hover:underline underline-offset-4"
                                      onClick={close}
                                    >
                                      {collection.title}
                                    </Link>
                                  ))}
                                </DisclosurePanel>
                              </>
                            )}
                          </Disclosure>
                        </div>
                      </div>

                      <div className="flex flex-col gap-y-4 pt-6 border-t border-gray-100">
                        <div className="text-sm">
                          {customer ? (
                            <div className="flex flex-col gap-1">
                              <span className="text-gray-500">Signed in as:</span>
                              <span className="font-medium">{customer.email}</span>
                            </div>
                          ) : (
                            <Link
                              href="/account"
                              className="text-lg uppercase tracking-widest font-medium hover:underline underline-offset-4"
                              onClick={close}
                            >
                              Log In
                            </Link>
                          )}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">© {new Date().getFullYear()} Jupiter</div>
                      </div>
                    </div>
                  </PopoverPanel>
                </Transition>

                {open && (
                  <div
                    className="fixed inset-0 top-16 z-[30] bg-black/20 backdrop-blur-sm"
                    onClick={close}
                  />
                )}
              </>
            )
          }}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
