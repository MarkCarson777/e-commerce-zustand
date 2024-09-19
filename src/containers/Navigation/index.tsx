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
import { Icon } from "@/components/Icon";
import { Cart } from "@/components/Cart";
import { Search } from "@/components/Search";
// Images
import logo from "/public/images/apola.png";
// Types
import { User } from "@/types";

type NavigationProps = {
  className?: string;
};

export function Navigation(props: NavigationProps) {
  const { className } = props;
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
    <nav
      className={clsx(
        "sticky top-0 shadow-2xl bg-white z-10 uppercase font-montserrat grid h-16 lg:h-24 w-full grid-cols-2 lg:grid-cols-3 items-center pl-2 lg:pl-4 pr-4 lg:pr-8",
        className
      )}
    >
      <div className="space-x-8 flex items-center">
        {/* Mobile & Desktop */}
        <Link href="/">
          <div className="relative w-[40px] h-12 lg:w-14 lg:h-16">
            <Image
              src={logo}
              alt="Apola Showroom"
              fill
              sizes="(max-width: 640px) 36px, 64px"
            />
          </div>
        </Link>
        {/* Desktop */}
        <div className="hidden lg:flex space-x-8 text-center hover:underline items-center">
          <Link href="#">Shop</Link>
          <Link href="#">Sizing and fit</Link>
          <Link href="#">Customer care</Link>
        </div>
      </div>
      {/* Mobile & Desktop */}
      <Link
        href="/"
        className="hidden lg:block lg:text-center text-2xl tracking-[8px] font-medium mr-[-8px]"
      >
        Apola Showroom
      </Link>
      {/* Mobile & Desktop */}
      <div className="flex justify-end space-x-4 lg:space-x-8">
        <button onClick={() => setSearchOpen(!searchOpen)}>
          <Icon icon="Search" height={24} width={24} color="#000" />
        </button>
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
        <button onClick={() => setCartOpen(true)}>
          <Icon icon="Cart" height={24} width={24} color="#000" />
        </button>
      </div>
      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}
