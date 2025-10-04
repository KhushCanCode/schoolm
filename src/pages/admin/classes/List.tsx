import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClassInfo {
  id: string;
  className: string;
  section: string;
  capacity: number;
  currentStudents: number;
  classTeacher: string;
  room: string;
}

const ClassList = () => {
  const [classes, setClasses] = useState([
    { id: '1', className: '10', section: 'A', capacity: 40, currentStudents: 35, classTeacher: 'John Doe', room: 'R-101' },
    { id: '2', className: '10', section: 'B', capacity: 40, currentStudents: 38, classTeacher: 'Jane Smith', room: 'R-102' },
    { id: '3', className: '9', section: 'A', capacity: 35, currentStudents: 32, classTeacher: 'Mike Johnson', room: 'R-201' },
  ]);

  const [formData, setFormData] = useState({
    className: '',
    section: '',
    capacity: '',
    classTeacher: '',
    room: '',
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setClasses(prev => prev.map(cls => 
        cls.id === editingId 
          ? { 
              ...cls, 
              className: formData.className,
              section: formData.section,
              capacity: parseInt(formData.capacity),
              classTeacher: formData.classTeacher,
              room: formData.room,
            }
          : cls
      ));
      toast({
        title: "Class Updated",
        description: "Class information has been updated successfully.",
      });
    } else {
      const newClass: ClassInfo = {
        id: Date.now().toString(),
        className: formData.className,
        section: formData.section,
        capacity: parseInt(formData.capacity),
        currentStudents: 0,
        classTeacher: formData.classTeacher,
        room: formData.room,
      };
      setClasses(prev => [...prev, newClass]);
      toast({
        title: "Class Created",
        description: "New class has been created successfully.",
      });
    }

    setFormData({ className: '', section: '', capacity: '', classTeacher: '', room: '' });
    setEditingId(null);
    setOpen(false);
  };

  const handleEdit = (classInfo: ClassInfo) => {
    setFormData({
      className: classInfo.className,
      section: classInfo.section,
      capacity: classInfo.capacity.toString(),
      classTeacher: classInfo.classTeacher,
      room: classInfo.room,
    });
    setEditingId(classInfo.id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setClasses(prev => prev.filter(cls => cls.id !== id));
    toast({
      title: "Class Deleted",
      description: "Class has been deleted successfully.",
    });
  };

  const getCapacityStatus = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 95) return 'destructive';
    if (percentage >= 80) return 'secondary';
    return 'default';
  };

  return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold ">Class Management</h2>
          <p className="text-gray-500 text-xs">Manage classes, sections, and capacity</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 " />
              New Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='text-lg text-center'>{editingId ? 'Edit Class' : 'New Class'}</DialogTitle>
             
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="className">Class</Label>
                  <Input
                    id="className"
                    value={formData.className}
                    onChange={(e) => setFormData(prev => ({ ...prev, className: e.target.value }))}
                    placeholder="e.g., 10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Input
                    id="section"
                    value={formData.section}
                    onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
                    placeholder="e.g., A"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                  placeholder="Maximum students"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="classTeacher">Class Teacher</Label>
                <Input
                  id="classTeacher"
                  value={formData.classTeacher}
                  onChange={(e) => setFormData(prev => ({ ...prev, classTeacher: e.target.value }))}
                  placeholder="Teacher name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Room Number</Label>
                <Input
                  id="room"
                  value={formData.room}
                  onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                  placeholder="e.g., R-101"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" className='hover:bg-red-600 hover:text-white' variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingId ? 'Update' : 'Create'} Class
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Class {cls.className} - {cls.section}</CardTitle>
                  <CardDescription>Room: {cls.room}</CardDescription>
                </div>
                <Badge variant={getCapacityStatus(cls.currentStudents, cls.capacity)}>
                  {cls.currentStudents}/{cls.capacity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500 text-xs" />
                  <span className="text-sm">Class Teacher: {cls.classTeacher}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(cls.currentStudents / cls.capacity) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between  text-gray-500 text-xs">
                  <span>{cls.currentStudents} Students</span>
                  <span>{cls.capacity - cls.currentStudents} Available</span>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(cls)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(cls.id)}
                    className='text-accent'
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassList;