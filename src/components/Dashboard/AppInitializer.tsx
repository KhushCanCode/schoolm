// AppInitializer.tsx
import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getUser = useAuthStore((state) => state.getUser);

  useEffect(() => {
    getUser(); // fetch auth user on app load
  }, [getUser]);

  return <>{children}</>;
};
