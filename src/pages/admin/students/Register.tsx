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


interface StudentRegisterForm {
  candidateName: string;
  schoolId: string;
  gender: string;
  addhar: string;
  dob: string;
  class: string;
  section: string;
  rollNo: string;
  email: string;
  parentEmail: string;
  fatherName: string;
  motherName: string;
  phone: string;
  address: string;
  transportService: boolean;
  libraryService: boolean;
  computerService: boolean;
}

interface School {
  id: string;
  name: string;
}

const StudentRegister = () => {
   const { authUser } = useAuthStore();
  const { toast } = useToast();
  const registerStudent = useUsersStore((state) => state.registerStudent);

const [formData, setFormData] = useState<StudentRegisterForm>({
  candidateName: "",
  schoolId: authUser.schoolId,
  gender: "",
  addhar: "",
  dob: "",
  class: "",
  section: "",
  rollNo: "",
  email: "",
  parentEmail: "",
  fatherName: "",
  motherName: "",
  phone: "",
  address: "",
  transportService: false,
  libraryService: false,
  computerService: false,
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
    if (!formData.schoolId) {
      toast({ title: "Select a school first", variant: "destructive" });
      return;
    }

    if (!formData.email) {
      toast({ title: "Student email is required", variant: "destructive" });
      return;
    }

    const success = await registerStudent(formData.schoolId, formData);
    if (success) {

      // Reset form
      setFormData({
       schoolId: authUser.schoolId,
        candidateName: "",
        gender: "",
        addhar: "",
        dob: "",
        class: "",
        section: "",
        rollNo: "",
        email: "",
        parentEmail: "",
        fatherName: "",
        motherName: "",
        phone: "",
        address: "",
        transportService: false,
        libraryService: false,
        computerService: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background ">
      <div className=" space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/admin/students/list">
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
                <Label htmlFor="candidateName">Name *</Label>
                <Input
                  id="candidateName"
                  value={formData.candidateName}
                  onChange={(e) => handleInputChange("candidateName", e.target.value)}
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
                <Label htmlFor="rollNo">Roll Number *</Label>
                <Input
                  id="rollNo"
                  value={formData.rollNo}
                  onChange={(e) => handleInputChange("rollNo", e.target.value)}
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
                <Label htmlFor="parentEmail">Parent Email</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => handleInputChange("parentEmail", e.target.value)}
                  placeholder=""
                />
              </div>

              {/*  Father Name */}
              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name *</Label>
                <Input
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange("fatherName", e.target.value)}
                  required
                />
              </div>

              {/*  Mother Name */}
              <div className="space-y-2">
                <Label htmlFor="motherName">Mother's Name *</Label>
                <Input
                  id="motherName"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange("motherName", e.target.value)}
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
                <Label htmlFor="transportService">Transport Service</Label>
                <Select
                  value={formData.transportService ? "true" : "false"}
                  onValueChange={(value) =>
                    setFormData({ ...formData, transportService: value === "true" })
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
                <Label htmlFor="libraryService">Library Service</Label>
                <Select
                  value={formData.libraryService ? "true" : "false"}
                  onValueChange={(value) =>
                    setFormData({ ...formData, libraryService: value === "true" })
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
                <Label htmlFor="computerService">Computer Service</Label>
                <Select
                  value={formData.computerService ? "true" : "false"}
                  onValueChange={(value) =>
                    setFormData({ ...formData, computerService: value === "true" })
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
