"use client"

import React, { useState } from "react"
import { clx } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import { Plus } from "@medusajs/icons"
import { signout } from "@lib/data/customer"
import { useParams } from "next/navigation"

import Overview from "@modules/account/components/overview"
import ProfileName from "@modules/account/components/profile-name"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfilePhone from "@modules/account/components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import AddressBook from "@modules/account/components/address-book"
import OrderOverview from "@modules/account/components/order-overview"
import TransferRequestForm from "@modules/account/components/transfer-request-form"
import ProfilePassword from "../profile-password"

type AccountAccordionProps = {
    customer: HttpTypes.StoreCustomer | null
    orders: HttpTypes.StoreOrder[] | null
    regions: HttpTypes.StoreRegion[]
    region: HttpTypes.StoreRegion
}

const Divider = () => <div className="w-full h-px bg-gray-200 my-8" />

const AccountAccordion = ({
    customer,
    orders,
    regions,
    region,
}: AccountAccordionProps) => {
    const [openSection, setOpenSection] = useState<string | null>("overview")
    const { countryCode } = useParams() as { countryCode: string }

    const toggleSection = (section: string) => {
        setOpenSection(prev => (prev === section ? null : section))
    }

    const handleLogout = async () => {
        await signout(countryCode)
    }

    const sections = [
        {
            id: "overview",
            title: "Overview",
            content: (
                <div className="pt-8 pb-4">
                    <Overview customer={customer} orders={orders} />
                </div>
            ),
        },
        {
            id: "details",
            title: "Account Details",
            content: (
                <div className="pt-8 pb-4 flex flex-col gap-y-8">
                    <div className="mb-4">
                        <h2 className="text-xl-semi mb-2">Profile</h2>
                        <p className="text-base-regular">
                            View and update your profile information, including your name, email,
                            and phone number. You can also update your billing address, or change
                            your password.
                        </p>
                    </div>
                    {customer && <ProfileName customer={customer} />}
                    <Divider />
                    {customer && <ProfileEmail customer={customer} />}
                    <Divider />
                    {customer && <ProfilePhone customer={customer} />}
                    <Divider />
                    <ProfilePassword />
                    <Divider />
                    {customer && <ProfileBillingAddress customer={customer} regions={regions} />}
                </div>
            ),
        },
        {
            id: "orders",
            title: "Order History",
            content: (
                <div className="pt-8 pb-4">
                    <div className="mb-4">
                        <h2 className="text-xl-semi mb-2">Orders</h2>
                        <p className="text-base-regular mb-4">
                            View your previous orders and their status. You can also create returns or exchanges for your orders if needed.
                        </p>
                    </div>
                    <OrderOverview orders={orders || []} />
                    {/* <Divider /> */}
                    {/* <TransferRequestForm /> */}
                </div>
            ),
        },
        {
            id: "addresses",
            title: "Manage Addresses",
            content: (
                <div className="pt-8 pb-4">
                    <div className="mb-4">
                        <h2 className="text-xl-semi mb-2">Shipping Addresses</h2>
                        <p className="text-base-regular mb-4">
                            View and update your shipping addresses, you can add as many as you like. Saving your addresses will make them available during checkout.
                        </p>
                    </div>
                    {customer && <AddressBook customer={customer} region={region} />}
                </div>
            ),
        },

    ]

    return (
        <div className="w-full max-w-[800px] mx-auto bg-white">
            <div className="border border-black border-b-0">
                {sections.map((section) => (
                    <div key={section.id} className="border-b border-black">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                        >
                            <span className="text-base font-medium text-black uppercase tracking-wide">
                                {section.title}
                            </span>
                            <Plus
                                className={clx("transition-transform duration-300", {
                                    "rotate-45": openSection === section.id,
                                })}
                                color="black"
                            />
                        </button>
                        <div
                            className={clx(
                                "overflow-hidden transition-all duration-300 ease-in-out bg-white",
                                {
                                    "max-h-0 opacity-0": openSection !== section.id,
                                    "max-h-[2000px] opacity-100": openSection === section.id,
                                }
                            )}
                        >
                            <div className="px-6 pb-6 border-t border-transparent [&_input]:border-black [&_select]:border-black [&_textarea]:border-black">
                                {/* Inner content wrapper to ensure padding doesn't affect collapse animation */}
                                {section.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 mb-8 flex justify-center">
                <button
                    onClick={handleLogout}
                    className="text-sm tracking-widest hover:underline uppercase transition-all duration-300"
                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default AccountAccordion
