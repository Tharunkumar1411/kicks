import { Typography, Drawer } from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import useHomeStore from "../../store/home";
import useCartStore from "../../store/cart";
import ImageWithSkeleton from "../ImageWithSkelton";
import CartDrawer from "../CartDrawer";

const NewDropCard = () => {
  const navigate = useNavigate();
  const homeDetails = useHomeStore((state) => state.homeDetails);
  const { isProductInCart, addToCart } = useCartStore((state) => state);
  const [openCart, setOpenCart] = useState(false);

  const handleProductClick = (product) => {
    navigate(`${ROUTES.PRODUCT}/${product.productId}`);
  };

  const handleAddClick = (product) => {
    addToCart(product);
    setOpenCart(true);
  };

  return (
    <>
      <div className={styles.rootContainer}>
        {homeDetails?.newDrops?.map((item, index) => (
          <div key={index} className={styles.dropContainer}>
            <div className={styles.imageContainer}>
              <ImageWithSkeleton
                src={item.url}
                alt="Hero banner"
                className={styles.imgCard}
                isBackground={true}
                showAddIcon={true}
                onClick={() => handleProductClick(item)}
                onAddToCart={() => handleAddClick(item)}
                isInCart={isProductInCart(item?.productId)}
              />
            </div>

            <Typography className={styles.productName}>
              {item.productName}
            </Typography>
          </div>
        ))}
      </div>

      <Drawer anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
        <CartDrawer setOpenCart={setOpenCart} />
      </Drawer>
    </>
  );
};

export default NewDropCard;
