import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, Mail, Phone, Send, Calendar, DollarSign } from "lucide-react";

const AccountantDues = () => {
  const pendingDues = [
    {
      id: 1,
      clientName: "ABC Corporation",
      amount: 2500,
      dueDate: "2024-01-15",
      daysPastDue: 5,
      contactPerson: "John Smith",
      email: "john@abc.com",
      phone: "+1 (555) 123-4567",
      lastReminder: "2024-01-18",
      feeType: "Monthly Retainer"
    },
    {
      id: 2,
      clientName: "XYZ Limited",
      amount: 1800,
      dueDate: "2024-01-10",
      daysPastDue: 10,
      contactPerson: "Sarah Johnson",
      email: "sarah@xyz.com", 
      phone: "+1 (555) 234-5678",
      lastReminder: "2024-01-15",
      feeType: "Tax Preparation"
    },
    {
      id: 3,
      clientName: "DEF Industries",
      amount: 3200,
      dueDate: "2024-01-05",
      daysPastDue: 15,
      contactPerson: "Mike Wilson",
      email: "mike@def.com",
      phone: "+1 (555) 345-6789",
      lastReminder: "2024-01-12",
      feeType: "Audit Services"
    },
    {
      id: 4,
      clientName: "GHI Technologies",
      amount: 950,
      dueDate: "2024-01-20",
      daysPastDue: 0,
      contactPerson: "Lisa Brown",
      email: "lisa@ghi.com",
      phone: "+1 (555) 456-7890",
      lastReminder: null,
      feeType: "Consultation"
    },
    {
      id: 5,
      clientName: "JKL Enterprises",
      amount: 2200,
      dueDate: "2024-01-12",
      daysPastDue: 8,
      contactPerson: "David Lee",
      email: "david@jkl.com",
      phone: "+1 (555) 567-8901",
      lastReminder: "2024-01-16",
      feeType: "Monthly Retainer"
    }
  ];

  type Priority = {
    level: "due" | "overdue" | "critical";
    color: "warning" | "destructive";
  };

  const getDuePriority = (daysPastDue: number): Priority => {
    if (daysPastDue === 0) return { level: "due", color: "warning" };
    if (daysPastDue <= 7) return { level: "overdue", color: "destructive" };
    return { level: "critical", color: "destructive" };
  };

  return (
    <div className="space-y-8 px-16 py-9">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Pending Dues</h1>
          <p className="text-gray-500 text-xs">Track overdue payments and follow up with clients</p>
        </div>
        <div className="flex gap-3">
          <Button className="gap-2">
            <Mail className="h-4 w-4" />
            Send Bulk Reminder
          </Button>
          <Button className="gap-2">
            <Send className="h-4 w-4" />
            Generate Statements
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-warning-light">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-warning">Due Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-warning">$950</div>
            <p className="text-xs text-gray-500">1 client</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-destructive/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-destructive">1-7 Days Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-destructive">$4,700</div>
            <p className="text-xs text-gray-500">2 clients</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-destructive/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-destructive">7+ Days Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-destructive">$5,000</div>
            <p className="text-xs text-gray-500">2 clients</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-primary">$10,650</div>
            <p className="text-xs text-gray-500">5 clients</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="search">Search Clients</Label>
              <Input
                id="search"
                placeholder="Search by client name..."
              />
            </div>
            <div>
              <Label>Priority</Label>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="due">Due Today</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount Range</Label>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Amounts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Amounts</SelectItem>
                  <SelectItem value="under1000">Under $1,000</SelectItem>
                  <SelectItem value="1000to5000">$1,000 - $5,000</SelectItem>
                  <SelectItem value="over5000">Over $5,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex text-lg items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Outstanding Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Past Due</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Last Reminder</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingDues.map((due) => {
                const priority = getDuePriority(due.daysPastDue);
                return (
                  <TableRow key={due.id}>
                    <TableCell className="text-xs">
                      <div>
                        <p className="font-medium text-xs">{due.clientName}</p>
                        <p className="text-xs text-gray-500">{due.contactPerson}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{due.feeType}</TableCell>
                    <TableCell className="font-semibold text-xs">${due.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-xs">{due.dueDate}</TableCell>
                    <TableCell className="text-xs">
                      <Badge variant={priority.color === "warning" ? "default" : priority.color} className="text-xs">
                        {due.daysPastDue === 0 ? "Due Today" : `${due.daysPastDue} days`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={priority.color === "warning" ? "default" : priority.color}>
                        {priority.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">
                      {due.lastReminder || "Never"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button  size="sm" className="gap-1">
                              <Mail className="h-3 w-3" />
                              Contact
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Contact {due.clientName}</DialogTitle>
                              <DialogDescription>
                                Send a payment reminder or follow up
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Contact Person</Label>
                                  <p className="text-sm font-medium">{due.contactPerson}</p>
                                </div>
                                <div>
                                  <Label>Amount Due</Label>
                                  <p className="text-sm font-medium">${due.amount.toLocaleString()}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" size="sm" className="gap-2">
                                  <Mail className="h-4 w-4" />
                                  {due.email}
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2">
                                  <Phone className="h-4 w-4" />
                                  {due.phone}
                                </Button>
                              </div>
                              <div>
                                <Label htmlFor="message">Message</Label>
                                <Textarea 
                                  id="message"
                                  placeholder="Dear [Client], This is a friendly reminder that your payment of $[Amount] was due on [Date]..."
                                  className="mt-1"
                                />
                              </div>
                              <div className="flex gap-2 justify-end">
                                <Button variant="outline">Schedule Later</Button>
                                <Button>Send Now</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Reminder Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border bg-muted/30">
              <h3 className="font-semibold mb-2 text-sm">Friendly Reminder</h3>
              <p className="text-xs text-gray-500 mb-3">
                For payments 1-3 days overdue
              </p>
              <Button  className="w-full">
                Use Template
              </Button>
            </div>
            <div className="p-4 rounded-lg border bg-warning/10">
              <h3 className="font-semibold mb-2 text-sm">Urgent Notice</h3>
              <p className="text-xs text-gray-500 mb-3">
                For payments 4-7 days overdue
              </p>
              <Button  className="w-full">
                Use Template
              </Button>
            </div>
            <div className="p-4 rounded-lg border bg-destructive/10">
              <h3 className="font-semibold mb-2 text-sm">Final Notice</h3>
              <p className="text-xs text-gray-500 mb-3">
                For payments 8+ days overdue
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Use Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountantDues;