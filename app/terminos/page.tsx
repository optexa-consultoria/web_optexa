import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";
import { EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos de uso del sitio | Optexa",
  description: "Condiciones de uso del sitio web de Optexa Consultoría.",
};

export default function Terminos() {
  return (
    <LegalLayout title="Términos de uso del sitio" updated="3 de noviembre de 2026">
      <p>
        Al usar este sitio aceptas estos términos. El sitio es operado por E. Camilo Urbano Burbano,
        bajo la marca Optexa Consultoría, con domicilio en Timbío, Cauca, Colombia.
      </p>

      <h2>1. Información del sitio</h2>
      <p>
        El contenido es informativo y describe de forma general los servicios de Optexa. No
        constituye una oferta comercial vinculante: el alcance, los entregables, los tiempos y el
        precio de cada servicio se definen por escrito en una cotización y un acuerdo de servicio
        después del diagnóstico.
      </p>

      <h2>2. Evaluación gratuita</h2>
      <p>
        La evaluación de 6 preguntas es una orientación rápida y no reemplaza un diagnóstico
        profesional. Sus resultados no son una garantía de resultados futuros.
      </p>

      <h2>3. Casos publicados</h2>
      <p>
        Los casos que mostramos son proyectos reales, descritos con autorización del cliente o sin
        datos que lo identifiquen. Los resultados de cada negocio dependen de su contexto.
      </p>

      <h2>4. Propiedad intelectual</h2>
      <p>
        La marca Optexa, el logotipo, el isotipo, los textos y los diseños de este sitio pertenecen
        a su titular. No se permite su uso o reproducción sin autorización previa y por escrito.
      </p>

      <h2>5. Enlaces externos</h2>
      <p>
        El sitio enlaza a servicios de terceros como WhatsApp. Su uso se rige por las condiciones
        y políticas de esos terceros.
      </p>

      <h2>6. Datos personales</h2>
      <p>
        El tratamiento de tus datos se rige por nuestra{" "}
        <Link href="/privacidad">Política de tratamiento de datos personales</Link>.
      </p>

      <h2>7. Contacto y ley aplicable</h2>
      <p>
        Para cualquier inquietud escríbenos a <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Estos términos
        se rigen por las leyes de la República de Colombia.
      </p>
    </LegalLayout>
  );
}
