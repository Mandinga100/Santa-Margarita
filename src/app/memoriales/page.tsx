"use client";

import { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './memoriales.module.css';

const dummyMemorials = [
    { id: 1, name: 'Eduardo Valenzuela Ortiz', dates: '1945 - 2026', type: 'Servicio Reciente' },
    { id: 2, name: 'Marta Cecilia Lagos', dates: '1952 - 2026', type: 'Cinerario' },
    { id: 3, name: 'Roberto Méndez Silva', dates: '1938 - 2026', type: 'Servicio de Hoy' },
    { id: 4, name: 'Lucía Fernández Tapia', dates: '1960 - 2026', type: 'Servicio Reciente' },
];

export default function MemorialesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = dummyMemorials.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className={styles.main}>
            <Header />

            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>Memoriales y Obituarios</h1>
                    <p className={styles.subtitle}>Un espacio para honrar y recordar a quienes han partido.</p>

                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Buscar por nombre o apellido..."
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className={styles.searchIcon}>🔍</span>
                    </div>
                </div>
            </section>

            <section className={styles.gallerySection}>
                <div className="container">
                    <div className={styles.tabs}>
                        <button className={styles.tabActive}>Todos</button>
                        <button className={styles.tab}>Servicios de Hoy</button>
                        <button className={styles.tab}>Fallecidos Recientes</button>
                        <button className={styles.tab}>Cinerarios</button>
                    </div>

                    <div className={styles.grid}>
                        {filtered.map((m) => (
                            <div key={m.id} className={styles.card}>
                                <div className={styles.imageContainer}>
                                    {/* Placeholder para portrait */}
                                    <div className={styles.portraitPlaceholder}></div>
                                    <div className={styles.cardType}>{m.type}</div>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.name}>{m.name}</h3>
                                    <p className={styles.dates}>{m.dates}</p>
                                    <button className={styles.memorialBtn}>Ver Memorial</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
