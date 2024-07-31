import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Next.Js | Nodemailer",
    description: "Send a mail using nextjs and nodemailer",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
        <body className={`bg-slate-500 ${inter.className}`}>
            {children}
        </body>
    </html>
  );
}
