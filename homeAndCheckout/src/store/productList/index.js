import { create } from "zustand";

const useProductStore = create(
    (set, get) => ({
      productList: [],
      originalProductList: [], // Store original unfiltered list
      filterProperty: {},
      setProductList: (details) => {
        set(() => ({
            productList: [...details],
        }));
      },
      setOriginalProductList: (details) => {
        set(() => ({
            originalProductList: [...details],
        }));
      },
      setFilterProperty: (details) => {
        set(() => ({
          filterProperty: {...details},
        }))
      }
    })
);

export default useProductStore;
