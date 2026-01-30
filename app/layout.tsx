import "@/app/ui/globals.css";

import type { Metadata, Viewport } from "next";

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
      { url: "/favicon.ico" },
      { url: "/icons/android/android-launchericon-192-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/android/android-launchericon-512-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/android/android-launchericon-192-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
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
        <link rel="apple-touch-icon" href="/icons/ios/180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col justify-between bg-linear-160 from-gray-200 to-gray-30">
          {children}
        </div>
      </body>
    </html>
  );
}
