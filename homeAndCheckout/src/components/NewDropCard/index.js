import { Typography, Drawer } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import useHomeStore from "../../store/home";
import useCartStore from "../../store/cart";
import ImageWithSkeleton from "../ImageWithSkelton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CartDrawer from "../CartDrawer";

const NewDropCard = () => {
  const navigate = useNavigate();
  const homeDetails = useHomeStore((state) => state.homeDetails);
  const { isProductInCart, addToCart } = useCartStore((state) => state);
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [openCart, setOpenCart] = useState(false);

  const handleProductClick = (product) => {
    navigate(`${ROUTES.PRODUCT}/${product.productId}`);
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8; // Scroll 80% of visible width
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const updateArrowVisibility = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateArrowVisibility();
    container.addEventListener("scroll", updateArrowVisibility);

    return () => {
      container.removeEventListener("scroll", updateArrowVisibility);
    };
  }, [homeDetails?.newDrops]);

  const handleAddClick = (product) => {
    addToCart(product);
    setOpenCart(true);
  };

  return (
    <>
      <div className={styles.carouselWrapper}>
        {showLeftArrow && (
          <button
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon fontSize="large" />
          </button>
        )}

        <div className={styles.rootContainer} ref={scrollContainerRef}>
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

        {showRightArrow && (
          <button
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRightIcon fontSize="large" />
          </button>
        )}
      </div>

      <Drawer anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
        <CartDrawer setOpenCart={setOpenCart} />
      </Drawer>
    </>
  );
};

export default NewDropCard;
