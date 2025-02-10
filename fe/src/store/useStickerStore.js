import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const useStickerStore = create((set, get) => ({
    categoriesStickers: [],
    stickers: [],
    isStickersLoading: false,
    isCategoriesLoading: false,
    selectedCategory: null,
    key:"",
    recentStickers: [],
    setKey:(key)=>set({key}),
    setSelectedCategory: (category) => {
        set({ selectedCategory: category });
    },
    getCategories: async () => {
        set({ isCategoriesLoading: true });
        try {
            const res = await axiosInstance.get(`/stickers/categories?key=${get().key}`);
            set({ categoriesStickers: res.data.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isCategoriesLoading: false });
        }
    },
    getStickersByCategoryId: async (cid) => {
        set({ isStickersLoading: true });
        try {
            const res = await axiosInstance.get(`/stickers/${cid}`);
            set({ stickers: res.data.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isStickersLoading: false });
        }
    },
    getRecentStickers: async () => {
        try {
            // get from local storage
            const recentStickers = JSON.parse(localStorage.getItem("recentStickers")) || [];
            set({ recentStickers });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    addRecentSticker: async (sticker) => {
        try {
            const recentStickers = JSON.parse(localStorage.getItem("recentStickers")) || [];
            // if sticker already exists, remove it
            const updatedRecentStickers = recentStickers.filter((s) => s.id !== sticker.id);
            // add new sticker to the beginning of the array
            updatedRecentStickers.unshift(sticker);
            // keep only the last 20 stickers
            const lastTenStickers = updatedRecentStickers.slice(0, 20);
            localStorage.setItem("recentStickers", JSON.stringify(lastTenStickers));
            set({ recentStickers: lastTenStickers });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
}));

export { useStickerStore };