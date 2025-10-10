import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Download, Eye, DollarSign, Calendar, Users, AlertCircle } from 'lucide-react';

interface FeeRecord {
  id: string;
  studentName: string;
  rollNo: string;
  class: string;
  section: string;
  totalFee: number;
  paidAmount: number;
  pendingAmount: number;
  lastPaymentDate: string;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
  parentContact: string;
}

const FeeReports = () => {
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([
    {
      id: '1',
      studentName: 'Rahul Kumar',
      rollNo: '101',
      class: '10',
      section: 'A',
      totalFee: 50000,
      paidAmount: 50000,
      pendingAmount: 0,
      lastPaymentDate: '2024-11-15',
      status: 'paid',
      parentContact: '+91 9876543210'
    },
    {
      id: '2',
      studentName: 'Priya Sharma',
      rollNo: '102',
      class: '10',
      section: 'A',
      totalFee: 50000,
      paidAmount: 30000,
      pendingAmount: 20000,
      lastPaymentDate: '2024-10-15',
      status: 'partial',
      parentContact: '+91 9876543211'
    },
    {
      id: '3',
      studentName: 'Amit Singh',
      rollNo: '103',
      class: '10',
      section: 'B',
      totalFee: 50000,
      paidAmount: 0,
      pendingAmount: 50000,
      lastPaymentDate: '-',
      status: 'pending',
      parentContact: '+91 9876543212'
    },
    {
      id: '4',
      studentName: 'Sneha Patel',
      rollNo: '104',
      class: '9',
      section: 'A',
      totalFee: 45000,
      paidAmount: 25000,
      pendingAmount: 20000,
      lastPaymentDate: '2024-09-15',
      status: 'overdue',
      parentContact: '+91 9876543213'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredRecords = feeRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.rollNo.includes(searchTerm);
    const matchesClass = selectedClass === 'all' || record.class === selectedClass;
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  // Calculate summary statistics
  const totalCollected = feeRecords.reduce((sum, record) => sum + record.paidAmount, 0);
  const totalPending = feeRecords.reduce((sum, record) => sum + record.pendingAmount, 0);
  const totalExpected = feeRecords.reduce((sum, record) => sum + record.totalFee, 0);
  const collectionRate = totalExpected > 0 ? (totalCollected / totalExpected) * 100 : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'partial': return 'secondary';
      case 'pending': return 'outline';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  const downloadReport = () => {
    console.log('Downloading fee report...');
  };

  const sendReminder = (record: FeeRecord) => {
    console.log(`Sending reminder to ${record.studentName}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold ">Fee Reports</h2>
          <p className="text-gray-500 text-xs">Track and manage student fee payments</p>
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
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">₹{totalCollected.toLocaleString()}</div>
            <p className="text-xs text-gray-500">This academic year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <AlertCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Outstanding dues</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{collectionRate.toFixed(1)}%</div>
            <p className="text-xs text-gray-500">Payment efficiency</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Students</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {feeRecords.filter(r => r.status === 'overdue').length}
            </div>
            <p className="text-xs text-gray-500">Need follow-up</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4 ">
        <TabsList className='shadow-md'>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter Records</CardTitle>
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
                  <Label htmlFor="status">Payment Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fee Records Table */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Fee Collection Records</CardTitle>
              <CardDescription className='text-xs text-gray-500'>
                Complete fee payment records for all students ({filteredRecords.length} results)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Total Fee</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium text-xs">{record.rollNo}</TableCell>
                      <TableCell className="font-medium text-xs">{record.studentName}</TableCell>
                      <TableCell className="font-medium text-xs">{record.class}-{record.section}</TableCell>
                      <TableCell className="font-medium text-xs">₹{record.totalFee.toLocaleString()}</TableCell>
                      <TableCell className="font-medium text-xs">₹{record.paidAmount.toLocaleString()}</TableCell>
                      <TableCell className="font-medium text-xs">₹{record.pendingAmount.toLocaleString()}</TableCell>
                      <TableCell className="font-medium text-xs">{record.lastPaymentDate}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(record.status)}>
                          {record.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-xs'>{record.parentContact}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {record.status !== 'paid' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => sendReminder(record)}
                            >
                              Send Reminder
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Pending Payments</CardTitle>
              <CardDescription className='text-xs text-gray-500'>Students with outstanding fee payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feeRecords.filter(r => r.status === 'pending' || r.status === 'partial').map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{record.studentName} ({record.rollNo})</h4>
                      <p className="text-xs text-gray-500 ">
                        Class {record.class}-{record.section} • Pending: ₹{record.pendingAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => sendReminder(record)}>
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className='text-lg '>Overdue Payments</CardTitle>
              <CardDescription className='text-xs text-gray-500'>Students with overdue fee payments requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feeRecords.filter(r => r.status === 'overdue').map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <h4 className="font-medium text-sm">{record.studentName} ({record.rollNo})</h4>
                      <p className="text-xs text-gray-500">
                        Class {record.class}-{record.section} • Overdue: ₹{record.pendingAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-red-600">
                        Last payment: {record.lastPaymentDate}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => sendReminder(record)}>
                        Urgent Reminder
                      </Button>
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

export default FeeReports;