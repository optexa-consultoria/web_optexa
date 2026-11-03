import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { EMAIL, WHATSAPP_NUMBER } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de tratamiento de datos personales | Optexa",
  description: "Cómo Optexa recolecta, usa y protege los datos personales, conforme a la Ley 1581 de 2012.",
};

export default function Privacidad() {
  return (
    <LegalLayout title="Política de tratamiento de datos personales" updated="3 de noviembre de 2026">
      <p>
        Esta política explica cómo Optexa trata los datos personales que recibe a través de su sitio
        web, WhatsApp, correo electrónico y en la prestación de sus servicios, en cumplimiento de la
        Ley 1581 de 2012, el Decreto 1074 de 2015 (que compila el Decreto 1377 de 2013) y demás
        normas que las modifiquen o complementen.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li><strong>Nombre:</strong> E. Camilo Urbano Burbano, que opera bajo la marca Optexa Consultoría.</li>
        <li><strong>Domicilio y dirección:</strong> Cra 19A #25-59, Timbío, Cauca, Colombia.</li>
        <li><strong>Correo:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
        <li><strong>Teléfono / WhatsApp:</strong> +{WHATSAPP_NUMBER}</li>
      </ul>

      <h2>2. Datos que recolectamos</h2>
      <p>
        Datos de identificación y contacto (nombre, teléfono, correo, nombre del negocio, ciudad) y la
        información que nos compartas sobre tu negocio para prestarte el servicio. Si al terminar la
        evaluación de 6 preguntas dejas tus datos, guardamos tu nombre, WhatsApp, negocio, ciudad,
        preferencia de reunión, tus respuestas y el resultado en una hoja de cálculo privada de
        Optexa (Google Sheets), para contactarte y preparar el diagnóstico. No solicitamos datos sensibles ni datos de niños, niñas o adolescentes.
      </p>
      <p>
        El sitio usa Vercel Web Analytics, que mide visitas de forma agregada sin cookies de rastreo
        ni identificación personal.
      </p>

      <h2>3. Finalidades</h2>
      <ul>
        <li>Responder tus mensajes y solicitudes de información.</li>
        <li>Agendar y realizar diagnósticos, cotizaciones y proyectos.</li>
        <li>Elaborar y enviar documentos comerciales y de cobro.</li>
        <li>Hacer seguimiento a la relación comercial y a la calidad del servicio.</li>
        <li>Enviar información sobre servicios de Optexa, solo si lo autorizas. Puedes pedir que no te escribamos más en cualquier momento.</li>
        <li>Publicar casos de éxito o testimonios, solo con tu autorización expresa y por escrito.</li>
      </ul>

      <h2>4. Autorización</h2>
      <p>
        Al marcar la casilla de autorización del formulario de la web, o al escribirnos por
        WhatsApp o correo y entregarnos tus datos, nos autorizas de forma previa,
        expresa e informada a tratarlos para las finalidades anteriores. En la contratación de
        servicios, la autorización queda incluida en el acuerdo de servicio.
      </p>

      <h2>5. Información de los negocios de nuestros clientes</h2>
      <p>
        Cuando, para prestar el servicio, accedemos a bases de datos del cliente (por ejemplo, sus
        clientes o ventas), actuamos como <em>encargado del tratamiento</em>: usamos esa información
        solo para ejecutar el proyecto, con confidencialidad, sin compartirla con terceros y
        siguiendo las instrucciones del cliente, que sigue siendo el responsable.
      </p>

      <h2>6. Tus derechos</h2>
      <ul>
        <li>Conocer, actualizar y rectificar tus datos.</li>
        <li>Pedir prueba de la autorización que nos diste.</li>
        <li>Ser informado sobre el uso que damos a tus datos.</li>
        <li>Revocar la autorización o pedir que suprimamos tus datos, cuando no exista un deber legal o contractual de conservarlos.</li>
        <li>Acceder gratis a tus datos personales.</li>
        <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
      </ul>

      <h2>7. Cómo ejercer tus derechos</h2>
      <p>
        Escríbenos a <a href={`mailto:${EMAIL}`}>{EMAIL}</a> indicando tu nombre, tu solicitud y un
        medio de respuesta. Las <strong>consultas</strong> se responden en máximo 10 días hábiles
        (prorrogables 5 días hábiles más, avisándote el motivo). Los <strong>reclamos</strong> se
        atienden en máximo 15 días hábiles (prorrogables 8 días hábiles más, avisándote el motivo).
      </p>

      <h2>8. Seguridad y conservación</h2>
      <p>
        Guardamos la información en herramientas con control de acceso (Google Workspace) y solo el
        tiempo necesario para las finalidades descritas o para cumplir obligaciones legales,
        contables y tributarias.
      </p>

      <h2>9. Vigencia y cambios</h2>
      <p>
        Esta política rige desde su publicación. Si la cambiamos de forma sustancial, lo
        informaremos en este sitio.
      </p>
    </LegalLayout>
  );
}
