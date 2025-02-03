
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
    FormErrorMessage,
} from "@chakra-ui/react"
import getConfig from "next/config";
import { useState } from "react"

import { useForm } from "react-hook-form";
type FormData = {
    ownerName: string;
    storeName: string;
    address: string;
    purpose: string;
    phoneNumber: string;
};

const { publicRuntimeConfig } = getConfig();

export function ContactUsScreen() {
    const toast = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        try {
            const adminWhatsApp = publicRuntimeConfig.adminWhatsAppNumber;
            const chatFormat = publicRuntimeConfig.adminWhatsAppChatFormat;

            if (!adminWhatsApp || !chatFormat) {
                throw new Error("WhatsApp configuration is missing");
            }

            const message = chatFormat
                .replace("{ownerName}", data.ownerName)
                .replace("{storeName}", data.storeName)
                .replace("{address}", data.address)
                .replace("{purpose}", data.purpose)
                .replace("{phoneNumber}", data.phoneNumber);

            const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, "_blank");
            toast({
                title: "Form submitted",
                description:
                    "You will be redirected to WhatsApp to continue the conversation.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to redirect to WhatsApp. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Stack spacing={4}  bg="white" p={8} borderRadius="xl" shadow="sm">
                                        <FormControl isInvalid={!!errors.ownerName} isRequired>
                                            <FormLabel fontSize="md">Nama Pemilik </FormLabel>
                                            <Input
                                                placeholder="Masukkan nama pemilik"
                                                size="md"
                                                {...register("ownerName", {
                                                    required: "Nama pemilik harus diisi",
                                                })}
                                            />
                                            <FormErrorMessage>{errors.ownerName?.message}</FormErrorMessage>
                                        </FormControl>

                                        <FormControl isInvalid={!!errors.storeName} isRequired>
                                            <FormLabel fontSize="md">Nama Toko </FormLabel>
                                            <Input
                                                placeholder="Masukkan nama toko"
                                                size="md"
                                                {...register("storeName", {
                                                    required: "Nama toko harus diisi",
                                                })}
                                            />
                                            <FormErrorMessage>{errors.storeName?.message}</FormErrorMessage>
                                        </FormControl>

                                        <FormControl isInvalid={!!errors.address} isRequired>
                                            <FormLabel fontSize="md">Alamat</FormLabel>
                                            <Textarea
                                                placeholder="Masukkan alamat lengkap"
                                                size="md"
                                                rows={3}
                                                {...register("address", { required: "Alamat harus diisi" })}
                                            />
                                            <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
                                        </FormControl>

                                        <FormControl isInvalid={!!errors.purpose} isRequired>
                                            <FormLabel fontSize="md">Keperluan</FormLabel>
                                            <Textarea
                                                placeholder="Jelaskan keperluan"
                                                size="md"
                                                rows={3}
                                                {...register("purpose", {
                                                    required: "Keperluan harus diisi",
                                                })}
                                            />
                                            <FormErrorMessage>{errors.purpose?.message}</FormErrorMessage>
                                        </FormControl>

                                        <FormControl isInvalid={!!errors.phoneNumber} isRequired>
                                            <FormLabel fontSize="md">Nomor Telepon</FormLabel>
                                            <Input
                                                placeholder="(000) 000 000"
                                                size="md"
                                                {...register("phoneNumber", {
                                                    required: "Nomor telepon harus diisi",
                                                    pattern: {
                                                        value: /^[0-9()-\s]+$/,
                                                        message: "Format nomor telepon tidak valid",
                                                    },
                                                })}
                                            />
                                            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
                                        </FormControl>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            width="full"
                                            colorScheme="teal"
                                            bg="primary.500"
                                            isLoading={isSubmitting}
                                            mt={2}
                                        >
                                            Kirim
                                        </Button>
                                    </Stack>
                                </form>
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

