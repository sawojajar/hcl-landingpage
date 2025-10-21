import { useQuery } from "react-query";
import type {
  CategoryResponse,
  ProductsRequest,
  ProductsResponse,
} from "./ProductEntity";
const baseUrl = typeof window !== 'undefined' 
  ? "/api/sheets" 
  : `${process.env.BASE_URL || 'http://localhost:3000'}/api/sheets`;

export const fetchProducts = async ({
  product,
}: {
  product: ProductsRequest;
}): Promise<ProductsResponse> => {
  

  const params: Record<string, string> = {};
  if (product.path) params.path = product.path;
  if (product.action) params.action = product.action;
  if (product.page) params.page = product.page.toString();
  if (product.pageSize) params.pageSize = product.pageSize.toString();
  if (product.productCategory) {
    params.product_category = product.productCategory;
  } else {
    params.withImage = "true";
  }

  const queryString = new URLSearchParams(params).toString();
  const url = `${baseUrl}?${queryString}`;

  console.log("url", url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await response.json()

  return {
    data: data.data,
    page: data.page,
    pageSize: data.pageSize,
    totalPage: data.totalPage,
  };
};

export const useProducts = (product: ProductsRequest) => {
  return useQuery({
    queryKey: ["products", product],
    queryFn: () => fetchProducts({ product: product }),
  });
};

export const fetchProductById = async (
  productId: string
): Promise<ProductsResponse> => {

  const url = `${baseUrl}?path=product_list&action=read&page=1&pageSize=2&product_id=${productId}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await response.json()

  return {
    data: data.data,
    page: data.page,
    pageSize: data.pageSize,
  };
};

export const useProductById = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
  });
};

const fetchCategories = async (): Promise<CategoryResponse> => {
  const url = `${baseUrl}?path=category&action=read`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await response.json()

  return {
    data: data.data,
    page: data.page,
    pageSize: data.pageSize,
  };
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
