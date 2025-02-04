"use client"

import { PurchaseForm } from "@/components/PurchaseFormModal"
import { fetchProductById, useProductById } from "@/modules/products/useProducts"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Package } from "@phosphor-icons/react/dist/csr/Package"
import getConfig from "next/config"
import { Metadata } from "next"
import { generateMetadataUtils } from "@/utils/metadata"

const { publicRuntimeConfig } = getConfig();

type FormValue = {
  ownerName: string;
  storeName: string;
  address: string;
  purpose: string;
  phoneNumber: string;
};
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await fetchProductById(params.id);

  return generateMetadataUtils({
    title: `${product.data[0].name} | HCL Pump`,
    description: product.data[0].description,
    // todo: change this to the actual product detail page
    url: `${publicRuntimeConfig.baseUrl}/product-detail/${params.id}`,
    image: product.data[0].images[0].image_url,
    type: "product",
  });
}

export function ProductDetailScreen() {
  const [selectedImage, setSelectedImage] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const params = useParams()
  const id = params?.productId as string

  const toast = useToast();

  const { data, isLoading, isError } = useProductById(id)

  const product = data?.data[0]
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: FormValue) => {
    setIsSubmitting(true)
    try {
      const adminWhatsApp = publicRuntimeConfig.adminWhatsAppNumber;
      const chatFormat = publicRuntimeConfig.adminWhatsAppChatFormat;

      if (!adminWhatsApp || !chatFormat) {
        throw new Error("WhatsApp configuration is missing");
      }

      const message = chatFormat
        .replace("{ownerName}", data.ownerName)
        .replace("{storeName}", data.storeName)
        .replace("{address}", data.address)
        .replace("{purpose}", data.purpose)
        .replace("{phoneNumber}", data.phoneNumber);

      const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, "_blank");
      toast({
        title: "Form submitted",
        description:
          "You will be redirected to WhatsApp to continue the conversation.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to redirect to WhatsApp. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Box minH="100vh" pt={16}>
        <Container maxW="7xl" py={8}>
          <Stack spacing={8}>
            <Skeleton height="20px" width="50%" />
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
              <Skeleton height="400px" />
              <Stack spacing={4}>
                <Skeleton height="40px" width="70%" />
                <Skeleton height="20px" width="50%" />
                <Skeleton height="30px" width="40%" />
                <Skeleton height="200px" />
                <Skeleton height="50px" width="200px" />
              </Stack>
            </Grid>
          </Stack>
        </Container>
      </Box>
    )
  }

  if (isError) {
    return (
      <Box minH="100vh" pt={16}>
        <Container maxW="7xl" py={8}>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>Terjadi kesalahan saat memuat detail produk. Silakan coba lagi nanti.</AlertDescription>
          </Alert>
        </Container>
      </Box>
    )
  }

  if (!product) {
    return (
      <Box minH="100vh" pt={16}>
        <Container maxW="7xl" py={8}>
          <Box textAlign="center" py={10} px={6}>
            <Package size={50} weight="thin" />
            <Heading as="h2" size="xl" mt={6} mb={2}>
              Produk Tidak Ditemukan
            </Heading>
            <Text color="gray.500">
              Maaf, kami tidak dapat menemukan produk yang Anda cari. Silakan periksa kembali ID produk atau kembali ke
              halaman produk.
            </Text>
          </Box>
        </Container>
      </Box>
    )
  }

  return (
    <Box minH="100vh" pt={16}>
      <Container maxW="7xl" py={8}>
        {/* Breadcrumb */}
        <Breadcrumb mb={8}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Produk</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products/${product.category}`}>{product.category}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
          {/* Product Images */}
          <Stack spacing={4}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" p={4}>
              <Image
                src={product.images[selectedImage]?.image_url || "/assets/pump-asset.png"}
                alt={product.name}
                width="100%"
                height="auto"
                objectFit="contain"
              />
            </Box>
            <Flex gap={4} overflowX="auto" py={2}>
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  cursor="pointer"
                  borderColor={selectedImage === index ? "green.500" : "gray.200"}
                  onClick={() => setSelectedImage(index)}
                  flexShrink={0}
                >
                  <Image
                    src={image.image_url || "/assets/pump-asset.png"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width="100px"
                    height="100px"
                    objectFit="contain"
                    p={2}
                  />
                </Box>
              ))}
            </Flex>
          </Stack>

          {/* Product Info */}
          <Stack spacing={6}>
            <Box>
              <Heading size="lg" mb={4}>
                {product.name}
              </Heading>
              <Flex gap={4} mb={4}>
                {/* {product.specification.split(",").map((spec, index) => (
                  <Text key={index} color="gray.600" px={3} py={1} borderRadius="full" bg="gray.100">
                    {spec.trim()}
                  </Text>
                ))} */}
              </Flex>
              {/* <Heading size="lg" color="green.600">
                Rp{" "}
                {Number.parseInt(product.specification.split("Rp")[1].split(",")[0].replace(/\./g, "")).toLocaleString(
                  "id-ID",
                )}
              </Heading> */}
            </Box>

            <Tabs isFitted colorScheme="green">
              <TabList>
                <Tab>Detail</Tab>
                <Tab>Spesifikasi</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Stack spacing={4}>
                    <Heading size="md">Tentang Produk</Heading>
                    <Text color="gray.600">{product.description}</Text>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Stack spacing={4}>
                    {/* NOTE: use this section if spec want to be splitted */}
                    {/* {product.specification.split(",").map((spec, index) => (
                      <Box key={index}>
                        <Text fontWeight="bold">{spec.split(":")[0].trim()}</Text>
                        <Text color="gray.600">{spec.split(":")[1].trim()}</Text>
                      </Box>
                    ))} */}
                        {/* <Text fontWeight="bold">{spec.split(":")[0].trim()}</Text> */}
                        <Text color="gray.600">{product.specification}</Text>
F                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Button size="lg" colorScheme="green" onClick={onOpen}>
              Beli Sekarang
            </Button>
          </Stack>
        </Grid>
      </Container>

      {/* Purchase Form Modal */}
      <PurchaseForm isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </Box>
  )
}

