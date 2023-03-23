import { create } from "zustand";

interface ProductState {
  num1: number;
  num2: number;
  profit: number;
  profitMargin: number;
}

type ProductActions = {
  setNum1: (num: number) => void;
  setNum2: (num: number) => void;
};
function updateProduct(state: ProductState, num1: number, num2: number) {
  const profit = num1 - num2;
  const profitMargin = num1 !== 0 ? (profit / num1) * 100 : 0;
  return { ...state, num1, num2, profit, profitMargin };
}
const useProductStore = create<ProductState & ProductActions>((set) => ({
  num1: 0,
  num2: 0,
  profit: 0,
  profitMargin: 0,

  setNum1: (num1: number) =>
    set((state) => updateProduct(state, num1, state.num2)),

  setNum2: (num2: number) =>
    set((state) => updateProduct(state, state.num1, num2)),
}));

export default useProductStore;
