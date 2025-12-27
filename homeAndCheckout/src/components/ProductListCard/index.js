import styles from "../NewDropCard/styles.module.scss";
import useProductStore from "../../store/productList";
import { Pagination, Typography } from "@mui/material";
import { ROUTES } from "../../router/routes";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import internalStyles from "./styles.module.scss";

const ProductListCard = () => {
  const productList = useProductStore((state) => state.productList);
  const navigate = useNavigate();

  const handleProduct = (productId) => {
    navigate(`${ROUTES.PRODUCT}/${productId}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={styles.rootContainer}>
        {productList?.map((item, index) => (
          <div key={index} className={styles.dropContainer}>
            <div className={styles.imageContainer}>
              <div
                className={styles.imgCard}
                style={{
                  backgroundImage: `url(${item.previewImg?.[0]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>

            <Typography className={styles.productName}>
              {item.productName}
            </Typography>
            <button
              onClick={() => handleProduct(item.productId)}
              className={styles.productButton}
            >
              View Product -{" "}
              <span style={{ color: "#FFA52F" }}>{item.price}</span>
            </button>
          </div>
        ))}
      </div>

      {/* <div className={internalStyles.pagination}>
                <CustomButton children="PREVIOUS"  sx={{backgroundColor:"#fff", color: "#000", width:"fit-content", marginTop:"15px"}}/>
                <CustomButton children="NEXT"  sx={{backgroundColor:"#fff", color: "#000", width:"fit-content", marginTop:"15px"}}/>
            </div> */}
      <div className={internalStyles.pagination}>
        <Pagination count={1} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
};

export default ProductListCard;
