import { Suspense } from "react";
import Table from "./ui/Table";
import NavBar from "./ui/NavBar";
import { TableSkeleton } from "./ui/Skeletons";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  const search = searchParams?.search || "";

  return (
    <main>
      <NavBar />
      <Suspense key={searchParams?.search} fallback={<TableSkeleton />}>
        <Table search={search} />
      </Suspense>
    </main>
  );
}
