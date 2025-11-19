// app/layout.jsx
"use client"; // só para poder usar hooks como usePathname
import Navbar from "./components/navbar/page.jsx";
import Footer from "./components/Footer/page.jsx";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login";

  return (
    <html lang="pt-br">
      <body className="antialiased">
        {!hideLayout && <Navbar />}
        {children}
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
};



