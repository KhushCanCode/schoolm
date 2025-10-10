import { toast } from "sonner";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


//User Response Type
export interface UserData {
  school_id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export interface ClassForm {
  school_id?: string;
  class?: string;                 
  section?: string;               
  room_no?: string;               
  teacher_in_charge?: string;     
  capacity?: number;              
  status?: 'active' | 'inactive'; 
  notes?: string;                 
}

// Student response type
export interface StudentForm {
  school_id?: string;
  candidate_name?: string;
  gender?: string;
  addhar?: string;
  dob?: string;
  class?: string;
  section?: string;
  roll_no?: string;
  email?: string;
  parent_email?: string;
  father_name?: string;
  mother_name?: string;
  phone?: string;
  address?: string;
  transport_service?: boolean;
  library_service?: boolean;
  computer_service?: boolean;
}

// Stats response type
export interface Stats {
  totalStudents: number;
  totalUsers: number;
  pendingDues: number;
  classCount: number;
}



interface ParentForm {
  rollNo: string;
  email: string;
  parentEmail: string;
  fatherName: string;
  motherName: string;
  phone: string;
  address: string;

}


interface UsersState {
  
  registerUser: (school_id: string, data: UserData)=> Promise<boolean>;
  getAllUsers: (school_id: string) => Promise<UserData[] | null>;
  // registerParent: (schoolId: string, data: ParentForm) => Promise<boolean>;
  getStats: (school_id: string) => Promise<Stats | null>;
  registerStudent: (school_id: string, data: StudentForm) => Promise<boolean>;
  getStudentDetails: (schoolId: string) => Promise<StudentForm[] | null>;
  createClass: ( data: ClassForm) => Promise<boolean>;
  getClasses: (school_id: string) => Promise<ClassForm[]>;
}

export const useUsersStore = create<UsersState>(() => ({

  //  Get Stats Controller -------------------------------------------------------------------------------------------------------

  getStats: async (school_id) => {
    const token = localStorage.getItem('token');

    try {
      const res = await axiosInstance.get(`/users/stats/${school_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  //Register User Controller ---------------------------------------------------------------------------------------------------

  registerUser: async (school_id, data) => {
  const token = localStorage.getItem("token");
   
    try {
      const res = await axiosInstance.post(
        `/users/register/${school_id}`, 
        data, 
         {
        headers: { Authorization: `Bearer ${token}` }
        }
       
      );

    
      if (res.data.status) {
        toast.success(res.data.message || "User registered successfully");
        return true;
      } else {
        toast.error(res.data.message || "Failed to register user");
        return false;
      }
    } catch (error: any) {
      console.error(
        "Error registering user:",
        error?.response?.data?.message || error.message
      );
      toast.error(error?.response?.data?.message || "Failed to register user");
      return false;
    }
  },

  //Get All Users Controller ---------------------------------------------------------------------------------------------------
  getAllUsers: async (school_id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axiosInstance.get(`/users/${school_id}`,
         {
        headers: { Authorization: `Bearer ${token}` }
        }
      );

       console.log("Get All Users response:", res.data);

       if (res.data.status) {
        toast.success(res.data.message || "Users fetched successfully");
        return res.data.data;
      } else {
        toast.error(res.data.message || "Failed to fetch users");
        return null;
      }
    } catch (error: any) {
      console.error(
        "Error registering user:",
        error?.response?.data?.message || error.message
      );
      toast.error(error?.response?.data?.message || "Failed to fetch user");
      return null;
    }
  },

  // Create Class Controller ---------------------------------------------------------------------------------------------------
  createClass: async (data: ClassForm) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axiosInstance.post(`/users/class/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status) {
        toast.success(res.data.message || 'Class created successfully');
        return true;
      } else {
        toast.error(res.data.message || 'Failed to create class');
        return false;
      }
    } catch (error: any) {
      console.error('Error creating class:', error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || 'Failed to create class');
      return false;
    }
  },

  // Fetch all classes for a school ---------------------------------------------------------------------------------------------------
  getClasses: async (school_id: string) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axiosInstance.get(`/users/class/${school_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status) {
        return res.data.data;
      } else {
        toast.error(res.data.message || 'Failed to fetch classes');
        return [];
      }
    } catch (error: any) {
      console.error('Error fetching classes:', error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || 'Failed to fetch classes');
      return [];
    }
  },

  // Register Student Contoller ---------------------------------------------------------------------------------------------------
  registerStudent: async (school_id, data) => {
    const token = localStorage.getItem('token');
    console.log("Register Student Data:", token);

    try {
      const res = await axiosInstance.post(
        `/users/register-student/${school_id}`,
        data,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        }
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





  //  Register Parent Controller
  // registerParent: async (schoolId, data) => {
  //   try {
  //     // const res = await axiosInstance.put<ApiResponse<any>>(
  //     //   `/users/update-student/${studentId}/${schoolId}`,
  //     //   data
  //     // );

  //     // if (res.data.status) {
  //     //   toast.success(res.data.message || "Student updated successfully");
  //     //   return true;
  //     // } else {
  //     //   toast.error(res.data.message || "Failed to update student");
  //     //   return false;
  //     // }
  //   } catch (error: any) {
  //     console.error("Error updating student:", error?.response?.data?.message || error.message);
  //     toast.error(error?.response?.data?.message || "Failed to update student");
  //     return false;
  //   }
  // },

  // Get Student Details Controller  ---------------------------------------------------------------------------------------------
  getStudentDetails: async (schoolId) => {
    try {
      const res = await axiosInstance.get(
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
