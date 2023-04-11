import { Container } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'

function Layout({children}) {
  return (
    <>
        <main>
            <Container maxW='container.xl' paddingY='4'>
                <Navbar />
                {children}
            </Container>
        </main>
    </>
  )
}

export default Layout
