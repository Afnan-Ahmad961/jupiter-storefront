
import { Dialog, Transition } from "@headlessui/react"
import { clx } from "@medusajs/ui"
import React, { Fragment, useState } from "react"
import X from "@modules/common/icons/x"
import Image from "next/image"

type SizeGuideProps = {
  isOpen: boolean
  close: () => void
}

type Unit = "inches" | "cm"

type SizeData = {
  size: string
  length: number
  width: number
  sleeve: number
  shoulder: number
}

const OVERSIZED_INCHES_DATA: SizeData[] = [
  { size: "S", length: 25, width: 22, sleeve: 8, shoulder: 22 },
  { size: "M", length: 26, width: 23, sleeve: 8, shoulder: 23 },
  { size: "L", length: 27, width: 24, sleeve: 9, shoulder: 24 },
  { size: "XL", length: 28, width: 25, sleeve: 9, shoulder: 25 },
]

const BOXY_INCHES_DATA: SizeData[] = [
  { size: "S", length: 24, width: 24, sleeve: 8, shoulder: 21 },
  { size: "M", length: 25, width: 25, sleeve: 8, shoulder: 22 },
  { size: "L", length: 26, width: 26, sleeve: 8.5, shoulder: 23 },
  { size: "XL", length: 27, width: 27, sleeve: 9, shoulder: 24 },
]

const SizeGuide: React.FC<SizeGuideProps> = ({ isOpen, close }) => {
  const [unit, setUnit] = useState<Unit>("inches")
  const [hoverRow, setHoverRow] = useState<{ table: string, index: number } | null>(null)
  const [hoverCol, setHoverCol] = useState<{ table: string, index: number } | null>(null)

  const toggleUnit = (newUnit: Unit) => {
    setUnit(newUnit)
  }

  const formatValue = (val: number) => {
    if (unit === "inches") return val
    return (val * 2.54).toFixed(2)
  }

  const Table = ({ title, data, tableId }: { title: string, data: SizeData[], tableId: string }) => (
    <div className="mb-10">
      <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-black text-center">
        {title}
      </h3>
      <div className="overflow-hidden border border-gray-200 rounded-sm">
        <table className="min-w-full text-center text-[11px]">
          <thead className="bg-[#fcfbf9] border-b border-gray-200 font-bold">
            <tr>
              <th className="py-3 px-2 text-gray-900 border-r border-gray-200 last:border-r-0 uppercase">Size</th>
              <th className="py-3 px-2 text-gray-900 border-r border-gray-200 last:border-r-0 uppercase">Length</th>
              <th className="py-3 px-2 text-gray-900 border-r border-gray-200 last:border-r-0 uppercase">Width</th>
              <th className="py-3 px-2 text-gray-900 border-r border-gray-200 last:border-r-0 uppercase">Sleeve</th>
              <th className="py-3 px-2 text-gray-900 border-r border-gray-200 last:border-r-0 uppercase">Shoulder</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={row.size}>
                {[
                  { key: 'size', val: row.size },
                  { key: 'length', val: formatValue(row.length) },
                  { key: 'width', val: formatValue(row.width) },
                  { key: 'sleeve', val: formatValue(row.sleeve) },
                  { key: 'shoulder', val: formatValue(row.shoulder) }
                ].map((cell, colIndex) => (
                  <td
                    key={cell.key}
                    className={clx(
                      "py-3 px-2 border-r border-gray-200 last:border-r-0 transition-colors duration-200",
                      {
                        "bg-gray-50": (hoverRow?.table === tableId && hoverRow?.index === rowIndex) || (hoverCol?.table === tableId && hoverCol?.index === colIndex),
                        "font-bold text-bold": colIndex === 0,
                        "text-gray-600": colIndex !== 0
                      }
                    )}
                    onMouseEnter={() => {
                      setHoverRow({ table: tableId, index: rowIndex })
                      setHoverCol({ table: tableId, index: colIndex })
                    }}
                    onMouseLeave={() => {
                      setHoverRow(null)
                      setHoverCol(null)
                    }}
                  >
                    {cell.val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden text-[#111]">
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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
                      <div className="flex items-center justify-between mb-8">
                        <Dialog.Title className="text-[20px] font-bold uppercase tracking-[0.2em]">
                          Size Guide
                        </Dialog.Title>
                        <button
                          type="button"
                          className="text-[#999] hover:text-black transition-colors"
                          onClick={close}
                        >
                          <X size={24} />
                        </button>
                      </div>

                      <div className="mt-8">
                        {/* Unit Toggle */}
                        <div className="flex justify-end mb-6">
                          <div className="flex items-center text-[11px] font-bold tracking-widest border border-gray-200 rounded-full p-1 px-3">
                            <button
                              onClick={() => toggleUnit("cm")}
                              className={clx("px-2 transition-colors duration-200", {
                                "text-black": unit === "cm",
                                "text-gray-300": unit !== "cm",
                              })}
                            >
                              CM
                            </button>
                            <span className="text-gray-200 mx-1">|</span>
                            <button
                              onClick={() => toggleUnit("inches")}
                              className={clx("px-2 transition-colors duration-200", {
                                "text-black": unit === "inches",
                                "text-gray-300": unit !== "inches",
                              })}
                            >
                              IN
                            </button>
                          </div>
                        </div>

                        <Table title="Oversized fit" data={OVERSIZED_INCHES_DATA} tableId="oversized" />
                        <Table title="Boxy fit" data={BOXY_INCHES_DATA} tableId="boxy" />

                        <div className="mt-8 text-[11px] text-gray-400 leading-relaxed italic text-center uppercase tracking-widest px-4">
                          All measurements are in {unit === "inches" ? "inches" : "centimeters"}.
                          Size variations of +/- 0.5" may occur.
                        </div>

                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SizeGuide
