import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    VStack,
    Text,
    Switch,
    useToast
} from "@chakra-ui/react"
import { Product } from "../types/product";
import { useState } from "react";
import { BASE_URL } from "../constant";

type ProductFormProps = {
    isOpen: boolean;
    onClose: () => void;
    fetchData: () => void;
    currentData?: Product;
}

export default function ProductForm({ isOpen, onClose, fetchData, currentData }: ProductFormProps) {

    const toast = useToast()
    const [product, setProduct] = useState<Product>({
        id: currentData?.id || 0,
        name: currentData?.name || '',
        description: currentData?.description || '',
        price: currentData?.price || 0,
        isInStore: currentData?.isInStore || false,
    } as Product)

    const onSave = async () => {
        if (currentData?.id) {
            editProduct()
        } else {
            addProduct()
        }
    }

    const addProduct = () => {
        fetch(BASE_URL + 'product/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then(() => {
                onClose()
                fetchData()
                toast({
                    title: "Product added",
                    description: "product added successfully",
                    isClosable: true,
                    duration: 1000
                })
            }
            )
            .catch((err) => { console.log(err); })
    }

    const editProduct = async () => {
        fetch(BASE_URL + 'product/' + currentData?.id, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(() => {
                onClose()
                fetchData()
                toast({
                    title: "Product updated",
                    description: "product updated successfully",
                    isClosable: true,
                    duration: 1000
                })
            }
            )
            .catch((err) => { console.log(err); })
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        shadow={'sm'}>ADD PRODUCT</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Modal */}
                        <VStack gap={4} alignItems={'self-start'}>
                            <Input
                                value={product.name}
                                type="text"
                                placeholder='Name'
                                onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                            <Textarea
                                placeholder='Product Description'
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })} />
                            <Input
                                value={product.price}
                                type="number"
                                placeholder='price'
                                onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })} />
                            <Text>
                                Is in store?
                            </Text>
                            <Switch
                                isChecked={product.isInStore}
                                onChange={(e) => setProduct({ ...product, isInStore: e.target.checked })} />
                        </VStack>
                    </ModalBody>
                    {/* {JSON.stringify(product)} */}
                    <ModalFooter>
                        <Button variant={'ghost'} mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="blue"
                            onClick={onSave}> Save Product </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
