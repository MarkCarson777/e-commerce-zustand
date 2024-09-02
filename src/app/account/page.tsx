"use client";
import { useAuthStore } from "@/stores/AuthStore";
import { AuthRoute } from "@/containers/AuthRoute";
import { signOut } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import Link from "next/link";

function Page() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const router = useRouter();

  return (
    <div>
      <h1>Your account</h1>
      <Link href="/">Back</Link>
      {currentUser !== null && (
        <button
          className="flex border-2 border-black p-4"
          type="button"
          onClick={() => {
            signOut();
            router.push("/");
          }}
        >
          <Icon icon="Signout" height={24} width={24} color="#000" />
          <span className="uppercase">Sign out</span>
        </button>
      )}
    </div>
  );
}

export default AuthRoute(Page);
