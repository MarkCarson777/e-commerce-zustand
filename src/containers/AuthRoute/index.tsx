"use client";

import { ComponentType, useEffect } from "react";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";

type AuthRouteProps = {
  [key: string]: any;
};

export const AuthRoute = (Page: ComponentType<AuthRouteProps>) => {
  return function AuthRouteComponent(props: AuthRouteProps) {
    const currentUser = useAuthStore((state) => state.currentUser);
    const router = useRouter();

    useEffect(() => {
      if (!currentUser) {
        router.push("/signin");
      }
    }, [currentUser, router]);

    return currentUser ? <Page {...props} /> : null;
  };
};
