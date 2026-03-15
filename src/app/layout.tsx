import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sri Lanka Fuel Pass Generator | Digital QR Card",
  description: "Generate and save your digital Sri Lanka Fuel Pass (National Fuel Pass) instantly. Convert your fuel pass QR to a high-quality, mobile-friendly card.",
  keywords: ["fuel pass", "fuel pass sri lanka", "national fuel pass", "fuel pass qr", "ceypetco fuel pass", "sri lanka fuel quota", "fuel pass generator", "digital fuel card"],
  authors: [{ name: "Uvindu Rajapakshe", url: "https://facebook.com/UvinduOnline" }],
  openGraph: {
    title: "Sri Lanka Fuel Pass Generator",
    description: "Create your digital National Fuel Pass card and save it offline on your mobile device instantly.",
    type: "website",
    locale: "en_LK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Fuel Pass Generator",
    description: "Generate your digital Fuel Pass card.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics Tag */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-S6VV69DS6D`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S6VV69DS6D');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
