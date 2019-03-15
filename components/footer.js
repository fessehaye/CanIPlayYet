import { footer as styles } from '../utils/styles';

const footer = () => (
  <footer className={styles.container}>
    <p>
      Made with 💖 by{' '}
      <a
        className={styles.link}
        href="https://github.com/fessehaye/CanIPlayYet"
      >
        Simon Fessehaye
      </a>
    </p>
  </footer>
);

export default footer;
