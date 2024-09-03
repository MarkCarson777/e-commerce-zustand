import Link from "next/link";
import { Field, Formik, Form } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Icon } from "@/components/Icon";

type SubscribeValues = {
  name: string;
  email: string;
};

const SubscribeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export function Footer() {
  return (
    <footer className="bg-[#ffdee5] pb-8 w-full px-4">
      <div className="grid grid-cols-3 py-28">
        <section className="flex flex-col items-center">
          <h2 className="uppercase text-lg font-semibold">Care & details</h2>
          <nav className="flex flex-col gap-2 mt-4 items-center">
            <Link
              className="text-base hover:underline decoration-2 font-montserrat"
              href="#"
            >
              FAQ
            </Link>
            <Link
              className="text-base hover:underline decoration-2 font-montserrat"
              href="#"
            >
              Garment Care
            </Link>
            <Link
              className="text-base hover:underline decoration-2 font-montserrat"
              href="#"
            >
              Terms & Conditions
            </Link>
            <Link
              className="text-base hover:underline decoration-2 font-montserrat"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-base hover:underline decoration-2 font-montserrat"
              href="#"
            >
              Shipping Policy
            </Link>
            <Link
              className="text-base hover:underline decoration-2 font-montserrat"
              href="#"
            >
              Returns & Exchanges
            </Link>
          </nav>
        </section>
        <section className="flex flex-col items-center">
          <h2 className="uppercase font-semibold text-lg">
            Sign up for our news
          </h2>
          <p className="mt-5 text-base font-montserrat">
            Be the first one to receive new releases, special offers, and
            more...
          </p>
          <Formik<SubscribeValues>
            initialValues={{ name: "", email: "" }}
            validationSchema={toFormikValidationSchema(SubscribeSchema)}
            onSubmit={(values: SubscribeValues) => {
              console.log("subscribe", values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full mt-8">
                <div className="flex gap-4">
                  <Field
                    className="pl-4 h-14 text-base focus:outline-none w-1/2"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  <Field
                    className="pl-4 h-14 text-base focus:outline-none w-1/2"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    autoComplete="email"
                  />
                </div>
                <button
                  className="w-full h-14 border-2 border-black mt-4 hover:underline duration-300"
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                >
                  <span className="uppercase">Subscribe</span>
                </button>
              </Form>
            )}
          </Formik>
          <div className="flex gap-8 mt-16">
            <Link href="#">
              <Icon
                className="hover:scale-110 duration-300"
                icon="Instagram"
                height={48}
                width={48}
              />
            </Link>
            <Link className="hover:scale-110 duration-300" href="#">
              <Icon icon="Facebook" height={48} width={48} />
            </Link>
            <Link className="hover:scale-110 duration-300" href="#">
              <Icon icon="Pinterest" height={48} width={48} />
            </Link>
          </div>
        </section>
        <section className="flex flex-col items-center">
          <h2 className="uppercase text-lg font-semibold">Connect</h2>
          <nav className="flex flex-col gap-2 mt-4 items-center">
            <Link
              className="text-base hover:underline decoration-2 font-montserrat"
              href="#"
            >
              About us
            </Link>
            <Link
              className="text-base hover:underline decoration-2 font-montserrat"
              href="#"
            >
              Contact us
            </Link>
            <Link
              className="text-base hover:underline decoration-2 font-montserrat"
              href="#"
            >
              Find us here
            </Link>
          </nav>
        </section>
      </div>
      <div className="h-px w-full bg-black mb-2"></div>
      <p className="text-sm hover:underline decoration-2 font-montserrat">
        2024 Apola Showroom developed by Neon Grenade
      </p>
    </footer>
  );
}
