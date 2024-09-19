// React
import { useEffect, useRef } from "react";
// Third party
import clsx from "clsx";
import { Transition } from "@headlessui/react";
// Components
import { Icon } from "@/components/Icon";

type SearchProps = {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

export function Search(props: SearchProps) {
  const { isOpen, onClose, className } = props;
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", onClickOutside);
    } else {
      document.removeEventListener("mousedown", onClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <Transition show={isOpen}>
      <div
        ref={searchRef}
        className={clsx(
          "absolute lg:top-24 w-screen bg-white px-[12px] lg:px-8 h-16 lg:h-24 shadow-xl transition ease-in-out flex justify-center items-center",
          "data-[enter]:duration-500 data-[enter]:data-[closed]:-translate-y-full data-[closed]:opacity-0",
          "data-[leave]:duration-500 data-[leave]:data-[closed]:-translate-y-full",
          className
        )}
      >
        <div className="flex w-full justify-between items-center">
          <div className="w-6 hidden lg:block"></div>
          <div className="flex items-center border-b-2 lg:border-b-4 border-gray-200 lg:pb-2 w-full lg:w-1/2 text-base lg:text-lg h-10">
            <div className="px-4">
              <Icon icon="Search" height={24} width={24} />
            </div>
            <input
              className="focus:outline-none font-montserrat w-full"
              placeholder="What are you looking for?"
            />
          </div>
          <button className="hidden lg:block" onClick={onClose}>
            <Icon icon="Close" height={24} width={24} />
          </button>
        </div>
      </div>
    </Transition>
  );
}
