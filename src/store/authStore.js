// src/store/authStore.js
import create from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  userRole: null, // 'user' or 'manager'
  setUser: (role) => set({ isAuthenticated: true, userRole: role }),
  clearUser: () => set({ isAuthenticated: false, userRole: null }),
}));

export default useAuthStore;
