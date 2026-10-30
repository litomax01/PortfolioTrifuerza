import { Archivo } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

// Free variable fonts (weight + width axes) standing in for the reference's licensed typeface
const main = Archivo({ subsets: ["latin"], variable: "--font-main", axes: ["wdth"], display: "swap" });

const siteTitle = "Leonardo Torres Quelal | Desarrollador de software Full Stack";
const siteDescription = "Portafolio de Leonardo Torres Quelal, desarrollador de software en Ambato, Ecuador. Tiendas en línea, sistemas de gestión y sitios web con Angular, TypeScript, Spring Boot y Supabase. Software developer portfolio: web apps, e-commerce and management systems.";

export const metadata = {
  metadataBase: new URL("https://leonardo-torres-portfolio.vercel.app"),
  title: { default: siteTitle, template: "%s | Leonardo Torres Quelal" },
  description: siteDescription,
  keywords: ["Leonardo Torres Quelal", "desarrollador de software", "software developer", "Angular", "Spring Boot", "TypeScript", "portafolio", "Ambato", "Ecuador"],
  authors: [{ name: "Leonardo Torres Quelal" }],
  openGraph: { title: siteTitle, description: siteDescription, type: "website", locale: "es_EC", alternateLocale: ["en_US"], siteName: "Leonardo Torres Quelal", images: [{ url: "/og.jpg", width: 1568, height: 688, alt: "Leonardo Torres Quelal, desarrollador de software Full Stack" }] },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leonardo Torres Quelal",
  jobTitle: "Software Developer",
  address: { "@type": "PostalAddress", addressLocality: "Ambato", addressCountry: "EC" },
  sameAs: ["https://www.linkedin.com/in/leonardo-torres-quelal/", "https://github.com/litomax01"],
  knowsAbout: ["Angular", "TypeScript", "Java", "Spring Boot", "Supabase", "PostgreSQL"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={`${main.variable}`} suppressHydrationWarning>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
