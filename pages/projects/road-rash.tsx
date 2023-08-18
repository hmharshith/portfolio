import ProjectContainer from "@/components/ProjectContainer"
import App from "@/games/roadRash/App"
import { Project } from "@/projectHelpers/util"
import { Heading, Divider } from "@chakra-ui/react"
import Head from "next/head"

const roadRash = () => {
  return <>
    <Head>
      <title>My Projects - Car Game</title>
      <meta name="description" content="Projects by Harshith HM" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    </Head>
    <main>
      <ProjectContainer currentProject={Project.SnakeAndLadder}>
        <Heading mt={4}>
          Road Rash!
        </Heading>
        <Divider mb={4} mt={2} />
        <App />
      </ProjectContainer>
    </main>
  </>
}

export default roadRash;