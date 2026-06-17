import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "AuraClinic — World-Class Healthcare in New York",
  description: "AuraClinic delivers premium, board-certified medical care in Midtown Manhattan. Same-day appointments, advanced diagnostics, and a patient-first experience.",
  keywords: "clinic NYC, board certified doctors, same day appointment, preventive care, medical specialists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        {/* Font preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Plus Jakarta Sans + Manrope + Inter */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ background: "#FAFBFD", color: "#0F172A" }}>
        <Header />
        <div className="flex-grow flex flex-col w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
