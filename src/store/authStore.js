
// src/store/authStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  userRole: null,
  setUser: ({ isAuthenticated, userRole }) => set({ isAuthenticated, userRole }),
  clearUser: () => set({ isAuthenticated: false, userRole: null }),
}));

export default useAuthStore;


