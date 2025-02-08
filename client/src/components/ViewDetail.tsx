import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Text,
    HStack,
    Avatar,
    Heading,
    VStack,
} from '@chakra-ui/react'
import { Product } from '../types/product'

type ViewDetailProps = {
    isOpen: boolean
    onClose: () => void
    currentData: Product
}

export default function ViewDetail({
    isOpen,
    onClose,
    currentData
}: ViewDetailProps) {

    return (
        <>

            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        View Detail {currentData.name}
                    </DrawerHeader>

                    <DrawerBody>
                        <HStack>
                            <Avatar
                                name={currentData.name}
                                size={'lg'}
                            />
                            <VStack
                                alignItems={'self-start'}
                            >
                                <Heading
                                    fontSize={16}
                                >
                                    {currentData.name}
                                </Heading>
                                <Heading
                                fontSize={20} >{currentData.price}</Heading>
                                <Text>${currentData.description}</Text>
                            </VStack>
                        </HStack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
