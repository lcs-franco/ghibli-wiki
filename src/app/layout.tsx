import { QueryClientProvider } from "@components/query-client-provider";
import type { Metadata } from "next";
import { Nunito, PT_Sans } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Ghibli Wiki",
  icons: "/miyazaki.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${ptSans.variable} antialiased relative`}
      >
        <QueryClientProvider>
          <div className="texture" />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
