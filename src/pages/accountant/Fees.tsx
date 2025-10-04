import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const AccountantFees = () => {
  const [feeData,setFeeData] = useState([
    {
      id: 1,
      clientName: "ABC Corporation",
      feeType: "Monthly Dues",
      amount: 2500,
      dueDate: "2024-01-15",
      status: "paid",
      lastPaid: "2024-01-10"
    },
    {
      id: 2,
      clientName: "XYZ Limited",
      feeType: "Tax Service",
      amount: 1800,
      dueDate: "2024-01-20",
      status: "pending",
      lastPaid: "2023-12-15"
    },
    {
      id: 3,
      clientName: "DEF Industries",
      feeType: "Audit Fee",
      amount: 3200,
      dueDate: "2024-01-25",
      status: "overdue",
      lastPaid: "2023-11-20"
    },
    {
      id: 4,
      clientName: "GHI Technologies",
      feeType: "Consultation",
      amount: 900,
      dueDate: "2024-01-30",
      status: "paid",
      lastPaid: "2024-01-25"
    },
    {
      id: 5,
      clientName: "JKL Enterprises",
      feeType: "Monthly Dues",
      amount: 2200,
      dueDate: "2024-02-05",
      status: "pending",
      lastPaid: "2024-01-05"
    }
  ])
  const extraServices = [
    { name: "Tax Preparation", rate: 150, unit: "per hour" },
    { name: "Audit Services", rate: 200, unit: "per hour" },
    { name: "Consultation", rate: 120, unit: "per hour" },
    { name: "Financial Planning", rate: 180, unit: "per hour" },
    { name: "Payroll Services", rate: 75, unit: "per employee" },
    { name: "QuickBooks Setup", rate: 500, unit: "flat rate" },
  ];

  const handleDelete = (id:number)=>{
    if(!window.confirm("Are you sure you want to delete this fees?")) 
      return;
    setFeeData(prev => prev.filter(fee => fee.id !== id));
  }

  return (
    <div className="space-y-8 px-12 py-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Fee Management</h1>
          <p className="text-gray-500 text-xs">Manage client fees, monthly dues, and extra services</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Fee
        </Button>
      </div>

      {/* Fee Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-card to-success-light">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-success">Total Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-success">$45,200</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-warning-light">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-warning">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-warning">$18,400</div>
            <p className="text-xs text-gray-500">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-destructive/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-destructive">$6,800</div>
            <p className="text-xs text-gray-500">Past due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="search">Search Clients</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search by client name..."
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Fee Type</Label>
              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="monthly">Monthly Dues</SelectItem>
                  <SelectItem value="tax">Tax Service</SelectItem>
                  <SelectItem value="audit">Audit Fee</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fee Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Client Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Paid</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeData.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium text-xs">{fee.clientName}</TableCell>
                  <TableCell className="font-medium text-xs">{fee.feeType}</TableCell>
                  <TableCell className="font-medium text-xs">${fee.amount.toLocaleString()}</TableCell>
                  <TableCell className="font-medium text-xs">{fee.dueDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        fee.status === "paid" ? "default" : 
                        fee.status === "pending" ? "secondary" : 
                        "destructive"
                      }
                    >
                      {fee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{fee.lastPaid}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={()=>handleDelete(fee.id)}>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Extra Services & Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {extraServices.map((service, index) => (
              <div key={index} className="p-4 rounded-lg border bg-muted/30">
                <h3 className="font-semibold mb-1 text-sm">{service.name}</h3>
                <p className="text-sm font-bold text-primary">${service.rate}</p>
                <p className="text-xs text-gray-500">{service.unit}</p>
                <Button  className="mt-3 w-full">
                  Apply to Client
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountantFees;