import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase font-bold tracking-tight">
          {title}
        </span>
        {title.toLowerCase() === "size" && (
          <button className="text-[10px] uppercase font-bold tracking-tight underline">
            View Size Guide
          </button>
        )}
      </div>
      <div
        className="flex flex-wrap gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "border-ui-border-base border text-[12px] h-10 min-w-[50px] px-2 flex-1 flex items-center justify-center transition-colors duration-150 uppercase font-medium",
                {
                  "border-black bg-black text-white": v === current,
                  "hover:border-black": v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
