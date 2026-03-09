"use server"
import { cookies as nextCookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_URL = process.env.MEDUSA_ADMIN_URL || process.env.MEDUSA_BACKEND_URL || ""

export async function resetOnboardingState(orderId: string) {
  const cookies = await nextCookies()
  cookies.set("_medusa_onboarding", "false", { maxAge: -1 })
  redirect(`${ADMIN_URL}/a/orders/${orderId}`)
}
