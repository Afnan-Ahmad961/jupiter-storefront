import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

import SizeGuide from "../size-guide"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  orderedValues?: string[]
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  orderedValues,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = orderedValues || (option.values ?? []).map((v) => v.value)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase font-bold tracking-tight">
          {title}
        </span>
        {title.toLowerCase() === "size" && (
          <>
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="text-[10px] uppercase font-bold tracking-tight underline"
            >
              View Size Guide
            </button>
            <SizeGuide isOpen={isSizeGuideOpen} close={() => setIsSizeGuideOpen(false)} />
          </>
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
                "border-ui-border-base border text-[11px] h-9 min-w-[40px] px-3 flex items-center justify-center transition-all duration-200 uppercase tracking-widest hover:border-black",
                {
                  "border-black bg-black text-white": v === current,
                  "text-ui-fg-base bg-transparent": v !== current,
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
