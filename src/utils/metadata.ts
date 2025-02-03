type MetadataProps = {
    title?: string;
    description?: string;
    url: string;
    image?: string;
    type?: "website" | "article" | "product";
  };
  
  export function generateMetadataUtils({
    title = "HCL Pump - Pompa Air Terbaik untuk Kebutuhan Andae",
    description = "Mengalir Tanpa Henti, Menghubungkan Indonesia dengan solusi pompa yang andal, tahan lama, dan inovatif untuk berbagai aplikasi, dari irigasi hingga pengolahan air limbah sejak 2019.",
    url,
    image = "/assets/logo.png",
    type = "website",
  }: MetadataProps) {
    return {
      title,
      description,
      openGraph: {
        type,
        url,
        title,
        description,
        images: [{ url: image }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  }
  