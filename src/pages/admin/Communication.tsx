import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare,
  Send,
  Bell,
  Mail,
  Phone,
  Calendar,
  Plus,
  Search,
  Filter,
  Eye,
  Archive
} from "lucide-react";

export const Communication = () => {
  const [newMessage, setNewMessage] = useState("");

  const messages = [
    {
      id: "MSG001",
      sender: "Dr. Sarah Johnson",
      recipient: "Grade 10 Parents",
      subject: "Mid-term Exam Schedule",
      preview: "The mid-term examinations for Grade 10 will commence from March 20th...",
      timestamp: "2 hours ago",
      status: "Sent",
      priority: "High"
    },
    {
      id: "MSG002",
      sender: "Prof. Michael Brown", 
      recipient: "Grade 9-B Students",
      subject: "Assignment Submission Reminder",
      preview: "This is a friendly reminder that your English Literature assignment...",
      timestamp: "4 hours ago",
      status: "Delivered",
      priority: "Medium"
    },
    {
      id: "MSG003",
      sender: "Principal Office",
      recipient: "All Parents",
      subject: "Parent-Teacher Meeting",
      preview: "We are pleased to invite you to the upcoming Parent-Teacher meeting...",
      timestamp: "1 day ago", 
      status: "Read",
      priority: "High"
    }
  ];

  const notices = [
    {
      id: "NOT001",
      title: "School Annual Day Celebration", 
      content: "We are excited to announce our Annual Day celebration on March 30th, 2024. All students and parents are cordially invited.",
      publishDate: "2024-03-15",
      expiryDate: "2024-03-30",
      targetAudience: "All Students & Parents",
      status: "Active",
      priority: "High"
    },
    {
      id: "NOT002",
      title: "Library Renovation Notice",
      content: "The school library will be closed for renovation from March 25th to April 5th. Alternative study spaces will be available.",
      publishDate: "2024-03-14",
      expiryDate: "2024-04-05", 
      targetAudience: "All Students",
      status: "Active",
      priority: "Medium"
    },
    {
      id: "NOT003",
      title: "Fee Payment Deadline Extension",
      content: "Due to technical issues, the fee payment deadline has been extended to March 25th, 2024.",
      publishDate: "2024-03-12",
      expiryDate: "2024-03-25",
      targetAudience: "All Parents", 
      status: "Active",
      priority: "High"
    }
  ];

  const announcements = [
    {
      id: "ANN001",
      title: "Science Fair 2024 Winners",
      description: "Congratulations to all participants and winners of the Science Fair 2024!",
      date: "2024-03-16",
      category: "Achievement"
    },
    {
      id: "ANN002", 
      title: "New Transport Route Added",
      description: "We have added a new transport route covering the northern suburbs.",
      date: "2024-03-14",
      category: "Transport"
    },
    {
      id: "ANN003",
      title: "Sports Day Registration Open", 
      description: "Registration for Annual Sports Day is now open. Deadline: March 22nd.",
      date: "2024-03-13",
      category: "Sports"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold ">Communication</h2>
          <p className="text-gray-500 text-xs">Manage messages, notices, and announcements</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hover:bg-navbar hover:text-accent">
            <Bell className="mr-2 h-4 w-4" />
            Send Notification
          </Button>
          <Button >
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-500 text-xs">Total Messages</p>
                <p className="text-lg font-bold">247</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className=" font-medium text-gray-500 text-xs">Active Notices</p>
                <p className="text-lg font-bold">8</p>
              </div>
              <Bell className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className=" font-medium text-gray-500 text-xs">Email Sent</p>
                <p className="text-lg font-bold">1,543</p>
              </div>
              <Mail className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-500 text-xs">Delivery Rate</p>
                <p className="text-lg font-bold">96.8%</p>
              </div>
              <Phone className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-4 shadow-md">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Recent Messages</CardTitle>
                  <CardDescription className="text-xs text-gray-500">Sent and received communications</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs h-4 w-4" />
                    <Input
                      placeholder="Search messages..."
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start justify-between p-4 rounded-lg border bg-background/50 hover:bg-accent/20 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{message.subject}</h4>
                        <Badge 
                          variant={message.priority === "High" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {message.priority}
                        </Badge>
                      </div>
                      <p className=" text-gray-500 text-xs mb-1">
                        From: {message.sender} → {message.recipient}
                      </p>
                      <p className=" text-gray-500 text-xs">{message.preview}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className=" text-gray-500 text-xs">{message.timestamp}</span>
                        <Badge variant="outline" className="text-xs">
                          {message.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notices Tab */}
        <TabsContent value="notices" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">School Notices</CardTitle>
              <CardDescription className="text-xs text-gray-500">Official notices and circular announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notices.map((notice) => (
                  <Card key={notice.id} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-sm">{notice.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant={notice.priority === "High" ? "destructive" : "secondary"}>
                            {notice.priority}
                          </Badge>
                          <Badge variant="default">{notice.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className=" text-gray-500 text-xs mb-3">{notice.content}</p>
                      <div className="flex justify-between items-center text-gray-500 text-xs">
                        <div className="flex gap-4">
                          <span>Published: {notice.publishDate}</span>
                          <span>Expires: {notice.expiryDate}</span>
                        </div>
                        <span>Target: {notice.targetAudience}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Recent Announcements</CardTitle>
              <CardDescription className="text-xs text-gray-500">School-wide announcements and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="flex items-center justify-between p-4 rounded-lg bg-accent/30">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{announcement.title}</h4>
                      <p className=" text-gray-500 text-xs mb-2">{announcement.description}</p>
                      <div className="flex items-center gap-2">
                        <span className=" text-gray-500 text-xs">{announcement.date}</span>
                        <Badge variant="outline" className="text-xs">
                          {announcement.category}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compose Tab */}
        <TabsContent value="compose" className="space-y-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Compose New Message</CardTitle>
              <CardDescription  className="text-xs text-gray-500">Send messages to students, parents, or staff</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Recipients</label>
                  <Input placeholder="Select recipients (e.g., Grade 10 Parents)" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input placeholder="Enter subject line" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={6}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge variant="outline">Draft Saved</Badge>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">Save Draft</Button>
                  <Button >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};