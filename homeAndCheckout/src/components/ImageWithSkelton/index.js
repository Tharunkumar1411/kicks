import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { showSuccessToast } from "../../utils/errorHandler";

const ImageWithSkeleton = ({
  src,
  alt = "",
  className = "",
  style = {},
  isBackground = false,
  children,
  showAddIcon = false,
  onClick = null,
  onAddToCart = null,
  isInCart = false,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true);
  }, [src]);

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(e);
    }
  };

  if (isBackground) {
    return (
      <div
        className={`${className} ${!loaded ? styles.skeleton : ""} ${
          showAddIcon ? styles.hasAddIcon : ""
        }`}
        style={loaded ? { ...style, backgroundImage: `url(${src})` } : style}
        onClick={onClick}
      >
        {children}
        {showAddIcon && (
          <div
            className={styles.addIconContainer}
            onClick={(e) => handleAddClick(e)}
          >
            {isInCart ? (
              <CheckCircleIcon className={styles.addedIcon} />
            ) : (
              <AddIcon className={styles.addIcon} />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${styles.imgWrapper} ${!loaded ? styles.skeleton : ""}`}>
      {loaded && <img src={src} alt={alt} className={className} />}
    </div>
  );
};

export default ImageWithSkeleton;
