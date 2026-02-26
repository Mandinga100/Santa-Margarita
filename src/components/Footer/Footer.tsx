import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h3 className={styles.title}>FUNERARIA ELITE</h3>
                        <p className={styles.description}>
                            Brindamos un servicio de excelencia y acompañamiento integral en los momentos más difíciles, honrando la memoria con dignidad.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.subtitle}>Enlaces Rápidos</h4>
                        <ul className={styles.list}>
                            <li><Link href="/cotizacion">Cotización Online</Link></li>
                            <li><Link href="/memoriales">Memoriales</Link></li>
                            <li><Link href="/planes">Planes de Servicio</Link></li>
                            <li><Link href="/recursos">Recursos de Apoyo</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.subtitle}>Contacto</h4>
                        <ul className={styles.list}>
                            <li>Dirección: Av. Principal 1234, Santiago</li>
                            <li>Teléfono: +56 2 2123 4567</li>
                            <li>Emergencias: +56 9 1234 5678</li>
                            <li>Email: contacto@funerariaelite.cl</li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.subtitle}>Redes Sociales</h4>
                        <div className={styles.socials}>
                            <a href="#" aria-label="Facebook">FB</a>
                            <a href="#" aria-label="Instagram">IG</a>
                            <a href="#" aria-label="LinkedIn">LN</a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Funeraria Elite. Todos los derechos reservados.</p>
                    <div className={styles.legal}>
                        <Link href="/privacidad">Privacidad</Link>
                        <Link href="/terminos">Términos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
