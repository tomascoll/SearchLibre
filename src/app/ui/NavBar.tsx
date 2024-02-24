import Link from "next/link";
import Search from "./Search";

export default function NavBar() {
  return (
    <div className="relative flex flex-1 flex-shrink-0 px-10 py-3 bg-yellow-300 shadow-sm gap-5">
      <Search placeholder="Buscar productos, marcas y más..." />
      <Link href={`/`}>
        <h1 className="font-black text-blue-950 line-clamp-2 w-32 drop-shadow-sm md:block hidden">
          Buscador Libre 🤝
        </h1>
      </Link>
    </div>
  );
}
