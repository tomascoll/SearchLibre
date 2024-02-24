import { getDataOne, getDataOneDescription } from "@/app/lib/data";
import Img from "@/app/ui/Img";

export default async function ProductoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const producto = await getDataOne({ id });
  const productoDescription = await getDataOneDescription({ id });

  return (
    <div className="sm:my-6 sm:mx-10 mx-0 my-0 bg-white  md:p-6 p-3 flex-wrap grid lg:grid-cols-2 shadow-md">
      <Img producto={producto.pictures} />

      <div className="mt-20">
        <div>
          <p className="text-neutral-700 text-sm">
            {producto.seller_address.country.name} /{" "}
            {producto.seller_address.state.name} /{" "}
            {producto.seller_address.city.name}
          </p>
          <h1 className="font-semibold text-2xl">{producto.title}</h1>
          {producto?.original_price ? (
            <p className="text-neutral-600 line-through my-auto text-lg">
              {Number(producto.original_price).toLocaleString("es-AR", {
                style: "currency",
                currency: producto.currency_id,
              })}
            </p>
          ) : (
            ""
          )}
          <div className="flex flex-row gap-1">
            <p className="text-3xl">
              {Number(producto.price).toLocaleString("es-AR", {
                style: "currency",
                currency: producto.currency_id,
              })}
            </p>
            {producto?.original_price ? (
              <p className="my-auto text-emerald-500 text-lg">
                {Number(
                  ((producto.original_price - producto.price) /
                    producto.original_price) *
                    100
                ).toFixed()}
                % OFF
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="divide-y-2">
          <div className="flex flex-col gap-2 py-5">
            <button className="bg-blue-500 border text-white p-3 lg:w-1/3 rounded-lg font-medium hover:bg-blue-700 ease-in duration-100">
              Comprar ahora
            </button>
            <button className="bg-blue-100 border text-blue-500 p-3 lg:w-1/3 rounded-lg font-medium hover:bg-blue-200 ease-in duration-100">
              Agregar al carrito
            </button>
          </div>
          <div className="my-6">
            <h2 className="font-medium text-2xl text-neutral-800 my-6">
              Características
            </h2>
            <table className="table-auto my-5">
              <tbody>
                {producto.attributes.map((img, index) => (
                  <tr
                    className="odd:bg-neutral-100 even:bg-neutral-50 border"
                    key={index}
                  >
                    {producto.attributes[index].value_name === null ? (
                      ""
                    ) : (
                      <>
                        <td className="p-4 w-1/2 text-sm break-words">
                          {producto.attributes[index].name}
                        </td>
                        <td className="p-4 w-1/2 text-sm break-words">
                          {producto.attributes[index].value_name}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="font-medium text-2xl text-neutral-800 mt-6">
              Descripción
            </h2>
            <p className="py-5 text-balance max-w-[1000px] whitespace-pre">
              {productoDescription.plain_text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
