import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuthStore } from "@/store/useAuthStore";
import { ClassForm, useClassStore } from "@/store/useClassStore";
import { SubjectForm, useSubjectStore } from "@/store/useSubjectStore";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUsersStore} from "@/store/useUsersStore"; // ✅ import TeacherSubject
import { toast } from "sonner";
import { TeacherSubject } from "../../pages/principal/teachers/Details";
import Heading from "@/components/common/Heading";

export interface AssignSubjectsRequest {
  school_id: string;
  assignments: Assignment[];
}

interface Assignment {
  class_id: number;
  subject_ids: number[];
}

interface SubjectClassGridProps {
  teacherId: number;
  teacherSubjects: TeacherSubject[];
}

const SubjectClassGrid: React.FC<SubjectClassGridProps> = ({ teacherId, teacherSubjects }) => {
  const { authUser } = useAuthStore();
  const { getClasses } = useClassStore();
  const { getSubjects } = useSubjectStore();
  const { assignSubClasstoTeacher } = useUsersStore();

  const [classes, setClasses] = useState<ClassForm[]>([]);
  const [subjects, setSubjects] = useState<SubjectForm[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  if (teacherSubjects && teacherSubjects.length && assignments.length === 0) {
    const grouped = teacherSubjects.reduce((acc, curr) => {
      const existing = acc.find((a) => a.class_id === Number(curr.class_id));
      if (existing) {
        existing.subject_ids.push(Number(curr.subject_id));
      } else {
        acc.push({
          class_id: Number(curr.class_id),
          subject_ids: [Number(curr.subject_id)],
        });
      }
      return acc;
    }, [] as Assignment[]);
    setAssignments(grouped);
  }
}, [teacherSubjects]);

  const fetchClasses = async () => {
    const schoolId = authUser?.school_id;
    if (!schoolId) return;
    const data = await getClasses(schoolId);
    if (data?.length) setClasses(data);
  };

  const fetchSubjects = async () => {
    const schoolId = Number(authUser?.school_id);
    if (!schoolId) return;
    const data = await getSubjects(schoolId);
    if (data?.length) setSubjects(data);
  };

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

    

  // Toggle assignment
  const toggleAssignment = (subjectId: number, classId: number) => {
    setAssignments((prev) => {
      const classAssignment = prev.find((a) => a.class_id === classId);

      if (classAssignment) {
        const isAssigned = classAssignment.subject_ids.includes(subjectId);
        const newSubjectIds = isAssigned
          ? classAssignment.subject_ids.filter((id) => id !== subjectId)
          : [...classAssignment.subject_ids, subjectId];

        if (newSubjectIds.length === 0) {
          return prev.filter((a) => a.class_id !== classId);
        }

        return prev.map((a) =>
          a.class_id === classId ? { ...a, subject_ids: newSubjectIds } : a
        );
      } else {
        return [...prev, { class_id: classId, subject_ids: [subjectId] }];
      }
    });
  };

  // Assign subjects/classes
  const handleAssign = async () => {
    if (!teacherId) return;
    if (!assignments.length) {
      toast.error("No subjects/classes selected.");
      return;
    }

    setLoading(true);
    try {
      const data = {
        school_id: authUser.school_id,
        assignments: assignments,
      };
      const success = await assignSubClasstoTeacher(teacherId, data);
      if (success) {
        toast.success("Subjects and classes assigned successfully!");
      }
    } catch (err) {
      console.error("Assign failed:", err);
      toast.error("Failed to assign subjects/classes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-auto mt-10 ">
      
      <Table className="w-full text-center border border-border  ">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Subjects / Classes</TableHead>
            {classes.map((cls) => (
              <TableHead key={cls.id}>
                {cls.class} {cls.section}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {subjects.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell className="font-medium text-left">{sub.subject_name}</TableCell>
              {classes.map((cls) => {
                const assigned = assignments
                  .find((a) => a.class_id === Number(cls.id))
                  ?.subject_ids.includes(sub.id);

                return (
                  <TableCell key={cls.id}>
                    <div
                      className={`w-6 h-6 cursor-pointer rounded ${
                        assigned ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700 "
                      }`}
                      onClick={() => toggleAssignment(sub.id, Number(cls.id))}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-10  flex justify-end">
        <Button onClick={handleAssign} disabled={loading}>
          {loading ? "Assigning..." : "Assign Subjects & Classes"}
        </Button>
      </div>

     {/* <pre>{JSON.stringify(assignments, null, 2)}</pre> */}
    </div>
  );
};

export default SubjectClassGrid;
