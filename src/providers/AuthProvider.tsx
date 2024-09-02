import { useEffect } from "react";
import { useAuthStore } from "@/stores/AuthStore";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading, watchAuthState } = useAuthStore((state) => ({
    loading: state.loading,
    watchAuthState: state.watchAuthState,
  }));

  useEffect(() => {
    const unsubscribe = watchAuthState();

    return () => unsubscribe();
  }, [watchAuthState]);

  return loading ? null : <>{children}</>;
};
