import React, { useState, FormEvent, ChangeEvent } from 'react';
// import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, EyeOff, Eye, Loader2, Book, User, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthPattern from '../../components/common/AuthPattern';
import toast from 'react-hot-toast';

interface FormData {
  fullname: string;
  email: string;
  password: string;
}

function SignupPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    password: '',
  });

  // const { signup, isSigningUp } = useAuthStore();

  // const validateForm = () => {
  //   if (!formData.fullname.trim()) return toast.error("Full Name is required");

  //   if (!formData.email.trim()) return toast.error("Email is required");
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(formData.email.trim())) return toast.error("Please enter a valid email address");

  //   if (!formData.password) return toast.error("Password is required");
  //   if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long");

  //   return true;
  // };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const success = validateForm();
  //   if (success === true) signup(formData);
  // };

  return (
    <div className="min-h-screen grid lg:grid-cols-2  text-blue-950">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-blue-200 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Book className="size-6 text-blue-500" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold mt-2 ">Create Your Account</h1>
              <p className=" text-sm md:text-base">
                Simplifying Student Records & Management
              </p>
            </div>
          </div>

          {/* FORM */}
          <form className="   flex flex-col gap-6">
            <div className="form-control  flex flex-col gap-4">
              {/* Username */}
              <label className="border-2 p-2  rounded-xl flex items-center gap-2">
                <User className='size-5 text-gray-400'/>
                <input
                  type="text"
                  className="grow outline-none"
                  placeholder="John Doe"
                  value={formData.fullname}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              </label>

              {/* Email */}
              <label className="border-2 p-2 rounded-xl flex items-center gap-2">
               <Mail className='size-4 text-gray-400'/>
                <input
                  type="email"
                  className="grow outline-none"
                  placeholder="johndoe@gmail.com"
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </label>

              {/* Password */}
              <label className="border-2 p-2 rounded-xl flex items-center gap-2">
                <Lock className='size-4 text-gray-400'/>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="grow outline-none "
                  placeholder="password"
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div className='flex items-center'>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 " />
                    ) : (
                      <Eye className="size-5 " />
                    )}
                  </button>
                </div>
              </label>
            </div>
            
            <div className='flex w-full justify-center'>
                <button
              type="submit"
              className="bg-blue-400 py-2 px-10 hover:bg-blue-900 transition-all duration-300  text-white rounded-xl "
            >
              Sign Up
            </button>
            </div>
            

            {/* Example if using Zustand:
            <button
              type="submit"
              className="btn btn-primary text-white w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </button> */}
          </form>

          <div className="text-center">
            <p className=" text-sm md:text-base">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthPattern />
    </div>
  );
}

export default SignupPage;
