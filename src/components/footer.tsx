import { Box, Container, Grid, Heading, HStack, Image, Link, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import NextLink from "next/link"

export const Footer = () => {
    return (
        <Box as="footer" bg="green.800" py={12} color="white" backgroundColor='primary.900'>
            <Container maxW="7xl">
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
                    <Stack spacing={4}>
                        <Link as={NextLink} href="/" fontSize="2xl" fontWeight="bold">
                            <Image src='/assets/logo_full.png' alt='logo hcl' width='200px' />
                        </Link>
                        <Text fontSize="sm">
                            Solusi pompa air submersible TERLENGKAP DAN BERKUALITAS di Indonesia sejak 2019.
                        </Text>
                    </Stack>

                    <HStack spacing={4} justifyContent='space-between'>
                        <Stack spacing={4}>
                            <Heading as="h3" size="sm">
                                Tentang Kami
                            </Heading>
                            <Stack spacing={2}>
                                <Link fontSize="sm" href='/about-us'>Perusahaan</Link>
                                <Link fontSize="sm" href='/products'>Produk</Link>
                                <Link fontSize="sm" href='/contact-us'>Hubungi Kami</Link>
                            </Stack>
                        </Stack>

                        <Stack spacing={4}>
                            <Heading as="h3" size="sm">
                                Kontak
                            </Heading>
                            <Stack spacing={2} fontSize="sm">
                                <Text>Telfon: +62811-262-427 & +62852-3246-8521</Text>
                                <Text>Whatsapp: +6856-5558-8302</Text>
                                <Text>Email: info@hclpump.com</Text>
                                <Text>Instagram: HCLPUMP.ID</Text>
                                <Text>Tiktok: HCL.PUMP.OFFICIAL</Text>
                                <Text>Facebook: HCL PUMP</Text>
                                <Text>Surabaya, Jawa Timur, Indonesia</Text>
                            </Stack>
                        </Stack>
                    </HStack>
                </Grid>

                <Box borderTopWidth={1} borderColor="green.700" mt={12} pt={8} textAlign="center">
                    <Text fontSize="sm">© 2024 HCL Pump</Text>
                </Box>
            </Container>
        </Box>
    )
}
