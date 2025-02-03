
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, Textarea } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
type FormData = {
    ownerName: string;
    storeName: string;
    address: string;
    purpose: string;
    phoneNumber: string;
};
interface PurchaseFormProps {
    onSubmit: (formValue: FormData) => void
    isOpen: boolean
    onClose: () => void
    isSubmitting?: boolean
}

export function PurchaseForm(props: PurchaseFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        props.onSubmit(data);
    };
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Isi Data Diri Anda</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text mb={4} color="gray.600">
                        Data yang Anda berikan akan membantu kami memproses permintaan Anda dengan lebih cepat.
                    </Text>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
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
                                isLoading={props.isSubmitting}
                                mt={2}
                            >
                                Kirim
                            </Button>
                        </Stack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>

    )
}

