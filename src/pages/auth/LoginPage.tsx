import React, { ChangeEvent, useEffect, useState } from 'react';
import { EyeOff, Eye, Mail, Lock, School, Book } from 'lucide-react';
import AuthPattern from '../../components/AuthPattern';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
  schoolId: string;
  role: string;
}

interface School {
  id: string;
  name: string;
}


function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    schoolId: '',
    role: ''
  });
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();


   // Fetch schools from backend
  const [schools, setSchools] = useState<School[]>([]);
  const getSchoolList = useAuthStore((state) => state.getSchoolList);

  useEffect(() => {
    const fetchSchools = async () => {
      const schoolList = await getSchoolList();
      if (schoolList.length === 0) {
        toast.error("Failed to fetch schools");
      } else {
        setSchools(schoolList);
      }
    };
    fetchSchools();
  }, [getSchoolList]);


//Form Validation, checking email  and password
  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (!formData.schoolId) {
      toast.error("Please select a school");
      return false;
    }
    if (!formData.role) {
      toast.error("Please select a role");
      return false;
    }
    return true;
  };

  //Login function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) toast.error("PLease fill all details");;


    const success = await login({
      email: formData.email,
      password: formData.password,
      schoolId: formData.schoolId,
      role: formData.role,
    });

    if (!success) return; 

    const user = useAuthStore.getState().authUser;
    if (!user) {
      toast.error("Unable to fetch user details after login");
      return;
    }

    switch (user.role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "teacher":
        navigate("/teacher/dashboard");
        break;
      case "student":
        navigate("/student/dashboard");
        break;
      case "parent":
        navigate("/parent/dashboard");
        break;
      case "accountant":
        navigate("/accountant/dashboard");
        break;
      case "principal":
        navigate("/principal/dashboard");
        break;
      default:
        navigate("/login");
    }
  };


  return (
    <div className="min-h-screen grid lg:grid-cols-2 text-blue-950">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-blue-200 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Book className="size-6 text-blue-500" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold mt-2">Login to your Account</h1>
              <p className="text-sm md:text-base">Login to your account and access your dashboard</p>
            </div>
          </div>

          {/* FORM */}
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <div className="form-control flex flex-col gap-4">
              {/* Email */}
              <label className="border-2 p-2 rounded-xl flex items-center gap-2">
                <Mail className="size-5 text-gray-400" />
                <input
                  type="email"
                  className="grow outline-none"
                  placeholder="johndoe@gmail.com"
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                />
              </label>

              {/* Password */}
              <label className="border-2 p-2 rounded-xl flex items-center gap-2">
                <Lock className="size-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="grow outline-none"
                  placeholder="password"
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                />
                <div className="flex items-center">
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </label>

               {/* School Dropdown */}
              <label className="border-2 p-2 rounded-xl flex items-center gap-2">
                <School className="size-5 text-gray-400" />
                <select
                  className="grow outline-none bg-transparent"
                  value={formData.schoolId}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, schoolId: e.target.value })}
                >
                  <option value="" disabled>Select School</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.id} - {school.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* Role Dropdown */}
              <label className="border-2 p-2 rounded-xl flex items-center gap-2">
                <select
                  className="grow outline-none bg-transparent"
                  value={formData.role}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({...formData, role:e.target.value})}
                >
                  <option value="" disabled>Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="accountant">Accountant</option>
                  <option value="principal">Principal</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                </select>
              </label>
            </div>

            {/* Login Button */}
            <div className="flex w-full justify-center">
              <button type="submit" className="bg-blue-400 py-2 w-full hover:bg-blue-900 transition-all duration-300 text-white rounded-xl">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <AuthPattern />
    </div>
  );
}

export default LoginPage;
