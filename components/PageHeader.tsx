import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Avatar, Center, Grid, GridItem, Link, Show, useColorMode, useToast } from "@chakra-ui/react"
import { SunIcon } from '@chakra-ui/icons';

const PageHeader = () => {
  const pathName = useRouter().pathname;
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const onColorToggleClick = () => {
    toggleColorMode();
    toast({
      description: `Theme changed to ${colorMode == 'dark' ? 'light' : 'dark'} mode 🙂`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      colorScheme: 'yellow'
    });
  }
  return <>
    <Show above='md'>
      <Grid
        w='100%'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(10, 1fr)'
      >
        <GridItem />
        <GridItem colSpan={8}>
          <Center>
            <NavLink href='/' isActive={pathName == '' || pathName == '/'} label='Home' />
            <NavLink href='/projects' isActive={pathName == '/projects'} label='Projects' />
            <NavLink href='/harshith-resume.pdf' isActive={false} label='Resume' />
            <NavLink href='/about' isActive={pathName == '/about'} label='About' />
          </Center>
        </GridItem>
        <GridItem>
          <SunIcon float={'right'} fontSize={30} cursor='pointer' onClick={onColorToggleClick} />
        </GridItem>
      </Grid>
    </Show>
    <Show below='md'>
      <Grid
        w='100%'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(10, 1fr)'
      >
        <GridItem colSpan={9}>
          <Center>
            <Link as={NextLink} href='/' fontWeight={600} textUnderlineOffset={5}>
              <Avatar size='xs' name='Harshith HM' bg='orange.400' />
            </Link>
            <Center>
              <NavLink href='/projects' isActive={pathName == '/projects'} label='Projects' isMobile />
              <NavLink href='/harshith-resume.pdf' isActive={false} label='Resume' isMobile />
              <NavLink href='/about' isActive={pathName == '/about'} label='About' isMobile />
            </Center>
          </Center>
        </GridItem>
        <GridItem>
          <SunIcon float={'right'} fontSize={24} cursor='pointer' onClick={onColorToggleClick} />
        </GridItem>
      </Grid>
    </Show>
  </>
}

const NavLink = ({
  href,
  isActive,
  label,
  isMobile
}
  : { label: string, href: string, isActive: boolean, isMobile?: boolean }
) => {
  return <Link
    as={NextLink}
    href={href}
    fontWeight={600}
    ml={isMobile ? 6 : 10}
    textUnderlineOffset={6}
    textDecorationThickness='2px'
    textDecorationLine={isActive ? 'underline' : undefined}
    isExternal={href.endsWith('.pdf')}
  >
    {label}
  </Link>
}

export default PageHeader;