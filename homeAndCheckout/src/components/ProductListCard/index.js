import useProductStore from "../../store/productList";
import { Pagination, Typography } from "@mui/material";
import { ROUTES } from "../../router/routes";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
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
            <div
              className={styles.imageContainer}
              onClick={() => navigate(`${ROUTES.PRODUCT}/${item?.productId}`)}
            >
              <ImageWithSkeleton
                src={item.previewImg?.[0]}
                alt="Hero banner"
                className={styles.imgCard}
              />
            </div>

            <Typography className={styles.productName}>
              {item.productName}
            </Typography>
            <Typography className={styles.productName}>
              ₹{item.price}
            </Typography>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <Pagination count={1} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
};

export default ProductListCard;
