"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString().toLocaleLowerCase()}`);
  }, 300);

  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <svg
        className="absolute text-gray-400 h-[38px] w-5 ml-3 mt-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          // fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          // clip-rule="evenodd"
        />
      </svg>
      <input
        className="peer block shadow-sm w-full py-[9px] pl-10 text-sm placeholder:text-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("search")?.toString()}
      />
    </>
  );
}
