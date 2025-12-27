import { Typography } from '@mui/material';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import useHomeStore from '../../store/home';
import ImageWithSkeleton from '../ImageWithSkelton';

const NewDropCard = () => {
  const navigate = useNavigate();
  const homeDetails = useHomeStore((state) => state.homeDetails);

  const handleProduct = (productId) => {
    navigate(`${ROUTES.PRODUCT}/${productId}`);
  };

  return (
    <div className={styles.rootContainer}>
      {homeDetails?.newDrops?.map((item, index) => (
        <div key={index} className={styles.dropContainer}>
          <div className={styles.imageContainer}>
            <ImageWithSkeleton
              src={item.url}
              alt="Hero banner"
              className={styles.imgCard}
              isBackground={true}
            />
          </div>

          <Typography className={styles.productName}>{item.productName}</Typography>
          <button onClick={() => handleProduct(item.productId)} className={styles.productButton}>
            View Product - <span style={{ color: '#FFA52F' }}>{item.price}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default NewDropCard;
