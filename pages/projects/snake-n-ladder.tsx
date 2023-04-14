import PageHeader from "@/components/PageHeader"
import ProjectContainer from "@/components/ProjectContainer"
import App from "@/games/snakeAndLadder/App"
import { Project } from "@/projectHelpers/util"
import { Heading, Divider } from "@chakra-ui/react"
import Head from "next/head"

const SnakeAndLadder = () => {
  return <>
    <Head>
      <title>My Projects - Snake N Ladder</title>
      <meta name="description" content="Projects by Harshith HM" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    </Head>
    <main>
      <ProjectContainer currentProject={Project.SnakeAndLadder}>
        <Heading mt={4}>
          Snake and Ladder
        </Heading>
        <Divider mb={4} mt={2} />
        <App />
      </ProjectContainer>
    </main>
  </>
}

export default SnakeAndLadder;