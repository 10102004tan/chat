import { create } from 'zustand';
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import io from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";


export const useAuthStore = create((set, get) => ({
    isLoggingIn: false,
    authUser: null,
    onlineUsers: [],
    socket: null,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data.data });
            get().connectSocket();
        } catch (error) {
            set({ authUser: null });
            set({isCheckingAuth: false});
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    login: async (data) => {
        // set state
        set({ isSigningUp: true });
        try {
            // api callc
            const res = await axiosInstance.post("/auth/login", data);
            console.log(res);
            set({
                authUser: res.data.data
            })
            toast.success("Login Success");
            // connect to socket
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            // set state
            set({ isSigningUp: false });
        }
    },

    oauthWithGoogle: async (data) => {
        // set state
        set({ isSigningUp: true });
        try {
            // api call
            const res = await axiosInstance.post("/auth/google", data);
            set({
                authUser: res.data.data
            })
            toast.success("Login Success");
            // connect to socket
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            // set state
            set({ isSigningUp: false });
        }
    },
    oauthWithGithub: async (data) => {
        // set state
        set({ isSigningUp: true });
        try {
            // api call
            const res = await axiosInstance.post("/auth/github", data);
            set({
                authUser: res.data.data
            })
            toast.success("Login Success");
            // connect to socket
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            // set state
            set({ isSigningUp: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });


            get().disconnectSocket();
            toast.success("Logout Success");
        } catch (error) {
            console.log(error);
            toast.error("Error in logout");
        }
    },
    signup: async (data) => {
        // set state
        set({ isSigningUp: true });
        try {
            // api call
            const res = await axiosInstance.post("/auth/signup", data);
            set({
                authUser: res.data.data
            })
            toast.success("Signup Success");
            // connect to socket
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            // set state
            set({ isSigningUp: false });
        }
    },
    /**
     * connect to socket
     * @returns 
     */
    connectSocket: () => {
        const { authUser } = get();

        // return if user is not authenticated or socket is already connected
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });

    },
    /**
     * disconnect socket
     */
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));
