"use client";

// React
import { useEffect } from "react";
// Stores
import { useProductStore } from "@/stores/ProductStore";
// Components
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { ProductsHeader } from "@/components/ProductsHeader";

export default function Page() {
  const { loading, products, getProductsByCategory } = useProductStore(
    (state) => state
  );

  useEffect(() => {
    getProductsByCategory("accessories");
  }, []);

  return (
    <main className="flex flex-col min-h-screen items-center">
      <Navbar />
      <ProductsHeader label="Accessories" />
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <section>Loading...</section>
        ) : (
          <section className="grid grid-cols-5 gap-3 p-2 w-full">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
