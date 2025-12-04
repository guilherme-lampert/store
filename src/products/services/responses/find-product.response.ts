interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
}

export interface FindProductsApiResponse {
  products: Product[];
}

export class FindProductResponse {
  id: number;
  title: string;
  price: number;
  stock: number;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.stock = product.stock;
  }

  static fromList({ products }: FindProductsApiResponse) {
    return products.map((product) => new FindProductResponse(product));
  }
}
