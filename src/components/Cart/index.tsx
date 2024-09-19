// Third party
import clsx from "clsx";
import { Transition, TransitionChild } from "@headlessui/react";
// Components
import { Icon } from "@/components/Icon";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Cart(props: CartProps) {
  const { isOpen, onClose } = props;

  return (
    <Transition show={isOpen}>
      <TransitionChild>
        <div className="flex justify-end fixed top-0 right-0 h-screen w-full bg-[#ffdee5] bg-opacity-50 transition duration-500 data-[closed]:opacity-0 z-20"></div>
      </TransitionChild>
      <TransitionChild>
        <div
          className={clsx(
            "absolute top-0 right-0 h-screen flex flex-col bg-white w-10/12 lg:w-1/4 px-8 shadow-xl transition ease-in-out z-30",
            // Entering styles
            "data-[enter]:duration-500 data-[enter]:data-[closed]:translate-x-full",
            // Leaving styles
            "data-[leave]:duration-500 data-[leave]:data-[closed]:translate-x-full"
          )}
        >
          <div className="flex w-full justify-between items-center tracking-[6px] font-medium border-b-4 h-16 lg:h-24">
            <div className="w-6"></div>
            <h2 className="font-montserrat text-xl lg:text-2xl uppercase">
              Cart
            </h2>
            <button onClick={onClose}>
              <Icon icon="Close" height={24} width={24} />
            </button>
          </div>
          <div className="flex flex-col flex-1 items-center justify-center">
            <span className="font-montserrat">Your cart is empty</span>
          </div>
        </div>
      </TransitionChild>
    </Transition>
  );
}
