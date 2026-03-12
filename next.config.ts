import type { NextConfig } from "next";

const securityHeaders = [
  // Previene ataques MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Bloquea clickjacking
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Fuerza HTTPS (1 año)
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // Mitiga XSS en navegadores antiguos
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Control de información del Referrer
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Content Security Policy — mitiga CVE-2025-55182 y XSS
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: solo propio + GSAP inline (necesario)
      "script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://www.googletagmanager.com",
      // Estilos: propio + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fuentes: propio + Google Fonts
      "font-src 'self' https://fonts.gstatic.com data:",
      // Imágenes: propio + data URIs
      "img-src 'self' data: https:",
      // Conexiones: Firebase, GA4
      "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://www.google-analytics.com https://firestore.googleapis.com wss://*.firebaseio.com",
      // Frames: ninguno externo
      "frame-src 'none'",
      // Objects: ninguno
      "object-src 'none'",
      // Base URI restrictiva
      "base-uri 'self'",
      // Form action
      "form-action 'self' https://wa.me",
    ].join("; "),
  },
  // Permisos de APIs del navegador
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Necesario para output: 'export' (sitio estático sin servidor de optimización)
    unoptimized: true,
  },
  // Headers de seguridad — aplicados en desarrollo (en producción Firebase Hosting los maneja)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
