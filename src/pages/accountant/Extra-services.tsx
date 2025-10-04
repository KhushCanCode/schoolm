import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const AccountantExtraServices = () => {
  const[ services,setServices ] = useState([
    { id: 1, name: "Tax Preparation", rate: 150, unit: "per hour" },
    { id: 2, name: "Audit Services", rate: 200, unit: "per hour" },
    { id: 3, name: "Consultation", rate: 120, unit: "per hour" },
    { id: 4, name: "Financial Planning", rate: 180, unit: "per hour" },
    { id: 5, name: "Payroll Services", rate: 75, unit: "per employee" },
    { id: 6, name: "QuickBooks Setup", rate: 500, unit: "flat rate" },
  ]);
 
   const handleDelete = (id:number) => {
    if (!window.confirm("Are you sure you want to delete this services")) return;

    setServices(prev => prev.filter(service => service.id !== id));
  }
  

  return (
    <div className="space-y-8 px-14 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Extra Services</h1>
          <p className="text-gray-500 text-xs">
            Manage and offer additional accounting services to clients
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[250px]">
              <Label htmlFor="search">Search Services</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search by service name..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Services & Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right px-9">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium text-xs">{service.name}</TableCell>
                  <TableCell className="font-medium text-xs">${service.rate}</TableCell>
                  <TableCell className="font-medium text-xs">{service.unit}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={()=>handleDelete(service.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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

export default AccountantExtraServices;
