import styles from "../NewDropCard/styles.module.scss";
import useProductStore from "../../store/productList";
import { Pagination, Typography } from "@mui/material";
import { ROUTES } from "../../router/routes";
import { useNavigate } from "react-router-dom";
import internalStyles from "./styles.module.scss";
import ImageWithSkeleton from "../ImageWithSkelton";

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
              <ImageWithSkeleton
                src={item.previewImg?.[0]}
                alt="Hero banner"
                className={styles.imgCard}
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

      <div className={internalStyles.pagination}>
        <Pagination count={1} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
};

export default ProductListCard;
