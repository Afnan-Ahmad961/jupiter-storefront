"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@lib/util/money"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DrawerCartItem from "./cart-item"
import { XMark, LockClosedSolid } from "@medusajs/icons"
import Link from "next/link"

const CartDrawer = ({ cart, children }: { cart?: HttpTypes.StoreCart | null, children?: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    // Calculate total items
    const totalItems =
        cart?.items?.reduce((acc, item) => {
            return acc + item.quantity
        }, 0) || 0

    // Auto-open when cart items change (optional, similar to old behavior)
    // But strictly per Kith, it usually opens on add. 
    // For now, let's keep the manual trigger mostly, or a simpler effect.
    // The previous implementation used a tricky timer. Kith usually just opens it.
    // We'll trust the parent or global state if we had one, but here we just listen to clicks mostly.
    // However, users expect it to open when they add to cart.
    // Since we don't have a global 'added-to-cart' event easily without a context, 
    // we might rely on the fact that the cart prop updates. 
    const [prevTotalItems, setPrevTotalItems] = useState(totalItems)
    useEffect(() => {
        if (totalItems > prevTotalItems && !isOpen) {
            setIsOpen(true)
        }
        setPrevTotalItems(totalItems)
    }, [totalItems, prevTotalItems, isOpen])

    // Close on route change
    useEffect(() => {
        close()
    }, [pathname])

    return (
        <>
            {children ? (
                <div onClick={open} className="h-full flex items-center cursor-pointer">
                    {children}
                </div>
            ) : (
                <button
                    onClick={open}
                    className="hover:text-ui-fg-base flex items-center gap-x-1"
                    data-testid="nav-cart-link"
                >
                    <span>Cart ({totalItems})</span>
                </button>
            )}

            <Transition show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[999]" onClose={close}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/40 bg-opacity-75 transition-opacity backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-[700px]">
                                        <div className="flex h-full flex-col bg-white shadow-xl">
                                            {/* Header */}
                                            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                                                <Dialog.Title className="text-[20px] font-medium">
                                                    Your Cart ({totalItems})
                                                </Dialog.Title>
                                                <button
                                                    type="button"
                                                    className="text-gray-400 hover:text-gray-500"
                                                    onClick={close}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XMark className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>

                                            {/* Red Warning Banner */}
                                            <div className="px-8 py-4 bg-[#fff5f5] text-[#ff4d4f] text-[12px] text-center tracking-wide border-b border-[#ffe9e9]">
                                                Items in bag are not reserved. Check out now before they sell out.
                                            </div>

                                            {/* Cart Items */}
                                            <div className="flex-1 overflow-y-auto px-8 py-2 custom-scrollbar">
                                                {cart?.items && cart.items.length > 0 ? (
                                                    <div className="flex flex-col">
                                                        {cart.items
                                                            .sort((a, b) => (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1)
                                                            .map((item) => (
                                                                <DrawerCartItem
                                                                    key={item.id}
                                                                    item={item}
                                                                    currencyCode={cart.currency_code}
                                                                />
                                                            ))
                                                        }
                                                    </div>
                                                ) : (
                                                    <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                                                        <p className="text-gray-500">Your shopping bag is empty.</p>
                                                        <Button variant="secondary" onClick={close} className="w-full max-w-[200px] uppercase tracking-wider rounded-none">
                                                            Start Shopping
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Footer */}
                                            {cart?.items && cart.items.length > 0 && (
                                                <div className="border-t border-gray-100 px-8 py-10 bg-white">
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-black">Subtotal</p>
                                                        <p className="text-[14px] font-bold text-black tracking-widest">
                                                            {convertToLocale({
                                                                amount: cart.subtotal ?? 0,
                                                                currency_code: cart.currency_code,
                                                            })}
                                                        </p>
                                                    </div>
                                                    <p className="text-[10px] text-gray-400 tracking-[0.15em] mb-10 uppercase font-medium">
                                                        Shipping & taxes calculated at checkout
                                                    </p>
                                                    <div className="">
                                                        <Link href="/checkout?step=address" className="w-full">
                                                            <button
                                                                className="w-full h-[60px] bg-[#333] hover:bg-black text-white uppercase tracking-[0.3em] text-[12px] font-bold flex items-center justify-center gap-3 transition-colors duration-200"
                                                            >
                                                                <LockClosedSolid className="w-4 h-4" />
                                                                Checkout
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default CartDrawer
