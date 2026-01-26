import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Drawer, Typography, useMediaQuery } from "@mui/material";
import ColorSizePallate from "../../components/ColorSizePallate";
import CustomButton from "../../components/CustomButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CustomCarousel from "../../components/CustomCarousel";
import NewDropCard from "../../components/NewDropCard";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import { getProductDetails } from "../../api/home";
import { formatAmount } from "../../utils/helper";
import Loader from "../../components/Loader";
import useHomeStore from "../../store/home";
import useCartStore from "../../store/cart";
import useCheckoutStore from "../../store/checkout";
import useWishlistStore from "../../store/wishlist";
import CartDrawer from "../../components/CartDrawer";
import ImageWithSkeleton from "../../components/ImageWithSkelton";
import { updateCart } from "../../api/product";

export default function Product() {
  const { id } = useParams();
  const [cart, setCart] = useState({ color: "", size: "", productId: id });
  const [openCart, setOpenCart] = useState(false);
  const isMobile = useMediaQuery("(max-width:1024px)");
  const { productDetails, setProductDetails } = useHomeStore((state) => state);
  const { cartItems, addToCart, isInCart } = useCartStore((state) => state);
  const { setSingleCheckoutItem } = useCheckoutStore((state) => state);
  const { toggleWishlist, isInWishlist } = useWishlistStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails(id).then((response) => {
      setProductDetails(response);
    });
  }, []);

  const handleBuy = (productId) => {
    // Validate size and color selection
    if (!cart.size || !cart.color) {
      alert("Please select size and color before buying");
      return;
    }

    // Set single item for checkout
    const checkoutItem = {
      productId: id,
      productName: productDetails.productName,
      price: productDetails.price,
      image: productDetails.previewImg?.[0] || "",
      size: cart.size,
      color: cart.color,
      quantity: 1,
    };

    setSingleCheckoutItem(checkoutItem);
    navigate(ROUTES.CHEKOUT);
  };

  const handleAddToCart = () => {
    // Validate size and color selection
    if (!cart.size || !cart.color) {
      alert("Please select size and color before adding to cart");
      return;
    }

    // Check if item already in cart
    const itemExists = isInCart(id, cart.size, cart.color);

    if (itemExists) {
      // Open cart drawer to view
      setOpenCart(true);
      return;
    }

    // Add to cart with full product details
    const cartItem = {
      productId: id,
      productName: productDetails.productName,
      price: productDetails.price,
      image: productDetails.previewImg?.[0] || "",
      size: cart.size,
      color: cart.color,
    };

    addToCart(cartItem);

    // Optional: Call backend API (commented out as mentioned)
    // updateCart(cartItem)
    //   .then(() => console.log("Cart updated on backend"))
    //   .catch(console.error);

    // Open cart drawer to show added item
    setOpenCart(true);
  };

  const handleFav = () => {
    const wishlistItem = {
      productId: id,
      productName: productDetails.productName,
      price: productDetails.price,
      image: productDetails.previewImg?.[0] || "",
    };
    toggleWishlist(wishlistItem);
  };

  return (
    <div>
      {Object.keys(productDetails).length ? (
        <div>
          <div className={styles.rootContainer}>
            {isMobile ? (
              <CustomCarousel data={productDetails} />
            ) : (
              <div className={styles.previewRootContainer}>
                {Array(2)
                  .fill(0)
                  .map((_, ind) => (
                    <div key={ind} className={styles.previewContainer}>
                      {productDetails?.previewImg
                        .slice(ind * 2, ind * 2 + 2)
                        .map((imageUrl) => (
                          <ImageWithSkeleton
                            key={imageUrl}
                            src={imageUrl}
                            alt="Hero banner"
                            className={styles.previewOne}
                          />
                        ))}
                    </div>
                  ))}
              </div>
            )}

            <div className={styles.checkoutContainer}>
              <Typography className={styles.header}>
                {productDetails?.productName}
              </Typography>
              <Typography className={styles.price}>
                {formatAmount(productDetails?.price)}
              </Typography>
              <ColorSizePallate
                data={productDetails}
                selectedItem={cart}
                setSelectedItem={setCart}
              />

              <div className={styles.btnContainer}>
                <div className={styles.rowBtn}>
                  <CustomButton
                    onClick={handleAddToCart}
                    children={
                      cart.size &&
                      cart.color &&
                      isInCart(id, cart.size, cart.color)
                        ? `VIEW CART`
                        : `ADD TO CART`
                    }
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      width: "100%",
                    }}
                  />
                  <CustomButton
                    onClick={handleFav}
                    children={
                      isInWishlist(id) ? (
                        <FavoriteIcon style={{ color: "#ff4444" }} />
                      ) : (
                        <FavoriteBorderIcon />
                      )
                    }
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      width: "fit-content",
                    }}
                  />
                </div>
                <CustomButton
                  onClick={() => handleBuy(id)}
                  children="BUY IT NOW"
                  sx={{ backgroundColor: "#4A69E2", color: "#fff" }}
                />
              </div>

              <div className={styles.aboutContainer}>
                <Typography className={styles.header}>
                  About the product
                </Typography>
                <Typography className={styles.subHeader}>
                  Shadow Navy / Army Green
                </Typography>
                <Typography className={styles.subHeader}>
                  This product is excluded from all promotional discounts and
                  offers.
                </Typography>
                <ul>
                  <li className={styles.subHeader}>
                    Pay over time in interest-free installments with Affirm,
                    Klarna or Afterpay.
                  </li>
                  <li className={styles.subHeader}>
                    Join adiClub to get unlimited free standard shipping,
                    returns, & exchanges.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.newDropContainer}>
            <div className={styles.dropContent}>
              <Typography className={styles.header}>
                You may also like
              </Typography>
              <button
                className={styles.button}
                onClick={() => navigate(ROUTES.PRODUCT_LIST)}
              >
                EXPLORE
              </button>
            </div>

            <NewDropCard />
          </div>

          <Drawer
            anchor="right"
            open={openCart}
            onClose={() => setOpenCart(false)}
          >
            <CartDrawer setOpenCart={setOpenCart} />
          </Drawer>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
