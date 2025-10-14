import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Edit, Trash2, ToggleLeft } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useUsersStore, UserData } from "@/store/useUsersStore";
import Heading from "@/components/common/Heading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const UserList = () => {
  const {authUser}  = useAuthStore();
  const school_id = authUser.school_id;

  const {getAllUsers, updateUser, toggleStatus} = useUsersStore();
  const [users, setUsers] = useState<UserData[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [status, setStatus] = useState();

  const [formData, setFormData] = React.useState<UserData>({
      username: "",
      phone: "",
    })

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<number | null>(null);


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getAllUsers(school_id);
        if (data) {
          setUsers(Array.isArray(data) ? data : [data]);
        } else {
          setUsers([]);
        }
      } catch (error: any) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getAllUsers, school_id]);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const success = await updateUser(editingUser, formData);
  if (success) {
    console.log("User updated successfully");

    // Reset form
    setFormData({
      username: "",
      phone: "",
    });
    setEditingUser(null);
    setEditingIndex(null)
    setOpen(false);
  }
};

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const filteredUsers = users.filter(
    u =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Heading title="User Management" description="Manage all user records and information" />
          
          <div className="flex gap-2">
            <Link to="/principal/dashboard">
              <Button variant="outline" className=" ">Back to Dashboard</Button>
            </Link>
            <Link to="/principal/users/register">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </Link>
          </div>
        </div>

        {/* Edit Form */}
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-lg text-center">Edit User</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                    placeholder="e.g., John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="e.g., +1234567890"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Update User</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{users.length}</div>
              <div className="text-sm text-gray-500">Total Users</div>
            </CardContent>
          </Card>
          <Card className="w-[250px]">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === "active").length}
              </div>
              <div className="text-sm text-gray-500">Active Users</div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">All Users</CardTitle>
              <div className="relative w-64">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </span>
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm">Loading...</p>
            ) : filteredUsers.length === 0 ? (
              <p>No users found.</p>
            ) : (
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="flex items-center justify-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(user => (
                    <TableRow key={user.id} className="font-medium text-xs">
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell className="flex items-center justify-center">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={user.status === "active"}
                              onCheckedChange={async (checked) => {
                                const newStatus = checked ? "active" : "inactive";
                                const updatedUser = { ...user, status: newStatus };

                                const success = await toggleStatus(user.id, updatedUser);
                                if (success) {
                                  setUsers((prev) =>
                                    prev.map((u) =>
                                      u.id === user.id ? { ...u, status: newStatus } : u
                                    )
                                  );
                                  
                                }
                              }}
                            />
                          </div>
                        </TableCell>


                      <TableCell>
                        <div className="flex gap-2 justify-center">

                          {/* Edit Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingUser(user.id);
                              setFormData(user); 
                              setOpen(true);    
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          {/* Edit Delete */}
                          {/* <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)}>
                            <Trash2 className="h-4 w-4 text-destructive/60" />
                          </Button> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
       
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserList;
