"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="w-full shadow-xl z-10">
        <Navbar />
      </div>
      <Footer />
    </main>
  );
}
