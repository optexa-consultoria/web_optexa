// Datos de contacto: misma fuente que la pestaña Config de la Hoja Maestra.
export const WHATSAPP_NUMBER = "573127252204";
export const EMAIL = "optexa.consultoria@gmail.com";
export const CITY = "Timbío, Cauca · Colombia";

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// URL /exec del receptor de leads (Apps Script). Vacía = el formulario solo abre WhatsApp.
export const LEADS_URL = process.env.NEXT_PUBLIC_LEADS_URL ?? "";
