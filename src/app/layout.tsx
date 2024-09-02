"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/AuthStore";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const watchAuthState = useAuthStore((state) => state.watchAuthState);

  useEffect(() => {
    const unsubscribe = watchAuthState();

    return () => unsubscribe();
  }, [watchAuthState]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
