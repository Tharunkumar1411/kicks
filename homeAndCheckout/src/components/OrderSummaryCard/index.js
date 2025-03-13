import React from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import styles from "./styles.module.scss";
import CustomButton from "../CustomButton";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

const OrderSummaryCard = ({onClose}) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));    
    
    const handleSummary = () => {
         navigate(`${ROUTES.CHEKOUT}/2`);
    }
    
    return (
        <div className={styles.summaryCard}>
            <Typography className={styles.header} sx={(isMobile) ? {
                padding: "16px"
            }: {padding: "0 16px"}}>Order Summary</Typography>
            <div className={styles.summaryContent}>
                <div className={styles.summaryRow}>
                    <Typography className={styles.label}>1 Item</Typography>
                    <Typography className={styles.label}>$130.00</Typography>
                </div>
                <div className={styles.summaryRow}>
                    <Typography className={styles.label}>Delivery</Typography>
                    <Typography className={styles.label}>$6.99</Typography>
                </div>
                <div className={styles.summaryRow}>
                    <Typography className={styles.label}>Sales Tax</Typography>
                    <Typography className={styles.label}>-</Typography>
                </div>
                <div className={styles.summaryRow}>
                    <Typography className={styles.header}>Total</Typography>
                    <Typography className={styles.header}>$1340</Typography>
                </div>
                <CustomButton onClick={handleSummary} children="CHECKOUT" sx={{backgroundColor:"#000", color: "#fff", width:"100%", marginTop:"15px"}}/>
                <CustomButton onClick={() => onClose(false)} children="CLOSE" sx={{backgroundColor:"#fff", color: "#000", width:"100%", marginTop:"15px"}}/>
            </div>
        </div>
    )
}

export default OrderSummaryCard;
