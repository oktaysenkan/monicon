import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
      <Script
        src="https://cdn.seline.com/seline.js"
        data-token="df6210bb1ad8bf7"
        strategy="afterInteractive"
      />
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="6bb1666f-8ea7-4876-9348-acb7d9679e79"
        strategy="afterInteractive"
      />
    </html>
  );
}
