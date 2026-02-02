import "@/app/ui/globals.css";

import type { Metadata, Viewport } from "next";
import OfflineAlert from '@/app/ui/offline-alert'

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Поколение",
  description: "Закрытая платформа для участников проекта",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon.ico" },
      { url: "/icons/android/android-launchericon-192-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/android/android-launchericon-512-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/android/android-launchericon-192-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: [{ url: "/icons/favicon.ico" }],
  },
  appleWebApp: {
    capable: true,
    title: "Поколение",
    statusBarStyle: "black-translucent",
  },
  other: {
    'mobile-web-app-capable': 'yes',
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Поколение" />
        <link rel="apple-touch-icon" href="/icons/ios/180.png" />
        <link rel="icon" href="/icons/favicon.ico" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col justify-between bg-linear-160 from-gray-200 to-gray-30">
          {children}
          <OfflineAlert />
        </div>
      </body>
    </html>
  );
}
