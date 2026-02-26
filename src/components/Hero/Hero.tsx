import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        Honrando la vida con <span className={styles.italic}>dignidad</span> y respeto.
                    </h1>
                    <p className={styles.subtitle}>
                        Acompañamos a su familia en los momentos más difíciles, brindando un servicio de excelencia, solemnidad y contención integral.
                    </p>
                    <div className={styles.actions}>
                        <Link href="/cotizacion" className={styles.primaryBtn}>
                            Cotizar Servicio Online
                        </Link>
                        <Link href="/planes" className={styles.secondaryBtn}>
                            Ver Nuestros Planes
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
