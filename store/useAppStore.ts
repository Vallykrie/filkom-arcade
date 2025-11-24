<<<<<<< HEAD
import { create } from 'zustand';

export interface Device {
  id: string;
  name: string;
  image: any; // For local images
  availableDevices: number;
}
=======
import { create } from "zustand";

import { PBDevice } from "@/features/arcade/schema/arcade";
>>>>>>> dev/jason

export interface BookingHistory {
  id: string;
  deviceName: string;
  deviceId: string;
  date: string;
  timeSlot: string;
  timestamp: string;
<<<<<<< HEAD
=======
  status: string;
>>>>>>> dev/jason
}

export interface BookingFormData {
  name: string;
  nim: string;
  email: string;
  phoneNumber: string;
  photo: string | null;
}

export interface TimeSlot {
  id: string;
<<<<<<< HEAD
=======
  label: string;
>>>>>>> dev/jason
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface AppState {
  // User state
  isAuthenticated: boolean;
  userEmail: string | null;
  isGuest: boolean;
<<<<<<< HEAD
  
  // Devices
  devices: Device[];
  
  // Selected booking data
  selectedDevice: Device | null;
=======

  // Devices
  selectedDevice: PBDevice | null;

>>>>>>> dev/jason
  selectedDate: Date | null;
  selectedMonth: number;
  selectedYear: number;
  selectedTimeSlot: TimeSlot | null;
<<<<<<< HEAD
  
  // Booking form
  bookingFormData: BookingFormData;
  
  // Booking history
  bookingHistory: BookingHistory[];
  
  // Actions
  setAuthenticated: (isAuth: boolean, email?: string, isGuest?: boolean) => void;
  setSelectedDevice: (device: Device | null) => void;
=======

  // Booking form
  bookingFormData: BookingFormData;

  // Booking history
  bookingHistory: BookingHistory[];

  // Actions
  setAuthenticated: (
    isAuth: boolean,
    email?: string,
    isGuest?: boolean
  ) => void;
  setSelectedDevice: (device: PBDevice) => void;
>>>>>>> dev/jason
  setSelectedDate: (date: Date | null) => void;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  setSelectedTimeSlot: (timeSlot: TimeSlot | null) => void;
  updateBookingFormData: (data: Partial<BookingFormData>) => void;
  addBooking: (booking: BookingHistory) => void;
  resetBookingData: () => void;
}

const initialBookingFormData: BookingFormData = {
<<<<<<< HEAD
  name: '',
  nim: '',
  email: '',
  phoneNumber: '',
=======
  name: "",
  nim: "",
  email: "",
  phoneNumber: "",
>>>>>>> dev/jason
  photo: null,
};

export const useAppStore = create<AppState>()((set) => ({
  // Initial state
  isAuthenticated: false,
  userEmail: null,
  isGuest: false,
<<<<<<< HEAD
  
  devices: [],
  
=======

  devices: [],

>>>>>>> dev/jason
  selectedDevice: null,
  selectedDate: null,
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
  selectedTimeSlot: null,
<<<<<<< HEAD
  
  bookingFormData: initialBookingFormData,
  
  bookingHistory: [],
  
  // Actions
  setAuthenticated: (isAuth, email, isGuest = false) =>
    set({ isAuthenticated: isAuth, userEmail: email ?? null, isGuest }),
  
  setSelectedDevice: (device) =>
    set({ selectedDevice: device }),
  
  setSelectedDate: (date) =>
    set({ selectedDate: date }),
  
  setSelectedMonth: (month) =>
    set({ selectedMonth: month }),
  
  setSelectedYear: (year) =>
    set({ selectedYear: year }),
  
  setSelectedTimeSlot: (timeSlot) =>
    set({ selectedTimeSlot: timeSlot }),
  
=======

  bookingFormData: initialBookingFormData,

  bookingHistory: [],

  // Actions
  setAuthenticated: (isAuth, email, isGuest = false) =>
    set({ isAuthenticated: isAuth, userEmail: email ?? null, isGuest }),

  setSelectedDevice: (device) => set({ selectedDevice: device }),

  setSelectedDate: (date) => set({ selectedDate: date }),

  setSelectedMonth: (month) => set({ selectedMonth: month }),

  setSelectedYear: (year) => set({ selectedYear: year }),

  setSelectedTimeSlot: (timeSlot) => set({ selectedTimeSlot: timeSlot }),

>>>>>>> dev/jason
  updateBookingFormData: (data) =>
    set((state) => ({
      bookingFormData: { ...state.bookingFormData, ...data },
    })),
<<<<<<< HEAD
  
=======

>>>>>>> dev/jason
  addBooking: (booking) =>
    set((state) => ({
      bookingHistory: [booking, ...state.bookingHistory],
    })),
<<<<<<< HEAD
  
=======

>>>>>>> dev/jason
  resetBookingData: () =>
    set({
      selectedDevice: null,
      selectedDate: null,
      selectedTimeSlot: null,
      bookingFormData: initialBookingFormData,
    }),
}));
