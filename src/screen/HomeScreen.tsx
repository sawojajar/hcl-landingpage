import Head from 'next/head'
import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    HStack,
    Icon,
    Image,
    Stack,
    Text,
    VStack,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Skeleton,
    Alert,
    AlertIcon
} from "@chakra-ui/react"
import { Star } from '@phosphor-icons/react'
import Link from 'next/link'
import { useCategories, useProducts } from '@/modules/products/useProducts';
import { useState } from 'react';
import getConfig from 'next/config';

export function HomeScreen() {
    const { publicRuntimeConfig } = getConfig();
    const [category, setCategory] = useState(publicRuntimeConfig.firstCategory);
    const { data, isLoading, isError } = useProducts({
        action: "read",
        page: 1,
        pageSize: 10,
        path: "product_list",
        productCategory: category
    },);
    const { data: categories, isLoading: isLoadingcategory } = useCategories();
    return (
        <>
            <Head>
                <title>HCL Pump</title>
                <meta name="description" content="HCL Pump" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box minH="100vh">
                {/* Hero Section */}
                <Box position="relative" h="800px">
                    <Image
                        src="/assets/hero.png"
                        alt="Hero background"
                        objectFit="cover"
                        filter="brightness(0.5)"
                        w="full"
                        h="full"
                    />
                    <Flex
                        position="absolute"
                        inset={0}
                        align="center"
                        justify="center"
                        direction="column"
                        textAlign="center"
                        color="white"
                        px={4}
                    >
                        <Heading as="h1" size={{ base: "xl", md: "2xl" }} maxW="3xl" mb={4} lineHeight="tight">
                            HCL Pump: Pompa Air Berkinerja Tinggi untuk Rumah & Industri
                        </Heading>
                        <Text maxW="2xl" mb={8} fontSize={{ base: "sm", md: "md" }}>
                            Mengutamakan kekuatan dengan sesat pompa yang efisien, hemat biaya, dan handal untuk berbagai aplikasi dari
                            tinggi penggunaan air untuk tahun 2018
                        </Text>
                        <Link href="/products">
                            <Button colorScheme="green">Jelajahi Produk</Button>
                        </Link>
                    </Flex>
                </Box>

                {/* Product Section */}
                <Box py={16}>
                    <Container maxW="7xl">
                        <Stack spacing={8} align="center" textAlign="center">
                            <Box>
                                <Heading as="h2" size="xl" mb={2}>
                                    Produk Pilihan untuk Kebutuhan Anda
                                </Heading>
                                <Text color="gray.600">
                                    Kami menawarkan berbagai pompa untuk kebutuhan agrikultur, komersial, dan rumah tangga
                                </Text>
                            </Box>
                            <Tabs isFitted width='100%' colorScheme='green'>
                                <TabList>
                                    {isLoadingcategory && [1, 2, 3].map((_, index) => (
                                        <Box key={index} borderRadius="lg" p={6}>
                                            <Flex direction="column" align="center">
                                                <Skeleton width="400px" height="20px" mb={4} />
                                            </Flex>
                                        </Box>
                                    ))}
                                    {categories?.data.slice(0, 3).map((category, i) => (
                                        <Tab key={i} onClick={() => setCategory(category.name)}>{category.name}</Tab>
                                    ))}
                                </TabList>

                                <TabPanels>
                                    {isLoading ? (
                                        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="full">
                                            {[1, 2, 3].map((_, index) => (
                                                <Box key={index} borderWidth={1} borderRadius="lg" p={6}>
                                                    <Flex direction="column" align="center">
                                                        <Skeleton width="200px" height="300px" mb={4} />
                                                        <Skeleton height="20px" width="150px" mb={2} />
                                                        <Skeleton height="16px" width="120px" mb={2} />
                                                    </Flex>
                                                </Box>
                                            ))}
                                        </Grid>
                                    ) : isError ? (
                                        <Alert status="error">
                                            <AlertIcon />
                                            Terjadi Kesalahan saat memuat produk. Silakan coba lagi nanti.
                                        </Alert>) : categories?.data.slice(0, 3).map((_c, i) => (
                                            <TabPanel key={i}>
                                                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="full">
                                                    {data?.data.slice(0, 3).map((product, i) => (
                                                        <Link key={i} href={`/product-detail/${product.id}`}>

                                                            <Box key={i} borderWidth={1} borderRadius="lg" p={6}>
                                                                <Flex direction="column" align="center">
                                                                    <Image src="/assets/pump-asset.png" alt="Pump" w="200px" h="300px" objectFit="contain" mb={4} />
                                                                    <Heading as="h3" size="md" mb={2}>
                                                                        {product.category}
                                                                    </Heading>
                                                                    <Text mb={2}>{product.name}</Text>
                                                                    {/* <Flex align="center" mb={4}>
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Icon key={star} as={Star} color="yellow.400" fill="yellow.400" boxSize={4} />
                                                            ))}
                                                            <Text ml={2} fontSize="sm" color="gray.600">
                                                                4.8 (120)
                                                            </Text>
                                                        </Flex> */}
                                                                </Flex>
                                                            </Box>
                                                        </Link>
                                                    ))}

                                                </Grid>
                                            </TabPanel>
                                        ))}

                                </TabPanels>
                            </Tabs>
                            <Link href="/products">
                                <Button backgroundColor='green.700' color='white'>
                                    Lihat Semua Produk
                                </Button>
                            </Link>

                        </Stack>
                    </Container>
                </Box>

                {/* Features Section */}
                <Box bg="green.700" py={16}>
                    <Container maxW="7xl">
                        <Stack spacing={12} color="white">
                            <Box textAlign="center">
                                <Heading as="h2" size="xl" mb={2}>
                                    Mengapa Memilih Produk Kami?
                                </Heading>
                                <Text>Temukan alasan mengapa produk kami menjadi pilihan terpercaya bagi kebutuhan Anda</Text>
                            </Box>

                            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                                {[
                                    {
                                        title: "Tahan Lama",
                                        description: "Dirancang untuk bertahan di lingkungan berat dengan performa maksimal",
                                    },
                                    {
                                        title: "Efisien",
                                        description: "Teknologi hemat energi yang memberikan hasil maksimal tanpa pemborosan listrik",
                                    },
                                    {
                                        title: "Terjamin",
                                        description: "Didukung oleh garansi 5 tahun yang memberikan rasa tenang pada setiap pelanggan",
                                    },
                                ].map((feature, i) => (
                                    <Box key={i} bg="green.600" p={6} borderRadius="lg">
                                        <Heading as="h3" size="md" mb={2}>
                                            {feature.title}
                                        </Heading>
                                        <Text fontSize="sm">{feature.description}</Text>
                                    </Box>
                                ))}
                            </Grid>
                        </Stack>
                    </Container>
                </Box>

                {/* About Section */}
                <Box py={16}>
                    <Container maxW="7xl" alignItems='center'>
                        <VStack spacing={8}>
                            <Box position="relative" h={{ base: "300px", md: "auto" }}>
                                <Image src="/assets/hero.png" alt="Team" objectFit="cover" borderRadius="lg" w="full" h="full" />
                            </Box>
                            <HStack spacing={8} display='flex' flexWrap={{ base: 'wrap', md: 'unset' }}>
                                <Stack spacing={4} width={{ base: 'unset', md: '50%' }}>
                                    <Heading as="h2" size="xl">
                                        Tentang HCL Pump Indonesia
                                    </Heading>
                                </Stack>
                                <Stack spacing={4}>
                                    <Text color="gray.600">
                                        HCL Pump Indonesia adalah pelopor teknologi dalam industri pompa berkualitas tinggi, yang berfokus pada
                                        pompa air, minyak, sumur, dan berbagai karya untuk berbagai aplikasi industri dan rumah tangga.
                                    </Text>
                                    <Text color="gray.600">
                                        Sejak berdiri pada tahun 2018, produk kami berhasil digunakan di berbagai perusahaan dan rumah tangga di
                                        seluruh Indonesia. Kami selalu memastik kualitas di setiap produk, pengiriman air efisien dan pelayanan
                                        air serta layanan aplikasi terbaik.
                                    </Text>
                                    <Link href="/about-us">
                                        <Button colorScheme="green" alignSelf="flex-start">
                                            Selengkapnya
                                        </Button>
                                    </Link>
                                </Stack>
                            </HStack>
                        </VStack>

                    </Container>
                </Box>

                {/* CTA Section */}
                <Box bg="primary.900" py={16} color="white" bgGradient='linear(to-t, #04351B, #032312)'>
                    <Container maxW="7xl" textAlign="center">
                        <Heading as="h2" size="xl" mb={4}>
                            Diskusikan Kebutuhan Anda dengan Ahli Kami
                        </Heading>
                        <Link href="/contact-us">
                            <Button variant="outline" color="white" _hover={{ bg: "primary.800" }}>
                                Hubungi Kami
                            </Button>
                        </Link>
                    </Container>
                </Box>
            </Box>
        </>
    )
}
