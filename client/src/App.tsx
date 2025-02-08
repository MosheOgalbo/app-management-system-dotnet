import {
    Box,
    Table,
    TableCaption,
    Td,
    Th,
    Tr,
    Thead,
    Tbody,
    TableContainer,
    Flex,
    Heading,
    Button,
    HStack,
    Avatar,
    Text,
    Badge,
    useDisclosure,
    Popover,
    PopoverTrigger,
    PopoverArrow,
    PopoverHeader,
    PopoverContent,
    PopoverCloseButton,
    PopoverBody,
    PopoverFooter,
    useToast
} from '@chakra-ui/react';

import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import './App.css'
import { useEffect, useState } from 'react';
import { Product } from './types/product';
import { BASE_URL } from './constant';
import ProductSkeleton from './components/ProductSkeleton';
import ProductForm from './components/ProductForm';
import ViewDetail from './components/ViewDetail';

export default function App() {
    const { isOpen: viewDialogOpen, onOpen: onViewDialogOpen, onClose: viewDialogClose } = useDisclosure();
    const [currentData, setCurrentData] = useState<Product>({} as Product);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        setIsLoading(true);
        fetch(BASE_URL + 'Product').then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            }).finally(() => {

            });
    };

    const getProducts = (id: number) => {
        fetch(BASE_URL + 'product/' + id).then(res => res.json())
            .then(data => {
                setCurrentData(data)
                onOpen();
            })
            .catch(err => console.log(err));
    }

    const handleAdd = () => {
        onOpen();
        setCurrentData({} as Product);

    }

    const onDeleteHandle = (id: number) => {
        fetch(BASE_URL + 'product/' + id, {
            method: 'DELETE',
        }).then(() => {
            toast({
                title: "Product deleted",
                description: "product deleted successfully",
                isClosable: true,
                duration: 1000
            })
            fetchData();

        }).catch((err) => {
            console.log(err);
        })
    }

    const viewDetail = (id: number) => {
        fetch(BASE_URL + 'product/' + id)
            .then(res => res.json())
            .then((res) => {
                setCurrentData(res);
                onViewDialogOpen()
            }).catch((err) => {
                console.log(err);
            })
    }

    if (isLoading) return <ProductSkeleton />

    return (
        <>
            <Box shadow={'md'} rounded={'md'} m={32}   >
                <Flex px={4} justifyContent={'space-between'} mb={10}>
                    <Heading fontSize={20}> product list </Heading>
                    <Button colorScheme='blue' leftIcon={<AddIcon />}
                        onClick={() => handleAdd()}> add product</Button>
                </Flex>
                <TableContainer   >
                    <Table variant='striped' >
                        <TableCaption>Imperial to metric conversion factors</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Name</Th>
                                <Th>Description</Th>
                                <Th>IIs In Store</Th>
                                <Th isNumeric>Price</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data?.map((product: Product) => (
                                    <Tr key={product.id}>
                                        <Td>{product.id}</Td>
                                        <Td>
                                            <HStack>
                                                <Avatar size={'sm'} name={product.name} />
                                                <Text>
                                                    {product.name}
                                                </Text>
                                            </HStack>
                                        </Td>
                                        <Td>{product.description}</Td>
                                        <Td>
                                            <Badge>
                                                {product.isInStore ? "yes" : "no"}
                                            </Badge>
                                        </Td>
                                        <Td isNumeric>{product.price}</Td>
                                        <Td>
                                            <HStack gap={3}>
                                                {/* <Button colorScheme='blue' size='sm'>Edit</Button>
                                            <Button colorScheme='red' size='sm'>Delete</Button> */}
                                                <EditIcon
                                                    fontSize={22}
                                                    color={"blue"}
                                                    onClick={() => getProducts(product.id)}
                                                />

                                                <Popover>
                                                    <PopoverTrigger>
                                                        <DeleteIcon
                                                            fontSize={22}
                                                            color={"red"} />
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <PopoverArrow />
                                                        <PopoverCloseButton />
                                                        <PopoverHeader>Confirmation!</PopoverHeader>
                                                        <PopoverBody>Are you sure to delete this ?</PopoverBody>
                                                        <PopoverFooter>
                                                            <Button float={"right"} colorScheme="red" size="sm" onClick={() => onDeleteHandle(product.id)}>Delete</Button>
                                                        </PopoverFooter>
                                                    </PopoverContent>
                                                </Popover>

                                                <ViewIcon
                                                    fontSize='22'
                                                    color={"green"}
                                                    onClick={() => viewDetail(product.id)} />
                                            </HStack>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>

                    </Table>
                </TableContainer>
                {
                    data?.length === 0 && (
                        <Heading
                            fontSize={20}
                            textAlign='center'
                            p={5}
                            mt={4}
                        > No data found </Heading>
                    )}
                {isOpen &&
                    <ProductForm
                        currentData={currentData}
                        isOpen={isOpen}
                        onClose={onClose}
                        fetchData={fetchData}
                    />
                }
                {viewDialogOpen && <ViewDetail
                    isOpen={viewDialogOpen}
                    onClose={viewDialogClose}
                    currentData={currentData}
                />}
            </Box>
        </>
    )
}
