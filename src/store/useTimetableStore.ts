import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { SchoolSubject } from './useSubjectStore'; // Assuming type from subject store
import { Teacher } from './useUsersStore'; // Assuming type from user store

// Based on app/Models/ClassTimeTable.php and migration
export interface TimetableEntry {
  id: number;
  school_id: number;
  class_id: number;
  day_of_week: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  start_time: string; // e.g., "09:00:00" or "09:00"
  end_time: string; // e.g., "10:00:00" or "10:00"
  teacher_id: number;
  subject_id: number;
  created_at?: string;
  updated_at?: string;
  // Include populated relations from the model
  teacher?: Teacher;
  subject?: SchoolSubject;
}

// Data for creating/updating
export type TimetableEntryPayload = Omit<TimetableEntry, 'id' | 'created_at' | 'updated_at' | 'teacher' | 'subject'>;

interface TimetableState {
  timetable: TimetableEntry[];
  loading: boolean;
  fetchTimetable: (schoolId: number, classId: number) => Promise<void>;
  addTimetableEntry: (entry: TimetableEntryPayload) => Promise<boolean>;
  updateTimetableEntry: (id: number, entry: Partial<TimetableEntryPayload>) => Promise<boolean>;
  deleteTimetableEntry: (id: number) => Promise<void>;
}

export const useTimetableStore = create<TimetableState>((set) => ({
  timetable: [],
  loading: false,

  fetchTimetable: async (schoolId, classId) => {
    if (!schoolId || !classId) return;
    set({ loading: true });
    try {
      // Assuming API endpoint structure based on ClassTimeTableRepository
      const response = await axiosInstance.get('/timetables', {
        params: {
          school_id: schoolId,
          class_id: classId,
        },
      });
      // The repo's getAll method returns data directly
      set({ timetable: response.data || [], loading: false });
    } catch (error) {
      console.error('Failed to fetch timetable:', error);
      toast.error('Failed to fetch timetable');
      set({ loading: false, timetable: [] });
    }
  },

  addTimetableEntry: async (entry) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/timetables', entry);
      set((state) => ({
        timetable: [...state.timetable, response.data],
        loading: false,
      }));
      toast.success('Period added successfully');
      return true;
    } catch (error) {
      console.error('Failed to add timetable entry:', error);
      toast.error('Failed to add period');
      set({ loading: false });
      return false;
    }
  },

  updateTimetableEntry: async (id, entry) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/timetables/${id}`, entry);
      set((state) => ({
        timetable: state.timetable.map((item) =>
          item.id === id ? response.data : item
        ),
        loading: false,
      }));
      toast.success('Period updated successfully');
      return true;
    } catch (error) {
      console.error('Failed to update timetable entry:', error);
      toast.error('Failed to update period');
      set({ loading: false });
      return false;
    }
  },

  deleteTimetableEntry: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/timetables/${id}`);
      set((state) => ({
        timetable: state.timetable.filter((item) => item.id !== id),
        loading: false,
      }));
      toast.success('Period deleted successfully');
    } catch (error) {
      console.error('Failed to delete timetable entry:', error);
      toast.error('Failed to delete period');
      set({ loading: false });
    }
  },
}));
