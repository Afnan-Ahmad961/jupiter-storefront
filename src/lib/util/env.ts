export const getBaseURL = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

  // Ensure the URL has a protocol (https:// or http://)
  if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
    return `https://${baseUrl}`
  }

  return baseUrl
}
