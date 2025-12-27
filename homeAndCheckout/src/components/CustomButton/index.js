import { Button, CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";

function CustomButton({
  children,
  onClick,
  disabled = false,
  variant = "outlined",
  sx = {},
  loading = false,
  ...props
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      className={styles.customBtn}
      sx={{
        ...sx,
        "&:hover": {
          ...sx,
        },
      }}
      {...props}
    >
      {loading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}

export default CustomButton;
