import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Badge, Typography } from "@mui/material";
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
  const { cartItems } = useCartStore((state) => state);
  const { userDetails, clearUserDetails } = useUserStore((state) => state);

  const nav = useNavigate();

  const handleProfileClick = () => {
    if (!userDetails?.email) {
      nav(ROUTES.LOGIN);
    }
  };

  const handleLogoutUser = () => {
    clearUserDetails();
    handleLogout();
    nav(ROUTES.LOGIN);
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
          {userDetails?.email && !isMobile ? (
            <div className={styles.userDetailsContainer}>
              <Typography className={styles.userNameText}>
                Hi, {userDetails?.displayName ?? "User"}
              </Typography>

              <LogoutIcon
                onClick={handleLogoutUser}
                style={{ cursor: "pointer" }}
              />
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
              onClick={() => nav(ROUTES.CART)}
            />
          </Badge>
        </div>
      </div>

      {isMobile && <NavDrawer open={open} setOpen={setOpen} />}
    </div>
  );
}

export default NavBar;
