import { Typography, useMediaQuery, useTheme, Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.scss";
import useCheckoutStore from "../../store/checkout";
import { formatAmount } from "../../utils/helper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const OrderSummaryCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isExpanded, setIsExpanded] = useState(true);
  const { checkoutItems, getTotalItems, getCheckoutTotal } = useCheckoutStore((state) => state);

  const deliveryFee = 6.99;
  const subtotal = getCheckoutTotal();
  const total = subtotal + deliveryFee;

  return (
    <div className={styles.summaryCard}>
      <div
        className={styles.summaryHeader}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Typography
          className={styles.header}
          sx={
            isMobile
              ? {
                  padding: "16px",
                }
              : { padding: "0 16px" }
          }
        >
          Order Summary ({getTotalItems()} {getTotalItems() === 1 ? "item" : "items"})
        </Typography>
        <IconButton size="small">
          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>

      <Collapse in={isExpanded}>
        <div className={styles.summaryContent}>
          {/* Product Items */}
          <div className={styles.productList}>
            {checkoutItems.map((item, index) => (
              <div key={index} className={styles.productItem}>
                <img
                  src={item.image}
                  alt={item.productName}
                  className={styles.productImage}
                />
                <div className={styles.productDetails}>
                  <Typography className={styles.productName}>
                    {item.productName}
                  </Typography>
                  <div className={styles.productSpecs}>
                    <Typography className={styles.specLabel}>
                      Size: {item.size}
                    </Typography>
                    <Typography className={styles.specLabel}>
                      Color: {item.color}
                    </Typography>
                    <Typography className={styles.specLabel}>
                      Qty: {item.quantity}
                    </Typography>
                  </div>
                </div>
                <Typography className={styles.productPrice}>
                  {formatAmount(item.price * item.quantity)}
                </Typography>
              </div>
            ))}
          </div>

          {/* Summary Calculations */}
          <div className={styles.summaryCalculations}>
            <div className={styles.summaryRow}>
              <Typography className={styles.label}>Subtotal</Typography>
              <Typography className={styles.label}>
                {formatAmount(subtotal)}
              </Typography>
            </div>
            <div className={styles.summaryRow}>
              <Typography className={styles.label}>Delivery</Typography>
              <Typography className={styles.label}>
                {formatAmount(deliveryFee)}
              </Typography>
            </div>
            <div className={styles.summaryRow}>
              <Typography className={styles.label}>Sales Tax</Typography>
              <Typography className={styles.label}>-</Typography>
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryRow}>
              <Typography className={styles.header}>Total</Typography>
              <Typography className={styles.header}>
                {formatAmount(total)}
              </Typography>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default OrderSummaryCard;
