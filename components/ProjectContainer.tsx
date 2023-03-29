import { Box, Show, Text, useColorMode } from "@chakra-ui/react"
import { ReactPropTypes } from "react";
import PageHeader from "./PageHeader";

type ProjectContainerProp = {
  children: React.ReactNode;
}

const ProjectContainer: React.FC<ProjectContainerProp> = (props) => {
  const { colorMode } = useColorMode();
  return <>
    <Show above="sm">
      <Box w={'18%'} h='100%'
        bg={colorMode == 'dark' ? 'blackAlpha.400' : 'gray.100'}
        position='fixed' px='10px' pt='50px'>
        <Text> Wordly </Text>
      </Box>
    </Show>
    <Box w={['100%', '80%']} ml={[0, '20%']}>
      <div className="main">
        <PageHeader />
        <Box mt='32px'>
          {props.children}
        </Box>
      </div>
    </Box>
  </>
}

export default ProjectContainer;