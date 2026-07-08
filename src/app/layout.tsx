import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Cocina3D - Diseñador 3D de Cocinas",
  description:
    "Diseña cocinas profesionales en 3D con medidas reales. Arrastra objetos, crea paredes, visualiza en tiempo real.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
