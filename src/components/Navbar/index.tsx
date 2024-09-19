"use client";

// React
import { useState, useEffect } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Third party
import clsx from "clsx";
// Stores
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/UserStore";
// Components
import { Cart } from "@/components/Cart";
import { Icon } from "@/components/Icon";
import { Search } from "@/components/Search";
// Images
import apolaLogo from "/public/images/apola.png";
// Types
import { User } from "@/types";

type NavbarProps = {
  shadow: boolean;
  className?: string;
};

export function Navbar(props: NavbarProps) {
  const { shadow, className } = props;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const getUser = useUserStore((state) => state.getUser);

  useEffect(() => {
    if (currentUser) {
      const fetchUser = async () => {
        try {
          const user: User = await getUser(currentUser.uid);
          setIsAdmin(user.isAdmin);
        } catch (error) {
          console.error("Error fetching user", error);
        }
      };

      fetchUser();
    }
  }, [currentUser]);

  return (
    <div className="w-full z-20">
      <nav
        className={clsx(
          "sticky top-0 grid grid-cols-3 bg-[#fff] pl-4 py-4 pr-8 w-full text-black z-20",
          shadow && "shadow-xl",
          className
        )}
      >
        <ul className="flex items-center gap-8">
          <li>
            <Link href="/">
              <Image
                src={apolaLogo}
                alt="Apola Showroom"
                width={0}
                height={0}
                sizes="72px"
                style={{ width: "72px", height: "auto" }}
              />
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="uppercase hover:underline font-montserrat">
                Shop
              </span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="uppercase hover:underline font-montserrat">
                Sizing and fit
              </span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="uppercase hover:underline font-montserrat">
                Customer care
              </span>
            </Link>
          </li>
        </ul>
        <Link href="/" className="flex justify-center items-center">
          <span className="uppercase font-montserrat text-2xl tracking-[8px] font-medium mr-[-8px]">
            Apola Showroom
          </span>
        </Link>
        <ul className="flex gap-8 justify-end items-center">
          <li>
            <button onClick={() => setSearchOpen(!searchOpen)}>
              <Icon icon="Search" height={24} width={24} color="#000" />
            </button>
          </li>
          <li>
            <Link
              href={
                currentUser === null
                  ? "/signin"
                  : isAdmin
                  ? "/dashboard"
                  : "/account"
              }
            >
              <Icon icon="User" height={24} width={24} color="#000" />
            </Link>
          </li>
          <li>
            <button onClick={() => setCartOpen(true)}>
              <Icon icon="Cart" height={24} width={24} color="#000" />
            </button>
          </li>
        </ul>
      </nav>
      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
