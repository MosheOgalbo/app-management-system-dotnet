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
    Text,
    Badge,
    Skeleton,
    SkeletonCircle
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function ProductSkeleton() {

    return (
        <Box shadow={'md'} rounded={'md'} m={32}   >
            <Flex px={4} justifyContent={'space-between'} mb={10}>
                <Heading>
                    <Skeleton>product list</Skeleton>
                </Heading>
                <Skeleton>
                    <Button colorScheme='blue' leftIcon={<AddIcon />} >
                        add product
                    </Button>
                </Skeleton>
            </Flex>
            <TableContainer   >
                <Table variant='striped' >
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th><Skeleton>Id</Skeleton></Th>
                            <Th><Skeleton>Name</Skeleton></Th>
                            <Th><Skeleton>Description</Skeleton></Th>
                            <Th><Skeleton>IIs In Store</Skeleton></Th>
                            <Th isNumeric><Skeleton>Price</Skeleton></Th>
                            <Th><Skeleton>Actions</Skeleton></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            Array.from({ length: 5 }).map(() => (
                                <Tr key={1}>
                                    <Td>
                                        <Skeleton>02</Skeleton></Td>
                                    <Td>
                                        <HStack>
                                            <SkeletonCircle>DA Vinci</SkeletonCircle>

                                            <Text>
                                                <Skeleton>Product name</Skeleton>
                                            </Text>
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <Skeleton>Product Description </Skeleton></Td>
                                    <Td>
                                        <Badge>
                                            <Skeleton>yes </Skeleton>
                                        </Badge>
                                    </Td>
                                    <Td isNumeric>
                                        <Skeleton>123</Skeleton>
                                    </Td>
                                    <Td>
                                        <HStack gap={3}>
                                        <SkeletonCircle>Actions</SkeletonCircle>
                                        <SkeletonCircle>Actions</SkeletonCircle>
                                        <SkeletonCircle>Actions</SkeletonCircle>
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>

                </Table>
            </TableContainer>
        </Box>
    )
}
