import ProjectContainer from "@/components/ProjectContainer"
import App from "@/games/blackJack/App"
import { Project } from "@/projectHelpers/util"
import { Heading, Divider } from "@chakra-ui/react"
import Head from "next/head"

const BlackJack = () => {
  return <>
    <Head>
      <title>My Projects - Black Jack</title>
      <meta name="description" content="Projects by Harshith HM" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    </Head>
    <main>
      <ProjectContainer currentProject={Project.Keypad}>
        <Heading>
          Card game of 21 - Black Jack
        </Heading>
        <Divider mb={10} mt={2} />
        <App />
      </ProjectContainer>
    </main>
  </>
}

export default BlackJack;