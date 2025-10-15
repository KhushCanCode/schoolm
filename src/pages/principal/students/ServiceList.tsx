import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useServiceStore, ServiceForm } from '@/store/useServiceStore';
import Heading from '@/components/common/Heading';
import { Textarea } from '@/components/ui/textarea';

const ServiceList = () => {
  const { authUser } = useAuthStore();
  const { createService, getServices, deleteService, updateService } = useServiceStore();

  const [services, setServices] = useState<ServiceForm[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<ServiceForm>({
    school_id: Number(authUser.school_id),
    service_name: '',
    charge: 0,
    status: 'active',
  });

  // Fetch services from backend
  const fetchServices = async () => {
    const schoolId = Number(authUser.school_id);
    if (!schoolId) return;
    const data = await getServices(schoolId);
    if (data) setServices(data);
    console.log("Fetched services:", data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Create or update service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.service_name.trim()) return;

    if (editingIndex !== null) {
      const serviceId = (services[editingIndex] as ServiceForm & { id: string }).id;
      const success = await updateService(serviceId, formData);
      if (!success) return;

      const updated = [...services];
      updated[editingIndex] = { ...formData, id: serviceId };
      setServices(updated);

    } else {
      const success = await createService(formData);
      if (success) {
        fetchServices();
      }
    }

    // Reset form
    setFormData({
      school_id: Number(authUser.school_id),
      service_name: '',
      charge: 0,
      status: 'active',
    });
    setEditingIndex(null);
    setOpen(false);
  };

  const handleEdit = (serviceId: string, index: number) => {
    const svc = services[index];
    setFormData({
      ...svc,
      school_id: Number(authUser.school_id),
    });
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDelete = async (serviceId: string, index: number) => {
    const success = await deleteService(serviceId);
    if (success) {
      setServices((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Heading title='Service Management' description='Manage services and their fees' />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" /> New Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg text-center">
                {editingIndex !== null ? 'Edit Service' : 'New Service'}
              </DialogTitle>
            </DialogHeader>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="service_name">Service Name</Label>
                    <Input
                    id="service_name"
                    value={formData.service_name}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, service_name: e.target.value }))
                    }
                    placeholder="e.g., Transport"
                    required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="charge">Charge</Label>
                    <Input
                    id="charge"
                    type="number"
                    value={formData.charge}
                    onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({
                        ...prev,
                        charge: value === '' ? 0 : parseInt(value, 10),
                        }));
                    }}
                    placeholder="e.g., 700"
                    required
                    />

                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, status: e.target.value }))
                    }
                    className="w-full border rounded-md p-2"
                    required
                    >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                    </Button>
                    <Button type="submit">
                    {editingIndex !== null ? 'Update' : 'Create'} Service
                    </Button>
                </div>
                </form>

          </DialogContent>
        </Dialog>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((svc, index) => {
          const serviceWithId = svc as ServiceForm & { id: string };
          return (
            <Card key={serviceWithId.id} className='h-fit'>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className='text-lg'>
                      {svc.service_name}
                    </CardTitle>
                    <CardDescription>
                      Charge: {svc.charge} | Status: {svc.status}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex justify-end space-x-1 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(serviceWithId.id, index)}
                  >
                    <Edit className="h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(serviceWithId.id, index)}
                  >
                    <Trash2 className="h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceList;
