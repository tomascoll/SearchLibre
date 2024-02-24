export async function getData({ search }: { search: string }) {
  const res = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?q=${search}&limit=5`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = res.json() as Promise<{
    results: {
      title: string;
      id: string;
      thumbnail: string;
      original_price: number;
      price: number;
      currency_id: string;
      official_store_name?: string;
      installments: {
        quantity: number;
        amount: number;
      };
      shipping: {
        free_shipping: boolean;
      };
    }[];
  }>;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
}

export async function getDataOne({ id }: { id: string }) {
  const res = await fetch(`https://api.mercadolibre.com/items/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  interface Pictures {
    id: string;
    url: string;
    secure_url: string;
    size: string;
    max_size: string;
    quality: string;
  }

  interface Attribute {
    id: string;
    name: string;
    value_name?: string;
  }

  const data = res.json() as Promise<{
    title: string;
    id: string;
    original_price: number;
    price: number;
    currency_id: string;
    shipping: {
      free_shipping: boolean;
    };
    pictures: Pictures[];
    seller_address: {
      city: {
        name: string;
      };
      state: {
        name: string;
      };
      country: {
        name: string;
      };
    };
    attributes: Attribute[];
  }>;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
}

export async function getDataOneDescription({ id }: { id: string }) {
  const res = await fetch(
    `https://api.mercadolibre.com/items/${id}/description`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = res.json() as Promise<{
    plain_text: string;
  }>;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
}
