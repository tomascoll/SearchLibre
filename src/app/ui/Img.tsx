"use client";

import { useRouter } from "next/navigation";

interface Pictures {
  id: string;
  url: string;
  secure_url: string;
  size: string;
  max_size: string;
  quality: string;
}

export default function Img({ producto }: { producto: Pictures[] }) {
  const router = useRouter();

  function cambiarSrc() {
    const imagenClickeada = event?.target as HTMLImageElement;

    const nuevaSrc = imagenClickeada.src;

    const imagenPrincipal = document.getElementById(
      "imagen"
    ) as HTMLImageElement;

    if (imagenPrincipal) {
      imagenPrincipal.src = nuevaSrc;
    }
  }

  return (
    <div>
      <button
        onClick={() => router.back()}
        className=" hover:bg-neutral-50 rounded-full h-min px-3 py-2 m-1 text-2xl font-medium"
      >
        ←
      </button>
      <div className="flex lg:flex-row flex-col">
        <div className="flex lg:flex-col flex-row lg:w-12 w-full flex-wrap lg:mt-10 gap-1">
          {producto.slice(0, 7).map((img, index) => (
            <button
              autoFocus={index === 0}
              key={img.id}
              className="h-14 w-14 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 hover:border-blue-500 hover:border-2"
            >
              <img
                onClick={() => cambiarSrc()}
                loading="lazy"
                key={img.id}
                src={img.url}
                alt={`Imagen ${index + 1}`}
                className="h-12 w-12 bg-white m-auto object-contain"
              />
            </button>
          ))}
        </div>
        <div className="flex flex-row h-min mx-auto flex-wrap-reverse max-w-1/2 gap-1">
          <img
            loading="lazy"
            id="imagen"
            src={producto?.[0].url}
            className="object-contain bg-white lg:m-auto lg:mt-10 mt-5 h-1/2 w-full"
          />
        </div>
      </div>
    </div>
  );
}
