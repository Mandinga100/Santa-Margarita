"use client";

import { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './cotizacion.module.css';

const steps = ['Datos', 'Selección', 'Resumen', 'Pago'];

export default function CotizacionPage() {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    return (
        <main className={styles.main}>
            <Header />

            <div className={styles.stepperContainer}>
                <div className="container">
                    <div className={styles.stepper}>
                        {steps.map((step, index) => (
                            <div
                                key={step}
                                className={`${styles.step} ${index <= currentStep ? styles.activeStep : ''}`}
                            >
                                <div className={styles.stepNumber}>{index + 1}</div>
                                <span className={styles.stepLabel}>{step}</span>
                                {index < steps.length - 1 && <div className={styles.connector}></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.formCard}>
                        {currentStep === 0 && (
                            <div className={styles.stepContent}>
                                <h2 className={styles.title}>Paso 1: Información de Contacto</h2>
                                <p className={styles.subtitle}>Por favor, ingrese sus datos para comenzar el proceso de cotización.</p>

                                <div className={styles.grid}>
                                    <div className={styles.field}>
                                        <label>Nombre Completo</label>
                                        <input type="text" placeholder="Ej: Juan Pérez" className={styles.input} />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Teléfono de Contacto</label>
                                        <input type="tel" placeholder="+56 9 ..." className={styles.input} />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Correo Electrónico</label>
                                        <input type="email" placeholder="correo@ejemplo.com" className={styles.input} />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Comuna de Servicio</label>
                                        <input type="text" placeholder="Ej: Santiago Centro" className={styles.input} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className={styles.stepContent}>
                                <h2 className={styles.title}>Paso 2: Elija el tipo de servicio</h2>
                                <div className={styles.servicesGrid}>
                                    <div className={styles.serviceCard}>
                                        <h3>Inhumación Tradicional</h3>
                                        <p>Servicio completo de sepultación con todos los honores.</p>
                                        <button className={styles.selectBtn}>Seleccionar</button>
                                    </div>
                                    <div className={styles.serviceCard}>
                                        <h3>Cremación</h3>
                                        <p>Proceso de incineración con ánfora de madera noble incluida.</p>
                                        <button className={styles.selectBtn}>Seleccionar</button>
                                    </div>
                                    <div className={styles.serviceCard}>
                                        <h3>Servicio VIP</h3>
                                        <p>Atención personalizada de lujo, carroza de gala y coro lirical.</p>
                                        <button className={styles.selectBtn}>Seleccionar</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className={styles.navigation}>
                            {currentStep > 0 && (
                                <button onClick={prevStep} className={styles.backBtn}>Atrás</button>
                            )}
                            <button onClick={nextStep} className={styles.nextBtn}>
                                {currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
