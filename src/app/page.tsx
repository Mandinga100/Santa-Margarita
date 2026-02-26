import ParentHeader from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer/Footer';
import WhatsAppButton from '@/components/WhatsAppButton/WhatsAppButton';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <ParentHeader />
      <Hero />

      {/* Sección Memorial Search - Rápida */}
      <section className={styles.bgSecondary}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Encuentre a un Ser Querido</h2>
            <p className={styles.sectionSubtitle}>Acceda a memoriales, obituarios y deje sus condolencias de manera virtual.</p>
          </div>
          <div className={styles.searchBox}>
            <input type="text" placeholder="Buscar por nombre o apellido..." className={styles.searchInput} />
            <button className={styles.searchBtn}>BUSCAR MEMORIAL</button>
          </div>
        </div>
      </section>

      {/* Sección Planes - Rápida */}
      <section>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nuestros Planes de Servicio</h2>
            <p className={styles.sectionSubtitle}>Soluciones integrales diseñadas para brindar tranquilidad y dignidad.</p>
          </div>
          <div className={styles.plansGrid}>
            {['Básico', 'Estándar', 'Premium', 'Elite'].map((plan) => (
              <div key={plan} className={styles.planCard}>
                <h3 className={styles.planName}>{plan}</h3>
                <p className={styles.planDesc}>Descripción breve del servicio y coberturas incluidas.</p>
                <div className={styles.planPrice}>Desde $1.290.000</div>
                <button className={styles.planBtn}>Ver Detalles</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
