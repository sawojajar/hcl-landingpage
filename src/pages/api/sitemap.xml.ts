import { NextApiRequest, NextApiResponse } from "next";
import { fetchProducts } from "@/modules/products/useProducts";

const CHUNK_SIZE = 500; // Number of products per sitemap file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  const products = await fetchProducts({
    product: {
      action: "read",
      page: 1,
      pageSize: (totalPage|| 0) * 10, // Fetch all at once
      path: "product_list",
    },
  }).then((res) => res.data);

  const totalChunks = Math.ceil(products.length / CHUNK_SIZE);
  const sitemaps = [];

  for (let i = 0; i < totalChunks; i++) {
    sitemaps.push(`sitemap/${i + 1}.xml`);
  }

  // Generate a sitemap index referencing all sub-sitemaps
  const indexXml = generateSitemapIndex(sitemaps, baseUrl);
  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(indexXml);
}

// Generates the sitemap index file
function generateSitemapIndex(files: string[], baseUrl: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${files
      .map(
        (file) => `
        <sitemap>
          <loc>${baseUrl}/${file}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>`
      )
      .join("")}
  </sitemapindex>`;
}
