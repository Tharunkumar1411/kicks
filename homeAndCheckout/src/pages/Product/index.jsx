import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Drawer, Typography, useMediaQuery } from "@mui/material";
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
import useCartStore from "../../store/cart";
import Cart from "../Cart";

export default function Product(){
    const { id } = useParams();
    const [cart, setCart] = useState({color: "", size: "", productId: id});
    const [openCart, setOpenCart] = useState(false);
    const isMobile = useMediaQuery("(max-width:1024px)");
    const {productDetails, setProductDetails} = useHomeStore(state => state);
    const {setCartItems, cartItems} =  useCartStore(state => state)
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
        if(cartItems?.includes(id)){
            setOpenCart(true);
            return;
        }
        setCartItems(id);
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
                                    <CustomButton onClick={handleAddToCart} children={(cartItems?.includes(id) ? `VIEW CART` : `ADD TO CART`)} sx={{backgroundColor:"#000", color: "#fff", width:"100%"}}/>
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

                    <Drawer
                        anchor="right"
                        open={openCart}
                        onClose={() => setOpenCart(false)}
                    >
                        <Cart setOpenCart={setOpenCart}/>
                    </Drawer>
                </div>
            : 
                <Loader />
            }
        </div>
    )
}