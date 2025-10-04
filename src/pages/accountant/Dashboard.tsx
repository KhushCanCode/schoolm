import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  FileText, 
  Users, 
  AlertCircle,
  Eye,
  Download
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface DashboardProps {
  className?: string;
}

const AccountantDashboard = ({ className }: DashboardProps) => {
  // Sample data for charts
  const monthlyRevenue = [
    { month: "Jan", amount: 45000 },
    { month: "Feb", amount: 52000 },
    { month: "Mar", amount: 48000 },
    { month: "Apr", amount: 61000 },
    { month: "May", amount: 55000 },
    { month: "Jun", amount: 67000 },
  ];

  const feeDistribution = [
    { name: "Monthly Dues", value: 65, fill: "hsl(var(--primary))" },
    { name: "Extra Services", value: 25, fill: "hsl(var(--success))" },
    { name: "Late Fees", value: 10, fill: "hsl(var(--warning))" },
  ];

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="space-y-9 overflow-hidden ">
        <div>
        <h2 className="text-lg font-bold "> Accountant Dashboard</h2>
        <p className="text-gray-500 text-xs">Welcome to your school management dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-gradient-to-br from-card to-accent border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold ">$328,000</div>
            <p className="text-xs text-gray-500">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-success-light border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-success">156</div>
            <p className="text-xs text-gray-500">
              +8 new this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-warning-light border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Dues</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-warning">$24,500</div>
            <p className="text-xs text-gray-500">
              23 overdue accounts
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-accent border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">$67,000</div>
            <p className="text-xs text-gray-500">
              +18.2% growth
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Monthly Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue} className="px-14">
                  <CartesianGrid strokeDasharray="3 3"  />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Fee Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feeDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {feeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Alerts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              {[
                { client: "ABC Corp", amount: "$2,500", type: "Monthly Fee", status: "paid" },
                { client: "XYZ Ltd", amount: "$1,800", type: "Tax Service", status: "paid" },
                { client: "DEF Inc", amount: "$3,200", type: "Audit Fee", status: "pending" },
                { client: "GHI Co", amount: "$900", type: "Consultation", status: "paid" },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{transaction.client}</p>
                    <p className="text-xs text-gray-500">{transaction.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount}</p>
                    <Badge variant={transaction.status === "paid" ? "default" : "secondary"}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Alerts & Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-xs">
              {[
                { message: "5 clients have overdue payments", type: "warning", action: "View Details" },
                { message: "Monthly reports ready for review", type: "info", action: "Review" },
                { message: "New client consultation scheduled", type: "success", action: "Prepare" },
                { message: "Tax deadline approaching (15 days)", type: "warning", action: "Schedule" },
              ].map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.type === "warning" ? "bg-warning" : 
                      alert.type === "success" ? "bg-success" : "bg-primary"
                    }`} />
                    <p className="text-xs">{alert.message}</p>
                  </div>
                  <Button  >
                    {alert.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <FileText className="h-6 w-6" />
              Generate Report
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <DollarSign className="h-6 w-6" />
              Record Payment
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Users className="h-6 w-6" />
              Add Client
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Download className="h-6 w-6" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountantDashboard;