import styles from './styles.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFountContainer}>
      <h1 className={styles.header}>404</h1>
      <h3 className={styles.header}>Oops, this page Not Found!</h3>
    </div>
  );
}
