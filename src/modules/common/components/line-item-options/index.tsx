import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemOptions = ({
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  return (
    <div className="flex flex-col gap-y-1 mt-1">
      {variant?.options ? (
        variant.options.map((option) => (
          <Text
            key={option.id}
            data-testid={dataTestid}
            data-value={dataValue}
            className="text-xs text-gray-400 font-medium tracking-tight"
          >
            {option.option?.title}: {option.value}
          </Text>
        ))
      ) : (
        <Text
          data-testid={dataTestid}
          data-value={dataValue}
          className="inline-block text-xs text-gray-500 w-full overflow-hidden text-ellipsis"
        >
          VARIANT: {variant?.title}
        </Text>
      )}
    </div>
  )
}

export default LineItemOptions
