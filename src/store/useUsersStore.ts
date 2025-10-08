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

<<<<<<< HEAD
interface ParentForm {
  rollNo: string;
  email: string;
  parentEmail: string;
  fatherName: string;
  motherName: string;
  phone: string;
  address: string;

}

//  Zustand store interface
interface UsersState {
  registerStudent: (schoolId: string, data: StudentForm) => Promise<boolean>;
  registerParent: (schoolId: string, data: ParentForm) => Promise<boolean>;
=======
// Zustand store interface
interface UsersState {
  registerStudent: (schoolId: string, data: StudentForm) => Promise<boolean>;
  updateStudent: (studentId: string, schoolId: string, data: StudentForm) => Promise<boolean>;
>>>>>>> 2db0dfb9ec277893aad1a53902b2da557da7f3b6
  getStats: (schoolId: string) => Promise<Stats | null>;
  getStudentDetails: (schoolId: string) => Promise<StudentForm[] | null>;
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

<<<<<<< HEAD
  //  Register Parent
  registerParent: async (schoolId, data) => {
=======
  //  Update student
  updateStudent: async (studentId, schoolId, data) => {
>>>>>>> 2db0dfb9ec277893aad1a53902b2da557da7f3b6
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

  //  Get school stats
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

  // Get all student details for a school
  getStudentDetails: async (schoolId) => {
    try {
      const res = await axiosInstance.get<ApiResponse<StudentForm[]>>(
        `/users/students/${schoolId}`
      );

      if (res.data.status) {
        toast.success(res.data.message || "Students fetched successfully");
        return res.data.data;
      } else {
        toast.error(res.data.message || "Failed to fetch students");
        return null;
      }
    } catch (error: any) {
      console.error("Error fetching students:", error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "Failed to fetch students");
      return null;
    }
  },
}));
