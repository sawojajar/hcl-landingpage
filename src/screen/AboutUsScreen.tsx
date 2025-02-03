"use client"

import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    HStack,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"
import { Shield, Globe, CurrencyDollar, Rocket } from "@phosphor-icons/react"

export function AboutUsScreen() {
    const bgGreen = useColorModeValue("green.700", "green.800")
    const lightBg = useColorModeValue("gray.50", "gray.900")

    return (
        <Box>
            {/* Hero Section */}
            <Box as="section" pt={28} width='100%' gap={16} display='flex' flexDir='column'>
                <Container maxW="7xl" display='flex'>
                    <Stack spacing={8} flexDir={{ base: 'column', md: 'row' }}>
                        <Box flex={1} display='flex' flexDir='column'>
                            <Text color="gray.600">TENTANG KAMI</Text>
                            <Heading size="2xl" lineHeight="1.2">
                                Mitra Andal untuk Kebutuhan Air Anda
                            </Heading>
                        </Box>
                        <Box flex={1} display='flex' flexDir='column'>
                            <Text color="gray.600" fontSize="lg">
                                Dengan pengalaman puluhan tahun di bidang industri pompa air yang prima, kami berkomitmen untuk memberikan
                                kualitas terbaik untuk memudahkan hidup setiap yang berkepentingan.
                            </Text>
                            <Link href="/contact-us">
                                <Button colorScheme="green" size="lg" width="fit-content">
                                    Hubungi Kami
                                </Button>
                            </Link>
                        </Box>
                    </Stack>
                </Container>
                <Box display='flex' justifyContent='center' zIndex={2}>
                    <Image src="/assets/hero-about-us.png" />
                </Box>
                {/* Stats Section */}
                <Box bg="black" color="white" py={16} pt={32} transform='translateY(-120px)'>
                    <Container maxW="7xl">
                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]} gap={8}>
                            <Stack align="center">
                                <Heading size="2xl">1jt</Heading>
                                <Text>Produk terjual dalam satu tahun</Text>
                            </Stack>
                            <Stack align="center">
                                <Heading size="2xl">5y</Heading>
                                <Text>Memimpin pasar pompa air submersible</Text>
                            </Stack>
                            <Stack align="center">
                                <Heading size="2xl">28+</Heading>
                                <Text>Jumlah distributor resmi</Text>
                            </Stack>
                        </Grid>
                    </Container>
                </Box>
            </Box>



            {/* About Section */}
            <Box py={16}>
                <Container maxW="7xl">
                    <Text fontSize="lg" textAlign="center" maxW="3xl" mx="auto">
                        <Text as="span" color={bgGreen} fontWeight="bold">
                            PT. Jaya Teknik Sejahtera
                        </Text>{" "}
                        adalah penyedia terkemuka pompa air submersible listrik di Indonesia. Dalam waktu singkat, kami telah
                        menjadi pemimpin pasar di industri pompa air dalam negeri. Dedikasi kami terhadap kualitas, keterjangkauan,
                        dan aksesibilitas telah membawa kami ke garis depan pasar, memungkinkan kami memenuhi beragam kebutuhan
                        konsumen di seluruh Indonesia.
                    </Text>
                </Container>
            </Box>

            {/* Vision & Mission */}
            <Box py={16}>
                <Container maxW="7xl">
                    <Grid templateColumns={["1fr", null, "1fr 1fr"]} gap={12}>
                        <Image
                            src={`/assets/pump-asset.png`}
                            alt="Water Pump in Field"
                            borderRadius="lg"
                            objectFit="cover"
                            height="fit-content"
                        />
                        <Stack spacing={8}>
                            <Box>
                                <Heading size="lg" mb={4}>
                                    Visi Kami
                                </Heading>
                                <Text color="gray.600">
                                    Menjadi penyedia pompa air untuk setiap kebutuhan di Indonesia. Kami ingin menciptakan masa depan di
                                    mana semua orang, di mana pun mereka berada, dapat dengan mudah mengakses air bersih.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size="lg" mb={4}>
                                    Misi Kami
                                </Heading>
                                <Stack spacing={4}>
                                    <Text>• Menyediakan pompa air berkualitas tinggi dengan harga yang terjangkau</Text>
                                    <Text>
                                        • Memperluas jangkauan layanan kami ke seluruh wilayah Indonesia, termasuk daerah terpencil
                                    </Text>
                                    <Text>• Memenuhi beragam kebutuhan konsumen dengan produk yang inovatif</Text>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>
                </Container>
            </Box>

            {/* Company Principles */}
            <Box py={16} bg={lightBg}>
                <Container maxW="7xl">
                    <Stack spacing={12} align="center">
                        <Box textAlign="center" maxW="2xl">
                            <Heading size="lg" mb={4}>
                                Prinsip Perusahaan Kami
                            </Heading>
                            <Text color="gray.600">
                                Nilai-nilai ini menjadi dasar dari setiap keputusan dan langkah kami, memastikan bahwa kami selalu
                                memberikan yang terbaik untuk pelanggan.
                            </Text>
                        </Box>

                        <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={8} width="100%">
                            <Stack p={8} borderRadius="lg" borderWidth="1px">
                                <Shield size={32} weight="fill" color="#006837" />
                                <Heading size="md">Kepercayaan</Heading>
                                <Text color="gray.600">
                                    Kami berkomitmen menjaga kualitas terbaik dalam setiap aspek, mulai dari desain produk hingga layanan
                                    pelanggan.
                                </Text>
                            </Stack>

                            <Stack p={8} borderRadius="lg" borderWidth="1px">
                                <Globe size={32} weight="fill" color="#006837" />
                                <Heading size="md">Aksesibilitas</Heading>
                                <Text color="gray.600">
                                    Kami berupaya menjangkau seluruh wilayah Indonesia, termasuk area terpencil, agar produk dan layanan
                                    kami dapat dinikmati semua orang.
                                </Text>
                            </Stack>

                            <Stack p={8} borderRadius="lg" borderWidth="1px">
                                <CurrencyDollar size={32} weight="fill" color="#006837" />
                                <Heading size="md">Terjangkau</Heading>
                                <Text color="gray.600">
                                    Kami percaya bahwa kualitas di atas standar tidak harus mahal. Kami menyediakan produk dengan harga
                                    yang terjangkau.
                                </Text>
                            </Stack>

                            <Stack p={8} borderRadius="lg" borderWidth="1px">
                                <Rocket size={32} weight="fill" color="#006837" />
                                <Heading size="md">Inovasi</Heading>
                                <Text color="gray.600">
                                    Kami terus berinovasi untuk menghadirkan produk dan layanan terbaik yang memenuhi kebutuhan pelanggan
                                    di berbagai industri.
                                </Text>
                            </Stack>
                        </Grid>
                    </Stack>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box py={20} bg="black" color="white" bgGradient='linear(to-t, #04351B, #032312)'>
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
    )
}

