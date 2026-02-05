import { Metadata } from "next"

import AccountAccordion from "@modules/account/components/account-accordion"
import { notFound } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import { listRegions, getRegion } from "@lib/data/regions"

export default async function OverviewTemplate(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const customer = await retrieveCustomer().catch(() => null)
  const orders = (await listOrders().catch(() => null)) || null
  const regions = await listRegions().catch(() => [])
  const region = await getRegion(countryCode).catch(() => null)

  if (!customer || !region) {
    notFound()
  }

  return <AccountAccordion customer={customer} orders={orders} regions={regions} region={region} />
}
