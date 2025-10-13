import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUsersStore, TeacherForm } from "@/store/useUsersStore";
import Heading from "@/components/common/Heading";
import { BookOpen, Calendar, Edit, Mail, MapPin, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubjectClassGrid from "./SubjectClassGrid";
import { SubjectForm, useSubjectStore } from "@/store/useSubjectStore";

export interface TeacherSubject {
  id: number;
  class_id: number;
  subject_id: number;
  teacher_id: number;
  class: {
    id: number;
    class: string;
    section: string;
  };
  subject: {
    id: number;
    subject_name: string;
    description?: string;
    school_id: number;
  };
}

const Details = () => {
  const { id } = useParams(); // get id from URL
  const { getTeacherById } = useUsersStore();
  const [teacher, setTeacher] = useState<TeacherForm| null>(null);
  const [subjects, setSubjects] = useState<SubjectForm[]>([]);
const { getSubjects } = useSubjectStore();

//fetch teacher by id
  const fetchTeacher = async () => {
    try {
      if (!id) return;
      const data = await getTeacherById(Number(id));

      setTeacher(data);
    } catch (error) {
      console.error("Failed to fetch teacher:", error);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, [id]);


  //fetch subjects
  useEffect(() => {
  const fetchSubjects = async () => {
    if (!teacher?.school_id) return;
    const data = await getSubjects(Number(teacher.school_id));
    if (data) setSubjects(data);
  };
  fetchSubjects();
}, [teacher]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <Heading
          title={teacher?.name || "Teacher Details"}
          description={teacher ? ` EMP${teacher?.id}` : "Loading..."}
        />

        <div className="flex gap-2">
          <Link to="/principal/teachers/list">
            <Button variant="outline">Back to List</Button>
          </Link>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Teacher
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{teacher?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{teacher?.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{teacher?.employee_code || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                DOB: {teacher?.dob ? new Date(teacher.dob).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Qualification:</span>
              <span className="text-sm">{teacher?.qualification || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Gender:</span>
              <span className="text-sm">{teacher?.gender || "N/A"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Subjects / Classes Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Subjects & Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium">Subjects</span>
             {teacher?.subjects?.map((item) => (
                <li key={item.id} className="list-none ml-4">
                  {item.subject?.subject_name}
                </li>
              ))}
            </div>

            <div>
              <span className="text-sm font-medium">Classes</span>
              {teacher?.subjects?.map((item) => (
                <li key={item.id} className="list-none ml-4">
                  {item.class?.class} {item.class?.section}
                </li>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <SubjectClassGrid teacherId={Number(id)} teacherSubjects={teacher?.subjects || []} />



    </div>
  );
};

export default Details;
