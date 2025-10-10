import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2, School } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUsersStore } from "@/store/useUsersStore";
import { useAuthStore } from "@/store/useAuthStore";
import { StudentForm } from "@/store/useUsersStore";

interface School {
  id: string;
  name: string;
}

const StudentRegister = () => {
   const { authUser } = useAuthStore();
  const { toast } = useToast();
  const registerStudent = useUsersStore((state) => state.registerStudent);

const [formData, setFormData] = useState<StudentForm>({
  school_id: authUser.school_id,
  candidate_name: "",
  gender: "",
  addhar: "",
  dob: "",
  class: "",
  section: "",
  roll_no: "",
  email: "",
  parent_email: "",
  father_name: "",
  mother_name: "",
  phone: "",
  address: "",
  transport_service: false,
  library_service: false,
  computer_service: false,
});


 

  // ========================= HANDLE INPUT CHANGE =========================
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ========================= HANDLE SUBMIT =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.school_id) {
      toast({ title: "Select a school first", variant: "destructive" });
      return;
    }

    if (!formData.email) {
      toast({ title: "Student email is required", variant: "destructive" });
      return;
    }

    const success = await registerStudent(formData.school_id, formData);
    if (success) {

      console.log("Student registered successfully");
      // // Reset form
      // setFormData({
      //  school_id: authUser.school_id,
      //   candidate_name: "",
      //   gender: "",
      //   addhar: "",
      //   dob: "",
      //   class: "",
      //   section: "",
      //   roll_no: "",
      //   email: "",
      //   parent_email: "",
      //   father_name: "",
      //   mother_name: "",
      //   phone: "",
      //   address: "",
      //   transport_service: false,
      //   library_service: false,
      //   computer_service: false,
      // });
    }
  };

  return (
    <div className="min-h-screen bg-background ">
      <div className=" space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/principal/students/list">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold">Student Registration</h1>
            <p className="text-gray-500 text-xs">Add a new student to the system</p>
          </div>
        </div>

       

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ---------------------- PERSONAL INFO ---------------------- */}
          <Card>
            <CardHeader className="text-sm">
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">

              
              <div className="space-y-2">
                <Label htmlFor="candidate_name">Name *</Label>
                <Input
                  id="candidate_name"
                  value={formData.candidate_name}
                  onChange={(e) => handleInputChange("candidate_name", e.target.value)}
                  required
                />
              </div>

            {/*  Aadhaar Number */}
            <div className="space-y-2">
              <Label htmlFor="addhar">Aadhaar Number</Label>
              <Input
                id="addhar"
                value={formData.addhar}
                onChange={(e) => handleInputChange("addhar", e.target.value)}
                placeholder=""
              />
            </div>

            {/*  Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
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

              {/*  Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  required
                />
              </div>

              {/*  Gender */}
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/*  Address */}
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* ---------------------- ACADEMIC INFO ---------------------- */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/*  Roll Number */}
              <div className="space-y-2">
                <Label htmlFor="roll_no">Roll Number *</Label>
                <Input
                  id="roll_no"
                  value={formData.roll_no}
                  onChange={(e) => handleInputChange("roll_no", e.target.value)}
                  required
                />
              </div>

              {/*  Class */}
              <div className="space-y-2">
                <Label htmlFor="class">Class *</Label>
                <Select onValueChange={(value) => handleInputChange("class", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"].map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/*  Section */}
              <div className="space-y-2">
                <Label htmlFor="section">Section *</Label>
                <Select onValueChange={(value) => handleInputChange("section", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A","B","C","D"].map(sec => (
                      <SelectItem key={sec} value={sec}>{sec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* ---------------------- PARENT INFO ---------------------- */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Parent/Guardian Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/*  Parent Email */}
              <div className="space-y-2">
                <Label htmlFor="parent_email">Parent Email</Label>
                <Input
                  id="parent_email"
                  type="email"
                  value={formData.parent_email}
                  onChange={(e) => handleInputChange("parent_email", e.target.value)}
                  placeholder=""
                />
              </div>

              {/*  Father Name */}
              <div className="space-y-2">
                <Label htmlFor="father_name">Father's Name *</Label>
                <Input
                  id="father_name"
                  value={formData.father_name}
                  onChange={(e) => handleInputChange("father_name", e.target.value)}
                  required
                />
              </div>

              {/*  Mother Name */}
              <div className="space-y-2">
                <Label htmlFor="mother_name">Mother's Name *</Label>
                <Input
                  id="mother_name"
                  value={formData.mother_name}
                  onChange={(e) => handleInputChange("mother_name", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* ---------------------- STUDENT SERVICES ---------------------- */}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Services Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Transport Service */}
              <div className="space-y-2">
                <Label htmlFor="transport_service">Transport Service</Label>
                <Select
                  value={formData.transport_service ? "true" : "false"}
                  onValueChange={(value) =>
                    setFormData({ ...formData, transport_service: value === "true" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/*  Library Service */}
              <div className="space-y-2">
                <Label htmlFor="library_service">Library Service</Label>
                <Select
                  value={formData.library_service ? "true" : "false"}
                  onValueChange={(value) =>
                    setFormData({ ...formData, library_service: value === "true" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Computer Service */}
              <div className="space-y-2">
                <Label htmlFor="computer_service">Computer Service</Label>
                <Select
                  value={formData.computer_service ? "true" : "false"}
                  onValueChange={(value) =>
                    setFormData({ ...formData, computer_service: value === "true" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </CardContent>
          </Card>

          {/* ---------------------- SUBMIT ---------------------- */}
          <div className="flex justify-end gap-4">
            <Link to="/admin/students/list">
              <Button variant="outline" className="hover:bg-destructive hover:text-white">Cancel</Button>
            </Link>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Register Student
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
