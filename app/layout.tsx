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
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon.ico", type: "image/x-icon" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icons/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    title: "Поколение",
    statusBarStyle: "black-translucent",
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#000000',
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
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
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
