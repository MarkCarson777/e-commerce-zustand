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

  return (
    <Transition show={isOpen}>
      <div
        className={clsx(
          "absolute top-[96px] w-screen bg-white px-8 h-[96px] shadow-xl transition ease-in-out flex justify-center items-center",
          className,
          // Entering styles
          "data-[enter]:duration-500 data-[enter]:data-[closed]:-translate-y-full data-[closed]:opacity-0",
          // Leaving styles
          "data-[leave]:duration-500 data-[leave]:data-[closed]:-translate-y-full"
        )}
      >
        <div className="flex w-full justify-between items-center">
          <div className="w-6"></div>
          <div className="flex border-b-4 border-gray-200 pb-2 w-1/2 text-lg">
            <div className="px-4">
              <Icon icon="Search" height={24} width={24} />
            </div>
            <input
              className="focus:outline-none font-montserrat w-full"
              placeholder="What are you looking for?"
            />
          </div>
          <button onClick={onClose}>
            <Icon icon="Close" height={24} width={24} />
          </button>
        </div>
      </div>
    </Transition>
  );
}
