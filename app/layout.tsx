import type { Metadata } from "next";
import { Dancing_Script, Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Valentine AI Gift Finder",
  description: "Find the perfect Valentine's gift for your special someone with AI-powered suggestions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dancingScript.variable} ${montserrat.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
