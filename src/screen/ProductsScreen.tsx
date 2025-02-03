
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
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"
import { CaretDown, Star } from "@phosphor-icons/react"
import { useRouter } from "next/router"
import { useState } from "react"

// Mock data for filters
const filters = {
    "Jenis Pompa": ["Submersible", "Surface", "Booster"],
    "Sumber Daya": ["Listrik", "Solar", "Manual"],
    Spesifikasi: ["2 KL/h", "3 KL/h", "4 KL/h"],
    "Kondisi Medan": ["Normal", "Ekstrem", "Dalam Air"],
    Harga: ["< Rp200.000", "Rp200.000 - Rp500.000", "> Rp500.000"],
}

const sortOptions = ["Paling Populer", "Harga Tertinggi", "Harga Terendah", "Rating Tertinggi"]

// Mock product data
const products = Array(12)
    .fill(null)
    .map((_, i) => ({
        id: i + 1,
        name: `HCI Pump ${(i % 2) + 3}" ${2} KL/h`,
        price: 300000,
        rating: 4.8,
        reviews: 249,
        image: "/placeholder.svg?height=200&width=200",
    }))

export function ProductsScreen() {
    const [currentPage, setCurrentPage] = useState(1)
    const borderColor = useColorModeValue("gray.200", "gray.700")
    const router = useRouter()

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
                    {Object.entries(filters).map(([title, options]) => (
                        <Menu key={title}>
                            <MenuButton as={Button} rightIcon={<CaretDown />} variant="outline">
                                {title}
                            </MenuButton>
                            <MenuList>
                                {options.map((option) => (
                                    <MenuItem key={option}>{option}</MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    ))}

                    <Menu>
                        <MenuButton as={Button} rightIcon={<CaretDown />} variant="outline" ml={{ md: "auto" }}>
                            Urutkan: Paling Populer
                        </MenuButton>
                        <MenuList>
                            {sortOptions.map((option) => (
                                <MenuItem key={option}>{option}</MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                </Flex>

                {/* Results count */}
                <Text color="gray.600" mb={6}>
                    Menampilkan 1-16 dari 54 Produk
                </Text>

                {/* Product Grid */}
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
                            cursor='pointer'
                        >
                            <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                height="200px"
                                width="100%"
                                objectFit="contain"
                                p={4}
                            />
                            <Stack p={4} spacing={2}>
                                <Heading size="sm" fontWeight="semibold">
                                    {product.name}
                                </Heading>
                                <Text fontWeight="bold">Rp{product.price.toLocaleString("id-ID")}</Text>
                                <Flex align="center" gap={2}>
                                    <Flex>
                                        {Array(5)
                                            .fill("")
                                            .map((_, i) => (
                                                <Star
                                                    key={i}
                                                    weight={i < Math.floor(product.rating) ? "fill" : "regular"}
                                                    color={i < Math.floor(product.rating) ? "#FFB800" : "#CBD5E0"}
                                                />
                                            ))}
                                    </Flex>
                                    <Text color="gray.600">
                                        {product.rating} ({product.reviews})
                                    </Text>
                                </Flex>
                            </Stack>
                        </Box>
                    ))}
                </Grid>

                {/* Pagination */}
                <Flex justify="center" gap={2}>
                    <Button variant="outline" isDisabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                        Previous
                    </Button>
                    {[1, 2, 3, 4, 5].map((page) => (
                        <Button
                            key={page}
                            variant={currentPage === page ? "solid" : "outline"}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </Button>
                    ))}
                    <Button variant="outline" isDisabled={currentPage === 5} onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                    </Button>
                </Flex>
            </Container>
        </Box>
    )
}

