import PageHeader from "@/components/PageHeader";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Center, Container, Heading } from "@chakra-ui/react";
import Head from "next/head"

const Projects = () => {
  return (
    <>
      <Head>
        <title>My Projects</title>
        <meta name="description" content="rojects by Harshith HM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="main">
        <PageHeader />
        <Container mt={32}>
          <Center>
            <InfoOutlineIcon fontSize={72} />
          </Center>
          <Center>
            <Heading mt={6}>
              Coming soon!
            </Heading>
          </Center>
        </Container>

      </main>
    </>)
}

export default Projects;