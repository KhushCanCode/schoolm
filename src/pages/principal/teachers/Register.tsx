import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, School, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { TeacherForm, useUsersStore } from "@/store/useUsersStore";
import { useAuthStore } from "@/store/useAuthStore";

interface Subject {
  id: number;
  name: string;
}

const Register = () => {
  const { toast } = useToast();
  const { authUser } = useAuthStore();
  const registerTeacher = useUsersStore((state) => state.registerTeacher);
  const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
    // Simulated subjects list (replace with your API)
    setSubjects([
      { id: 1, name: "Mathematics" },
      { id: 2, name: "Science" },
      { id: 3, name: "English" },
      { id: 4, name: "History" },
    ]);
  }, []);

    const handleToggle = (id: number) => {
    setFormData((prev) => {
      const selected = prev.subjects || [];
      const updated = selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id];

      return { ...prev, subjects: updated };
    });
  };

  const [formData, setFormData] = useState<TeacherForm>({
  school_id: authUser.school_id,        
  name: '',
  email: '',
  phone: '',
  qualification: '',
  dob: undefined,       
  gender: '',
  address: '',
  city: '',
  state: '',
  employee_code: '',
  subjects: [],         
});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Student Registration Data:", formData);

    const success = await registerTeacher(authUser.school_id, formData);
 
    // Reset form
    setFormData({
      school_id: authUser.school_id,        
      name: '',
      email: '',
      phone: '',
      qualification: '',
      dob: undefined,       
      gender: '',
      address: '',
      city: '',
      state: '',
      employee_code: '',
      subjects: [],  
    });
  };

  return (
    <div className="min-h-screen bg-background ">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/principal/teachers/list">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">Teacher Registration</h1>
            <p className="text-muted-foreground text-xs">Add a new teacher to the system</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* Personal Information */}
          <Card className="w-full  ">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob ? formData.dob.toISOString().split("T")[0] : ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dob: e.target.value ? new Date(e.target.value) : undefined,
                    }))
                  }
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


            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Address Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    required
                  />
                </div>

                 <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>

            </CardContent>
          </Card>

          {/* teacher Information */}
          <Card >
            <CardHeader>
              <CardTitle className="text-lg">Teacher Education</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification *</Label>
                <Input
                  id="qualification"
                  value={formData.qualification}
                  onChange={(e) => handleInputChange("qualification", e.target.value)}
                  required
                />
              </div>
               <div className="space-y-2">
               <Label htmlFor="qualification">Subjects</Label>

                <div className="grid grid-cols-2 gap-2">
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition ${
                        formData.subjects?.includes(subject.id)
                          ? "bg-blue-100 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleToggle(subject.id)}
                    >
                      <input
                        type="checkbox"
                        checked={formData.subjects?.includes(subject.id) || false}
                        onChange={() => handleToggle(subject.id)}
                        className="accent-blue-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm">{subject.name}</span>
                    </div>
                  ))}
                </div>
              </div>


              {/* <div className="space-y-2">
                <Label htmlFor="experience">Experience *</Label>
                
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  required
                />
              </div> */}
{/*               
              <div className="   space-y-2">
                <Label htmlFor="specialization">Specialization *</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => handleInputChange("specialization", e.target.value)}
                />
              </div> */}

              {/* <div className="space-y-2">
                <Label htmlFor="admissionDate">Admission Date *</Label>
                <Input
                  id="admissionDate"
                  type="date"
                  value={formData.admissionDate}
                  onChange={(e) => handleInputChange("admissionDate", e.target.value)}
                  required
                />
              </div> */}

              {/* <div className="md:col-span-2 space-y-2">
                <Label htmlFor="previousSchool">Previous School</Label>
                <Input
                  id="previousSchool"
                  value={formData.previousSchool}
                  onChange={(e) => handleInputChange("previousSchool", e.target.value)}
                />
              </div> */}
            </CardContent>
          </Card>

        

          {/* Medical Information */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medical Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Medical Conditions/Allergies</Label>
                <Textarea
                  id="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                  rows={3}
                  placeholder="Any medical conditions, allergies, or special requirements..."
                />
              </div>
            </CardContent>
          </Card> */}

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link to="/principal/teachers/list">
              <Button variant="outline" className="hover:bg-destructive hover:text-accent">Cancel</Button>
            </Link>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Register Teacher
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;