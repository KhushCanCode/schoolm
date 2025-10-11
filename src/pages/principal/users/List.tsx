import { useAuthStore } from '@/store/useAuthStore';
import { UserData, useUsersStore } from '@/store/useUsersStore'; // adjust path
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const UserList = () => {
  const getAllUsers = useUsersStore((state) => state.getAllUsers);

  const [users, setUsers] = useState<UserData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const school_id = useAuthStore((state) => state.authUser.school_id); 

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getAllUsers(school_id);
        if (data) {
          // If API returns array of users
          setUsers(Array.isArray(data) ? data : [data]);
        } else {
          setUsers([]);
        }
      } catch (error: any) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getAllUsers, school_id]);

  if (loading) return <p>Loading users...</p>;

  if (!users || users.length === 0) return <p>No users found.</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.school_id}>
            <strong>{user.username}</strong> — {user.email} — {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
