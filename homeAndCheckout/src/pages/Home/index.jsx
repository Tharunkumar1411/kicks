import React, { Suspense, useEffect } from "react";
import { Typography } from "@mui/material";
import styles from "./styles.module.scss";
import NewDropCard from "../../components/NewDropCard";
import ReviewCard from "../../components/ReviewCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { responsive } from "../../utils/constants";
import { getHomeDetails } from "../../api/home";
import Loader from "../../components/Loader";
import useHomeStore from "../../store/home";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import useImagePreload from "../../hooks/useImagePreload";
import ImageWithSkeleton from "../../components/ImageWithSkelton";

const Home = () => {
  const carouselRef = useRef(null);
  const setHomeDetails = useHomeStore((state) => state.setHomeDetails);
  const homeDetails = useHomeStore((state) => state.homeDetails);
  const nav = useNavigate();

  const { homeBannerUrl, previewUrlOne, previewUrlTwo } =
    homeDetails?.topBanner || {};

  const isLoaded = useImagePreload([
    homeBannerUrl,
    previewUrlOne,
    previewUrlTwo,
  ]);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };

  useEffect(() => {
    const fetchHomeDetails = async () => {
      try {
        const res = await getHomeDetails();
        setHomeDetails(res);
      } catch (error) {
        // Error is already handled and shown to user via toast
        console.error('Failed to load home details:', error);
      }
    };

    fetchHomeDetails();
  }, [setHomeDetails]);

  return (
    <Suspense fallback={<Loader />}>
      <div style={{ margin: "20px" }}>
        <div className={`${styles.bannerContainer}`}>
          <ImageWithSkeleton
            src={homeBannerUrl}
            alt="Hero banner"
            className={styles.bannerImage}
            isBackground={true}
          />

          <div className={styles.bannerContentContainer}>
            <div className={styles.bannerContent}>
              <Typography className={styles.header}>
                {homeDetails?.topBanner?.productName}
              </Typography>
              <span className={styles.subHeader}>
                {homeDetails?.topBanner?.description}
              </span>
              <button className={styles.button}>SHOP NOW</button>
            </div>

            <div className={styles.previewBannerContainer}>
              <ImageWithSkeleton
                src={previewUrlOne}
                alt="Hero banner"
                className={styles.previewOne}
              />

              <ImageWithSkeleton
                src={previewUrlTwo}
                alt="Hero banne"
                className={styles.previewTwo}
              />
            </div>
          </div>
        </div>

        <div className={styles.newDropContainer}>
          <div className={styles.dropContent}>
            <Typography className={styles.header}>
              Don’t miss out new drops
            </Typography>
            <button
              className={styles.button}
              onClick={() => nav(`${ROUTES.PRODUCT_LIST}`)}
            >
              VIEW MORE
            </button>
          </div>

          <NewDropCard />
        </div>

        <div className={styles.categoryRoot}>
          <div className={styles.headerContainer}>
            <h3 className={styles.header}>CATEGORIES</h3>
            <div className={styles.buttonGroup}>
              <ArrowBackIosNewIcon
                className={styles.arrowBtn}
                onClick={handlePrevious}
              />
              <ArrowForwardIosIcon
                className={styles.arrowBtn}
                onClick={handleNext}
              />
            </div>
          </div>

          {homeDetails?.categories && (
            <div className={styles.categoryContainer}>
              <Carousel
                responsive={responsive}
                ref={carouselRef}
                showDots={false}
                arrows={false}
              >
                {homeDetails?.categories?.map((category, index) => (
                  <ImageWithSkeleton
                    src={category.url}
                    alt="Hero banner"
                    className={styles.categoryImg}
                    isBackground={true}
                    key={category.url}
                  >
                    <div className={styles.categoryTitle}>
                      <Typography className={styles.title}>
                        {category.categoryName}
                      </Typography>
                      <Typography className={styles.title}>Shoes</Typography>
                    </div>
                    <div className={styles.categoryLink}>
                      <ArrowOutwardIcon className={styles.arrowLink} />
                    </div>
                  </ImageWithSkeleton>
                ))}
              </Carousel>
            </div>
          )}
        </div>

        <div className={styles.newDropContainer}>
          <div className={styles.dropContent}>
            <Typography className={styles.header}>Reviews</Typography>
            <button className={styles.button}>SEE ALL</button>
          </div>

          <div className={styles.reviewRootContainer}>
            {homeDetails?.review?.map((review, index) => (
              <ReviewCard
                key={index}
                title={review.reviewTitle}
                subText={review.reviewContent}
                personImg={review.personImgUrl}
                reviewImg={review.productUrl}
                rating={review.rate}
              />
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
