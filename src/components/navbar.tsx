import { Box, Button, Container, Flex, Icon, IconButton, Image, Link, List, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react'
import React from 'react'
import NextLink from "next/link"
import { CaretDown } from '@phosphor-icons/react'

export const Navbar = () => {
    return (
        <Box as="nav" bg="green.700" py={3} position="fixed" width='100%' top={0} zIndex={50}>
            <Container maxW="7xl">
                <Flex justify="space-between" align="center">
                    <Link as={NextLink} href="/" fontSize="2xl" fontWeight="bold" color="white">
                        <Image src='/assets/logo.png' alt='logo hcl' width='61px' height='48px' />
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
                    </Stack>
                    <Button variant="outline" color="white" _hover={{ bg: "green.600" }} display={{ base: "none", md: "flex" }}>
                        Hubungi Kami
                    </Button>
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
    )
}
