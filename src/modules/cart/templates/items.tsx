import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table, Text, clx } from "@medusajs/ui"

import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import { updateLineItem } from "@lib/data/cart"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <div className="pb-3 flex items-center">
        <Heading className="text-[2rem] leading-[2.75rem]">Cart</Heading>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row className="text-ui-fg-subtle txt-medium-plus">
            <Table.HeaderCell className="!pl-0">Item</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell">
              Price
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right">
              Total
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Table.Row
                      className="w-full"
                      data-testid="product-row"
                      key={item.id}
                    >
                      <Table.Cell className="!pl-0 p-4 w-24">
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className={clx("flex w-16 small:w-24")}
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>
                      </Table.Cell>

                      <Table.Cell className="text-left">
                        <Text
                          className="txt-medium-plus text-ui-fg-base"
                          data-testid="product-title"
                        >
                          {item.product_title}
                        </Text>
                        <LineItemOptions
                          variant={item.variant}
                          data-testid="product-variant"
                        />
                      </Table.Cell>

                      <Table.Cell>
                        <div className="flex gap-2 items-center w-28">
                          <DeleteButton
                            id={item.id}
                            data-testid="product-delete-button"
                          />
                          <CartItemSelect
                            value={item.quantity}
                            onChange={(e) =>
                              console.log(parseInt(e.target.value))
                            }
                            className="w-14 h-10 p-4"
                            data-testid="product-select-button"
                          >
                            {Array.from(
                              {
                                length: Math.min(10, 10),
                              },
                              (_, i) => (
                                <option value={i + 1} key={i}>
                                  {i + 1}
                                </option>
                              )
                            )}
                          </CartItemSelect>
                        </div>
                        <ErrorMessage
                          error={null}
                          data-testid="product-error-message"
                        />
                      </Table.Cell>

                      <Table.Cell className="hidden small:table-cell">
                        <LineItemUnitPrice
                          item={item}
                          style="tight"
                          currencyCode={cart?.currency_code}
                        />
                      </Table.Cell>

                      <Table.Cell className="!pr-0">
                        <span className="!pr-0">
                          <LineItemPrice
                            item={item}
                            style="tight"
                            currencyCode={cart?.currency_code}
                          />
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  )
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
