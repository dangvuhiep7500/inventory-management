import { useAuthStore } from "@/store/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isAuthentication = useAuthStore((state) => state.successLogin);

  useEffect(() => {
    if (!isAuthentication) {
      router.push("/auth/signin"); // redirect to login page if user is not authenticated
    }
  }, [isAuthentication, router]);

  if (isAuthentication) {
    return <>{children}</>;
  } else {
    return null;
  }
};
