"use client";

import { Field, Formik, Form, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { signIn } from "@/firebase/auth";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Navbar } from "@/components/Navbar";

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

  return (
    <div className="flex flex-1 flex-col h-screen">
      <Navbar />
      <div className="flex flex-col flex-1 w-full items-center justify-center">
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
                  className="mt-12"
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
      </div>
      <div className="flex flex-col items-center self-center">
        <Link
          className="uppercase font-montserrat text-2xl tracking-[8px] font-medium"
          href="/signup"
        >
          @apolashowroom
        </Link>
        <span>*INSTAGRAM GALLERY*</span>
      </div>
    </div>
  );
}
