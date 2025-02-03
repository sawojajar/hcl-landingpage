
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Input,
    Stack,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react"
import { useState } from "react"

export function ContactUsScreen() {
    const toast = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
            title: "Form submitted.",
            description: "We'll get back to you soon.",
            status: "success",
            duration: 5000,
            isClosable: true,
        })

        setIsSubmitting(false)
    }

    return (
        <Box minH="100vh">
            <Stack bg="green.50">
                <Container maxW="7xl" py={24} >
                    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={12}>
                        {/* Contact Form */}
                        <Box>
                            <Stack spacing={4}>
                                <Box>
                                    <Text color="gray.600" fontWeight="medium">
                                        HUBUNGI KAMI
                                    </Text>
                                    <Heading size="xl" mb={2}>
                                        Butuh Bantuan?
                                    </Heading>
                                    <Text color="gray.600">
                                        Jangan ragu untuk menghubungi kami. Tim kami siap memberikan solusi terbaik untuk kebutuhan pompa air
                                        Anda.
                                    </Text>
                                </Box>
                            </Stack>
                        </Box>
                        <Box>
                            <Stack spacing={4}>
                                <Box as="form" onSubmit={handleSubmit}>
                                    <Stack spacing={4} bg="white" p={8} borderRadius="xl" shadow="sm">
                                        <FormControl isRequired>
                                            <FormLabel>Nama Pemilik</FormLabel>
                                            <Input placeholder="Masukkan nama pemilik" />
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Nama Toko</FormLabel>
                                            <Input placeholder="Masukkan nama toko" />
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Alamat</FormLabel>
                                            <Textarea placeholder="Masukkan alamat lengkap" rows={3} />
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Keperluan</FormLabel>
                                            <Textarea placeholder="Jelaskan keperluan" rows={3} />
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Nomor Telepon</FormLabel>
                                            <Input placeholder="0000 000 000" type="tel" />
                                        </FormControl>

                                        <Button type="submit" colorScheme="green" size="lg" isLoading={isSubmitting}>
                                            Kirim
                                        </Button>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Container>
            </Stack>
            <Stack bg="white">
                <Container maxW="7xl" py={24} >
                    <Grid templateColumns={{ base: "1fr" }} gap={12}>
                        {/* FAQ Section */}
                        <Box>
                            <Stack spacing={8}>
                                <Box textAlign="center">
                                    <Heading size="xl" mb={2}>
                                        Pertanyaan Umum
                                    </Heading>
                                    <Text color="gray.600">Temukan jawaban cepat untuk pertanyaan umum seputar HCL Pump.</Text>
                                </Box>

                                <Accordion allowToggle>
                                    <AccordionItem>
                                        <AccordionButton py={4}>
                                            <Box flex="1" textAlign="left" fontWeight="medium">
                                                Jenis pompa apa yang ditawarkan oleh HCL Pump?
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            Kami menawarkan berbagai jenis pompa, termasuk pompa sentrifugal, pompa perpindahan positif, pompa
                                            submersible, dan banyak lagi. Produk kami dirancang untuk berbagai industri seperti minyak & gas,
                                            kimia, dan pengolahan air.
                                        </AccordionPanel>
                                    </AccordionItem>

                                    <AccordionItem>
                                        <AccordionButton py={4}>
                                            <Box flex="1" textAlign="left" fontWeight="medium">
                                                Di mana saya dapat membeli produk HCL Pump?
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            Anda dapat membeli produk kami langsung melalui website kami, atau menghubungi tim penjualan kami
                                            untuk bantuan lebih lanjut. Kami juga memiliki distributor resmi di seluruh Indonesia.
                                        </AccordionPanel>
                                    </AccordionItem>

                                    <AccordionItem>
                                        <AccordionButton py={4}>
                                            <Box flex="1" textAlign="left" fontWeight="medium">
                                                Bagaimana cara memilih pompa yang tepat untuk kebutuhan saya?
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            Tim ahli kami tersedia untuk memberikan konsultasi dan merekomendasikan solusi pompa terbaik sesuai
                                            dengan kebutuhan spesifik Anda. Anda dapat menghubungi kami melalui bagian &quot;Kontak Kami&quot; atau
                                            jadwalkan demo produk.
                                        </AccordionPanel>
                                    </AccordionItem>

                                    <AccordionItem>
                                        <AccordionButton py={4}>
                                            <Box flex="1" textAlign="left" fontWeight="medium">
                                                Berapa lama masa garansi untuk pompa HCL?
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            Semua produk pompa HCL dilengkapi dengan garansi 1 tahun sejak tanggal pembelian, yang mencakup
                                            cacat produksi. Untuk informasi lebih lanjut, silakan merujuk ke kebijakan garansi di website kami.
                                        </AccordionPanel>
                                    </AccordionItem>

                                    <AccordionItem>
                                        <AccordionButton py={4}>
                                            <Box flex="1" textAlign="left" fontWeight="medium">
                                                Apakah saya bisa mendapatkan dukungan teknis untuk instalasi dan pemeliharaan?
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            Ya, kami menawarkan dukungan teknis untuk instalasi dan pemeliharaan berkelanjutan. Tim dukungan
                                            kami tersedia melalui telepon atau email, atau Anda dapat menjadwalkan kunjungan teknisi kami ke
                                            lokasi.
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </Stack>
                        </Box>
                    </Grid>
                </Container>
            </Stack>
        </Box>
    )
}

