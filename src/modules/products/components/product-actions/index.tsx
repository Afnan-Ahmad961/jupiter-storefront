"use client"

import { addToCart } from "@lib/data/cart"
import { useProgressBar } from "@lib/context/progress-bar-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
  bundlesData?: { bundles: any[], bundledProducts: any[] }
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
  bundlesData,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { start: startProgress, done: doneProgress } = useProgressBar()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  const [includeBundle, setIncludeBundle] = useState(true)
  const [bundleOptions, setBundleOptions] = useState<Record<string, string>>({})

  // Preselect the first variant options by default
  useEffect(() => {
    if (product.variants?.length === 1 && !Object.keys(options).length) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.id, product.variants, options])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant, options])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  const bundledProduct = bundlesData?.bundledProducts?.[0]

  useEffect(() => {
    if (bundledProduct?.variants?.length === 1 && !Object.keys(bundleOptions).length) {
      const variantOptions = optionsAsKeymap(bundledProduct.variants[0].options)
      setBundleOptions(variantOptions ?? {})
    }
  }, [bundledProduct, bundleOptions])

  const selectedBundleVariant = useMemo(() => {
    if (!bundledProduct?.variants || bundledProduct.variants.length === 0) {
      return null
    }

    return bundledProduct.variants.find((v: any) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, bundleOptions)
    })
  }, [bundledProduct, bundleOptions])

  const setBundleOptionValue = (optionId: string, value: string) => {
    setBundleOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const bundleInStock = useMemo(() => {
    if (!selectedBundleVariant) return false
    if (!selectedBundleVariant.manage_inventory) return true
    if (selectedBundleVariant.allow_backorder) return true
    if ((selectedBundleVariant.inventory_quantity || 0) > 0) return true
    return false
  }, [selectedBundleVariant])

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)
    startProgress()

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    if (includeBundle && selectedBundleVariant?.id) {
      await addToCart({
        variantId: selectedBundleVariant.id,
        quantity: 1,
        countryCode,
      })
    }

    doneProgress()
    setIsAdding(false)
  }

  const sortValues = (title: string, values: string[]) => {
    if (title.toLowerCase() !== "size") return values

    const sizeOrder = ["s", "m", "l", "xl"]
    return [...values].sort((a, b) => {
      const indexA = sizeOrder.indexOf(a.toLowerCase())
      const indexB = sizeOrder.indexOf(b.toLowerCase())

      if (indexA !== -1 && indexB !== -1) return indexA - indexB
      if (indexA !== -1) return -1
      if (indexB !== -1) return 1
      return a.localeCompare(b)
    })
  }

  const getOrderedValues = (option: HttpTypes.StoreProductOption) => {
    const values: string[] = []
    if (product.variants) {
      product.variants.forEach((v) => {
        const optionValue = v.options?.find((o) => o.option_id === option.id)
        if (optionValue && !values.includes(optionValue.value)) {
          values.push(optionValue.value)
        }
      })
    }
    // Fallback to option.values if variants don't provide it
    if (values.length === 0 && option.values) {
      values.push(...option.values.map((v) => v.value))
    }
    
    return sortValues(option.title || "", values)
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                const orderedValues = getOrderedValues(option)
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      orderedValues={orderedValues}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {bundledProduct && (
          <div className="flex flex-col gap-y-4 my-6 p-4 border border-ui-border-base rounded-md bg-ui-bg-subtle">
            <div className="flex items-center gap-x-3 mb-2">
              <input
                type="checkbox"
                id="include-bundle"
                checked={includeBundle}
                onChange={(e) => setIncludeBundle(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
              />
              <span className="text-sm font-bold leading-none">
                Add Bundled Item
              </span>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-x-6 mt-2 items-start transition-opacity ${!includeBundle ? "opacity-50 pointer-events-none" : ""}`}>
              <div className="flex gap-x-4 flex-1 w-full">
                {bundledProduct.thumbnail && (
                  <img src={bundledProduct.thumbnail} alt={bundledProduct.title} className="w-20 h-24 object-cover rounded-md shadow-sm flex-shrink-0" />
                )}
                <div className="flex flex-col gap-y-1 flex-1 min-w-0">
                  <span className="font-semibold text-lg truncate sm:whitespace-normal">{bundledProduct.title}</span>
                  <ProductPrice product={bundledProduct} variant={selectedBundleVariant || undefined} />
                  <a href={`/${countryCode}/products/${bundledProduct.handle}`} className="text-xs underline text-ui-fg-subtle hover:text-ui-fg-base mt-1" target="_blank" rel="noreferrer">
                    View Details
                  </a>
                </div>
              </div>

              {(bundledProduct.variants?.length ?? 0) > 1 && (
                <div className="flex flex-col gap-y-3 w-full sm:w-auto sm:min-w-[150px]">
                  {(bundledProduct.options || []).map((option: any) => {
                    const values = option.values?.map((v: any) => v.value) || []
                    const orderedValues = sortValues(option.title || "", values)
                    return (
                      <div key={option.id} className="flex items-center gap-x-3 justify-between sm:justify-end">
                        <label className="text-xs uppercase font-bold tracking-widest text-ui-fg-base whitespace-nowrap">{option.title}</label>
                        <select
                          value={bundleOptions[option.id] || ""}
                          onChange={(e) => setBundleOptionValue(option.id, e.target.value)}
                          disabled={!!disabled || isAdding || !includeBundle}
                          className="border border-ui-border-base rounded-md p-2 text-sm bg-ui-bg-base outline-none hover:border-black cursor-pointer w-lg sm:w-auto min-w-[100px] transition-colors"
                        >
                          <option value="" disabled>Select</option>
                          {orderedValues.map((v: string) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {!bundleInStock && selectedBundleVariant && includeBundle && (
              <span className="text-red-500 text-sm mt-1">This variant is out of stock</span>
            )}
          </div>
        )}

        <ProductPrice product={product} variant={selectedVariant} />

        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant ||
            (includeBundle && bundledProduct && (!bundleInStock || !selectedBundleVariant))
          }
          variant="primary"
          className="w-full h-12 bg-black text-white rounded-none uppercase font-bold tracking-widest hover:bg-black/90 transition-colors duration-150"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {(product.variants?.length ?? 0) > 1 && !selectedVariant
            ? "Select a variant"
            : !inStock || (includeBundle && !bundleInStock && selectedBundleVariant)
              ? "Out of Stock"
              : "Add to Cart"}
        </Button>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
