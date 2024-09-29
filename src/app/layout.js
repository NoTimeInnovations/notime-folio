import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NoTime",
  description: "Master Modern Web Development With a Project Based Approach",
  openGraph: {
    images: [
      "https://cdn.sanity.io/images/tgzcz07i/production/80c6f026b58e75e993aeb105654f971e76a50981-2557x1342.png",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Toaster position="bottom-center" reverseOrder={false} />
        <Analytics />
      </body>
    </html>
  );
}
