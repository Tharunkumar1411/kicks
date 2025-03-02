import { create } from "zustand";

const useProductStore = create(
    (set, get) => ({
      productList: [],
      filterProperty: {},
      setProductList: (details) => {
        set(() => ({
            productList: [...details],
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
