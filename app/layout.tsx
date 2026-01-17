import "@/app/ui/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col justify-between bg-linear-160 from-gray-200 to-gray-30">
          {children}
        </div>
      </body>
    </html>
  );
}
