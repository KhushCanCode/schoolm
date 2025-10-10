import React, { ChangeEvent } from 'react'
import { UserData, useUsersStore } from '@/store/useUsersStore';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/useAuthStore';
import { Link } from "react-router-dom";
import { ArrowLeft, Lock, Save } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const UserRegister = () => {
  const { toast } = useToast();

  const {authUser} = useAuthStore();
  const registerUser = useUsersStore((state) => state.registerUser);

  const [formData, setFormData] = React.useState<UserData>({
    school_id: authUser.school_id,
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      toast({ title: "User email is required", variant: "destructive" });
      return;
    }

    const success = await registerUser(authUser.school_id, formData);
    if (success) {

        console.log("User registered successfully");
      // Reset form
      setFormData({
        school_id: authUser.school_id,
        username: "",
        email: "",
        password: "",
        phone: "",
        role: "",
      });
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='space-y-6'>
        <div className="flex items-center gap-4">
          <Link to="/admin/students/list">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold">User Registration</h1>
            <p className="text-gray-500 text-xs">Add a new user to the system</p>
          </div>
        </div>

         <form onSubmit={handleSubmit} className="space-y-6  lg:w-1/2 ">
          {/* ---------------------- PERSONAL INFO ---------------------- */}
          <Card>
             <CardHeader className="text-sm">
              <CardTitle className="text-lg">Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">

              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  required
                />
              </div>

            {/*  Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

            {/*  Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
              </div>

             {/* Role Dropdown */}
             <div className="space-y-2">

              <Label htmlFor="gender">Role</Label>
              <Select
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                 <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="principal">Principal</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
             </div>


              {/*  Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>


            </CardContent>
          </Card>


          {/* ---------------------- SUBMIT ---------------------- */}
          <div className="flex justify-end gap-4">
            <Link to="/admin/dashboard">
              <Button variant="outline" className="hover:bg-destructive hover:text-white">Cancel</Button>
            </Link>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Register User
            </Button>
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default UserRegister