import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { NavItems } from "../../../utils/constants";
import styles from "./styles.module.scss";

export default function NavDrawer({ open, setOpen }) {
  const [user, setUser] = React.useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = async () => {
    await signOut(auth);
    setLogoutDialogOpen(false);
    setOpen(false);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box className={styles.drawerContainer} role="presentation">
        {user && (
          <Box className={styles.userSection}>
            <Avatar
              src={user.photoURL || ""}
              className={styles.avatar}
            >
              {user.displayName?.[0] || user.email?.[0]}
            </Avatar>

            <Box className={styles.userInfo}>
              <Typography className={styles.userName}>
                {user.displayName || "User"}
              </Typography>
              <Typography className={styles.userEmail}>
                {user.email}
              </Typography>
            </Box>
          </Box>
        )}

        <Divider className={styles.divider} />

        <Box className={styles.menuSection}>
          <List>
            {NavItems.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton className={styles.menuItem}>
                  <Typography className={styles.menuText}>{text}</Typography>
                  <AddIcon fontSize="small" className={styles.addIcon} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider className={styles.divider} />

        {user && (
          <Box className={styles.logoutSection}>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleLogoutClick}
                  className={styles.logoutButton}
                >
                  <LogoutIcon fontSize="small" className={styles.logoutIcon} />
                  <Typography className={styles.logoutText}>Logout</Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        )}
      </Box>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="drawer-logout-dialog-title"
        aria-describedby="drawer-logout-dialog-description"
      >
        <DialogTitle id="drawer-logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="drawer-logout-dialog-description">
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
    </Drawer>
  );
}
