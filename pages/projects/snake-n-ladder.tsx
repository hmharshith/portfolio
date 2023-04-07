import PageHeader from "@/components/PageHeader"
import App from "@/games/snakeAndLadder/App"
import { Heading, Divider } from "@chakra-ui/react"
import Head from "next/head"

const SnakeAndLadder = () => {
  return <>
    <Head>
      <title>My Projects - Snake N Ladder</title>
      <meta name="description" content="Projects by Harshith HM" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    </Head>
    <main className='main'>
      <PageHeader />
      <Heading>
        Snake and Ladder
      </Heading>
      <Divider mb={10} mt={2} />
      <App />
    </main>
  </>
}

export default SnakeAndLadder;