import { School } from "@/pages/auth/LoginPage";
import { toast } from "sonner";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

<<<<<<< HEAD
interface AuthUser {
  id: string;   // changed `_id` → `id` to match response payload
  name: string;
  email: string;
  school_id: string;
  role: string;
}

=======
>>>>>>> 2db0dfb9ec277893aad1a53902b2da557da7f3b6
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
<<<<<<< HEAD
  getSchoolList: () => Promise<School[]>;
=======
  getSchoolList: () => Promise<{ id: string; name: string }[]>;

  // 🧩 Forgot password flow
  verifyForOtp: (data: { email: string; role: string; schoolId: string }) => Promise<boolean>;
  changePassword: (data: { email: string; otp: string; newPassword: string; role: string }) => Promise<boolean>;
>>>>>>> 2db0dfb9ec277893aad1a53902b2da557da7f3b6
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  school_id: null,
  isLoggingIn: false,
  isCheckingAuth: true,

<<<<<<< HEAD
  getUser: async () => {
    try {
      const res = await axiosInstance.get<AuthUser>("/auth/user");

      if (res.data) {
        set({ authUser: res.data });
      } else {
        set({ authUser: null });
        toast.error("Failed to fetch user");
=======
  // ==================== GET USER ====================
  getUser: async () => {
    try {
      const res = await axiosInstance.get<ApiResponse<AuthUser>>("/auth/user");
      if (res.data.status && res.data.data) {
        
        set({ authUser: res.data.data });

      } else {
        set({ authUser: null });
        toast.error(res.data.message || "Failed to fetch user");
>>>>>>> 2db0dfb9ec277893aad1a53902b2da557da7f3b6
      }
    } catch (error: any) {
      set({ authUser: null });
      console.error("Error in getUser:", error?.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

<<<<<<< HEAD
  //  Login 
  login: async (data: { email: string; password: string; school_id: string; role: string }) => {
=======
  // ==================== LOGIN ====================
  login: async (data) => {
>>>>>>> 2db0dfb9ec277893aad1a53902b2da557da7f3b6
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post<ApiResponse<{ token: string; user: AuthUser }>>(
<<<<<<< HEAD
        `/auth/login/${data.school_id}`,
        {
          email: data.email,
          password: data.password,
          role: data.role,
        }
=======
        `/auth/login/${data.schoolId}`,
        data
>>>>>>> 2db0dfb9ec277893aad1a53902b2da557da7f3b6
      );
      console.log(res);

      if (!res.data.status) {
        toast.error(res.data.message);
        return false;
      }

      const { user } = res.data.data;
      set({ authUser: user });
<<<<<<< HEAD

      localStorage.setItem("school_id", user.school_id);

=======
      localStorage.setItem("schoolId", user.schoolId);
>>>>>>> 2db0dfb9ec277893aad1a53902b2da557da7f3b6
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
<<<<<<< HEAD
      console.log(res);

=======
>>>>>>> 2db0dfb9ec277893aad1a53902b2da557da7f3b6
      if (res.data.status) {
        set({ authUser: null, school_id: null });
        localStorage.removeItem("schoolId");
        toast.success(res.data.message || "Logged Out Successfully");
      } else {
        toast.error(res.data.message || "Logout failed");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

<<<<<<< HEAD
  // ✅ Fetch Schools
  getSchoolList: async () => {
    try {
      const res = await axiosInstance.get<ApiResponse<School[]>>("/auth/schools");
      console.log(res);

      if (res.data.status) {
        return res.data.data; // ✅ Access the schools array
=======
  // ==================== FETCH SCHOOLS ====================
  getSchoolList: async () => {
    try {
      const res = await axiosInstance.get<ApiResponse<{ schools: { id: string; name: string }[] }>>("/auth/schools");

      if (res.data.status) {
        return res.data.data.schools;
>>>>>>> 2db0dfb9ec277893aad1a53902b2da557da7f3b6
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
<<<<<<< HEAD
=======

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
>>>>>>> 2db0dfb9ec277893aad1a53902b2da557da7f3b6
}));
