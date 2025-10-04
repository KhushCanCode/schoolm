import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

interface AuthUser {
  id: string;   // changed `_id` → `id` to match response payload
  name: string;
  email: string;
  schoolId: string;
  role: string;
}

interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  errors: Record<string, any>;
  meta: Record<string, any>;
}

interface AuthState {
  authUser: AuthUser | null;
  schoolId: string | null;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;

  getUser: () => Promise<void>;
  login: (data: { email: string; password: string; schoolId: string; role: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  getSchoolList: () => Promise<{ id: string; name: string }[]>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  schoolId: null,
  isLoggingIn: false,
  isCheckingAuth: true,

getUser: async () => {
  try {
    const res = await axiosInstance.get<AuthUser>("/auth/user"); 

    if (res.data) {
      set({ authUser: res.data });
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
  login: async (data: { email: string; password: string; schoolId: string; role: string }) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post<ApiResponse<{ token: string; user: AuthUser }>>(
        `/auth/login/${data.schoolId}`,
        {
          email: data.email,
          password: data.password,
          role: data.role,
        }
      );

      if (!res.data.status) {
        toast.error(res.data.message);
        return false;
      }

      // ✅ Extract user from response
      const { user } = res.data.data;
      set({ authUser: user });

      localStorage.setItem("schoolId", user.schoolId);

      toast.success(res.data.message || "Logged In Successfully");
      return true;

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      const res = await axiosInstance.post<ApiResponse<{}>>("/auth/logout");

      if (res.data.status) {
        set({ authUser: null, schoolId: null });
        localStorage.removeItem("schoolId");
        toast.success(res.data.message || "Logged Out Successfully");
      } else {
        toast.error(res.data.message || "Logout failed");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  // ✅ Fetch Schools
getSchoolList: async () => {
  try {
    const res = await axiosInstance.get<ApiResponse<{ schools: { id: string; name: string }[] }>>("/auth/schools");

    if (res.data.status) {
      return res.data.data.schools; // ✅ Access the schools array
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
