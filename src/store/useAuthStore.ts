import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

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
  schoolId: string | null;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;

  getUser: () => Promise<void>;
  login: (data: { email: string; password: string; schoolId: string; role: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  getSchoolList: () => Promise<{ id: string; name: string }[]>;

  // 🧩 Forgot password flow
  verifyForOtp: (data: { email: string; role: string; schoolId: string }) => Promise<boolean>;
  changePassword: (data: { email: string; otp: string; newPassword: string; role: string }) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  schoolId: null,
  isLoggingIn: false,
  isCheckingAuth: true,

  // ==================== GET USER ====================
  getUser: async () => {
    try {
      const res = await axiosInstance.get<ApiResponse<AuthUser>>("/auth/user");
      if (res.data.status && res.data.data) {
        
        set({ authUser: res.data.data });

      } else {
        set({ authUser: null });
        toast.error(res.data.message || "Failed to fetch user");
      }
    } catch (error: any) {
      set({ authUser: null });
      console.error("Error in getUser:", error?.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ==================== LOGIN ====================
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post<ApiResponse<{ token: string; user: AuthUser }>>(
        `/auth/login/${data.schoolId}`,
        data
      );

      if (!res.data.status) {
        toast.error(res.data.message);
        return false;
      }

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

  // ==================== LOGOUT ====================
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

  // ==================== FETCH SCHOOLS ====================
  getSchoolList: async () => {
    try {
      const res = await axiosInstance.get<ApiResponse<{ schools: { id: string; name: string }[] }>>("/auth/schools");

      if (res.data.status) {
        return res.data.data.schools;
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

  // ==================== REQUEST OTP ====================
  verifyForOtp: async (data) => {
    try {
      const res = await axiosInstance.post<ApiResponse<{}>>("/auth/verify-otp", data);
      if (res.data.status) {
        toast.success(res.data.message || "OTP sent to your email");
        return true;
      } else {
        toast.error(res.data.message || "Failed to send OTP");
        return false;
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
      return false;
    }
  },

  // ==================== RESET PASSWORD ====================
  changePassword: async (data) => {
    try {
      const res = await axiosInstance.post<ApiResponse<{}>>(`/auth/change-password/${data.role}`, data);
      if (res.data.status) {
        toast.success(res.data.message || "Password reset successfully");
        return true;
      } else {
        toast.error(res.data.message || "Failed to reset password");
        return false;
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
      return false;
    }
  },
}));
