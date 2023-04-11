import { Box, Button, ButtonGroup, Flex, Heading, Link, Spacer } from '@chakra-ui/react';
import React from 'react';
import NextLink from "next/link";

function Navbar() {
    return (
        <Flex minWidth="max-content" alignItems="center" gap="2" marginBottom='10'>
            <Box p="2">
                <Heading  as={NextLink} href='/' size="md">Chakra App</Heading>
            </Box>
            <Spacer />
            <ButtonGroup gap="5" alignItems='center'>
                <Link as={NextLink} href='/posts'>Posts</Link>
                <Button as={NextLink} colorScheme="teal" href='/posts/create'>Add New Post</Button>
            </ButtonGroup>
        </Flex>
    );
}

export default Navbar;
