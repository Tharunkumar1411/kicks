import ImageWithSkeleton from "../ImageWithSkelton";
import styles from "./styles.module.scss";
import { Avatar, Rating } from "@mui/material";

export default function ReviewCard({
  title,
  subText,
  personImg,
  reviewImg,
  rating,
}) {
  return (
    <div className={styles.reviewCardCard}>
      <div className={styles.reviewHeader}>
        <div>
          <h3 className={styles.header}>{title}</h3>
          <p className={styles.subHeader}>{subText}</p>
        </div>
        <Avatar alt="Remy Sharp" src={personImg} className={styles.reviewImg} />
      </div>
      <div className={styles.ratingContainer}>
        <Rating
          name="read-only"
          value={rating}
          readOnly
          className={styles.rating}
        />
        <span>{rating}</span>
      </div>
      <ImageWithSkeleton
        src={reviewImg}
        alt="Hero banner"
        className={styles.reviewImage}
        isBackground={true}
      />
    </div>
  );
}
