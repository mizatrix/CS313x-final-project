import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MSA CS313x | Information Retrieval Projects",
  description: "MSA University — Faculty of Computer Science. CS313x Information Retrieval & Data Analysis project hub. Supervised by Dr. Moataz Samy, TA. Farah Darwish & TA. Mazen Ashraf.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* Background Elements for Glassmorphism */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        {children}
      </body>
    </html>
  );
}
