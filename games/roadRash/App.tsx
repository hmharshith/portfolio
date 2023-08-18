import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tag, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Arena } from "./components/Arena";
import { Parameters, GameContext, LevelTagColorSchemes, useRoadRash, Variables } from "./hook";

const App: React.FC = () => {
  const { colorMode } = useColorMode();
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const gameContextValue = useRoadRash();

  useEffect(() => {
    sessionStorage.removeItem(Variables.USER_INPUT_LANES);
  }, []);

  return <>
    <Accordion maxWidth={'60%'} allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              Game Controls
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <Box>
            <Select placeholder="Number of Lanes" variant={'filled'} onChange={(e) => sessionStorage.setItem(Variables.USER_INPUT_LANES, e.target.value)}>
              <option value={4}>4 (default)</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </Select>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Button
      colorScheme={'yellow'}
      marginTop={6}
      onClick={() => {
        setIsGameOn(true);
        gameContextValue.gameOn();
      }}>
      Start Now
    </Button>
    <Modal
      isOpen={isGameOn}
      onClose={() => setIsGameOn(false)}
    >
      <GameContext.Provider value={gameContextValue}>
        <ModalOverlay />
        <ModalBody p={10}>
          <ModalCloseButton bgColor={'ButtonFace'} />
          <ModalContent>
            <Box p={2} display='inline-block'>
              Score: {gameContextValue.user.score}
              <Tag
                variant={'solid'}
                float='right'
                colorScheme={gameContextValue.user.level ? LevelTagColorSchemes[gameContextValue.user.level] : undefined}>
                {gameContextValue.user.level}
              </Tag>
            </Box>
            <Arena />
            <Button onClick={() => gameContextValue.onKeyPress('ArrowUp')}><ChevronUpIcon /></Button>
            <Flex width={'100%'}>
              <Button onClick={() => gameContextValue.onKeyPress('ArrowLeft')} width={'50%'}><ChevronLeftIcon /></Button>
              <Button onClick={() => gameContextValue.onKeyPress('ArrowRight')} width={'50%'}><ChevronRightIcon /></Button>
            </Flex>
            <Button onClick={() => gameContextValue.onKeyPress('ArrowDown')}><ChevronUpIcon /></Button>
          </ModalContent>
        </ModalBody>
      </GameContext.Provider>
    </Modal>
  </>
}

export default App;