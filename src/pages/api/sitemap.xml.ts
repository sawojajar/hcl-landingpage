import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

const CHUNK_SIZE = 500; // Number of products per sitemap file

const {publicRuntimeConfig} = getConfig()

// Direct function to fetch products without going through API
async function fetchProductsDirect() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/api/sheets?path=product_list&action=read&page=1&pageSize=1000&withImage=true`;
  
  console.log("Fetching products from:", url);
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const baseUrl = `${publicRuntimeConfig.baseUrl}`;
    
    // Fetch products directly from Google Sheets API
    const productsData = await fetchProductsDirect();
    
    if (!productsData || !productsData.data || productsData.data.length === 0) {
      console.error("No products data received:", productsData);
      res.status(500).json({ error: "No products data" });
      return;
    }

    const products = productsData.data;
    const totalChunks = Math.ceil(products.length / CHUNK_SIZE);
    const sitemaps = [];

    for (let i = 0; i < totalChunks; i++) {
      sitemaps.push(`sitemap/${i + 1}.xml`);
    }

    // Generate a sitemap index referencing all sub-sitemaps
    const indexXml = generateSitemapIndex(sitemaps, baseUrl);
    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(indexXml);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).json({ 
      error: "Failed to generate sitemap",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
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
