// Datos de contacto: misma fuente que la pestaña Config de la Hoja Maestra.
export const WHATSAPP_NUMBER = "573183817518";
export const EMAIL = "optexa.consultoria@gmail.com";
export const CITY = "Timbío, Cauca · Colombia";

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
