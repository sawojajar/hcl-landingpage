import { Box, Container, Grid, Heading, HStack, Image, Link, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import NextLink from "next/link"
import { Phone } from '@phosphor-icons/react/dist/csr/Phone'
import { Envelope } from '@phosphor-icons/react/dist/csr/Envelope'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import { TiktokLogo } from '@phosphor-icons/react/dist/csr/TiktokLogo'
import { FacebookLogo } from '@phosphor-icons/react/dist/csr/FacebookLogo'
import { MapPinArea } from '@phosphor-icons/react/dist/csr/MapPinArea'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'

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
                                <Link href='tel:+62811262427' target='_blank'>
                                    <Box display='flex' alignItems='center' gap={2}>
                                        <Phone size={24} weight="fill" color="white" />
                                        <Text>+62811-262-427 & +62852-3246-8521</Text>
                                    </Box>
                                </Link>
                                <Link href='https://wa.me/6285655588302' target='_blank'>
                                    <Box display='flex' alignItems='center' gap={2}>
                                        <WhatsappLogo size={24} weight="fill" color="white" />
                                        <Text>+62856-6856-8302</Text>
                                    </Box>
                                </Link>
                                <Link href='mailto:info@hclpump.com' target='_blank'>
                                    <Box display='flex' alignItems='center' gap={2}>
                                        <Envelope size={24} weight="fill" color="white" />
                                        <Text>info@hclpump.com</Text>
                                    </Box>
                                </Link>
                                <Link href='https://www.instagram.com/hclpump.id' target='_blank'>
                                    <Box display='flex' alignItems='center' gap={2}>
                                        <InstagramLogo size={24} weight="fill" color="white" />
                                        <Text>HCLPUMP.ID</Text>
                                    </Box>
                                </Link>
                                <Link href='https://www.tiktok.com/@hcl.pump.official' target='_blank'>
                                    <Box display='flex' alignItems='center' gap={2}>
                                        <TiktokLogo size={24} weight="fill" color="white" />
                                        <Text>HCL.PUMP.OFFICIAL</Text>
                                    </Box>
                                </Link>
                                <Link href='https://www.facebook.com/hcl.pump' target='_blank'>
                                    <Box display='flex' alignItems='center' gap={2}>
                                        <FacebookLogo size={24} weight="fill" color="white" />
                                        <Text>HCL PUMP</Text>
                                    </Box>
                                </Link>
                                <Box display='flex' alignItems='center' gap={2}>
                                    <MapPinArea size={24} weight="fill" color="white" />
                                    <Text>Surabaya, Jawa Timur, Indonesia</Text>
                                </Box>
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
