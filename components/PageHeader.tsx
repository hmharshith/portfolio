import NextLink from 'next/link'
import { Box, Center, Heading, Link, Text } from "@chakra-ui/react"

const PageHeader = () => {
  return <Box w='100%' height='100px' >
    <Center>
      <Link as={NextLink} href='/projects' fontWeight={600}>
        Home
      </Link>
      <Link as={NextLink} href='/projects' fontWeight={600} ml={10}>
        Projects
      </Link>
      <Link as={NextLink} href='/projects' fontWeight={600} ml={10}>
        Resume
      </Link>
      <Link as={NextLink} href='/projects' fontWeight={600} ml={10}>
        About
      </Link>
    </Center>
  </Box>
}

export default PageHeader;