
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
}

const INCHES_DATA: SizeData[] = [
  { size: "S", length: 25, width: 22 },
  { size: "M", length: 26, width: 23 },
  { size: "L", length: 27, width: 24 },
  { size: "XL", length: 28, width: 25 },
]

const SizeGuide: React.FC<SizeGuideProps> = ({ isOpen, close }) => {
  const [unit, setUnit] = useState<Unit>("inches")
  const [hoverRow, setHoverRow] = useState<number | null>(null)
  const [hoverCol, setHoverCol] = useState<number | null>(null)

  const toggleUnit = (newUnit: Unit) => {
    setUnit(newUnit)
  }

  const formatValue = (val: number) => {
    if (unit === "inches") return val
    return (val * 2.54).toFixed(2)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[75]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-75 backdrop-blur-md bg-zinc-900/40" />
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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Size Guide
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={close}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <X size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {/* Unit Toggle */}
                        <div className="flex justify-end mb-4">
                          <div className="flex items-center text-sm font-medium">
                            <button
                              onClick={() => toggleUnit("cm")}
                              className={clx("px-2 transition-colors duration-200", {
                                "text-black font-bold": unit === "cm",
                                "text-gray-400": unit !== "cm",
                              })}
                            >
                              CM
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => toggleUnit("inches")}
                              className={clx("px-2 transition-colors duration-200", {
                                "text-black font-bold": unit === "inches",
                                "text-gray-400": unit !== "inches",
                              })}
                            >
                              IN
                            </button>
                          </div>
                        </div>

                        {/* Dimensions Table */}
                        <div className="overflow-hidden border border-gray-200 rounded-sm">
                          <table className="min-w-full text-center text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                              <tr>
                                <th className="py-3 px-4 font-medium text-gray-500 uppercase tracking-wider text-xs border-r border-gray-200 last:border-r-0">Size</th>
                                <th className="py-3 px-4 font-medium text-gray-500 uppercase tracking-wider text-xs border-r border-gray-200 last:border-r-0">Length</th>
                                <th className="py-3 px-4 font-medium text-gray-500 uppercase tracking-wider text-xs border-r border-gray-200 last:border-r-0">Width</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {INCHES_DATA.map((row, rowIndex) => (
                                <tr key={row.size} className="group">
                                  {/* Size Cell */}
                                  <td
                                    className={clx(
                                      "py-3 px-4 text-gray-900 font-medium border-r border-gray-200 last:border-r-0 transition-colors duration-200",
                                      {
                                        "bg-gray-100": hoverRow === rowIndex || hoverCol === 0,
                                      }
                                    )}
                                    onMouseEnter={() => {
                                      setHoverRow(rowIndex)
                                      setHoverCol(0)
                                    }}
                                    onMouseLeave={() => {
                                      setHoverRow(null)
                                      setHoverCol(null)
                                    }}
                                  >
                                    {row.size}
                                  </td>

                                  {/* Length Cell */}
                                  <td
                                    className={clx(
                                      "py-3 px-4 text-gray-700 border-r border-gray-200 last:border-r-0 transition-colors duration-200",
                                      {
                                        "bg-gray-100": hoverRow === rowIndex || hoverCol === 1,
                                      }
                                    )}
                                    onMouseEnter={() => {
                                      setHoverRow(rowIndex)
                                      setHoverCol(1)
                                    }}
                                    onMouseLeave={() => {
                                      setHoverRow(null)
                                      setHoverCol(null)
                                    }}
                                  >
                                    {formatValue(row.length)}
                                  </td>

                                  {/* Width Cell */}
                                  <td
                                    className={clx(
                                      "py-3 px-4 text-gray-700 border-r border-gray-200 last:border-r-0 transition-colors duration-200",
                                      {
                                        "bg-gray-100": hoverRow === rowIndex || hoverCol === 2,
                                      }
                                    )}
                                    onMouseEnter={() => {
                                      setHoverRow(rowIndex)
                                      setHoverCol(2)
                                    }}
                                    onMouseLeave={() => {
                                      setHoverRow(null)
                                      setHoverCol(null)
                                    }}
                                  >
                                    {formatValue(row.width)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Visual Image */}
                        <div className="mt-8 flex justify-center">
                          <div className="relative w-full aspect-[4/5] max-w-[400px]">
                            <Image
                              src="/size_visual.jpeg"
                              alt="Size visual reference"
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
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
