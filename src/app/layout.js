import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import Cookies from "js-cookie";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SMAD Surveyor Web",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* {
          token ? (
            <AuthenticatedLayout>
              {children}
            </AuthenticatedLayout>
          ) : (
            children
          )
        } */}
        {children}
      </body>
    </html>
  );
}
