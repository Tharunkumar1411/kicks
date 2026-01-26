import { Typography, useMediaQuery, useTheme, IconButton } from "@mui/material";
import styles from "./styles.module.scss";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import useCartStore from "../../store/cart";
import useCheckoutStore from "../../store/checkout";
import { formatAmount } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

export default function Cart({ setOpenCart }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getTotalItems,
  } = useCartStore((state) => state);
  const { setCheckoutItems } = useCheckoutStore((state) => state);
  const navigate = useNavigate();

  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(item.productId, item.size, item.color, newQuantity);
    }
  };

  const handleRemove = (item) => {
    removeFromCart(item.productId, item.size, item.color);
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      // Set all cart items for checkout
      setCheckoutItems(cartItems);
      setOpenCart(false);
      navigate(ROUTES.CHEKOUT);
    }
  };

  return (
    <div className={styles.rootContainer}>
      <CloseIcon
        style={{ margin: "10px 20px 0 20px", cursor: "pointer" }}
        onClick={() => setOpenCart(false)}
      />
      <div className={styles.savingContainer}>
        <Typography className={styles.header}>Saving to celebrate</Typography>
        <span className={styles.label}>
          Enjoy up to 60% off thousands of styles during the End of Year sale -
          while supplies last. No code needed.
        </span>
        <span className={styles.label}>Join us or Sign-in</span>
      </div>

      <div className={styles.checkoutContainer}>
        <div className={styles.productCard}>
          <Typography className={styles.header}>Your Bag</Typography>
          <Typography className={styles.subHeader}>
            {cartItems.length === 0
              ? "Your bag is empty"
              : `${getTotalItems()} item${getTotalItems() > 1 ? "s" : ""} in your bag`}
          </Typography>

          {cartItems.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <Typography className={styles.label}>
                Add some products to get started
              </Typography>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                {cartItems.map((item, index) => (
                  <div className={styles.detailsContainer} key={index}>
                    <img
                      src={item.image}
                      alt={item.productName}
                      className={styles.categoryImg}
                    />
                    <div className={styles.subDetailsContainer}>
                      <div className={styles.productHeader}>
                        <Typography className={styles.header}>
                          {item.productName}
                        </Typography>

                        <div className={styles.sizeContainer}>
                          <div className={styles.label}>Size: {item.size}</div>
                          <div className={styles.label}>
                            Color: {item.color}
                          </div>
                        </div>

                        <div className={styles.quantityContainer}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <span className={styles.label}>{item.quantity}</span>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item, 1)}
                            disabled={item.quantity >= 10}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </div>

                        {!isMobile && (
                          <DeleteForeverOutlinedIcon
                            fontSize="large"
                            style={{ marginTop: "5px", cursor: "pointer" }}
                            onClick={() => handleRemove(item)}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "20px",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div className={styles.amount}>
                          {formatAmount(item.price * item.quantity)}
                        </div>
                        {isMobile && (
                          <DeleteForeverOutlinedIcon
                            fontSize="small"
                            style={{ marginTop: "5px", cursor: "pointer" }}
                            onClick={() => handleRemove(item)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.summaryContainer}>
                <div className={styles.summaryRow}>
                  <Typography className={styles.label}>Subtotal:</Typography>
                  <Typography className={styles.amount}>
                    {formatAmount(getCartTotal())}
                  </Typography>
                </div>
                <div className={styles.summaryRow}>
                  <Typography className={styles.label}>Shipping:</Typography>
                  <Typography className={styles.label}>
                    Calculated at checkout
                  </Typography>
                </div>
                <div
                  className={styles.summaryRow}
                  style={{
                    marginTop: "10px",
                    paddingTop: "10px",
                    borderTop: "1px solid #ddd",
                  }}
                >
                  <Typography className={styles.header}>Total:</Typography>
                  <Typography className={styles.header}>
                    {formatAmount(getCartTotal())}
                  </Typography>
                </div>
                <button
                  className={styles.checkoutButton}
                  onClick={handleCheckout}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
