import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubjectAssignment {
  id: string;
  teacherName: string;
  subject: string;
  class: string;
  section: string;
}

const AssignSubject = () => {
  const [assignments, setAssignments] = useState<SubjectAssignment[]>([
    { id: '1', teacherName: 'John Doe', subject: 'Mathematics', class: '10', section: 'A' },
    { id: '2', teacherName: 'Jane Smith', subject: 'English', class: '9', section: 'B' },
    { id: '3', teacherName: 'Mike Johnson', subject: 'Science', class: '8', section: 'A' },
  ]);

  const [formData, setFormData] = useState({
    teacherName: '',
    subject: '',
    class: '',
    section: '',
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology'];
  const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C', 'D'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setAssignments(prev => prev.map(assignment => 
        assignment.id === editingId 
          ? { ...assignment, ...formData }
          : assignment
      ));
      toast({
        title: "Assignment Updated",
        description: "Subject assignment has been updated successfully.",
      });
    } else {
      const newAssignment: SubjectAssignment = {
        id: Date.now().toString(),
        ...formData,
      };
      setAssignments(prev => [...prev, newAssignment]);
      toast({
        title: "Assignment Created",
        description: "New subject assignment has been created successfully.",
      });
    }

    setFormData({ teacherName: '', subject: '', class: '', section: '' });
    setEditingId(null);
    setOpen(false);
  };

  const handleEdit = (assignment: SubjectAssignment) => {
    setFormData({
      teacherName: assignment.teacherName,
      subject: assignment.subject,
      class: assignment.class,
      section: assignment.section,
    });
    setEditingId(assignment.id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== id));
    toast({
      title: "Assignment Deleted",
      description: "Subject assignment has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold ">Subject Assignment</h2>
          <p className="text-gray-500 text-xs">Assign subjects to teachers for different classes</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 " />
              New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='text-lg text-center'>{editingId ? 'Edit Assignment' : 'New Subject Assignment'}</DialogTitle>
              
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teacherName">Teacher Name</Label>
                <Input
                  id="teacherName"
                  value={formData.teacherName}
                  onChange={(e) => setFormData(prev => ({ ...prev, teacherName: e.target.value }))}
                  placeholder="Enter teacher name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select value={formData.class} onValueChange={(value) => setFormData(prev => ({ ...prev, class: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(cls => (
                        <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Select value={formData.section} onValueChange={(value) => setFormData(prev => ({ ...prev, section: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map(section => (
                        <SelectItem key={section} value={section}>Section {section}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" className='hover:bg-red-600 hover:text-white' variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingId ? 'Update' : 'Create'} Assignment
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Current Assignments</CardTitle>
          <CardDescription className='text-xs text-gray-500'>List of all subject assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead >Teacher Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Section</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium text-xs">{assignment.teacherName}</TableCell>
                  <TableCell className="font-medium text-xs">{assignment.subject}</TableCell>
                  <TableCell className="font-medium text-xs">Class {assignment.class}</TableCell>
                  <TableCell className="font-medium text-xs">Section {assignment.section}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(assignment)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(assignment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignSubject;