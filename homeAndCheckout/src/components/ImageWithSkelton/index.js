import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const ImageWithSkeleton = ({
  src,
  alt = "",
  className = "",
  style = {},
  isBackground = false,
  children,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true);
  }, [src]);

  if (isBackground) {
    return (
      <div
        className={`${className} ${!loaded ? styles.skeleton : ""}`}
        style={loaded ? { ...style, backgroundImage: `url(${src})` } : style}
      >
        {children}
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
