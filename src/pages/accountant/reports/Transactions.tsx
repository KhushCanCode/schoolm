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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Search, Download, Filter, TrendingUp, Eye, Plus } from "lucide-react";

const Transactions = () => {
  const transactionData = [
    {
      id: "TXN-2024-001",
      date: "2024-01-20",
      clientName: "ABC Corporation",
      description: "Monthly Accounting Services",
      category: "Service Fee",
      type: "income",
      amount: 2500,
      status: "completed",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "TXN-2024-002", 
      date: "2024-01-19",
      clientName: "Office Supplies Inc",
      description: "Software Subscription",
      category: "Operating Expense",
      type: "expense",
      amount: 299,
      status: "completed",
      paymentMethod: "Credit Card"
    },
    {
      id: "TXN-2024-003",
      date: "2024-01-18",
      clientName: "XYZ Limited",
      description: "Tax Preparation Services",
      category: "Service Fee",
      type: "income",
      amount: 1800,
      status: "pending",
      paymentMethod: "Check"
    },
    {
      id: "TXN-2024-004",
      date: "2024-01-17",
      clientName: "Marketing Pro",
      description: "Professional Development",
      category: "Training",
      type: "expense",
      amount: 450,
      status: "completed",
      paymentMethod: "Credit Card"
    },
    {
      id: "TXN-2024-005",
      date: "2024-01-16",
      clientName: "DEF Industries",
      description: "Audit Services",
      category: "Service Fee",
      type: "income",
      amount: 3200,
      status: "completed",
      paymentMethod: "Bank Transfer"
    }
  ];

  const chartData = [
    { month: "Jul", income: 45000, expenses: 12000 },
    { month: "Aug", income: 52000, expenses: 14000 },
    { month: "Sep", income: 48000, expenses: 13000 },
    { month: "Oct", income: 61000, expenses: 15000 },
    { month: "Nov", income: 55000, expenses: 13500 },
    { month: "Dec", income: 67000, expenses: 16000 },
  ];

  const chartConfig = {
    income: {
      label: "Income",
      color: "hsl(var(--success))",
    },
    expenses: {
      label: "Expenses", 
      color: "hsl(var(--destructive))",
    },
  };

  const getTypeVariant = (type: string) => {
    return type === "income" ? "default" : "secondary";
  };

  const getStatusVariant = (status: string) => {
    return status === "completed" ? "default" : "secondary";
  };

  const totalIncome = transactionData
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactionData
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  return (
    <div className="space-y-6 px-11 py-9 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Transaction History</h1>
          <p className="text-gray-500 text-xs">View and manage all financial transactions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-success-light">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-success">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-success">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-gray-500">This period</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-destructive/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-destructive">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-gray-500">This period</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Net Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-primary">${netIncome.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Profit this period</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-accent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Transaction Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{transactionData.length}</div>
            <p className="text-xs text-gray-500">Total transactions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex text-lg items-center gap-2">
            <TrendingUp className="h-5 w-5  text-primary" />
            Income vs Expenses Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--success))" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--destructive))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="search">Search Transactions</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search by description, client..."
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Type</Label>
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="service">Service Fee</SelectItem>
                  <SelectItem value="operating">Operating Expense</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date Range</Label>
              <Select>
                <SelectTrigger className="w-[130px]">
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

      {/* Transaction Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionData.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                  <TableCell className="font-mono text-xs">{transaction.date}</TableCell>
                  <TableCell className="font-mono text-xs">
                    <div className="font-mono text-xs">
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.clientName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{transaction.category}</TableCell>
                  <TableCell>
                    <Badge variant={getTypeVariant(transaction.type)}>
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className={`font-semibold text-xs ${
                    transaction.type === "income" ? "text-success" : "text-destructive"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{transaction.paymentMethod}</TableCell>
                  <TableCell>
                    <Button  className="gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
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

export default Transactions;