import { ProgressBarProvider } from "@lib/context/progress-bar-context"
import { getBaseURL } from "@lib/util/env"
import NavigationProgress from "@modules/layout/components/navigation-progress"
import ProgressBar from "@modules/layout/components/progress-bar"
import { Metadata } from "next"
import Script from "next/script"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className="font-sans">
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '946641981329100');
fbq('track', 'PageView');
            `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=946641981329100&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
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
