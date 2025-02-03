type Image = {
  product_id: string;
  image_url: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  specification: string;
  images: Image[];
  imageAspectRatio?: number;
  maxImageWidth?: string;
  maxImageHeight?: string;
};

type ProductsResponse = {
  data: Product[];
  page: number;
  pageSize: number;
  totalPage?: number;
};

type ProductsRequest = {
  path: string;
  page: number;
  pageSize: number;
  action: string;
  productCategory?: string;
};

type Category = {
  name: string;
};

type CategoryResponse = {
  data: Category[];
  page: number;
  pageSize: number;
};

export type { Product, ProductsResponse, ProductsRequest, CategoryResponse };
