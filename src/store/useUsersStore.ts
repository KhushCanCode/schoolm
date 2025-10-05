import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

// Generic API response structure
interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  errors?: Record<string, any>;
  meta?: Record<string, any>;
}

// Student form interface
interface StudentForm {
  candidateName?: string;
  gender?: string;
  addhar?: string;
  dob?: string;
  class?: string;
  section?: string;
  rollNo?: string;
  email?: string;
  parentEmail?: string;
  fatherName?: string;
  motherName?: string;
  phone?: string;
  address?: string;
  transportService?: boolean;
  libraryService?: boolean;
  computerService?: boolean;
  admissionDate?: string;
}

// Stats response type
interface Stats {
  totalStudents: number;
  totalUsers: number;
  pendingDues: number;
  classCount: number;
}

// Zustand store interface
interface UsersState {
  registerStudent: (schoolId: string, data: StudentForm) => Promise<boolean>;
  updateStudent: (studentId: string, schoolId: string, data: StudentForm) => Promise<boolean>;
  getStats: (schoolId: string) => Promise<Stats | null>;
}

export const useUsersStore = create<UsersState>(() => ({
  // Register student
  registerStudent: async (schoolId, data) => {
    try {
      const res = await axiosInstance.post<ApiResponse<any>>(
        `/users/register-student/${schoolId}`,
        data
      );

      if (res.data.status) {
        toast.success(res.data.message || "Student registered successfully");
        return true;
      } else {
        toast.error(res.data.message || "Failed to register student");
        return false;
      }
    } catch (error: any) {
      console.error("Error registering student:", error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "Failed to register student");
      return false;
    }
  },

  // Update student
  updateStudent: async (studentId, schoolId, data) => {
    console.log("working here")
    try {
      const res = await axiosInstance.put<ApiResponse<any>>(
        `/users/update-student/${studentId}/${schoolId}`,
        data
      );

      if (res.data.status) {
        toast.success(res.data.message || "Student updated successfully");
        return true;
      } else {
        toast.error(res.data.message || "Failed to update student");
        return false;
      }
    } catch (error: any) {
      console.error("Error updating student:", error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "Failed to update student");
      return false;
    }
  },

  // Get school stats
  getStats: async (schoolId) => {
    try {
      const res = await axiosInstance.get<ApiResponse<Stats>>(
        `/users/stats/${schoolId}`
      );

      if (res.data.status) {
        return res.data.data;
      } else {
        toast.error(res.data.message || "Failed to fetch stats");
        return null;
      }
    } catch (error: any) {
      console.error("Error fetching stats:", error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "Failed to fetch stats");
      return null;
    }
  },
}));
