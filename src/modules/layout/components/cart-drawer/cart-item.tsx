"use client"

import { HttpTypes } from "@medusajs/types"
import { Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import Thumbnail from "@modules/products/components/thumbnail"
import { convertToLocale } from "@lib/util/money"
import { useState } from "react"
import Spinner from "@modules/common/icons/spinner"

import LineItemOptions from "@modules/common/components/line-item-options"

type DrawerCartItemProps = {
    item: HttpTypes.StoreCartLineItem
    currencyCode: string
}

const DrawerCartItem = ({ item, currencyCode }: DrawerCartItemProps) => {
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const changeQuantity = async (quantity: number) => {
        setError(null)
        setUpdating(true)

        await updateLineItem({
            lineId: item.id,
            quantity,
        })
            .catch((err) => {
                setError(err.message)
            })
            .finally(() => {
                setUpdating(false)
            })
    }

    return (
        <div className="flex gap-x-6 w-full py-8 border-b border-gray-100 last:border-0 relative bg-white">
            <div className="w-[180px] aspect-square bg-gray-50 flex-shrink-0 relative">
                <Thumbnail
                    thumbnail={item.thumbnail}
                    images={item.variant?.product?.images}
                    size="square"
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="flex flex-col flex-1 text-ui-fg-base relative">
                <div className="flex flex-col gap-y-1">
                    <Text className="text-[13px] font-bold uppercase tracking-widest">{item.product_title}</Text>
                    <div className="border-b border-gray-100 pb-2 mb-2 w-full">
                        <Text className="text-[13px] text-gray-700">
                            {convertToLocale({
                                amount: item.unit_price,
                                currency_code: currencyCode,
                            })}
                        </Text>
                    </div>

                    <LineItemOptions variant={item.variant} />
                </div>

                <div className="flex flex-col mt-4">
                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-x-4">
                        <Text className="text-[13px] text-gray-800 font-medium tracking-tight">Quantity:</Text>
                        <div className="flex items-center gap-x-1 border border-transparent">
                            <button
                                onClick={() => changeQuantity(item.quantity - 1)}
                                disabled={item.quantity <= 1 || updating}
                                className="text-gray-400 hover:text-black disabled:text-gray-200 transition-colors text-lg px-2"
                            >
                                -
                            </button>
                            <span className="text-[13px] font-medium min-w-[20px] text-center">
                                {updating ? <Spinner className="w-3 h-3 animate-spin mx-auto" /> : item.quantity}
                            </span>
                            <button
                                onClick={() => changeQuantity(item.quantity + 1)}
                                disabled={updating}
                                className="text-gray-400 hover:text-black transition-colors text-lg px-2"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 right-0">
                    <button
                        className="uppercase text-[12px] tracking-[0.15em] text-gray-400 hover:text-black transition-colors font-medium"
                        onClick={() => changeQuantity(0)}
                        disabled={updating}
                    >
                        {updating && item.quantity === 0 ? <Spinner className="w-3 h-3 animate-spin" /> : "Remove"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DrawerCartItem
