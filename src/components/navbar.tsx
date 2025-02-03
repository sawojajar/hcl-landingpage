import { Box, Button, Container, Flex, Icon, IconButton, Image, Link, List, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react'
import React from 'react'
import NextLink from "next/link"
import { CaretDown } from '@phosphor-icons/react'

export const Navbar = (props: {
    background?: string;
}) => {
    const fontColor = props.background === 'unset' ? 'black' : 'white'
    return (
        <Box as="nav" bg={props.background || "green.700"} py={3} position="fixed" width='100%' top={0} zIndex={50}>
            <Container maxW="7xl">
                <Flex justify="space-between" align="center">
                    <Link as={NextLink} href="/" fontSize="2xl" fontWeight="bold">
                        <Image src='/assets/logo.png' alt='logo hcl' width='61px' height='48px' />
                    </Link>

                    <Stack direction="row" spacing={6} display={{ base: "none", md: "flex" }} align="center">
                        <Link color={fontColor} _hover={{ color: "gray.200" }} href='/'>
                            Beranda
                        </Link>
                        <Link color={fontColor} _hover={{ color: "gray.200" }} href='/about-us'>
                            Tentang Kami
                        </Link>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<CaretDown />} background='transparent' color={fontColor} padding={0} fontWeight='normal' _hover={{ color: "gray.200", background: 'transprent' }} _active={{ background: 'transprent' }}>
                                Produk
                            </MenuButton>
                            <MenuList>
                                <Link  _hover={{ color: "gray.200" }} href='/products'><MenuItem>Beranda</MenuItem></Link>
                                <Link  _hover={{ color: "gray.200" }} href='/products'><MenuItem>Tentang Kami</MenuItem></Link>
                                <Link  _hover={{ color: "gray.200" }} href='/products'><MenuItem>Produk</MenuItem></Link>
                                <Link  _hover={{ color: "gray.200" }} href='/products'><MenuItem>Hubungi Kami</MenuItem></Link>
                            </MenuList>
                        </Menu>
                    </Stack>
                    <Link href='/contact-us'>
                        <Button variant="outline" color={fontColor} _hover={{ bg: "green.600" }} display={{ base: "none", md: "flex" }}>
                            Hubungi Kami
                        </Button>
                    </Link>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<Icon as={List} />}
                            variant="ghost"
                            color={fontColor}
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
    )
}
