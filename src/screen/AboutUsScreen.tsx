"use client"

import {
    Box,
    Button,
    Container,
    Grid,
    Heading,
    Image,
    Link,
    ListItem,
    Stack,
    Text,
    UnorderedList,
    useColorModeValue,
} from "@chakra-ui/react"
import { Shield } from "@phosphor-icons/react/dist/csr/Shield"
import { Globe } from "@phosphor-icons/react/dist/csr/Globe"
import { Heart } from "@phosphor-icons/react/dist/csr/Heart"
import { Rocket } from "@phosphor-icons/react/dist/csr/Rocket"

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
                                Solusi Kebutuhan Air Mengalir Tanpa Henti
                            </Heading>
                        </Box>
                        <Box flex={1} display='flex' flexDir='column'>
                            <Text color="gray.600" fontSize="lg">
                                Sejak berdiri 2019, kami telah menjadi pemimpin pasar dalam industri pompa air di Indonesia dan menjadi Brand Pompa Submersible Terlengkap.
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
                    <Image src="/assets/hero-about-us.png" alt="hero image" />
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
                                <Heading size="2xl">250+</Heading>
                                <Text>Jumlah mitra resmi</Text>
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
                            HCL PUMP INDONESIA
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
                                    Menjadi penyedia pompa air listrik paling tepercaya di Indonesia. Kami berkomitmen menciptakan masa depan yang berkelanjutan di mana setiap individu dapat memiliki akses terhadap air bersih dan andal untuk kebutuhan sehari-hari tanpa terkendala Lokasi
                                </Text>
                            </Box>
                            <Box>
                                <Heading size="lg" mb={4}>
                                    Misi Kami
                                </Heading>
                                <Stack spacing={4}>
                                    <UnorderedList>
                                        <ListItem>Menyediakan pompa air listrik berkualitas terbaik dengan harga yang kompetitif.</ListItem>
                                        <ListItem>
                                            Memperluas jangkauan dan layanan kami ke daerah-daerah terpencil, memastikan kebutuhan air terpenuhi bagi seluruh masyarakat Indonesia.
                                        </ListItem>
                                        <ListItem>Menyediakan beagam produk pompa air untuk memenuhi kebutuhan di sektor pertanian, rumah tangga, dan komersial.</ListItem>
                                    </UnorderedList>
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
                                <Heading size="md">Kompetitif</Heading>
                                <Text color="gray.600">
                                HCL mengusahakan membuat Produk tidak kalah bagus dari produk lain dengan harga yang lebih terjangkau dan lebih modern untuk memudahkan Masyarakat menangani masalah sumber air. Spare part yang terpisah adalah salah satu contoh untuk mengurangi biaya dalam Kerusakan Pompa.
                                </Text>
                            </Stack>

                            <Stack p={8} borderRadius="lg" borderWidth="1px">
                                <Globe size={32} weight="fill" color="#006837" />
                                <Heading size="md">Kualitas Terbaik</Heading>
                                <Text color="gray.600">
                                Mengalir tanpa henti - adalah slogan kami, kami menjamin kualitas akan mesin HCL sangatiah berkualitas untuk memenuhi sumber air yang anda butuhkan. Dengan mesin yang berlilitkan tembaga 100% yang lebih modern dari produk lain, kami tidak takut untuk mengucapkan slogan yang telah kami buat tersebut.
                                </Text>
                            </Stack>

                            <Stack p={8} borderRadius="lg" borderWidth="1px">
                                <Heart size={32} weight="fill" color="#006837" />
                                <Heading size="md">Standart Produk</Heading>
                                <Text color="gray.600">
                                Produk kami telah teruji dan disertifikasi oleh Standar Nasional Indonesia (SNI). Kami memastikan setiap unit yang kami produksi memenuhi persyaratan kualitas dan keselamatan yang ketat.
                                </Text>
                            </Stack>

                            <Stack p={8} borderRadius="lg" borderWidth="1px">
                                <Rocket size={32} weight="fill" color="#006837" />
                                <Heading size="md">Variatif</Heading>
                                <Text color="gray.600">
                                Kami menyediakan berbagai macam ukuran pompa air dengan beragam kapasitas dan spesifikasi, sehingga konsumen dapat memilih pompa yang paling sesuai dengan kebutuhan masing-masing. Dengan variasi ukuran dan kemampuan ini, pelanggan dapat dengan mudah menemukan pompa air yang paling efisien dan tepat.
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

