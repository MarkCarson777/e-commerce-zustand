// Third party
import clsx from "clsx";
import { Transition, TransitionChild } from "@headlessui/react";
// Components
import { Icon } from "@/components/Icon";

type SearchProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Search(props: SearchProps) {
  const { isOpen, onClose } = props;

  return (
    <Transition show={isOpen}>
      <TransitionChild>
        <div
          className={clsx(
            "absolute w-screen bg-white px-8 py-10 shadow-xl transition ease-in-out z-10",
            // Entering styles
            "data-[enter]:duration-500 data-[enter]:data-[closed]:-translate-y-full",
            // Leaving styles
            "data-[leave]:duration-500 data-[leave]:data-[closed]:-translate-y-full"
          )}
        >
          <div className="flex w-full justify-between items-center tracking-[6px] font-medium">
            <div className="w-6"></div>
            <h2 className="font-montserrat text-2xl uppercase">Search</h2>
            <button onClick={onClose}>
              <Icon icon="Close" height={24} width={24} />
            </button>
          </div>
        </div>
      </TransitionChild>
    </Transition>
  );
}
