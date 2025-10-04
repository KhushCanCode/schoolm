import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Download, Eye, Trophy, TrendingUp, Users, FileText } from 'lucide-react';

interface ExamResult {
  id: string;
  studentName: string;
  rollNo: string;
  class: string;
  section: string;
  examType: string;
  subjects: {
    [key: string]: {
      marks: number;
      maxMarks: number;
      grade: string;
    };
  };
  totalMarks: number;
  maxTotalMarks: number;
  percentage: number;
  grade: string;
  rank: number;
  status: 'pass' | 'fail';
}

interface SubjectAnalysis {
  subject: string;
  averageMarks: number;
  maxMarks: number;
  passRate: number;
  topperMarks: number;
  topperName: string;
}

const ExamReport = () => {
  const [examResults, setExamResults] = useState<ExamResult[]>([
    {
      id: '1',
      studentName: 'Rahul Kumar',
      rollNo: '101',
      class: '10',
      section: 'A',
      examType: 'Final Exam',
      subjects: {
        'Mathematics': { marks: 95, maxMarks: 100, grade: 'A+' },
        'English': { marks: 88, maxMarks: 100, grade: 'A' },
        'Science': { marks: 92, maxMarks: 100, grade: 'A+' },
        'Social Studies': { marks: 85, maxMarks: 100, grade: 'A' },
        'Hindi': { marks: 90, maxMarks: 100, grade: 'A+' }
      },
      totalMarks: 450,
      maxTotalMarks: 500,
      percentage: 90,
      grade: 'A+',
      rank: 1,
      status: 'pass'
    },
    {
      id: '2',
      studentName: 'Priya Sharma',
      rollNo: '102',
      class: '10',
      section: 'A',
      examType: 'Final Exam',
      subjects: {
        'Mathematics': { marks: 85, maxMarks: 100, grade: 'A' },
        'English': { marks: 92, maxMarks: 100, grade: 'A+' },
        'Science': { marks: 88, maxMarks: 100, grade: 'A' },
        'Social Studies': { marks: 90, maxMarks: 100, grade: 'A+' },
        'Hindi': { marks: 85, maxMarks: 100, grade: 'A' }
      },
      totalMarks: 440,
      maxTotalMarks: 500,
      percentage: 88,
      grade: 'A',
      rank: 2,
      status: 'pass'
    },
    {
      id: '3',
      studentName: 'Amit Singh',
      rollNo: '103',
      class: '10',
      section: 'B',
      examType: 'Final Exam',
      subjects: {
        'Mathematics': { marks: 78, maxMarks: 100, grade: 'B+' },
        'English': { marks: 82, maxMarks: 100, grade: 'A' },
        'Science': { marks: 75, maxMarks: 100, grade: 'B+' },
        'Social Studies': { marks: 80, maxMarks: 100, grade: 'B+' },
        'Hindi': { marks: 85, maxMarks: 100, grade: 'A' }
      },
      totalMarks: 400,
      maxTotalMarks: 500,
      percentage: 80,
      grade: 'B+',
      rank: 8,
      status: 'pass'
    }
  ]);

  const [subjectAnalysis, setSubjectAnalysis] = useState<SubjectAnalysis[]>([
    { subject: 'Mathematics', averageMarks: 82.5, maxMarks: 100, passRate: 92, topperMarks: 95, topperName: 'Rahul Kumar' },
    { subject: 'English', averageMarks: 87.3, maxMarks: 100, passRate: 95, topperMarks: 92, topperName: 'Priya Sharma' },
    { subject: 'Science', averageMarks: 85.0, maxMarks: 100, passRate: 90, topperMarks: 92, topperName: 'Rahul Kumar' },
    { subject: 'Social Studies', averageMarks: 85.0, maxMarks: 100, passRate: 94, topperMarks: 90, topperName: 'Priya Sharma' },
    { subject: 'Hindi', averageMarks: 86.7, maxMarks: 100, passRate: 96, topperMarks: 90, topperName: 'Rahul Kumar' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedExam, setSelectedExam] = useState('all');

  const filteredResults = examResults.filter(result => {
    const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.rollNo.includes(searchTerm);
    const matchesClass = selectedClass === 'all' || result.class === selectedClass;
    const matchesExam = selectedExam === 'all' || result.examType === selectedExam;
    
    return matchesSearch && matchesClass && matchesExam;
  });

  // Calculate statistics
  const averagePercentage = examResults.reduce((sum, result) => sum + result.percentage, 0) / examResults.length;
  const passRate = (examResults.filter(result => result.status === 'pass').length / examResults.length) * 100;
  const topPerformers = examResults.filter(result => result.percentage >= 85).length;

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B+': return 'bg-yellow-100 text-yellow-800';
      case 'B': return 'bg-orange-100 text-orange-800';
      case 'C': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const downloadReport = () => {
    console.log('Downloading exam report...');
  };

  return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold ">Exam Reports</h2>
          <p className="text-gray-500 text-xs">Comprehensive exam results and analysis</p>
        </div>
        <Button onClick={downloadReport}>
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{averagePercentage.toFixed(1)}%</div>
            <p className="text-xs text-gray-500">Class average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{passRate.toFixed(1)}%</div>
            <p className="text-xs text-gray-500">Students passed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Trophy className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{topPerformers}</div>
            <p className="text-xs text-gray-500">Above 85%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{examResults.length}</div>
            <p className="text-xs text-gray-500">Appeared for exam</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="results" className="space-y-4">
        <TabsList>
          <TabsTrigger  value="results">Exam Results</TabsTrigger>
          <TabsTrigger value="analysis">Subject Analysis</TabsTrigger>
          <TabsTrigger value="toppers">Toppers List</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-md">Filter Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <Label htmlFor="exam">Exam Type</Label>
                  <Select value={selectedExam} onValueChange={setSelectedExam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Exams</SelectItem>
                      <SelectItem value="Final Exam">Final Exam</SelectItem>
                      <SelectItem value="Mid Term">Mid Term</SelectItem>
                      <SelectItem value="Unit Test">Unit Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exam Results Table */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Exam Results</CardTitle>
              <CardDescription className='text-xs text-gray-500'>
                Complete exam results for all students ({filteredResults.length} results)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Total Marks</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium text-xs">#{result.rank}</TableCell>
                      <TableCell className="font-medium text-xs">{result.rollNo}</TableCell>
                      <TableCell className="font-medium text-xs">{result.studentName}</TableCell>
                      <TableCell className="font-medium text-xs">{result.class}-{result.section}</TableCell>
                      <TableCell className="font-medium text-xs">{result.totalMarks}/{result.maxTotalMarks}</TableCell>
                      <TableCell className="font-medium text-xs">{result.percentage}%</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(result.grade)}`}>
                          {result.grade}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={result.status === 'pass' ? 'default' : 'destructive'}>
                          {result.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Subject-wise Analysis</CardTitle>
              <CardDescription className='text-xs text-gray-500'>Performance analysis for each subject</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Average Marks</TableHead>
                    <TableHead>Highest Score</TableHead>
                    <TableHead>Topper</TableHead>
                    <TableHead>Pass Rate</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectAnalysis.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-xs">{subject.subject}</TableCell>
                      <TableCell className="font-medium text-xs">{subject.averageMarks.toFixed(1)}/{subject.maxMarks}</TableCell>
                      <TableCell className="font-medium text-xs">{subject.topperMarks}</TableCell>
                      <TableCell className="font-medium text-xs">{subject.topperName}</TableCell>
                      <TableCell className="font-medium text-xs">{subject.passRate}%</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${subject.passRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{subject.passRate}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="toppers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Class Toppers</CardTitle>
              <CardDescription className='text-xs text-gray-500' >Top performing students in the exam</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examResults
                  .sort((a, b) => a.rank - b.rank)
                  .slice(0, 10)
                  .map((student, index) => (
                    <div key={student.id} className={`flex items-center justify-between p-4 rounded-lg border ${index < 3 ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'}`}>
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-400 text-yellow-900' :
                          index === 1 ? 'bg-gray-300 text-gray-700' :
                          index === 2 ? 'bg-orange-300 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {student.rank}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{student.studentName}</h4>
                          <p className="text-xs text-gray-500">
                            Roll No: {student.rollNo} • Class {student.class}-{student.section}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-md">{student.percentage}%</div>
                        <div className="text-xs text-gray-500">{student.totalMarks}/{student.maxTotalMarks}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamReport;