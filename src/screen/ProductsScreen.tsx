import type { Product } from "@/modules/products/ProductEntity"
import { useCategories, useProducts } from "@/modules/products/useProducts"
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
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Skeleton,
    Stack,
    Text,
    useColorModeValue,
    SkeletonText,
} from "@chakra-ui/react"
import { CaretDown } from "@phosphor-icons/react/dist/csr/CaretDown"
import { Package } from "@phosphor-icons/react/dist/csr/Package"
import { useRouter } from "next/navigation"
import { useState } from "react"

const EmptyState = () => (
    <Box textAlign="center" py={10} px={6}>
        <Package size={50} weight="thin" />
        <Heading as="h2" size="xl" mt={6} mb={2}>
            Tidak ada produk ditemukan
        </Heading>
        <Text color="gray.500">
            Maaf, kami tidak dapat menemukan produk yang sesuai dengan kriteria Anda. Silakan coba filter yang berbeda.
        </Text>
    </Box>
)

export function ProductsScreen() {
    const [currentPage, setCurrentPage] = useState(1)
    const borderColor = useColorModeValue("gray.200", "gray.700")
    const router = useRouter()
    const [category, setCategory] = useState<string | undefined>("")
    const pageSize = 10
    const { data, isLoading, isError, refetch } = useProducts({
        action: "read",
        page: currentPage,
        pageSize: pageSize,
        path: "product_list",
        productCategory: category,
    })

    const products: Product[] = data?.data || []
    const totalProducts = (data?.page || 0) * (data?.pageSize || 0)
    const totalPages = data?.totalPage || 1

    const handleApplyFilter = (value: string | undefined) => {
        setCategory(value)
        setCurrentPage(1)
        refetch()
    }

    const { data: categories, isLoading: isLoadingCatagory } = useCategories();

    return (
        <Box minH="100vh" pt={16}>
            <Container maxW="7xl" py={8}>
                {/* Breadcrumb */}
                <Breadcrumb mb={6}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="/products">Produk</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                {/* Filters */}
                <Flex direction={{ base: "column", md: "row" }} gap={4} mb={6} flexWrap="wrap">
                    <Menu key={'category'}>
                        <MenuButton as={Button} rightIcon={<CaretDown />} variant="outline">
                            Katagori
                        </MenuButton>
                        {isLoadingCatagory ? (
                            <SkeletonText mt="4" noOfLines={4} spacing="4" />
                        ) : (<MenuList>
                            {categories?.data.map((option) => (

                                <MenuItem key={option.name} onClick={() => handleApplyFilter(option.name)}>
                                    {option.name}
                                </MenuItem>
                            ))}
                            <MenuItem key='all' onClick={() => handleApplyFilter(undefined)}>
                                Semua Kategori
                            </MenuItem>
                        </MenuList>
                        )}
                    </Menu>
                </Flex>

                {isError ? (
                    <Alert status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>Error!</AlertTitle>
                        <AlertDescription>Terjadi kesalahan saat memuat produk. Silakan coba lagi nanti.</AlertDescription>
                    </Alert>
                ) : (
                    <>
                        {/* Results count */}
                        <Text color="gray.600" mb={6}>
                            Menampilkan {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalProducts)} dari{" "}
                            {totalProducts} Produk
                        </Text>

                        {/* Product Grid */}
                        {isLoading ? (
                            <Grid
                                templateColumns={{
                                    base: "1fr",
                                    sm: "repeat(2, 1fr)",
                                    lg: "repeat(4, 1fr)",
                                }}
                                gap={6}
                                mb={8}
                            >
                                {Array(pageSize)
                                    .fill(0)
                                    .map((_, index) => (
                                        <Box key={index} borderWidth="1px" borderColor={borderColor} borderRadius="lg" overflow="hidden">
                                            <Skeleton height="200px" />
                                            <Stack p={4} spacing={2}>
                                                <Skeleton height="20px" width="80%" />
                                                <Skeleton height="20px" width="60%" />
                                                <Skeleton height="20px" width="40%" />
                                            </Stack>
                                        </Box>
                                    ))}
                            </Grid>
                        ) : products.length > 0 ? (
                            <Grid
                                templateColumns={{
                                    base: "1fr",
                                    sm: "repeat(2, 1fr)",
                                    lg: "repeat(4, 1fr)",
                                }}
                                gap={6}
                                mb={8}
                            >
                                {products.map((product) => (
                                    <Box
                                        key={product.id}
                                        borderWidth="1px"
                                        borderColor={borderColor}
                                        borderRadius="lg"
                                        overflow="hidden"
                                        _hover={{ shadow: "md" }}
                                        onClick={() => router.push(`/product-detail/${product.id}`)}
                                        cursor="pointer"
                                    >
                                        <Image
                                            src={product.images[0]?.image_url || "/assets/pump-asset.png"}
                                            alt={product.name}
                                            height="200px"
                                            width="100%"
                                            objectFit="contain"
                                            p={4}
                                        />
                                        <Stack p={4} spacing={2}>
                                            <Heading size="sm" fontWeight="semibold" textAlign='center'>
                                                {product.name}
                                            </Heading>
                                        </Stack>
                                    </Box>
                                ))}
                            </Grid>
                        ) : (
                            <EmptyState />
                        )}

                        {/* Pagination */}
                        {products.length > 0 && (
                            <Flex justify="center" gap={2}>
                                <Button
                                    variant="outline"
                                    isDisabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Previous
                                </Button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <Button
                                        key={index}
                                        variant={currentPage === index + 1 ? "solid" : "outline"}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline"
                                    isDisabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </Button>
                            </Flex>
                        )}
                    </>
                )}
            </Container>
        </Box>
    )
}

