import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import styles from "./styles.module.scss";
import {
  Badge,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Squash as Hamburger } from "hamburger-react";
import PersonIcon from "@mui/icons-material/Person";
import logoImg from "../../assets/images/Logo.svg";
import CartIcon from "@mui/icons-material/ShoppingCart";
import { NavItems } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import NavDrawer from "./Drawer";
import useCartStore from "home/cartStore";
import useUserStore from "../../store/user";
import LogoutIcon from "@mui/icons-material/Logout";
import { handleLogout } from "../../services/auth";

function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { cartItems } = useCartStore((state) => state);
  const { userDetails, clearUserDetails } = useUserStore((state) => state);

  const nav = useNavigate();

  const handleProfileClick = () => {
    if (!userDetails?.email) {
      nav(ROUTES.LOGIN);
    }
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    clearUserDetails();
    handleLogout();
    setLogoutDialogOpen(false);
    nav(ROUTES.LOGIN);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
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
                <Typography
                  className={styles.menuOption}
                  key={idx}
                  onClick={() => nav(ROUTES.PRODUCT_LIST, { replace: true })}
                >
                  {item}
                </Typography>
              ))}
            </div>
          )}
        </div>

        <div className={styles.logo}>
          <img
            src={logoImg}
            alt="logo"
            onClick={() => nav(ROUTES.HOME, { replace: true })}
          />
        </div>

        <div className={styles.navProfileItems}>
          {userDetails?.email && !isMobile ? (
            <div
              className={styles.userDetailsContainer}
              onClick={handleLogoutClick}
            >
              <Typography className={styles.userNameText}>
                Hi, {userDetails?.displayName ?? "User"}
              </Typography>

              <LogoutIcon style={{ cursor: "pointer" }} />
            </div>
          ) : (
            <PersonIcon
              onClick={handleProfileClick}
              style={{ cursor: "pointer" }}
            />
          )}

          <Badge badgeContent={cartItems?.length} color="primary">
            <CartIcon
              style={{ cursor: "pointer" }}
              onClick={() => nav(ROUTES.CART, { replace: true })}
            />
          </Badge>
        </div>
      </div>

      {isMobile && <NavDrawer open={open} setOpen={setOpen} />}

      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NavBar;
