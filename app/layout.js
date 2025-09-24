import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Sharf's Portfolio",
  description:
    "This is a developer portfolio created by and for Sharfuzzaman Noor Sadman.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <div
          className="
            relative
            w-full h-screen 
            bg-[#f7f3ed] 
            bg-grid bg-grid-size 
            font-['SF_Pro_Display'] 
            [background-attachment:fixed]
          "
        >
          {children}
        </div>
      </body>
    </html>
  );
}
