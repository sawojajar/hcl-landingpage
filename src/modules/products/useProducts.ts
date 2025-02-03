import { useQuery } from "react-query";
import axios from "axios";
import type {
  CategoryResponse,
  ProductsRequest,
  ProductsResponse,
} from "./ProductEntity";

const fetchProducts = async ({
  product,
}: {
  product: ProductsRequest;
}): Promise<ProductsResponse> => {
  const baseUrl =
    "https://script.google.com/macros/s/AKfycbyg3AjVIGsTbSPob91YFO5WiW4Fud5CyOhgxdv3FWTB3DpvZmtNX5586nFCVzTkyl-sAg/exec";

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

  const { data } = await axios.get(url);

  return {
    data: data.data,
    page: data.page,
    pageSize: data.pageSize,
  };
};

export const useProducts = (product: ProductsRequest) => {
  return useQuery({
    queryKey: ["products", product],
    queryFn: () => fetchProducts({ product: product }),
  });
};

const fetchProductById = async (
  productId: string
): Promise<ProductsResponse> => {
  const { data } = await axios.get(
    `https://script.google.com/macros/s/AKfycbzbEvbuEnKY1hKi_fmQ4K8avOScmKAYkTRze0tjvF78YgIVw7EyWIstdOhZ1ON25eEt/exec?path=product_list&action=read&page=1&pageSize=2&product_id=${productId}`
  );

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
  const { data } = await axios.get(
    "https://script.google.com/macros/s/AKfycbzbEvbuEnKY1hKi_fmQ4K8avOScmKAYkTRze0tjvF78YgIVw7EyWIstdOhZ1ON25eEt/exec?path=category&action=read"
  );

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
