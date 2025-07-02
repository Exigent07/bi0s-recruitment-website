import CustomPointer from "@/components/CustomPointer";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "bi0s Recruitment 2025",
  description: "Recruitment portal for bi0s 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        suppressHydrationWarning={true}
      > 
        <NavBar />
        <CustomPointer />
        {children}
      </body>
    </html>
  );
}
