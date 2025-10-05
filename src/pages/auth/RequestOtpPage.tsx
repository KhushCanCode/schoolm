import React, { ChangeEvent, useEffect, useState } from "react";
import { Mail, School } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthPattern from "@/components/AuthPattern";

interface SchoolType {
  id: string;
  name: string;
}

function RequestOtpPage() {
  const [formData, setFormData] = useState({
    email: "",
    role: "",
    schoolId: "",
  });

  const [schools, setSchools] = useState<SchoolType[]>([]);
  const verifyForOtp = useAuthStore((state) => state.verifyForOtp);
  const getSchoolList = useAuthStore((state) => state.getSchoolList);

  const navigate = useNavigate();

  // Fetch schools list
  useEffect(() => {
    const fetchSchools = async () => {
      const schoolList = await getSchoolList();
      if (!schoolList || schoolList.length === 0) {
        toast.error("Failed to fetch schools");
      } else {
        setSchools(schoolList);
      }
    };
    fetchSchools();
  }, [getSchoolList]);

  // Send OTP
  const handleSendOtp = async () => {
    if (!formData.email || !formData.role || !formData.schoolId) {
      toast.error("Please fill email, role, and school first");
      return;
    }


    const success = await verifyForOtp({
      email: formData.email,
      role: formData.role,
      schoolId: formData.schoolId,
    });

    if (success) {
      toast.success("OTP sent to your email");
      navigate("/reset-password", { state: formData });
    } else {
      toast.error("Failed to send OTP. Check your details.");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Form Section */}
      <div className="h-full flex items-center justify-center">
        <div className="border border-blue-200 p-8 rounded-2xl w-full max-w-md space-y-6">
          <h2 className="text-xl font-semibold text-center">
            Request Password Reset
          </h2>

          {/* Email */}
          <label className="border-2 p-2 rounded-xl flex items-center gap-2">
            <Mail className="size-5 text-gray-400" />
            <input
              type="email"
              className="grow outline-none"
              placeholder="Enter your registered email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>

          {/* School */}
          <label className="border-2 p-2 rounded-xl flex items-center gap-2">
            <School className="size-5 text-gray-400" />
            <select
              className="grow outline-none bg-transparent"
              value={formData.schoolId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFormData({ ...formData, schoolId: e.target.value })
              }
            >
              <option value="" disabled>
                Select School
              </option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.id} - {school.name}
                </option>
              ))}
            </select>
          </label>

          {/* Role */}
          <label className="border-2 p-2 rounded-xl flex items-center gap-2">
            <select
              className="grow outline-none bg-transparent"
              value={formData.role}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="accountant">Accountant</option>
              <option value="principal">Principal</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
            </select>
          </label>

          <button
            type="button"
            onClick={handleSendOtp}
            className="bg-blue-500 text-white rounded-xl py-2 w-full hover:bg-blue-700 transition-all"
          >
            Send OTP
          </button>
        </div>
      </div>

      {/* Right pattern */}
      <AuthPattern />
    </div>
  );
}

export default RequestOtpPage;
