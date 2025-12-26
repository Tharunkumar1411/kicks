import CircularProgress from '@mui/material/CircularProgress';
import styles from './styles.module.scss';

const Loader = () => {
  return (
    <div className={styles.loadingContainer}>
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Loader;
