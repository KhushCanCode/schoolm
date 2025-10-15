import {
  Book,
  Eye,
  EyeOff,
  Lock,
  Mail,
  School as SchoolIcon,
} from "lucide-react"
import React, { ChangeEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import AuthPattern from "../../components/common/AuthPattern"
import { useAuthStore } from "../../store/useAuthStore"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

interface LoginForm {
  email: string
  password: string
  school_id: string
  role: string
}

export interface School {
  id: string
  name: string
  city: string
}

function LoginPage() {
  const { getUser, login, getSchoolList } = useAuthStore()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    school_id: "",
    role: "",
  })

  const [schools, setSchools] = useState<School[]>([])

  useEffect(() => {
    const fetchSchools = async () => {
      const schoolList = await getSchoolList()

      if (schoolList.length === 0) {
        toast.error("Failed to fetch schools")
      } else {
        setSchools(schoolList)
      }
    }
    fetchSchools()
  }, [getSchoolList])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // if (!validateForm()) return;

    const success = await login({
      email: formData.email,
      password: formData.password,
      school_id: formData.school_id,
      role: formData.role,
    })

    if (success) {
      await getUser()
    } else {
      return
    }

    const user = useAuthStore.getState().authUser
    if (!user) {
      toast.error("Unable to fetch user details after login")
      return
    }

    switch (user.role) {
      case "principal":
        navigate("/principal/dashboard")
        break
      case "teacher":
        navigate("/teacher/dashboard")
        break
      case "student":
        navigate("/student/dashboard")
        break
      case "parent":
        navigate("/parent/dashboard")
        break
      case "accountant":
        navigate("/accountant/dashboard")
        break
      default:
        navigate("/login")
    }
  }

  const handleForgotPassword = () => navigate("/verify-otp")

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-card text-slate-800 dark:text-slate-200">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center ">
        <Card className="w-full max-w-md border-none shadow-none">
          <CardHeader className="text-center space-y-3">
            <div className="flex flex-col items-center gap-2 group">
              
              <CardTitle className="text-xl md:text-2xl font-bold">
                Login to your Account
              </CardTitle>
              <CardDescription>
                Login to your account and access your dashboard
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="size-4 text-muted-foreground" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="size-4 text-muted-foreground" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* School Dropdown */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <SchoolIcon className="size-4 text-muted-foreground" />
                  School
                </Label>
                <Select
                value={formData.school_id ? String(formData.school_id) : ""}
                onValueChange={(value) =>
                  setFormData({ ...formData, school_id:value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select School">
                    {formData.school_id
                      ? schools.find((s) => s.id === formData.school_id)?.name
                      : "Select School"}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={String(school.id)}>
                      {school.name} / {school.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              </div>

              {/* Role Dropdown */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Book className="size-4 text-muted-foreground" />
                  Role
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accountant">Accountant</SelectItem>
                    <SelectItem value="principal">Principal</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Log in
              </Button>

              {/* Forgot Password */}
              <Button
                type="button"
                variant="link"
                onClick={handleForgotPassword}
                className="w-full text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right Side */}
      <AuthPattern />
    </div>
  )
}

export default LoginPage
