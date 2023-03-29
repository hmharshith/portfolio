import Head from 'next/head'
import Image from 'next/image'
import { Box, Flex, Grid, GridItem, Heading, Highlight, Link, Show, SlideFade, Text } from '@chakra-ui/react'
import TypeWriter from '@/components/TypeWriter'
import { Motion, spring } from 'react-motion'
import PageHeader from '@/components/PageHeader'
import { useEffect, useState } from 'react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Harshith HM</title>
        <meta name="description" content="Portfolio of Harshith HM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className='main'>
        <SlideFade in={true} offsetX={'400px'}>
          <PageHeader />
          <Show below='md'>
            <Grid
              w='100%'
              h='100%'
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(1, 1fr)'
              justifyItems={'center'}
              mt={12}
            >
              <GridItem>
                <Motion
                  defaultStyle={{ translateX: -50 }}
                  style={{ translateX: spring(0, { stiffness: 150, damping: 6 }) }}
                >
                  {value => <Text fontSize={'large'} style={{ transform: `translateX(${value.translateX}px)` }}>
                    👋 Hello, My name is
                  </Text>}
                </Motion>
                <Heading ml={'10px'}>
                  <TypeWriter
                    content='Harshith HM'
                    typeAfter={800}
                  />
                </Heading>
              </GridItem>
              <GridItem mt={6}>
                <Motion
                  defaultStyle={{ translateX: 100 }}
                  style={{ translateX: spring(0, { stiffness: 150, damping: 6 }) }}
                >
                  {value => <Image
                    src={'/freelancer_optimized.png'}
                    alt='Harshith HM'
                    width={200}
                    height={200}
                    style={{ transform: `translateX(${value.translateX}px)` }}
                  />}
                </Motion>
              </GridItem>
              <GridItem ml={6}>
                <MySummary />
              </GridItem>
            </Grid>
          </Show>
          <Show above='md'>
            <Grid
              w={'100%'}
              h={'100%'}
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(9, 1fr)'
              mt={36}
            >
              <GridItem colSpan={2} />
              <GridItem colSpan={3} mt={12}>
                <Motion
                  defaultStyle={{ translateX: -100 }}
                  style={{ translateX: spring(0, { stiffness: 150, damping: 5 }) }}
                >
                  {value => <Text fontSize={'large'} style={{ transform: `translateX(${value.translateX}px)` }}>
                    👋 Hello, My name is
                  </Text>}
                </Motion>
                <Heading ml={'10px'}>
                  <TypeWriter
                    content='Harshith HM'
                    typeAfter={600}
                  />
                </Heading>
                <MySummary />
              </GridItem>
              <GridItem colSpan={2}>
                <Motion
                  defaultStyle={{ translateX: 220 }}
                  style={{ translateX: spring(0, { stiffness: 150, damping: 6 }) }}
                >
                  {value => <Image
                    src={'/freelancer_optimized.png'}
                    alt='Harshith HM'
                    width={350}
                    height={350}
                    style={{ transform: `translateX(${value.translateX}px)` }}
                  />}
                </Motion>
              </GridItem>
              <GridItem colSpan={2} />
            </Grid>
          </Show>
        </SlideFade>
      </main>
    </>
  )
}

const MySummary = () => {
  const [showMySummary, setShowMySummary] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMySummary(true);
    }, 2200);
  }, [])

  return <Box mt={10} pr={10}>
    <SlideFade in={showMySummary} offsetY='50px'>
      <Text fontSize={'large'}>
        <Highlight
          query={['Software Engineer', '5 years']}
          styles={{ bg: 'yellow.100', px: '1.5', rounded: 'full' }}
        >
          I&#39;m a Software Engineer from Bangalore, India with nearly 5 years of experience, currently building the
          frontend applications for consumer products at
        </Highlight>
        {' '}
        <Link href='https://cleartax.in' color={'yellow.400'} textUnderlineOffset={5} isExternal>
          Cleartax
        </Link>
      </Text>
      <Text mt={6}>
        I 💛 to travel, trek and workout
      </Text>
    </SlideFade>
  </Box>
}