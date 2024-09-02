"use client";

import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { UserContextProvider } from "@/context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
