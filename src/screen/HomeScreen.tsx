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
    Tabs, TabList, TabPanels, Tab, TabPanel
} from "@chakra-ui/react"
import { Star } from '@phosphor-icons/react'

export function HomeScreen() {
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
                        <Button colorScheme="green">Jelajahi Produk</Button>
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
                                    <Tab>Agrikultur</Tab>
                                    <Tab>Residential</Tab>
                                    <Tab>Komersial</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="full">
                                            {["Agrikultur", "Residential", "Komersial"].map((category, i) => (
                                                <Box key={i} borderWidth={1} borderRadius="lg" p={6}>
                                                    <Flex direction="column" align="center">
                                                        <Image src="/placeholder.svg" alt="Pump" w="200px" h="300px" objectFit="contain" mb={4} />
                                                        <Heading as="h3" size="md" mb={2}>
                                                            {category}
                                                        </Heading>
                                                        <Text mb={2}>HCL Pump 3&quot; 2.5L/h</Text>
                                                        <Flex align="center" mb={4}>
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Icon key={star} as={Star} color="yellow.400" fill="yellow.400" boxSize={4} />
                                                            ))}
                                                            <Text ml={2} fontSize="sm" color="gray.600">
                                                                4.8 (120)
                                                            </Text>
                                                        </Flex>
                                                        <Button variant="outline" w="full">
                                                            Lihat Semua Produk
                                                        </Button>
                                                    </Flex>
                                                </Box>
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel>
                                        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="full">
                                            {["Agrikultur", "Residential", "Komersial"].map((category, i) => (
                                                <Box key={i} borderWidth={1} borderRadius="lg" p={6}>
                                                    <Flex direction="column" align="center">
                                                        <Image src="/placeholder.svg" alt="Pump" w="200px" h="300px" objectFit="contain" mb={4} />
                                                        <Heading as="h3" size="md" mb={2}>
                                                            {category}
                                                        </Heading>
                                                        <Text mb={2}>HCL Pump 3&quot; 2.5L/h</Text>
                                                        <Flex align="center" mb={4}>
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Icon key={star} as={Star} color="yellow.400" fill="yellow.400" boxSize={4} />
                                                            ))}
                                                            <Text ml={2} fontSize="sm" color="gray.600">
                                                                4.8 (120)
                                                            </Text>
                                                        </Flex>
                                                        <Button variant="outline" w="full">
                                                            Lihat Semua Produk
                                                        </Button>
                                                    </Flex>
                                                </Box>
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel>
                                        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="full">
                                            {["Agrikultur", "Residential", "Komersial"].map((category, i) => (
                                                <Box key={i} borderWidth={1} borderRadius="lg" p={6}>
                                                    <Flex direction="column" align="center">
                                                        <Image src="/placeholder.svg" alt="Pump" w="200px" h="300px" objectFit="contain" mb={4} />
                                                        <Heading as="h3" size="md" mb={2}>
                                                            {category}
                                                        </Heading>
                                                        <Text mb={2}>HCL Pump 3&quot; 2.5L/h</Text>
                                                        <Flex align="center" mb={4}>
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Icon key={star} as={Star} color="yellow.400" fill="yellow.400" boxSize={4} />
                                                            ))}
                                                            <Text ml={2} fontSize="sm" color="gray.600">
                                                                4.8 (120)
                                                            </Text>
                                                        </Flex>
                                                        <Button variant="outline" w="full">
                                                            Lihat Semua Produk
                                                        </Button>
                                                    </Flex>
                                                </Box>
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

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
                                    <Button colorScheme="green" alignSelf="flex-start">
                                        Selengkapnya
                                    </Button>
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
                        <Button variant="outline" color="white" _hover={{ bg: "primary.800" }}>
                            Hubungi Kami
                        </Button>
                    </Container>
                </Box>
            </Box>
        </>
    )
}
