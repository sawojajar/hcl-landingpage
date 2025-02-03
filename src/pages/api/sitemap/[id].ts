import { NextApiRequest, NextApiResponse } from "next";
import { fetchProducts } from "@/modules/products/useProducts";

const CHUNK_SIZE = 500;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const pageIndex = parseInt(id as string, 10) - 1;

  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers["host"];
  const baseUrl = `${protocol}://${host}`;

  const totalPage = await fetchProducts({
    product: {
      action: "read",
      page: 1,
      pageSize: 10,
      path: "product_list",
    },
  }).then((res) => res.totalPage);

  // Fetch all products (could be optimized by fetching only needed pages)
  const products = await fetchProducts({
    product: {
      action: "read",
      page: 1,
      pageSize: (totalPage|| 0) * 10, // Get all products (alternative: fetch pages dynamically)
      path: "product_list",
    },
  }).then((res) => res.data);

  const totalChunks = Math.ceil(products.length / CHUNK_SIZE);

  if (isNaN(pageIndex) || pageIndex < 0 || pageIndex >= totalChunks) {
    return res.status(404).send("Not Found");
  }

  // Correct usage of chunk slicing
  const chunk = products.slice(pageIndex * CHUNK_SIZE, (pageIndex + 1) * CHUNK_SIZE);
  const sitemapContent = generateSitemap(chunk, baseUrl);

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemapContent);
}

// Generates an individual sitemap file
function generateSitemap(products: { id: string }[], baseUrl: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${products
      .map(
        (p) => `
        <url>
          <loc>${baseUrl}/product-detail/${p.id}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.8</priority>
        </url>`
      )
      .join("")}
  </urlset>`;
}
