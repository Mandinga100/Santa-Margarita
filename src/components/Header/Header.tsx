import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Top Bar - Económicos */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.indicators}>
            <span>UF: $38.450,22</span>
            <span>UTM: $66.232,00</span>
            <span>{new Date().toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className={styles.mainBar}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/">
              <span className={styles.logoText}>FUNERARIA <span className={styles.logoBold}>SANTA MARGARITA</span></span>
            </Link>
          </div>

          <nav className={styles.nav}>
            <Link href="/cotizacion">Cotización Online</Link>
            <Link href="/memoriales">Memoriales</Link>
            <Link href="/planes">Planes</Link>
            <Link href="/recursos">Recursos</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>

          <div className={styles.contact}>
            <a href="tel:+56912345678" className={styles.phone}>
              <span className={styles.phoneIcon}>📞</span> 24/7: +56 9 1234 5678
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
