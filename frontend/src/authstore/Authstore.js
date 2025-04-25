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
    employees: [],
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
            const response = await axios.post(`${API_URL}/user/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }, // Ensure correct headers
            });
                console.log("signup response",response.data);
                
                set({ user: response.data.user, isAuthenticated: true, isLoading: false });
                console.log("response", response);
                                console.log("response.data", response.data);

                return response
            } catch (error) {
            set({
                error: error.response?.data?.message || 'Error signing up',
                isLoading: false,
            });
            throw error;
            }
        },
  login: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        set({ token: response.data.token });
        }
        return response
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },
    logout:async()=>{
        set({isLoading:true,error:null})
    try {
        const response=await axios.post(`${API_URL}/logout`)
        console.log("response",response)
        set({
            isAuthenticated:false,
            user:null,
            error:null,
            isLoading:false
        })

    } catch (error) {
        set({error:error.response?.data?.message || "error logging out",isLoading:false})
        throw error
    }
    
    
    },
    verifyEmail: async (code) => {
        set({isLoading:true,error:null});
        try {
            const response=await axios.post(`${API_URL}/user/verify-email`,{code});
            set({user:response.data.user,isAuthenticated:true,isLoading:false})
            return response.data;
        } catch (error) {
            set({error:error.response.data.message || "error verifying email",isLoading:false})
            throw error 
        }
    },
    checkAuth: async () => {
        set({isCheckingAuth:true,error:null})
    try {
        const response=await axios.get(`${API_URL}/check-auth`)
        set({user:response.data.user,isAuthenticated:true,isCheckingAuth:false})
        
    } catch (error) {
        console.log(error)
   set({error:null,isCheckingAuth:false,isAuthenticated:false})    }


    },
    createOrganization: async (formData) => {
    const planPrices = {
      "2month": 1000,
      "6month": 2500,
      "1year": 4000,
      "2year": 7000,
    };

    const price = planPrices[formData.plan];

    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/organization`, {
        ...formData,
        price,
      });

      set({ isLoading: false });
      return response; // return if you want to use in component
    } catch (err) {
      set({ isLoading: false, error: err.response?.data || err.message });
      console.error("Organization creation failed:", err);
      return null;
    }
    },
    getEmployees: async () => {
    try {
      set({ isLoading: true, error: null });

      const res = await axios.get(`${API_URL}/employee/getallemployee`);
        set({ employees: res.data, isLoading: false });
        return res
    } catch (err) {
      console.error("Failed to get employees:", err);
      set({ error: err.response?.data?.message || "Something went wrong", isLoading: false });
    }
  },
}))