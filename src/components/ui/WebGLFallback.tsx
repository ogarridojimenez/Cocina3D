"use client";

export function WebGLFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#1a1a2e] p-8 text-center">
      <div className="max-w-md rounded-lg border border-gray-700 bg-gray-900 p-8">
        <h2 className="mb-4 text-xl font-bold text-white">
          WebGL no disponible
        </h2>
        <p className="mb-6 text-gray-400">
          Tu navegador no soporta WebGL, que es necesario para el editor 3D.
          Por favor, actualiza a un navegador moderno:
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.google.com/chrome/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Chrome
          </a>
          <a
            href="https://www.mozilla.org/firefox/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            Firefox
          </a>
          <a
            href="https://www.microsoft.com/edge/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Edge
          </a>
        </div>
      </div>
    </div>
  );
}
