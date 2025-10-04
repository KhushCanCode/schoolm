import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Download, Calendar, TrendingUp, FileText, DollarSign, Users } from "lucide-react";

const AccountantFeeReports = () => {
  const revenueByMonth = [
    { month: "Jan", revenue: 45000, expenses: 12000, profit: 33000 },
    { month: "Feb", revenue: 52000, expenses: 14000, profit: 38000 },
    { month: "Mar", revenue: 48000, expenses: 13000, profit: 35000 },
    { month: "Apr", revenue: 61000, expenses: 15000, profit: 46000 },
    { month: "May", revenue: 55000, expenses: 13500, profit: 41500 },
    { month: "Jun", revenue: 67000, expenses: 16000, profit: 51000 },
  ];

  const clientDistribution = [
    { name: "Corporate", value: 45, fill: "hsl(var(--primary))" },
    { name: "Small Business", value: 35, fill: "hsl(var(--gray-500))" },
    { name: "Individual", value: 20, fill: "hsl(var(--warning))" },
  ];

  const serviceRevenue = [
    { service: "Monthly Retainer", amount: 125000 },
    { service: "Tax Preparation", amount: 89000 },
    { service: "Audit Services", amount: 67000 },
    { service: "Consultation", amount: 34000 },
    { service: "Payroll Services", amount: 23000 },
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
    expenses: {
      label: "Expenses",
      color: "hsl(var(--destructive))",
    },
    profit: {
      label: "Profit",
      color: "hsl(var(--gray-500))",
    },
  };

  const reports = [
    {
      name: "Monthly Revenue Report",
      description: "Detailed breakdown of monthly income and expenses",
      lastGenerated: "2024-01-20",
      format: "PDF",
      size: "2.4 MB"
    },
    {
      name: "Client Fee Analysis",
      description: "Analysis of fee structures and client profitability",
      lastGenerated: "2024-01-18",
      format: "Excel",
      size: "1.8 MB"
    },
    {
      name: "Outstanding Dues Summary",
      description: "Report on pending payments and overdue accounts",
      lastGenerated: "2024-01-19",
      format: "PDF",
      size: "1.2 MB"
    },
    {
      name: "Service Performance Report",
      description: "Performance metrics for different service offerings",
      lastGenerated: "2024-01-17",
      format: "PDF",
      size: "3.1 MB"
    }
  ];

  return (
    <div className="space-y-8 overflow-hidden px-12 py-9">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Reports & Analytics</h1>
          <p className="text-gray-500 text-xs">Generate comprehensive reports and view analytics</p>
        </div>
        <div className="flex gap-3">
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-primary">$328,000</div>
            <p className="text-xs text-gray-500">+15.2% from last period</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-gray-500/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-gray-500">$244,500</div>
            <p className="text-xs text-gray-500">+18.7% from last period</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-warning/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-warning">74.5%</div>
            <p className="text-xs text-gray-500">+2.1% from last period</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-accent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">156</div>
            <p className="text-xs text-gray-500">+12 new this period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue & Profit Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%" className="px-20">
                <LineChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="hsl(var(--gray-500))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Client Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Client Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {clientDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Service Revenue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Revenue by Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%" className='px-20'>
                <BarChart data={serviceRevenue} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="service" type="category" width={120} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex text-lg items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%" className="px-20">
                <BarChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div className="flex-1">
                  <h3 className="font-semibold text-md">{report.name}</h3>
                  <p className="text-xs text-gray-500">{report.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>Last generated: {report.lastGenerated}</span>
                    <span>Format: {report.format}</span>
                    <span>Size: {report.size}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    Download
                  </Button>
                  <Button size="sm">
                    Regenerate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Report Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              Financial Summary
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              Client Analysis
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <DollarSign className="h-6 w-6" />
              Fee Report
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              Performance Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountantFeeReports;