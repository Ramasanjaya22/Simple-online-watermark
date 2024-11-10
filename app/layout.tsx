import type { Metadata } from "next";
import localFont from "next/font/local";
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
  title: "Simple Online Watermark Tool - Free Image Watermarking",
  description: "Add professional watermarks to your images online for free. Easy-to-use tool for adding text or image watermarks with customizable opacity, size, and position. Perfect for photographers and content creators.",
  keywords: "watermark tool, image watermark, online watermark, free watermark maker, photo watermark, watermark images online, add watermark to photo",
  openGraph: {
    title: "Simple Online Watermark Tool - Free Image Watermarking",
    description: "Add professional watermarks to your images online for free. Easy-to-use tool for adding text or image watermarks.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple Online Watermark Tool - Free Image Watermarking",
    description: "Add professional watermarks to your images online for free. Easy-to-use tool for adding text or image watermarks.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
