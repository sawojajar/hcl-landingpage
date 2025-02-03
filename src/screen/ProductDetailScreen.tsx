"use client"

import { PurchaseForm } from "@/components/PurchaseFormModal"
import {
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react"

// Mock product data
const product = {
  name: 'HCI Pump 3" 2 KL/h',
  specs: ["0.16HP", "Box control", "Kabel 20 meter"],
  price: 399000,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
    amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
    et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.`,
  images: Array(4).fill("/assets/pump-asset.png?height=600&width=400"),
}

export function ProductDetailScreen() {
  const [selectedImage, setSelectedImage] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()

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
            <BreadcrumbLink href="/products/agriculture">Agrikultur</BreadcrumbLink>
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
                src={product.images[selectedImage] || "/assets/pump-asset.png"}
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
                    src={image || "/assets/pump-asset.png"}
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
                {product.specs.map((spec, index) => (
                  <Text key={index} color="gray.600" px={3} py={1} borderRadius="full" bg="gray.100">
                    {spec}
                  </Text>
                ))}
              </Flex>
              <Heading size="lg" color="green.600">
                Rp {product.price.toLocaleString("id-ID")}
              </Heading>
            </Box>

            <Tabs isFitted colorScheme='green'>
              <TabList >
                <Tab>Detail</Tab>
                <Tab>Spesifikasi</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Stack spacing={4}>
                    <Heading size="md">Tentang Produk</Heading>
                    <Text color="gray.600">{product.description}</Text>
                    <Text color="gray.600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Stack spacing={4}>
                    <Box>
                      <Text fontWeight="bold">Power</Text>
                      <Text color="gray.600">0.16HP</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Control System</Text>
                      <Text color="gray.600">Box control</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Cable Length</Text>
                      <Text color="gray.600">Kabel 20 meter</Text>
                    </Box>
                  </Stack>
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
      <PurchaseForm isOpen={isOpen} onClose={onClose} onSubmit={(e)=>console.log(e)} isSubmitting={false} />
    </Box>
  )
}

