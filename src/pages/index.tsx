import Head from 'next/head'
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { CaretDown, List, Star } from "@phosphor-icons/react"
import NextLink from "next/link"


export default function Home() {
  return (
    <>
      <Head>
        <title>HCL Pump</title>
        <meta name="description" content="HCL Pump" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box minH="100vh">
        {/* Navigation */}
        <Box as="nav" bg="green.700" py={3} position="sticky" top={0} zIndex={50}>
          <Container maxW="7xl">
            <Flex justify="space-between" align="center">
              <Link as={NextLink} href="/" fontSize="2xl" fontWeight="bold" color="white">
                HCL
              </Link>

              <Stack direction="row" spacing={6} display={{ base: "none", md: "flex" }} align="center">
                <Link color="white" _hover={{ color: "gray.200" }}>
                  Beranda
                </Link>
                <Link color="white" _hover={{ color: "gray.200" }}>
                  Tentang Kami
                </Link>
                <Link color="white" _hover={{ color: "gray.200" }}>
                  Produk
                </Link>
                <Menu>
                  <MenuButton as={Button} rightIcon={<CaretDown />} background='transparent' color='white' _hover={{ color: "gray.200", background: 'transprent' }}>
                    Produk
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Beranda</MenuItem>
                    <MenuItem>Tentang Kami</MenuItem>
                    <MenuItem>Produk</MenuItem>
                    <MenuItem>Hubungi Kami</MenuItem>
                  </MenuList>
                </Menu>
                <Button variant="outline" color="white" _hover={{ bg: "green.600" }}>
                  Hubungi Kami
                </Button>
              </Stack>

              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<Icon as={List} />}
                  variant="ghost"
                  color="white"
                  display={{ base: "flex", md: "none" }}
                />
                <MenuList>
                  <MenuItem>Beranda</MenuItem>
                  <MenuItem>Tentang Kami</MenuItem>
                  <MenuItem>Produk</MenuItem>
                  <MenuItem>Hubungi Kami</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Container>
        </Box>

        {/* Hero Section */}
        <Box position="relative" h="500px">
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

              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="full">
                {["Agrikultur", "Residential", "Komersial"].map((category, i) => (
                  <Box key={i} borderWidth={1} borderRadius="lg" p={6}>
                    <Flex direction="column" align="center">
                      <Image src="/placeholder.svg" alt="Pump" w="200px" h="300px" objectFit="contain" mb={4} />
                      <Heading as="h3" size="md" mb={2}>
                        {category}
                      </Heading>
                      <Text mb={2}>HCL Pump 3" 2.5L/h</Text>
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
          <Container maxW="7xl">
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
              <Stack spacing={4}>
                <Heading as="h2" size="xl">
                  Tentang HCL Pump Indonesia
                </Heading>
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
              <Box position="relative" h={{ base: "300px", md: "auto" }}>
                <Image src="/placeholder.svg" alt="Team" objectFit="cover" borderRadius="lg" w="full" h="full" />
              </Box>
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box bg="green.900" py={16} color="white">
          <Container maxW="7xl" textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              Diskusikan Kebutuhan Anda dengan Ahli Kami
            </Heading>
            <Button variant="outline" color="white" _hover={{ bg: "green.800" }}>
              Hubungi Kami
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Box as="footer" bg="green.800" py={12} color="white">
          <Container maxW="7xl">
            <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
              <Stack spacing={4}>
                <Link as={NextLink} href="/" fontSize="2xl" fontWeight="bold">
                  HCL
                </Link>
                <Text fontSize="sm">
                  Solusi pompa yang efisien, hemat biaya, dan inovatif untuk berbagai aplikasi, dari tinggi penggunaan air
                  untuk tahun 2018.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading as="h3" size="sm">
                  Tentang Kami
                </Heading>
                <Stack spacing={2}>
                  <Link fontSize="sm">Perusahaan</Link>
                  <Link fontSize="sm">Produk</Link>
                  <Link fontSize="sm">Hubungi Kami</Link>
                </Stack>
              </Stack>

              <Stack spacing={4}>
                <Heading as="h3" size="sm">
                  Kontak
                </Heading>
                <Stack spacing={2} fontSize="sm">
                  <Text>+62 888 8237 1100</Text>
                  <Text>info@hclpump.com</Text>
                  <Text>Jalan, Surabaya, Ponorogo, Indonesia 63456</Text>
                </Stack>
              </Stack>
            </Grid>

            <Box borderTopWidth={1} borderColor="green.700" mt={12} pt={8} textAlign="center">
              <Text fontSize="sm">© 2024 HCL Pump</Text>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}
