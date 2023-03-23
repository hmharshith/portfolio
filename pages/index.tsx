import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Grid, GridItem, ScaleFade, SlideFade, Text } from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import TypeWriter from '@/components/TypeWriter'
import { Motion, spring } from 'react-motion'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Harshith HM</title>
        <meta name="description" content="Generated by Harshith HM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Grid
          w='100%'
          h='100%'
          templateRows='repeat(1, 1fr)'
          templateColumns='repeat(2, 1fr)'
        >
          <GridItem >
            <Text fontSize={"xx-large"} float={'right'}>
              <TypeWriter
                content='Hello,'
                delay={500}
              />
            </Text>
          </GridItem>
          <GridItem>
            <Motion
              defaultStyle={{ translateX: 220 }}
              style={{ translateX: spring(0, { stiffness: 120, damping: 9 }) }}
            >
              {value => <Image
                src={'/programmer_1.png'}
                alt='Harshith HM'
                width={350}
                height={350}
                style={{ transform: `translateX(${value.translateX}px)` }}
              />}
            </Motion>
          </GridItem>
        </Grid>
      </main>
    </>
  )
}
