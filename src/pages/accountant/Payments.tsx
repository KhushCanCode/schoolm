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
import { Plus, Search, Download, CheckCircle, Clock, XCircle } from "lucide-react";

const AccountantPayments = () => {
  const paymentData = [
    {
      id: "PAY-001",
      clientName: "ABC Corporation",
      amount: 2500,
      method: "Bank Transfer",
      date: "2024-01-15",
      status: "completed",
      reference: "TXN123456789"
    },
    {
      id: "PAY-002",
      clientName: "XYZ Limited", 
      amount: 1800,
      method: "Credit Card",
      date: "2024-01-14",
      status: "processing",
      reference: "TXN123456788"
    },
    {
      id: "PAY-003",
      clientName: "DEF Industries",
      amount: 3200,
      method: "Check",
      date: "2024-01-12",
      status: "failed",
      reference: "CHK001234"
    },
    {
      id: "PAY-004",
      clientName: "GHI Technologies",
      amount: 900,
      method: "Cash",
      date: "2024-01-10",
      status: "completed",
      reference: "CSH001"
    },
    {
      id: "PAY-005",
      clientName: "JKL Enterprises",
      amount: 2200,
      method: "Bank Transfer",
      date: "2024-01-08",
      status: "completed",
      reference: "TXN123456787"
    }
  ];
  const fee = [
                { name: "Bank Transfer", fee: "Free", processingTime: "1-2 business days" },
                { name: "Credit Card", fee: "2.9% + $0.30", processingTime: "Instant" },
                { name: "Check", fee: "Free", processingTime: "3-5 business days" },
                { name: "Cash", fee: "Free", processingTime: "Instant" },
                { name: "ACH", fee: "$1.00", processingTime: "2-3 business days" },
              ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "processing":
        return <Clock className="h-4 w-4 text-warning" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "processing":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-8 px-14 py-9">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Payment Management</h1>
          <p className="text-gray-500 text-xs">Track and manage all client payments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-success-light">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-success">Total Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-success">$67,200</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-warning-light">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-warning">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-warning">$3,400</div>
            <p className="text-xs text-gray-500">2 transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-destructive/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-destructive">$3,200</div>
            <p className="text-xs text-gray-500">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Average Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-primary">$2,105</div>
            <p className="text-xs text-gray-500">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="search">Search Payments</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search by client, reference..."
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="card">Credit Card</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date Range</Label>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="This Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="px-9">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentData.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium text-xs">{payment.id}</TableCell>
                  <TableCell className="font-medium text-xs">{payment.clientName}</TableCell>
                  <TableCell className="font-semibold text-xs">${payment.amount.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold text-xs">{payment.method}</TableCell>
                  <TableCell className="font-semibold text-xs">{payment.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <Badge variant={getStatusVariant(payment.status) as "default" | "secondary" | "destructive"}>
                        {payment.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500  font-mono text-xs">
                    {payment.reference}
                  </TableCell>
                  <TableCell>
                    <Button  size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Accepted Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fee.map((method, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <p className="font-medium text-sm">{method.name}</p>
                    <p className="text-xs text-gray-500">Fee: {method.fee}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{method.processingTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start gap-3" >
                <Plus className="h-4 w-4" />
                Record New Payment
              </Button>
              <Button className="w-full justify-start gap-3">
                <Download className="h-4 w-4" />
                Export Payment Report
              </Button>
              <Button className="w-full justify-start gap-3" >
                <CheckCircle className="h-4 w-4" />
                Reconcile Payments
              </Button>
              <Button className="w-full justify-start gap-3" >
                <Clock className="h-4 w-4" />
                Review Pending
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountantPayments;