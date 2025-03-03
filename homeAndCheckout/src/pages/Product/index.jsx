import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Typography, useMediaQuery } from "@mui/material";
import ColorSizePallate from "../../components/ColorSizePallate";
import CustomButton from "../../components/CustomButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CustomCarousel from "../../components/CustomCarousel";
import NewDropCard from "../../components/NewDropCard";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import { getProductDetails } from "../../api/home";
import { formatAmount } from "../../utils/helper";
import Loader from "../../components/Loader";
import useHomeStore from "../../store/home";

export default function Product(){
    const { id } = useParams();
    const [cart, setCart] = useState({color: "", size: "", productId: id});
    const isMobile = useMediaQuery("(max-width:1024px)");
    const productDetails = useHomeStore(state => state.productDetails);
    const setProductDetails = useHomeStore(state => state.setProductDetails)
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails(id).then((response) => {
            setProductDetails(response)
        });
    },[]);

    const handleBuy = (productId) => {
        navigate(`${ROUTES.CHEKOUT}/${productId}`);
    }

    const handleAddToCart = () => {
        
    }

    const handleFav = () => {

    }

    return(
        <div>
            {Object.keys(productDetails).length ? 
                <div>
                    <div className={styles.rootContainer}>
                        {isMobile ? <CustomCarousel data={productDetails} /> :
                           <div className={styles.previewRootContainer}>
                                {Array(2).fill(0).map((rowIndex, ind) => (
                                    <div key={ind} className={styles.previewContainer}>
                                    {productDetails?.previewImg.slice(rowIndex * 2, rowIndex * 2 + 2).map((imageUrl, index) => (
                                        <div
                                            key={index}
                                            className={styles.previewOne}
                                            style={{ backgroundImage: `url(${imageUrl})`, borderRadius: "48px" }}
                                        />
                                    ))}
                                    </div>
                                ))}
                            </div>
                        }

                        <div className={styles.checkoutContainer}>
                            <Typography className={styles.header}>{productDetails?.productName}</Typography>
                            <Typography className={styles.price}>{formatAmount(productDetails?.price)}</Typography>
                            <ColorSizePallate data={productDetails} selectedItem={cart} setSelectedItem={setCart}/>

                            <div className={styles.btnContainer}>
                                <div className={styles.rowBtn}>
                                    <CustomButton onClick={handleAddToCart} children="ADD TO CART" sx={{backgroundColor:"#000", color: "#fff", width:"100%"}}/>
                                    <CustomButton onClick={handleFav} children={<FavoriteBorderIcon />} sx={{backgroundColor:"#000", color: "#fff", width: "fit-content"}}/>
                                </div>
                            <CustomButton onClick={() => handleBuy(id)} children="BUY IT NOW" sx={{backgroundColor:"#4A69E2", color: "#fff"}}/>
                            </div>

                            <div className={styles.aboutContainer}>
                                <Typography className={styles.header}>About the product</Typography>
                                <Typography className={styles.subHeader}>Shadow Navy / Army Green</Typography>
                                <Typography className={styles.subHeader}>This product is excluded from all promotional discounts and offers.</Typography>
                                <ul>
                                    <li className={styles.subHeader}>Pay over time in interest-free installments with Affirm, Klarna or Afterpay.</li>
                                    <li className={styles.subHeader}>Join adiClub to get unlimited free standard shipping, returns, & exchanges.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.newDropContainer}>
                        <div className={styles.dropContent}>
                            <Typography className={styles.header}>You may also like</Typography>
                            <button className={styles.button}>EXPLORE</button>
                        </div>

                        <NewDropCard />
                    </div>
                </div>
            : 
                <Loader />
            }
        </div>
    )
}