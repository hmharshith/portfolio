import { isMobileDevice, Project, ProjectNames } from "@/projectHelpers/util";
import { Box, Divider, Show, Text, useColorMode } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { ReactPropTypes } from "react";
import PageHeader from "./PageHeader";

type ProjectContainerProp = {
  children: React.ReactNode;
  currentProject: Project;
}

const ProjectContainer: React.FC<ProjectContainerProp> = ({ currentProject, children }) => {
  const { colorMode } = useColorMode();
  return <>
    <Show above="md">
      <Box w={'18%'} h='100%'
        bg={colorMode == 'dark' ? 'blackAlpha.400' : 'gray.100'}
        position='fixed' px='10px' pt='50px'>
        <Text fontWeight={600} mb={1}>Games</Text>
        <ProjectLineItem project={Project.RoadRash} />
        <ProjectLineItem project={Project.Wordly} />
        <ProjectLineItem project={Project.SnakeAndLadder} />
        <ProjectLineItem project={Project.BlackJack} />
        <Text fontWeight={600} mt={8} mb={1}>Packages</Text>
        <ProjectLineItem project={Project.Keypad} />
      </Box>
    </Show>
    <Box w={['100%', '80%']} ml={[0, '20%']}>
      <div className="main">
        <PageHeader />
        <Box mt='32px'>
          {children}
        </Box>
      </div>
    </Box>
  </>
}

export const ProjectLineItem = ({ project }: { project: Project }) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const currentRoute = router.pathname.split('/').reverse()[0];
  return <Box
    ml={4}
    p={1}
    bg={project.toLocaleLowerCase() == currentRoute.toLocaleLowerCase() ? `gray.${colorMode == 'dark' ? '6' : '3'}00` : undefined}
    borderRadius={4}
    cursor='pointer'
    onClick={() => router.push(`/projects/${project.toLocaleLowerCase()}`)}
  > {ProjectNames[project]} </Box>
}

export default ProjectContainer;