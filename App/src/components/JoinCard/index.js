import { Typography } from '@mui/material';
import styles from './styles.module.scss';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function JoinCard() {
  const handleJoin = () => {};

  return (
    <div className={styles.rootCardContainer}>
      <Typography className={styles.headerTxt}>Join Kicks Club Get Rewarded Today.</Typography>

      <Typography className={styles.subtxt}>
        As kicks club member you get rewarded with what you love for doing what you love. Sign up
        today and receive immediate access to these Level 1 benefits:
      </Typography>

      <ul className={styles.listItem}>
        <li>Free shipping​</li>
        <li>A 15% off voucher for your next purchase</li>
        <li> Access to Members Only products and sales</li>
        <li> Access to adidas Running and Training apps</li>
        <li> Special offers and promotions</li>
      </ul>

      <Typography className={styles.subtxt}>
        Join now to start earning points, reach new levels and unlock more rewards and benefits from
        adiClub.​
      </Typography>

      <div className={styles.joinBtn} onClick={handleJoin}>
        <Typography>JOIN THE CLUB</Typography>
        <ArrowForwardIcon />
      </div>
    </div>
  );
}

export default JoinCard;
