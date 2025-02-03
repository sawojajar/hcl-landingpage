"use client"

import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
type FormValue = {
    name: string
    storeName: string
    address: string
    purpose: string
    phoneNumber: string
}
interface PurchaseFormProps {
    onSubmit: (formValue: FormValue) => void
    isOpen: boolean
    onClose: () => void
    isSubmitting?: boolean
}

export function PurchaseForm(props: PurchaseFormProps) {
    const [formValue, setformValue] = useState<FormValue | undefined>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Add your form submission logic here
        props.onSubmit(formValue!)
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
        props.onClose()
    }
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
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Nama Pemilik</FormLabel>
                                <Input placeholder="Masukkan nama pemilik" onChange={onChange} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Nama Toko</FormLabel>
                                <Input placeholder="Masukkan nama toko" onChange={onChange} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Alamat</FormLabel>
                                <Textarea placeholder="Masukkan alamat lengkap" onChange={onChange} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Keperluan</FormLabel>
                                <Textarea placeholder="Jelaskan keperluan" onChange={onChange} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Nomor Telepon</FormLabel>
                                <Input placeholder="(000) 000 000" type="tel" onChange={onChange} />
                            </FormControl>

                            <Button type="submit" colorScheme="green" size="lg" isLoading={props.isSubmitting}>
                                Kirim
                            </Button>
                        </Stack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>

    )
}

