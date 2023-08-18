import { Box, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Parameters, GameContext, getLanesCount, MarginLeftForLanes } from "../hook";

export const Arena: React.FC = () => {
  const { colorMode } = useColorMode();
  const context = useContext(GameContext);
  const numLanes = getLanesCount();
  return <Box w={'100%'} h={'80vh'} bg={colorMode == 'dark' ? 'gray.600' : 'gray.300'}
    id='road-rash-arena'
    position='relative'
  >
    <Flex h={'100%'} w={'100%'}>
      {new Array(numLanes).fill(0).map((_, i) => <Box key={i} width={`${100 / numLanes}%`} h={'100%'} borderRight={i < getLanesCount() - 1 ?
        "1px dashed #CCC" : ""}>
        {context.obstacles
          .filter(obs => obs.position.lane == i)
          .map((obs, j) => <Image key={j} src='/car_obs.png' alt='obstacle' width={'40px'} height={'10%'} position='absolute' marginLeft={`${MarginLeftForLanes[numLanes]}%`} top={`${obs.position.y}%`} textAlign='center' />)}
        {context.user.myCar.position.lane == i && <Image src='/car_purple.png' alt='obstacle' width={'40px'} height={'10%'} position='absolute' marginLeft={`${MarginLeftForLanes[numLanes]}%`} top={`${context.user.myCar.position.y}%`} textAlign='center' />}
      </Box>)}
    </Flex>
    {context.gameEnded && <>
      <Text fontSize={'xl'} top={'45%'} left={'37%'} position='absolute' color={'tomato'} fontWeight={600}>GAME OVER!</Text>
    </>}
  </Box>
}