import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/useAuthStore';
import { UserData, useUsersStore } from '@/store/useUsersStore';
import { ArrowLeft, Save } from 'lucide-react';
import React from 'react';
import { Link } from "react-router-dom";


const UserRegister = () => {
  const { toast } = useToast();

  const { authUser } = useAuthStore();
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
     
      if (field === "school_id") return;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
        school_id: prev.school_id, 
      }));
    };


  const handleSubmit = async (e: React.FormEvent) => {
    console.log(formData);

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
    <div className=' '>
      <div className='space-y-6'>


         <div className="flex justify-between items-center ">
          <Heading title="User Registration" description="Add a new user to the system"/>
        
            <Link to="/principal/dashboard">
              <Button variant="outline" className=" ">Back to Dashboard</Button>
            </Link>
            
          </div>

        <form onSubmit={handleSubmit} className="space-y-6  ">
          {/* ---------------------- PERSONAL INFO ---------------------- */}
          <Card>
            <CardHeader className="text-sm">
              <CardTitle className="text-lg">Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2  gap-4">


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
            <Link to="/principal/dashboard">
              <Button variant="outline" className="">Cancel</Button>
            </Link>
            <Button type="submit" variant="default" className="flex items-center gap-2">
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