"use client";

import { Sidebar } from "@/components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Sidebar className="sticky top-0 h-screen" />
      <main className="w-full">{children}</main>
    </div>
  );
}
