
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
    UnorderedList,
    ListItem,
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

const FAQ_DATA = [
    {
        question: "Jenis pompa apa yang ditawarkan oleh HCL PUMP INDONESIA?",
        answer: "Kami menawarkan berbagai produk diantaranya pompa submersible, pompa celup (wsd) air kotor, pompa celup air bersih dan banyak lagi. Pompa kami dirancang tahan lama dan efisien yang cocok untuk penggunaan jangka panjang guna memenuhi kebutuhan industri dan rumah tangga Anda."
    },
    {
        question: "Bagaimana cara memilih pompa yang tepat?",
        answer: "Kami dengan senang hati akan membantu untuk mengkonsultasikan produk yang sesuai dengan kebutuhan Anda. Anda dapat menghubungi kami melalui bagian “ kontak kami” dan tim HCL PUMP akan merekomendasikan jenis pompa apa yang sesuai dengan kebutuhan Anda."
    },
    {
        question: "Dimana saya dapat membeli produk HCL?",
        answer: "Produk kami bisa anda dapatkan melalui website resmi HCL PUMP dengan cara menghubungi kontak kami yang tertera, dan tim akan menghubungi anda untuk bantuan lebih lanjut.  Kami juga mempunyai Mitra resmi yang sudah tersebar di seluruh Indonesia."
    },
    {
        question: "Mengapa saya harus memilih produk HCL PUMP?",
        answer: <UnorderedList>
            <ListItem>HCL Pump menawarkan produk dengan standar kualitas tinggi, menggunakan material dan teknologi terkini untuk memastikan daya tahan dan keandalan.</ListItem>
            <ListItem>HCL PUMP Menyediakan berbagai macam variasi dengan pilihan spesifikasi terlengkap.</ListItem>
            <ListItem>Produk HCL dirancang untuk hemat energi, membantu mengurangi biaya operasional dan dampak lingkungan.</ListItem>
            <ListItem>Kami percaya bahwa akses untuk sumber air tidak boleh terhalang oleh kendala biaya. Oleh karena itu kami menawarkan produk kami dengan harga yang terjangkau bagi semua konsumen.</ListItem>
        </UnorderedList>
    },
    {
        question: "Bagaimana saya dapat bekerjasama dengan HCL PUMP?",
        answer: "Jika anda ingin bermitra dengan kami, anda dapat menghubungi  langsung kontak yang tertera pada website  atau melalui media sosial HCL PUMP Indonesia. Tim kami akan menghubungi Anda dan menjelaskan terkait prosedur Kerjasama."
    }
]

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
                                    <Stack spacing={4} bg="white" p={8} borderRadius="xl" shadow="sm">
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
                                    {FAQ_DATA.map((faq, index) => (
                                        <AccordionItem key={`faq-${index}`}>
                                        <AccordionButton py={4}>
                                            <Box flex="1" textAlign="left" fontWeight="medium">
                                                {faq.question}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            {faq.answer}
                                    </AccordionPanel>
                                </AccordionItem>
                                    ))}
                                </Accordion>
                            </Stack>
                        </Box>
                    </Grid>
                </Container>
            </Stack>
        </Box>
    )
}

