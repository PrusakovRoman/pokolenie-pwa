import "@/app/ui/globals.css";

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: "Поколение",
  description: "Закрытая платформа для участников проекта",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Поколение",
    statusBarStyle: "black-translucent"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/pwa-logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="icon" href="/android/android-launchericon-192-192.png" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col justify-between bg-linear-160 from-gray-200 to-gray-30">
          {children}
        </div>
      </body>
    </html>
  );
}
