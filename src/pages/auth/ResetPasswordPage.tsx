import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import AuthPattern from "@/components/common/AuthPattern";

interface ResetPasswordState {
  email: string;
  role: string;
  schoolId: string;
}

function ResetPasswordPage() {
  const location = useLocation();
  const state = location.state as ResetPasswordState | null;

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changePassword = useAuthStore((state) => state.changePassword);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.otp || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const success = await changePassword({
      email: state.email,
      otp: formData.otp,
      newPassword: formData.newPassword,
      role: state.role,
    });

   

    if (success) {
      toast.success("Password reset successful!");
      navigate("/login");
    } else {
      toast.error("Failed to reset password. Check OTP and try again.");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Form Section */}
      <div className="h-full flex items-center justify-center">
        <div className="border border-blue-200 p-8 rounded-2xl w-full max-w-md space-y-6">
          <h2 className="text-xl font-semibold text-center">
            Enter OTP & Reset Password
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* OTP */}
            <label className="border-2 p-2 rounded-xl flex items-center gap-2">
              <input
                type="text"
                className="grow outline-none"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
              />
            </label>

            {/* New Password */}
            <label className="border-2 p-2 rounded-xl flex items-center gap-2">
              <Lock className="size-5 text-gray-400" />
              <input
                type="password"
                className="grow outline-none"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
              />
            </label>

            {/* Confirm Password */}
            <label className="border-2 p-2 rounded-xl flex items-center gap-2">
              <Lock className="size-5 text-gray-400" />
              <input
                type="password"
                className="grow outline-none"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </label>

            <button
              type="submit"
              className="bg-green-600 text-white rounded-xl py-2 w-full hover:bg-green-700 transition-all"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      {/* Right pattern */}
      <AuthPattern />
    </div>
  );
}

export default ResetPasswordPage;
