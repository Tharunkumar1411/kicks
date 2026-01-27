import {
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.scss";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useCartStore from "../../store/cart";
import useCheckoutStore from "../../store/checkout";
import { formatAmount } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import CustomButton from "../../components/CustomButton";

export default function Cart() {
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

  // Track selected items
  const [selectedItems, setSelectedItems] = useState(
    cartItems.map((_, index) => index),
  );

  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(item.productId, item.size, item.color, newQuantity);
    }
  };

  const handleRemove = (item) => {
    removeFromCart(item.productId, item.size, item.color);
    // Update selected items after removal
    const itemIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.productId === item.productId &&
        cartItem.size === item.size &&
        cartItem.color === item.color,
    );
    setSelectedItems(selectedItems.filter((idx) => idx !== itemIndex));
  };

  const handleSelectItem = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((idx) => idx !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((_, index) => index));
    }
  };

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter((_, index) =>
      selectedItems.includes(index),
    );

    if (itemsToCheckout.length === 0) {
      alert("Please select at least one item to checkout");
      return;
    }

    setCheckoutItems(itemsToCheckout);
    navigate(ROUTES.CHEKOUT);
  };

  const getSelectedTotal = () => {
    return cartItems
      .filter((_, index) => selectedItems.includes(index))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getSelectedCount = () => {
    return cartItems
      .filter((_, index) => selectedItems.includes(index))
      .reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className={styles.rootContainer}>
      <div className={styles.headerContainer}>
        <Typography className={styles.mainHeader}>Shopping Cart</Typography>
        <Typography className={styles.subHeader}>
          {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your
          cart
        </Typography>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <Typography className={styles.emptyHeader}>
            Your cart is empty
          </Typography>
          <Typography className={styles.emptyText}>
            Add some products to get started
          </Typography>
          <CustomButton
            onClick={() => navigate(ROUTES.PRODUCT_LIST)}
            children="CONTINUE SHOPPING"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              marginTop: "20px",
            }}
          />
        </div>
      ) : (
        <div className={styles.cartContent}>
          {/* Cart Items Section */}
          <div className={styles.cartItemsSection}>
            {/* Select All */}
            <div className={styles.selectAllContainer}>
              <Checkbox
                checked={selectedItems.length === cartItems.length}
                indeterminate={
                  selectedItems.length > 0 &&
                  selectedItems.length < cartItems.length
                }
                onChange={handleSelectAll}
                sx={{
                  color: "#000",
                  "&.Mui-checked": { color: "#000" },
                  "&.MuiCheckbox-indeterminate": { color: "#000" },
                }}
              />
              <Typography className={styles.selectAllText}>
                Select All ({cartItems.length})
              </Typography>
            </div>

            {/* Cart Items */}
            <div className={styles.cartItemsList}>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.cartItem} ${
                    selectedItems.includes(index) ? styles.selected : ""
                  }`}
                >
                  <div className={styles.itemContent}>
                    <Checkbox
                      checked={selectedItems.includes(index)}
                      onChange={() => handleSelectItem(index)}
                      sx={{
                        color: "#000",
                        "&.Mui-checked": { color: "#000" },
                      }}
                    />

                    <img
                      src={item.image || item.url}
                      alt={item.productName}
                      className={styles.itemImage}
                    />

                    <div className={styles.itemDetails}>
                      <Typography className={styles.itemName}>
                        {item.productName}
                      </Typography>

                      <div className={styles.itemSpecs}>
                        <Typography className={styles.specText}>
                          Size: {item.size}
                        </Typography>
                        <Typography className={styles.specText}>
                          Color: {item.color}
                        </Typography>
                      </div>

                      <div className={styles.itemActions}>
                        <div className={styles.quantityControl}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography className={styles.quantityText}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item, 1)}
                            disabled={item.quantity >= 10}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </div>

                        {!isMobile && (
                          <IconButton
                            onClick={() => handleRemove(item)}
                            className={styles.deleteButton}
                          >
                            <DeleteForeverOutlinedIcon />
                          </IconButton>
                        )}
                      </div>
                    </div>

                    <div className={styles.itemPriceSection}>
                      <Typography className={styles.itemPrice}>
                        {formatAmount(item.price * item.quantity)}
                      </Typography>
                      {isMobile && (
                        <IconButton
                          onClick={() => handleRemove(item)}
                          size="small"
                        >
                          <DeleteForeverOutlinedIcon fontSize="small" />
                        </IconButton>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className={styles.summarySection}>
            <div className={styles.summaryCard}>
              <Typography className={styles.summaryHeader}>
                Order Summary
              </Typography>

              <div className={styles.summaryContent}>
                <div className={styles.summaryRow}>
                  <Typography className={styles.summaryLabel}>
                    Selected Items ({getSelectedCount()})
                  </Typography>
                  <Typography className={styles.summaryValue}>
                    {formatAmount(getSelectedTotal())}
                  </Typography>
                </div>

                <div className={styles.summaryRow}>
                  <Typography className={styles.summaryLabel}>
                    Shipping
                  </Typography>
                  <Typography className={styles.summaryValue}>
                    {selectedItems.length > 0
                      ? formatAmount(6.99)
                      : formatAmount(0)}
                  </Typography>
                </div>

                <div className={styles.summaryDivider} />

                <div className={styles.summaryRow}>
                  <Typography className={styles.summaryTotal}>Total</Typography>
                  <Typography className={styles.summaryTotal}>
                    {formatAmount(
                      selectedItems.length > 0 ? getSelectedTotal() + 6.99 : 0,
                    )}
                  </Typography>
                </div>

                <CustomButton
                  onClick={handleCheckout}
                  disabled={selectedItems.length === 0}
                  children="PROCEED TO CHECKOUT"
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    width: "100%",
                    marginTop: "20px",
                    "&:disabled": {
                      backgroundColor: "#ccc",
                      cursor: "not-allowed",
                    },
                  }}
                />

                <CustomButton
                  onClick={() => navigate(ROUTES.PRODUCT_LIST)}
                  children="CONTINUE SHOPPING"
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #000",
                    width: "100%",
                    marginTop: "10px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
