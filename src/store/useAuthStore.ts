import { School } from "@/pages/auth/LoginPage";
import { toast } from "sonner";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


interface AuthUser {
  id: string;
  username?: string;
  name?: string;
  email: string;
  school_id: string;
  role: string;
  
}

interface AuthState {

  authUser: AuthUser | null;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;

  getUser: () => Promise<void>;
  login: (data: { email: string; password: string; school_id: string; role: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  verifyForOtp: (data: any) => Promise<boolean>;
  changePassword: (data: any)=> Promise<boolean>;
  getSchoolList: () => Promise<School[]>;

}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  school_id: null,
  isLoggingIn: false,
  isCheckingAuth: true,

  //  Get User Controller
  getUser: async () => {
    const token = localStorage.getItem('token');
    try {
      if (!token) {
        toast.error("Please login first");
        return null;
      }
      const res = await axiosInstance.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log("User from getUser:" , res.data.data);

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

  //  Login Controller
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

      toast.success(res.data.message || "Logged In Successfully");
      return true;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Logout Controller
  logout: async () => {
    localStorage.removeItem("token");

    set({ authUser: null });

    toast.success("Logged out successfully");
  },

  //Verify OTP Controller
  verifyForOtp: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/verify-otp", data);
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

  //Change Password Controller
  changePassword: async (data) => {
    try {
      const res = await axiosInstance.post(
        `/auth/change-password/${data.role}`,
        data
      );
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

  // Get Schools Controller
  getSchoolList: async () => {
    try {
      const res = await axiosInstance.get("/auth/schools");

      if (res.data.status) {
        return res.data.data; 
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
