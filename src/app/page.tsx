"use client";

// Next
import Image from "next/image";
import Link from "next/link";
// Components
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SlideCarousel } from "@/components/SlideCarousel";
// Containers
import { Navigation } from "@/containers/Navigation";
// Images
import pinkOne from "/public/images/pink-one.jpg";
import pinkTwo from "/public/images/pink-two.jpg";
import pinkThree from "/public/images/pink-three.jpg";

export default function Home() {
  const productSections = [
    {
      title: "Tops",
      src: pinkOne,
      href: "/product-category/tops",
    },
    {
      title: "Pants",
      src: pinkTwo,
      href: "/product-category/pants",
    },
    {
      title: "Accessories",
      src: pinkThree,
      href: "/product-category/accessories",
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="h-screen flex flex-col w-full">
        <Navigation />
        <SlideCarousel className="flex-1" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3  w-full">
        {productSections.map(({ title, src, href }, index) => (
          <Link key={index} className="relative aspect-square" href={href}>
            <Image className="object-cover" src={src} alt={title} fill />
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-black">
              <span className="uppercase text-4xl font-montserrat font-semibold">
                {title}
              </span>
              <span className="text-2xl underline font-montserrat underline-offset-2 hover:no-underline">
                Shop now
              </span>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </main>
  );
}
