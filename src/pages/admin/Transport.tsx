import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Bus, MapPin, Users, Route } from "lucide-react";
import { Link } from "react-router-dom";

const Transport = () => {
  const transportData = [
    { id: 1, busNo: "SCH-001", route: "Route A", driver: "Ramesh Kumar", students: 45, capacity: 50, status: "Active" },
    { id: 2, busNo: "SCH-002", route: "Route B", driver: "Suresh Sharma", students: 38, capacity: 45, status: "Active" },
    { id: 3, busNo: "SCH-003", route: "Route C", driver: "Mukesh Patel", students: 42, capacity: 50, status: "Active" },
    { id: 4, busNo: "SCH-004", route: "Route D", driver: "Rajesh Singh", students: 0, capacity: 40, status: "Maintenance" },
    { id: 5, name: "Priya Singh", class: "10B", route: "Route A", busNo: "SCH-001", pickupPoint: "Main Square", fees: "₹2,500" },
  ];

  const studentTransport = [
    { id: 1, name: "Rahul Sharma", class: "10A", route: "Route A", busNo: "SCH-001", pickupPoint: "City Center", fees: "₹2,500" },
    { id: 2, name: "Priya Singh", class: "10B", route: "Route B", busNo: "SCH-002", pickupPoint: "Mall Road", fees: "₹2,200" },
    { id: 3, name: "Amit Kumar", class: "9A", route: "Route C", busNo: "SCH-003", pickupPoint: "Station Road", fees: "₹2,800" },
    { id: 4, name: "Sneha Patel", class: "11A", route: "Route A", busNo: "SCH-001", pickupPoint: "Park Avenue", fees: "₹2,600" },
  ];

  return (
    <div className="min-h-screen bg-background ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-lg font-bold text-foreground">Transport Management</h1>
            <p className="text-muted-foreground text-xs mt-2">Manage school buses and student transportation</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/dashboard">
              <Button variant="outline" className="hover:bg-navbar hover:text-white">Back to Dashboard</Button>
            </Link>
            <Button>
              <Plus className="h-4 w-4 " />
              Add Bus
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Buses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 ml-16 ">
                <Bus className="h-4 w-4 text-blue-600" />
                <div className="text-xl font-bold text-foreground">8</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 ml-14 -my-4">
                <Route className="h-4 w-4 text-green-600" />
                <div className="text-2xl font-bold text-foreground">6</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Students Using Transport</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 ml-12 -my-2">
                <Users className="h-4 w-4 text-purple-600" />
                <div className="text-2xl font-bold text-foreground">325</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pickup Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 ml-14 -my-2">
                <MapPin className="h-4 w-4 text-orange-600" />
                <div className="text-2xl font-bold text-foreground">24</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Bus Fleet</CardTitle>
                <div className="relative w-48">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input placeholder="Search buses..." className="pl-10" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table >
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus No.</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transportData.slice(0, 4).map((bus) => (
                    <TableRow key={bus.id}>
                      <TableCell className="font-medium text-xs">{bus.busNo}</TableCell>
                      <TableCell className="text-xs">{bus.route}</TableCell>
                      <TableCell className="text-xs">{bus.driver}</TableCell>
                      <TableCell className="text-xs">{bus.students}/{bus.capacity}</TableCell>
                      <TableCell className="text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          bus.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {bus.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Student Transport</CardTitle>
                <div className="relative w-48">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input placeholder="Search students..." className="pl-10" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Bus No.</TableHead>
                    <TableHead>Pickup Point</TableHead>
                    <TableHead>Fees</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentTransport.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium text-xs">{student.name}</TableCell>
                      <TableCell className="text-xs">{student.class}</TableCell>
                      <TableCell className="text-xs">{student.busNo}</TableCell>
                      <TableCell className="text-xs">{student.pickupPoint}</TableCell>
                      <TableCell className="text-xs">{student.fees}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transport;