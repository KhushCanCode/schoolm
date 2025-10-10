import { School } from "@/pages/auth/LoginPage";
import { toast } from "sonner";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface AuthUser {
  id: string;   // changed `_id` → `id` to match response payload
  name: string;
  email: string;
  school_id: string;
  role: string;
}

interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  errors: Record<string, any>;
  meta: Record<string, any>;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  schoolId: string;
  role: string;
}

interface AuthState {
  authUser: AuthUser | null;
  school_id: string | null;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;

  getUser: () => Promise<void>;
  login: (data: { email: string; password: string; school_id: string; role: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  getSchoolList: () => Promise<School[]>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  school_id: null,
  isLoggingIn: false,
  isCheckingAuth: true,

  getUser: async () => {
    const token = localStorage.getItem('token');
    try {
      if (!token) {
        toast.error("Token missing");
        return null;
      }
      const res = await axiosInstance.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(res);

      if (res.data.status) {
        set({ authUser: res.data.data });
      } else {
        set({ authUser: null });
        toast.error("Failed to fetch user");
      }
    } catch (error: any) {
      set({ authUser: null });
      console.error("Error in getUser:", error?.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  //  Login 
  login: async (data: { email: string; password: string; school_id: string; role: string }) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post<{ token: string; message: string; }>(
        `/auth/login/${data.school_id}`,
        {
          email: data.email,
          password: data.password,
          role: data.role,
        }
      );
      const token = res.data.token;
      localStorage.setItem('token', token);
      // console.log(res);

      toast.success(res.data.message || "Logged In Successfully");
      return true;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ==================== LOGOUT ====================
  logout: async () => {
    localStorage.clear;
  },

  // ✅ Fetch Schools
  getSchoolList: async () => {
    try {
      const res = await axiosInstance.get<ApiResponse<School[]>>("/auth/schools");
      // console.log(res);

      if (res.data.status) {
        return res.data.data; // ✅ Access the schools array
      } else {
        toast.error(res.data.message || "Failed to fetch schools");
        return [];
      }
    } catch (error: any) {
      console.error("Error fetching schools:", error?.response?.data?.message || error.message);
      toast.error("Failed to fetch schools");
      return [];
    }
  },
}));
