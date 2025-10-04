import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Download, Calendar as CalendarIcon, Users, UserCheck, UserX, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface AttendanceRecord {
  id: string;
  studentName: string;
  rollNo: string;
  class: string;
  section: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateComings: number;
  attendancePercentage: number;
  lastAbsent: string;
}

interface DailyAttendance {
  date: string;
  totalStudents: number;
  present: number;
  absent: number;
  attendanceRate: number;
}

const AttendanceReport = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      studentName: 'Rahul Kumar',
      rollNo: '101',
      class: '10',
      section: 'A',
      totalDays: 100,
      presentDays: 95,
      absentDays: 5,
      lateComings: 3,
      attendancePercentage: 95,
      lastAbsent: '2024-11-20'
    },
    {
      id: '2',
      studentName: 'Priya Sharma',
      rollNo: '102',
      class: '10',
      section: 'A',
      totalDays: 100,
      presentDays: 88,
      absentDays: 12,
      lateComings: 5,
      attendancePercentage: 88,
      lastAbsent: '2024-11-22'
    },
    {
      id: '3',
      studentName: 'Amit Singh',
      rollNo: '103',
      class: '10',
      section: 'B',
      totalDays: 100,
      presentDays: 92,
      absentDays: 8,
      lateComings: 2,
      attendancePercentage: 92,
      lastAbsent: '2024-11-18'
    },
    {
      id: '4',
      studentName: 'Sneha Patel',
      rollNo: '104',
      class: '9',
      section: 'A',
      totalDays: 100,
      presentDays: 85,
      absentDays: 15,
      lateComings: 8,
      attendancePercentage: 85,
      lastAbsent: '2024-11-25'
    }
  ]);

  const [dailyAttendance, setDailyAttendance] = useState<DailyAttendance[]>([
    { date: '2024-11-25', totalStudents: 120, present: 110, absent: 10, attendanceRate: 91.7 },
    { date: '2024-11-24', totalStudents: 120, present: 115, absent: 5, attendanceRate: 95.8 },
    { date: '2024-11-23', totalStudents: 120, present: 108, absent: 12, attendanceRate: 90.0 },
    { date: '2024-11-22', totalStudents: 120, present: 112, absent: 8, attendanceRate: 93.3 },
    { date: '2024-11-21', totalStudents: 120, present: 118, absent: 2, attendanceRate: 98.3 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.rollNo.includes(searchTerm);
    const matchesClass = selectedClass === 'all' || record.class === selectedClass;
    
    return matchesSearch && matchesClass;
  });

  // Calculate summary statistics
  const averageAttendance = attendanceRecords.reduce((sum, record) => sum + record.attendancePercentage, 0) / attendanceRecords.length;
  const lowAttendanceStudents = attendanceRecords.filter(record => record.attendancePercentage < 75).length;
  const perfectAttendance = attendanceRecords.filter(record => record.attendancePercentage >= 95).length;

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return 'default';
    if (percentage >= 85) return 'secondary';
    if (percentage >= 75) return 'outline';
    return 'destructive';
  };

  const downloadReport = () => {
    console.log('Downloading attendance report...');
  };

  const markAttendance = () => {
    console.log('Opening attendance marking interface...');
  };

  return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold ">Attendance Reports</h2>
          <p className="text-gray-500 text-xs">Track and manage student attendance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={markAttendance}>
            <Clock className="h-4 w-4 mr-2" />
            Mark Attendance
          </Button>
          <Button onClick={downloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{averageAttendance.toFixed(1)}%</div>
            <p className="text-xs text-gray-500">School average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perfect Attendance</CardTitle>
            <UserCheck className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{perfectAttendance}</div>
            <p className="text-xs text-gray-500">Students ≥95%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Attendance</CardTitle>
            <UserX className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{lowAttendanceStudents}</div>
            <p className="text-xs text-gray-500">Students &lt;75%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
            <CalendarIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {dailyAttendance.length > 0 ? `${dailyAttendance[0].attendanceRate.toFixed(1)}%` : 'N/A'}
            </div>
            <p className="text-xs text-gray-500">
              {dailyAttendance.length > 0 ? `${dailyAttendance[0].present}/${dailyAttendance[0].totalStudents}` : 'No data'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="student-wise" className="space-y-4">
        <TabsList className='shadow-md'>
          <TabsTrigger value="student-wise">Student-wise</TabsTrigger>
          <TabsTrigger value="daily">Daily Report</TabsTrigger>
          <TabsTrigger value="mark-attendance">Mark Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="student-wise" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-md">Filter Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Student</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="search"
                      placeholder="Name or Roll No."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="8">Class 8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Attendance Table */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Student Attendance Records</CardTitle>
              <CardDescription className='text-xs text-gray-500'>
                Individual attendance records for all students ({filteredRecords.length} results)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Total Days</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Last Absent</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium text-xs">{record.rollNo}</TableCell>
                      <TableCell className="font-medium text-xs">{record.studentName}</TableCell>
                      <TableCell className="font-medium text-xs">{record.class}-{record.section}</TableCell>
                      <TableCell className="font-medium text-xs">{record.totalDays}</TableCell>
                      <TableCell  className="font-medium text-xs">{record.presentDays}</TableCell>
                      <TableCell className="font-medium text-xs">{record.absentDays}</TableCell>
                      <TableCell className="font-medium text-xs">{record.lateComings}</TableCell>
                      <TableCell className="font-medium">{record.attendancePercentage}%</TableCell>
                      <TableCell className="font-medium text-xs">{record.lastAbsent}</TableCell>
                      <TableCell>
                        <Badge variant={getAttendanceColor(record.attendancePercentage)}>
                          {record.attendancePercentage >= 95 ? 'Excellent' :
                           record.attendancePercentage >= 85 ? 'Good' :
                           record.attendancePercentage >= 75 ? 'Average' : 'Poor'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Daily Attendance Summary</CardTitle>
              <CardDescription className='text-xs text-gray-500'>Daily attendance statistics for the school</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyAttendance.map((day, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-xs">{day.date}</TableCell>
                      <TableCell className="font-medium text-xs">{day.totalStudents}</TableCell>
                      <TableCell className="text-green-600 text-xs">{day.present}</TableCell>
                      <TableCell className="text-red-600 text-xs">{day.absent}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-xs">{day.attendanceRate}%</span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${day.attendanceRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mark-attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
              <CardDescription>Mark attendance for today's classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="8">Class 8</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                      <SelectItem value="C">Section C</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    Load Students
                  </Button>
                </div>
                <div className="text-center py-8 text-gray-500">
                  Select a class and section to begin marking attendance
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceReport;