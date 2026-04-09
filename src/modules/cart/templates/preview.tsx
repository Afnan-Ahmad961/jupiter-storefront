import { HttpTypes } from "@medusajs/types"
import { Text, clx } from "@medusajs/ui"
import Thumbnail from "@modules/products/components/thumbnail"
import { convertToLocale } from "@lib/util/money"
import LineItemOptions from "@modules/common/components/line-item-options"

const ItemsPreviewTemplate = ({
    cart,
}: {
    cart: HttpTypes.StoreCart
}) => {
    const items = cart.items

    return (
        <div className="flex flex-col gap-y-4">
            {items && items.length > 0 && items
                .sort((a, b) => {
                    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => (
                    <div key={item.id} className="flex gap-x-4">
                        <div className="w-[80px] aspect-square bg-gray-50 flex-shrink-0">
                            <Thumbnail
                                thumbnail={item.thumbnail}
                                images={item.variant?.product?.images}
                                size="square"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex flex-col flex-1 justify-between">
                            <div className="flex flex-col">
                                <Text className="text-[12px] font-bold uppercase tracking-widest text-black">
                                    {item.product_title}
                                </Text>
                                <LineItemOptions variant={item.variant} />
                                <Text className="text-[12px] text-gray-400 mt-0.5">
                                    Quantity: {item.quantity}
                                </Text>
                            </div>
                            <div className="flex justify-start mt-1">
                                <Text className="text-[12px] font-bold text-black">
                                    {convertToLocale({
                                        amount: item.unit_price,
                                        currency_code: cart.currency_code,
                                    })}
                                </Text>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default ItemsPreviewTemplate
