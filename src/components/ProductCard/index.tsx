// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
// Third party
import clsx from "clsx";
// Stores
import { useProductStore } from "@/stores/ProductStore";
// Components
import { Button } from "@/components/Button";
// Types
import { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard(props: ProductCardProps) {
  const { product, className } = props;
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const router = useRouter();
  const path = usePathname();

  return (
    <Link
      className="hover:scale-105 hover:border-b-4 border-gray-200 duration-200"
      href={`/products/${product.id}`}
    >
      <article
        className={clsx(
          "flex flex-col rounded overflow-clip h-[600px]",
          className
        )}
      >
        <figure className="relative flex flex-1 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{
              objectFit: "cover",
            }}
            sizes="20vw"
            priority
          />
        </figure>
        <div className="flex flex-col items-center w-full p-4 gap-2 h-fit">
          <h2 className="font-montserrat uppercase text-md hover:underline">
            {product.name}
          </h2>
          <p className="font-montserrat text-xl font-semibold tracking-wider">
            £{product.price}
          </p>
          {path === "/dashboard" && (
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/dashboard/edit/${product.id}`);
                }}
              >
                <span>Edit</span>
              </Button>
              <Button
                type="button"
                color="danger"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (product.id) {
                    await deleteProduct(product.id);
                  } else {
                    console.error("Product id is missing");
                  }
                }}
              >
                <span>Remove</span>
              </Button>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
