import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  userRole: null,
  accessToken: null,
  userName: null, // Store the userName directly for easy access
  setUser: ({ isAuthenticated, userRole, accessToken, name }) => {
    const authData = { isAuthenticated, userRole, accessToken, name };
    localStorage.setItem("authData", JSON.stringify(authData));
    set({ isAuthenticated, userRole, accessToken, userName: name });
  },
  clearUser: () => {
    localStorage.removeItem("authData");
    set({
      isAuthenticated: false,
      userRole: null,
      accessToken: null,
      userName: null,
    });
  },
  hydrateAuth: () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData) {
      set({
        isAuthenticated: authData.isAuthenticated,
        userRole: authData.userRole,
        accessToken: authData.accessToken,
        userName: authData.name,
      });
    }
  },
}));

export default useAuthStore;
