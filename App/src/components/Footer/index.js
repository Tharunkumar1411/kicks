import { TextField, Typography } from '@mui/material';
import styles from './styles.module.scss';
import WhiteLogo from '../../assets/images/whiteLogo.svg';
import { Fragment } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

function Footer() {
  return (
    <div className={styles.footerRootContainer}>
      <div className={styles.topContainer}>
        <div className={styles.grid1}>
          <Typography className={styles.clubTxt}>Join our KicksPlus Club & get 15% off</Typography>
          <Typography className={styles.clubSubTxt}>
            Sign up for free! Join the community.
          </Typography>

          <div className={styles.emailBlock}>
            <input placeholder="Email address" className={styles.inputField} />
            <button className={styles.submitBtn}>SUBMIT</button>
          </div>
        </div>

        <div className={styles.grid2}>
          <img src={WhiteLogo} alt="Logo" className={styles.logoImg} />
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.grid1}>
          <div className={styles.fragment}>
            <Typography className={styles.menuHeader}>About Us</Typography>
            <Typography className={styles.aboutTxt}>
              We are the biggest hyperstore in the universe. We got you all cover with our exclusive
              collections and latest drops.
            </Typography>
          </div>

          <div className={styles.fragment}>
            <Typography className={styles.menuHeader}>Categories</Typography>
            <div className={styles.catMenu}>
              <Typography>Runners</Typography>
              <Typography>Sneakers</Typography>
              <Typography>Basketball</Typography>
              <Typography>Outdoor</Typography>
              <Typography>Golf</Typography>
              <Typography>Hiking</Typography>
            </div>
          </div>

          <div className={styles.fragment}>
            <Typography className={styles.menuHeader}>Company</Typography>
            <div className={styles.compMenu}>
              <Typography>About</Typography>
              <Typography>Contact</Typography>
              <Typography>Blogs</Typography>
            </div>
          </div>

          <div className={styles.fragment}>
            <Typography className={styles.menuHeader}>Follow Us</Typography>
            <div className={styles.socialMenu}>
              <FacebookIcon />
              <InstagramIcon />
              <XIcon />
            </div>
          </div>
        </div>

        <div className={styles.bottomLogoContainer}>
          <img src={WhiteLogo} alt="Logo" className={styles.bottomLogo} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
