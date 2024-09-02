"use client";

// React
import { useEffect } from "react";
// Next
import Link from "next/link";
// Routing
import { AuthRoute } from "@/containers/AuthRoute";
// Store
import { useProductStore } from "@/stores/useProductStore";
// Components
import { ProductCard } from "@/components/ProductCard";

function Page() {
  const { products, getProducts } = useProductStore((state) => ({
    products: state.products,
    getProducts: state.getProducts,
  }));

  useEffect(() => {
    getProducts();
  }, [products]);

  return (
    <main>
      <div className="bg-gray-200 w-full flex justify-between items-center pr-2 pl-4 py-2 min-h-16">
        <h1 className="text-2xl">All Products</h1>
        <div className="relative flex font-semibold h-12 justify-center items-center rounded-md text-white bg-blue-500 w-fit px-4">
          <Link href="/dashboard/create">Add product</Link>
        </div>
      </div>
      <section className="relative grid grid-cols-4 gap-3 p-2">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </section>
    </main>
  );
}

export default AuthRoute(Page);
