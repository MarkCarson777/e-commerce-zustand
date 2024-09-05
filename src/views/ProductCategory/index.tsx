"use client";

// React
import { useEffect } from "react";
// Stores
import { useProductStore } from "@/stores/ProductStore";
// Components
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { ProductsHeader } from "@/components/ProductsHeader";

type ProductCategoryProps = {
  category: string;
};

export function ProductCategory(props: ProductCategoryProps) {
  const { category } = props;
  const { loading, products, getProductsByCategory } = useProductStore(
    (state) => state
  );

  useEffect(() => {
    getProductsByCategory(category);
  }, []);

  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col h-screen w-full">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <section className="h-full flex items-center justify-center">
              <Loader size="100px" />
            </section>
          ) : (
            <>
              <ProductsHeader label={category} />
              <section className="grid grid-cols-5 gap-4 p-4 w-full">
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </section>
              <Footer />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
