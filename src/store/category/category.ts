import { create } from "zustand";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import instance from "../axios/api";
interface ICategory {
  _id: string;
  categoryName: string;
  categoryImage: string;
  slug: string;
  children: [
    {
      _id: string;
      categoryName: string;
      categoryImage: string;
      parentId: string;
      slug: string;
    }
  ];
}

interface ProductState {
  categories: ICategory[];
  subcategories: ICategory[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => void;
}

export const useCategoriesStore = create<ProductState>((set) => ({
  categories: [],
  subcategories: [],
  isLoading: false,
  error: null,
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await instance.get<ICategory[]>(
        "https://localhost:5000/api/Category/GetCategory"
      );
      set({ isLoading: false, categories: response.data, error: null });
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        set({
          isLoading: false, error: error.response?.data?.message || error.message,
        });
      }
    }
  },
}));
