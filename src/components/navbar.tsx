import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, Collapse, Container, Divider, Flex, HStack, Image, Link, Menu, MenuButton, MenuItem, MenuList, SkeletonText, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import NextLink from "next/link"
import { CaretDown, List, X } from '@phosphor-icons/react'

export const Navbar = (props: {
    background?: string;
}) => {
    const fontColor = props.background === 'unset' ? 'black' : 'white'
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Box as="nav" 
        bg={
            props.background !== 'unset'
              ? props.background
              : fontColor === "white"
                ? "green.700"
                : "white"
          }
        py={3} position="fixed" width='100%' top={0} zIndex={50} boxShadow="md">
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
                                <Link _hover={{ color: "gray.200" }} href='/products'><MenuItem>Beranda</MenuItem></Link>
                                <Link _hover={{ color: "gray.200" }} href='/products'><MenuItem>Tentang Kami</MenuItem></Link>
                                <Link _hover={{ color: "gray.200" }} href='/products'><MenuItem>Produk</MenuItem></Link>
                                <Link _hover={{ color: "gray.200" }} href='/products'><MenuItem>Hubungi Kami</MenuItem></Link>
                            </MenuList>
                        </Menu>
                    </Stack>
                    <Link href='/contact-us'>
                        <Button variant="outline" color={fontColor} _hover={{ bg: "green.600" }} display={{ base: "none", md: "flex" }}>
                            Hubungi Kami
                        </Button>
                    </Link>

                    <HStack align="center" spacing={3} display={{ base: "flex", md: "none" }}>
                        <Link href="/contact-us">
                            <Button
                                variant="outline"
                                size="sm"
                                color={fontColor}
                                _focus={{
                                    color: "green.700",
                                }}
                            >
                                Hubungi Kami
                            </Button>
                        </Link>
                        <Box onClick={onToggle}>
                            {isOpen ? (
                                <X size={24} color={fontColor} />
                            ) : (
                                <List
                                    size={24}
                                    color={fontColor}
                                />
                            )}
                        </Box>
                    </HStack>
                </Flex>
                <Collapse
                    in={isOpen}
                    animateOpacity
                    style={{ width: "100%", boxShadow: "lg", color: "white" }}
                >
                    <VStack align="stretch" spacing={4} p="12px 20px" boxShadow={"md"}>
                        <Link href="/" _hover={{ color: "primary.500" }}>
                            <Text fontSize="lg" color={fontColor}>Beranda</Text>
                        </Link>

                        <Divider />

                        <Link href="/about-us" _hover={{ color: "primary.500" }}>
                            <Text fontSize="lg" color={fontColor}>Tentang Kami</Text>
                        </Link>

                        <Divider />

                        <Accordion allowToggle>
                            <AccordionItem border="none">
                                <AccordionButton
                                    px={0}
                                    _hover={{ bg: "transparent", color: "primary.500" }}
                                >
                                    <Box flex="1" textAlign="left">
                                        <Text fontSize="lg" color={fontColor}>Produk</Text>
                                    </Box>
                                    <CaretDown />
                                </AccordionButton>
                                <AccordionPanel pb={4} px={0}>
                                    <VStack align="stretch" spacing={3}>
                                        {/* {isLoading ? ( */}
                                        {false ? (
                                            <SkeletonText mt="4" noOfLines={4} spacing="4" />
                                        ) : (
                                            // categoryData?.data.map((category) => (
                                            //     <Link
                                            //         key={category.name}
                                            //         href={`/products?category=${category.name}`}
                                            //     >
                                            //         <Text>{category.name}</Text>
                                            //     </Link>
                                            // ))
                                            <>
                                            <Link
                                                    key={`1`}
                                                    href={`/products?category=${1}`}
                                                >
                                                    <Text color={fontColor}>{`category 1`}</Text>
                                                </Link>
                                            <Link
                                                    key={`1`}
                                                    href={`/products?category=${2}`}
                                                >
                                                    <Text color={fontColor}>{`category 2`}</Text>
                                                </Link>
                                            <Link
                                                    key={`1`}
                                                    href={`/products?category=${3}`}
                                                >
                                                    <Text color={fontColor}>{`category 3`}</Text>
                                                </Link>
                                                </>
                                        )}
                                    </VStack>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </VStack>
                </Collapse>
            </Container>
        </Box>
    )
}
