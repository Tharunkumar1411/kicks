import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import styles from './styles.module.scss';
import { Badge, Typography } from '@mui/material';
import { Squash as Hamburger } from 'hamburger-react';
import PersonIcon from '@mui/icons-material/Person';
import logoImg from '../../assets/images/Logo.svg';
import CartIcon from '@mui/icons-material/ShoppingCart';
import { NavItems } from '../../utils/constants';
import isAuthenticate from '../../Hook/isAuthenticate';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import NavDrawer from './Drawer';
import useCartStore from 'home/cartStore';

function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const { token } = isAuthenticate();
  const { cartItems } = useCartStore((state) => state);

  const nav = useNavigate();

  const handleProfileClick = () => {
    if (!token) {
      nav(ROUTES.LOGIN);
    }
  };

  return (
    <div>
      <div className={styles.navRootContainer}>
        <div>
          {isMobile ? (
            <Hamburger toggled={open} size={20} toggle={setOpen} />
          ) : (
            <div className={styles.navMenuItems}>
              {NavItems.map((item, idx) => (
                <Typography className={styles.menuOption} key={idx}>
                  {item}
                </Typography>
              ))}
            </div>
          )}
        </div>

        <div className={styles.logo}>
          <img src={logoImg} alt="logo" onClick={() => nav(ROUTES.HOME)} />
        </div>

        <div className={styles.navProfileItems}>
          <PersonIcon onClick={handleProfileClick} style={{ cursor: 'pointer' }} />
          <Badge badgeContent={cartItems.length} color="primary">
            <CartIcon style={{ cursor: 'pointer' }} />
          </Badge>
        </div>
      </div>

      {isMobile && <NavDrawer open={open} setOpen={setOpen} />}
    </div>
  );
}

export default NavBar;
