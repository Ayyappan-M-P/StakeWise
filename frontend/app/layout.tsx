import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { UserProvider } from "./UserContext";



export const metadata: Metadata = {
  title: "Investment Website",
  description: "Invester can buy sell the stock",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>

        <Navbar />
        <main className="relative overflow-hidden">
          {children}
        </main>
        <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
