import { toast } from "sonner";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


//User Response Type
export interface UserData {
  id?:number;
  status?: string;
  school_id?: string;
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
  
}

//Teacher Response Type
export interface TeacherForm {
  id?: number
  status?: string;
  school_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  qualification?: string;
  dob?: Date;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  employee_code?: string;
  subjects?: number[];
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

  registerUser: (school_id: string, data: UserData) => Promise<boolean>;
  getAllUsers: (school_id: string) => Promise<UserData[] | null>;
  // registerParent: (schoolId: string, data: ParentForm) => Promise<boolean>;
  getStats: (school_id: string) => Promise<Stats | null>;
  registerStudent: (school_id: string, data: StudentForm) => Promise<boolean>;
  getStudentDetails: (schoolId: string) => Promise<StudentForm[] | null>;


  //Teacher Controllers
  registerTeacher: (school_id: string, data: TeacherForm) => Promise<boolean>;
  // updateTeacher: (teacherId: string, school_id: string, data: TeacherForm) => Promise<boolean>;
  // deleteTeacher: (teacherId: string, school_id: string) => Promise<boolean>;
  getAllTeachers: (school_id: string) => Promise<TeacherForm[] | null>;

  
}

export const useUsersStore = create<UsersState>(() => ({

  //  Get Stats Controller -------------------------------------------------------------------------------------------------------
  getStats: async (school_id) => {
    const token = localStorage.getItem('token');

    try {
      const res = await axiosInstance.get(`/principal/stats/${school_id}`, {
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



  //USER CONTROLLERS ---------------------------------------------------------------------------------------------------

  //Register User 
  registerUser: async (school_id, data) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axiosInstance.post(
        `/principal/user/register/${school_id}`,
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

  //Update User


  // Delete User


  //Get All Users
  getAllUsers: async (school_id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axiosInstance.get(`/principal/user/getall/${school_id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("Get All Users response:", res.data);

      if (res.data.status) {
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



  //STUDENT CONTROLLERS ---------------------------------------------------------------------------------------------------

  // Register Student
  registerStudent: async (school_id, data) => {
    const token = localStorage.getItem('token');
    console.log("Register Student Data:", token);

    try {
      const res = await axiosInstance.post(
        `/principal/student/register-student/${school_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Register Student response:", res.data);

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

    // Get Student Details
  getStudentDetails: async (schoolId) => {
    try {
      const res = await axiosInstance.get(
        `/principal/students/getstudents/${schoolId}`
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



  //TEACHER CONTROLLERS ---------------------------------------------------------------------------------------------------

  // Register Teacher
  registerTeacher: async (school_id, data) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axiosInstance.post(`/principal/teacher/register/${school_id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Register Teacher response:", res.data);
      
     if (res.data.status) {
        toast.success(res.data.message || "Teacher registered successfully");
        return true;
      } else {
        toast.error(res.data.message || "Failed to register teacher");
        return false;
      }
    } catch (error: any) {
      console.error(
        "Error registering teacher:",
        error?.response?.data?.message || error.message
      );
      toast.error(error?.response?.data?.message || "Failed to register teacher");
      return false;
    }
  },

  //Update Teacher

  // Delete Teacher

  // Get All Teachers
 getAllTeachers: async (school_id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axiosInstance.get(`/principal/teacher/getall/${school_id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );


      if (res.data.status) {
        return res.data.data;
      } else {
        toast.error(res.data.message || "Failed to fetch teachers");
        return null;
      }
    } catch (error: any) {
      console.error(
        "Error registering user:",
        error?.response?.data?.message || error.message
      );
      toast.error(error?.response?.data?.message || "Failed to fetch teachers");
      return null;
    }
  },


  //  Register Parent Controller ---------------------------------------------------------------------------------------------------




}));
