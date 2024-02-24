import Link from "next/link";
import { getData } from "@/app/lib/data";

export default async function Table({ search }: { search: string }) {
  const { results } = await getData({ search });

  return (
    <ul className="flex flex-col divide-y-2 bg-white mx-10 my-5 shadow-md">
      {results?.map((product) => (
        <Link key={product.id} href={`/productos/${product.id}`}>
          <div className="flex flex-row py-5 p-6 flex-wrap">
            <img
              loading="lazy"
              src={product.thumbnail}
              alt={product.title}
              className="object-contain  h-[150px] w-[150px] mr-5"
            />
            <div>
              <li key={product.id}>{product.title}</li>

              {product.official_store_name ? (
                <p className="text-xs text-neutral-500">
                  Por {product.official_store_name}
                </p>
              ) : (
                ""
              )}

              <div className="my-2">
                {product?.original_price ? (
                  <p className="text-neutral-600 line-through my-auto text-xs">
                    {Number(product.original_price).toLocaleString("es-AR", {
                      style: "currency",
                      currency: product.currency_id,
                    })}
                  </p>
                ) : (
                  ""
                )}

                <div className="flex flex-row gap-1">
                  <p className="text-lg font-medium">
                    {Number(product.price).toLocaleString("es-AR", {
                      style: "currency",
                      currency: product.currency_id,
                    })}
                  </p>

                  {product?.original_price ? (
                    <p className="my-auto text-emerald-500 text-sm font-medium">
                      {Number(
                        ((product.original_price - product.price) /
                          product.original_price) *
                          100
                      ).toFixed()}
                      % OFF
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                {product?.installments ? (
                  <>
                    <p className="text-emerald-500  text-sm">{`${
                      product?.installments.quantity
                    } cuotas de ${Number(
                      product.installments.amount
                    ).toLocaleString("es-AR", {
                      style: "currency",
                      currency: product.currency_id,
                    })}`}</p>
                  </>
                ) : (
                  ""
                )}

                {product?.shipping.free_shipping && (
                  <p className="mt-2 text-emerald-500 text-sm font-medium ">
                    Envio Gratis
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
}
