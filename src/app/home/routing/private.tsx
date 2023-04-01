import { useAuthStore } from "@/store/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthentication = useAuthStore((state) => state.successLogin);
  useEffect(() => {
    if (!isAuthentication) {
      router.push("/auth/signin");
    }
    setIsLoading(true);
  }, [isAuthentication, router]);
  return isLoading ? <>{children}</> : null;
};
