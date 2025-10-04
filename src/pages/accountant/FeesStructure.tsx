import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";

const AccountantFeeStructure = () => {
  const [fees, setFees] = useState([
    { id: 1, service: "Monthly Dues", amount: 2500, type: "Recurring" },
    { id: 2, service: "Tax Filing", amount: 1800, type: "Annual" },
    { id: 3, service: "Audit Fee", amount: 3200, type: "On-demand" },
    { id: 4, service: "Consultation", amount: 900, type: "Hourly" },
  ]);

  const [newFee, setNewFee] = useState({
    service: "",
    amount: "",
    type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFee((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setNewFee((prev) => ({ ...prev, type: value }));
  };

  const handleAddFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFee.service || !newFee.amount || !newFee.type) {
      alert("Please fill all fields");
      return;
    }

    const newRecord = {
      id: fees.length + 1,
      service: newFee.service,
      amount: parseFloat(newFee.amount),
      type: newFee.type,
    };

    setFees((prev) => [...prev, newRecord]);
    setNewFee({ service: "", amount: "", type: "" });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this fee record?")) {
      setFees((prev) => prev.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="space-y-8 px-12 py-9">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Fee Structure</h1>
          <p className="text-gray-500 text-xs">
            Define and manage all types of service fees
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-md">Add New Fee</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddFee} className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 text-xs">
              <Label className="text-xs">Service</Label>
              <Input
                name="service"
                placeholder="Service name"
                value={newFee.service}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Amount ($)</Label>
              <Input
                name="amount"
                type="number"
                placeholder="Enter amount"
                value={newFee.amount}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Type</Label>
              <Select value={newFee.type} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recurring">Recurring</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                  <SelectItem value="On-demand">On-demand</SelectItem>
                  <SelectItem value="Hourly">Hourly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full gap-2">
                <Plus className="h-4 w-4" /> Add Fee
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-md">Defined Fee Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Service</TableHead>
                <TableHead  className="text-xs">Amount</TableHead>
                <TableHead className="text-xs">Type</TableHead>
                <TableHead className="text-right text-xs px-9">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium text-xs">{fee.service}</TableCell>
                  <TableCell className="text-xs">${fee.amount}</TableCell>
                  <TableCell className="text-xs">{fee.type}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(fee.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {fees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No fees defined yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountantFeeStructure;
