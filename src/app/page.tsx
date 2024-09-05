"use client";

// React
import { useState, useEffect, useRef } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Components
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SlideCarousel } from "@/components/SlideCarousel";
// Images
import pinkOne from "/public/images/pink-one.jpg";
import pinkTwo from "/public/images/pink-two.jpg";
import pinkThree from "/public/images/pink-three.jpg";

export default function Home() {
  const [navbarHeight, setNavbarHeight] = useState<number>();
  const heightRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (heightRef.current) {
      setNavbarHeight(heightRef.current.clientHeight);
    }
  }, [heightRef.current]);

  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="w-full shadow-xl z-10" ref={heightRef}>
        <Navbar />
      </div>
      <SlideCarousel style={{ height: `calc(100vh - ${navbarHeight}px)` }} />
      <div className="grid grid-cols-3 h-[600px] w-full">
        {productSections.map(({ title, src, href }, index) => (
          <Link key={index} className="relative h-full w-full" href={href}>
            <Image
              src={src}
              alt={title}
              style={{
                objectFit: "cover",
              }}
              fill
              priority
            />
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
