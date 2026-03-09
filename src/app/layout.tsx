import { ProgressBarProvider } from "@lib/context/progress-bar-context"
import { getBaseURL } from "@lib/util/env"
import NavigationProgress from "@modules/layout/components/navigation-progress"
import ProgressBar from "@modules/layout/components/progress-bar"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className="font-sans">
      <body>
        <ProgressBarProvider>
          <ProgressBar />
          <NavigationProgress />
          <main className="relative">{props.children}</main>
        </ProgressBarProvider>
      </body>
    </html>
  )
}
