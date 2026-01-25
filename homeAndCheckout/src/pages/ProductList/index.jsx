import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import productBanner from "../../assets/images/productBanner.png";
import styles from "./styles.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterComponent from "../../components/FilterComponent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { getFilterProperties, getProductList } from "../../api/product";
import useProductStore from "../../store/productList";
import ProductListCard from "../../components/ProductListCard";
import Loader from "../../components/Loader";
import ImageWithSkeleton from "../../components/ImageWithSkelton";

export default function ProductList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const setProductList = useProductStore((state) => state.setProductList);
  const setOriginalProductList = useProductStore((state) => state.setOriginalProductList);
  const setFilterProperty = useProductStore((state) => state.setFilterProperty);
  const [category, setCategory] = useState("Life Style");
  const [showMenu, setShowMenu] = useState(false);
  const [filter, setFilter] = useState({
    color: [],
    size: "",
    categories: [],
    gender: [],
    price: 0,
  });
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([getProductList(), getFilterProperties()])
      .then((results) => {
        if (results[0].status === "fulfilled") {
          setProductList(results[0].value);
          setOriginalProductList(results[0].value); // Store original list for reset
        }
        if (results[1].status === "fulfilled") {
          setFilterProperty(results[1].value);
        }
      })
      .catch((error) => console.error("Unexpected Error:", error))
      .finally(() => setLoading(false));
  }, [setProductList, setOriginalProductList, setFilterProperty]);

  const handleCateogry = () => {
    setShowMenu((prev) => !prev);
  };

  const handleCateogrySelection = (category) => {
    setCategory(category);
    handleCateogry();
  };

  const handleFilter = () => {
    setFilterDrawer((prev) => !prev);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setFilterDrawer(open);
  };

  return (
    <div>
      {!loading ? (
        <div className={styles.rootContainer}>
          <ImageWithSkeleton
            src={productBanner}
            alt="Hero banner"
            className={styles.topBanner}
            isBackground={true}
          >
            <div className={styles.bannerContent}>
              <Typography className={styles.label}>
                Limited time only
              </Typography>
              <Typography className={styles.header}>Get 30% off</Typography>
              <Typography className={styles.label}>
                Sneakers made with your comfort in mind so you can put all of
                your focus into your next session.
              </Typography>
            </div>
          </ImageWithSkeleton>

          <div className={styles.filterBtnContainer}>
            {/* {isMobile && <button onClick={handleCateogry} className={styles.categoryBtn}>{category} <KeyboardArrowDownIcon /></button>} */}
            {isMobile && (
              <button onClick={handleFilter} className={styles.categoryBtn}>
                Filter <FilterListIcon />
              </button>
            )}
          </div>

          <div className={styles.catergoryContainer}>
            <Typography className={styles.category}>
              Life Style Shoes <label className={styles.label}>122 item</label>
            </Typography>
            {/* <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
                        {!isMobile && <button onClick={handleCateogry} className={styles.categoryBtn}>{category} <KeyboardArrowDownIcon /></button>}
                        
                        {showMenu &&
                            <div className={styles.categoryList}>
                                <div style={{width:"100%", textAlign:"center"}}>
                                    {["Life Style", "Sports", "Casuals", "Trending"].map((item) => (
                                        <Typography onClick={() => handleCateogrySelection(item)} className={styles.menuText} style={(category === item) ? {fontWeight: "800"}: {}}> {item}<hr /></Typography>                                
                                    ))}
                                </div>
                            </div>
                        }
                    </div> */}
          </div>

          <div className={styles.filterContainer}>
            <div className={styles.filter}>
              {!isMobile && (
                <FilterComponent filter={filter} setFilter={setFilter} />
              )}
            </div>
            <div className={styles.productContainer}>
              <ProductListCard />
            </div>
          </div>

          {isMobile && (
            <Drawer open={filterDrawer} onClose={toggleDrawer()}>
              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "600",
                      fontFamily: "RubikSemiBold",
                      fontSize: "16px",
                    }}
                  >
                    Filter
                  </Typography>
                  <CloseIcon onClick={handleFilter} />
                </div>
                <FilterComponent filter={filter} setFilter={setFilter} />
              </div>
            </Drawer>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
