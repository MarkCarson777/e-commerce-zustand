"use client";

// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Firebase
import { signIn } from "@/firebase/auth";
// Forms and validation
import { Field, Formik, Form, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
// Components
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icon";
import { Navbar } from "@/components/Navbar";
// Images
import instagram from "/public/images/instagram.jpg";

type SignInValues = {
  email: string;
  password: string;
};

const SignInSchema = z.object({
  email: z
    .string({ required_error: "Your email is required" })
    .email({ message: "This email address is not valid" }),
  password: z.string({ required_error: "Your password is required" }),
});

export default function Page() {
  const router = useRouter();
  const images = [
    instagram,
    instagram,
    instagram,
    instagram,
    instagram,
    instagram,
  ];

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-col h-screen w-full items-center justify-between">
          <div></div>
          <Formik<SignInValues>
            initialValues={{ email: "", password: "" }}
            validationSchema={toFormikValidationSchema(SignInSchema)}
            onSubmit={async (values: SignInValues) => {
              const { result, error } = await signIn(
                values.email,
                values.password
              );

              if (error) {
                return console.log("Error signing in", error);
              }

              console.log("Successfully signed in", result);
              return router.push("/");
            }}
          >
            {({ isSubmitting }) => (
              <div className="flex flex-col gap-4 w-full items-center">
                <span className="font-montserrat text-2xl mb-6">Login</span>
                <Form className="flex flex-col w-1/5">
                  <Field
                    className="pl-4 h-14 border-b-4 text-base focus:outline-none"
                    name="email"
                    type="email"
                    placeholder="Email..."
                    autoComplete="email"
                  />
                  <ErrorMessage
                    className="mt-2 text-base font-sans text-[#f76d73]"
                    name="email"
                    component="div"
                  />
                  <Field
                    className="mt-2 pl-4 h-14 border-b-4 text-base focus:outline-none"
                    name="password"
                    type="password"
                    placeholder="Password..."
                    autoComplete="current-password"
                  />
                  <ErrorMessage
                    className="mt-2 text-base font-sans text-[#f76d73]"
                    name="password"
                    component="div"
                  />
                  <Button
                    className="mt-12 hover:scale-105 duration-300"
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                    pending={isSubmitting}
                  >
                    <span>Sign in</span>
                  </Button>
                </Form>
                <div className="flex gap-1 text-base">
                  <span>Don't have an account?</span>
                  <Link className="underline hover:no-underline" href="/signup">
                    Join us
                  </Link>
                </div>
              </div>
            )}
          </Formik>
          <div className="flex flex-col items-center w-full gap-2 pb-4 px-4">
            <Link
              className="uppercase font-montserrat text-2xl tracking-[8px] font-medium"
              href="#"
            >
              @apolashowroom
            </Link>
            <div className="grid grid-cols-6 gap-4 w-full">
              {images.map((src, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={src}
                    alt={`Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <Icon
                    className="absolute top-1 right-1 opacity-50"
                    icon="InstagramLine"
                    height={48}
                    width={48}
                    color="#FFFFFF"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
