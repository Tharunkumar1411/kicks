import { useEffect } from "react";
import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useBannerStore from "../../store/banner";
import { getOfferBanner } from "../../api/banner";
import styles from "./styles.module.scss";

export default function OfferBanner() {
  console.log("OfferBanner component rendering!");

  const {
    bannerData,
    isBannerVisible,
    closeBanner,
    setBannerData,
    setLoading,
  } = useBannerStore((state) => state);

  console.log("Store values:", { bannerData, isBannerVisible });

  useEffect(() => {
    // Fetch banner data on component mount
    const fetchBanner = async () => {
      setLoading(true);
      // const data = await getOfferBanner();
      const data = {
        isActive: true,
        message: "🎉 Free shipping on orders over $100!",
        backgroundColor: "#232321",
        textColor: "#FFFFFF",
        link: "https://example.com",
        closeable: true,
      };
      console.log("Setting banner data:", data);
      setBannerData(data);
    };

    fetchBanner();
  }, []);

  // Debug logs
  console.log("Banner State:", { isBannerVisible, bannerData });

  // Don't render if banner is not visible or not active
  if (!isBannerVisible || !bannerData?.isActive) {
    console.log("Banner not rendering because:", {
      isBannerVisible,
      isActive: bannerData?.isActive,
    });
    return null;
  }

  console.log("Banner rendering!");

  const handleBannerClick = () => {
    if (bannerData?.link) {
      window.open(bannerData.link, "_blank", "noopener,noreferrer");
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    closeBanner();
  };

  return (
    <div
      className={styles.bannerContainer}
      style={{
        backgroundColor: bannerData?.backgroundColor || "#4A69E2",
        color: bannerData?.textColor || "#FFFFFF",
        cursor: bannerData?.link ? "pointer" : "default",
      }}
      onClick={handleBannerClick}
      role={bannerData?.link ? "button" : "banner"}
      tabIndex={bannerData?.link ? 0 : -1}
    >
      <div className={styles.bannerContent}>
        <Typography className={styles.bannerMessage}>
          {bannerData?.message || ""}
        </Typography>
      </div>

      {bannerData?.closeable !== false && (
        <IconButton
          onClick={handleClose}
          className={styles.closeButton}
          size="small"
          aria-label="Close banner"
          sx={{
            color: bannerData?.textColor || "#FFFFFF",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </div>
  );
}
