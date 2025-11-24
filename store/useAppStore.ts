import { create } from "zustand";

import { PBDevice } from "@/features/arcade/schema/arcade";

export interface BookingHistory {
  id: string;
  deviceName: string;
  deviceId: string;
  date: string;
  timeSlot: string;
  timestamp: string;
  status: string;
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
  label: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface AppState {
  // User state
  isAuthenticated: boolean;
  userEmail: string | null;
  isGuest: boolean;

  // Devices
  selectedDevice: PBDevice | null;

  selectedDate: Date | null;
  selectedMonth: number;
  selectedYear: number;
  selectedTimeSlot: TimeSlot | null;

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
  setSelectedDate: (date: Date | null) => void;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  setSelectedTimeSlot: (timeSlot: TimeSlot | null) => void;
  updateBookingFormData: (data: Partial<BookingFormData>) => void;
  addBooking: (booking: BookingHistory) => void;
  resetBookingData: () => void;
}

const initialBookingFormData: BookingFormData = {
  name: "",
  nim: "",
  email: "",
  phoneNumber: "",
  photo: null,
};

export const useAppStore = create<AppState>()((set) => ({
  // Initial state
  isAuthenticated: false,
  userEmail: null,
  isGuest: false,

  devices: [],

  selectedDevice: null,
  selectedDate: null,
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
  selectedTimeSlot: null,

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

  updateBookingFormData: (data) =>
    set((state) => ({
      bookingFormData: { ...state.bookingFormData, ...data },
    })),

  addBooking: (booking) =>
    set((state) => ({
      bookingHistory: [booking, ...state.bookingHistory],
    })),

  resetBookingData: () =>
    set({
      selectedDevice: null,
      selectedDate: null,
      selectedTimeSlot: null,
      bookingFormData: initialBookingFormData,
    }),
}));
