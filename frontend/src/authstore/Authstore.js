    import {create} from "zustand"
    import axios from "axios"
    axios.defaults.withCredentials = true;
    const API_URL="http://localhost:7180"

export const userAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
  token: localStorage.getItem("token") || null,
  setToken: (newToken) => {
    localStorage.setItem("token", newToken); // Save token to localStorage
    set({ token: newToken });
  },
  clearToken: () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    set({ token: null });
    },
  
signup: async (formData) => {
            set({ isLoading: true, error: null });
            try {
            const response = await axios.post(`${API_URL}/user/signup`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }, // Ensure correct headers
            });
                
                set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            } catch (error) {
            set({
                error: error.response?.data?.message || 'Error signing up',
                isLoading: false,
            });
            throw error;
            }
        },
  

}))