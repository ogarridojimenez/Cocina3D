import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1a1a2e] text-white">
      <h1 className="mb-4 text-5xl font-bold tracking-tight">Cocina3D</h1>
      <p className="mb-8 text-lg text-gray-400">
        Diseñador 3D de cocinas profesional
      </p>
      <Link
        href="/editor"
        className="rounded-lg bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-600"
      >
        Ir al editor
      </Link>
    </main>
  );
}
