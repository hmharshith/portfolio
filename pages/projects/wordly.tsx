import ProjectContainer from "@/components/ProjectContainer";
import useKeyPress from "@/hooks/useKeyPress";
import { applyWordly, LetterStatus, WordlyConfig, WordlyResponse } from "@/projectHelpers/wordly";
import { Box, Center, Divider, Flex, Heading, Text, VStack, useToast, Card, CardBody, Container, Stack, CardFooter, Button, UseToastOptions, ToastId, useColorMode, Modal, Image, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ListItem, UnorderedList, Link, Input, Show, HStack, Accordion, AccordionItem, AccordionIcon, AccordionPanel, AccordionButton } from "@chakra-ui/react";
import Head from "next/head"
import { useEffect, useMemo, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { ArrowForwardIcon, InfoIcon } from "@chakra-ui/icons";
// import { isMobileDevice } from "@/projectHelpers/util";
import { AlphabetOnlyKeypad } from "rc-keypad";
import { useRouter } from "next/router";
import { Project } from "@/projectHelpers/util";

type WordlyState = {
  words: WordlyResponse[],
  CURR_WORD: string,
  currentTurn: number,
  input: string,
  gameOver?: {
    won: boolean,
  }
}

const Wordly = () => {
  const [state, setState] = useState<WordlyState>(getInitialState());
  const [showModal, setShowModal] = useState(false);
  const { CURR_WORD, input, currentTurn, words, gameOver } = state;
  const { pressedKey, keyPressCount } = useKeyPress('ALPHA');
  const toast = useToast();
  const { colorMode } = useColorMode();
  const router = useRouter();

  const handleInput = (inputKey?: string) => {
    if (inputKey == undefined || state.gameOver != undefined) {
      return;
    }
    const newState = cloneDeep(state);
    if (state.input.length == WordlyConfig.numberOfLettersInTheWord && inputKey == 'Enter') {
      const wordlyOutput = applyWordly(CURR_WORD, newState.input);
      newState.words[currentTurn] = wordlyOutput;
      if (wordlyOutput.success) {
        newState.gameOver = {
          won: true,
        }
      }
      else {
        manageToast(newState, CURR_WORD, toast);
        if (newState.currentTurn >= WordlyConfig.maxAttempt - 1) {
          newState.gameOver = { won: false };
        }
        else {
          newState.words.push({});
          newState.currentTurn += 1;
          newState.input = ''
        }
      }
    }
    else if (state.input.length < WordlyConfig.numberOfLettersInTheWord && inputKey.length == 1) {
      newState.input += inputKey;
    }
    else if (state.input.length > 0 && inputKey == 'Backspace') {
      newState.input = newState.input.substring(0, newState.input.length - 1)
    }
    setState(newState);
  }

  useEffect(() => handleInput(pressedKey), [pressedKey, keyPressCount]);

  return (
    <>
      <Head>
        <title>My Projects - Wordly</title>
        <meta name="description" content="rojects by Harshith HM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
      </Head>
      <main>
        <ProjectContainer currentProject={Project.Wordly}>
          <div>
            <Heading>
              Wordly Game
              <Link variant={'link'} ml={4}
                onClick={() => setShowModal(true)}
                textDecoration='underline' textUnderlineOffset={4} size={'sm'}
                fontSize={16}
                fontWeight={400}
              >
                How to play <InfoIcon />
              </Link>
            </Heading>
            <Divider mb={10} mt={2} />
            <Show above="lg">
              <Box position={'fixed'} right={2} bottom={10} minW='400px' >
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          Virtual Keypad
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      <AlphabetOnlyKeypad onKeyPress={(key) => handleInput(key)} colorMode={colorMode} />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Show>

            {state.words.map((_, i) => <VStack my='14px' key={`word_${i}`}>
              <Center>
                {i < currentTurn && new Array(WordlyConfig.numberOfLettersInTheWord)
                  .fill({}).map((_, j) => <WordlySingleInput
                    key={`letter_below_${j}`}
                    str={words[i][j]?.ch ?? ''}
                    result={words[i][j]?.status}
                  />)}
                {i == currentTurn && new Array(WordlyConfig.numberOfLettersInTheWord)
                  .fill({}).map((_, j) => <WordlySingleInput
                    key={`letter_curr_${j}`}
                    str={input.length > j ? input[j] : ''}
                    result={words[i][j]?.status}
                  />)}
                {i > currentTurn && new Array(WordlyConfig.numberOfLettersInTheWord)
                  .fill({}).map((_, j) => <WordlySingleInput
                    key={`letter_above_${j}`}
                    str={''}
                  />)}
              </Center>
            </VStack>)}
            {gameOver && gameOver.won && <Container mt={12}><Card
              direction={{ base: 'column', sm: 'row' }}
              borderRadius={'lg'}
            >
              <Text align={'center'} fontSize={100}>🏆</Text>
              <Stack>
                <CardBody>
                  <Box>
                    <Heading size={'md'}>Hurray!</Heading>
                    <Text>
                      Congratulations on an amazing win! You solved wordly in {currentTurn + 1} attempts 😀
                    </Text>
                  </Box>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Button float={'right'} colorScheme='yellow' onClick={() => setState(getInitialState())}>Play Again</Button>
                  <Button
                    float={'right'}
                    ml={6}
                    rightIcon={<ArrowForwardIcon />}
                    onClick={() => router.push(`/projects/${Project.SnakeAndLadder.toLocaleLowerCase()}`)}
                  >View more projects</Button>
                </CardFooter>
              </Stack>
            </Card>
            </Container>}
            {gameOver && !gameOver.won && <Container mt={12}><Card
              direction={{ base: 'column', sm: 'row' }}
              borderRadius={'lg'}
            >
              <Text align={'center'} fontSize={90}>😓</Text>
              <Stack>
                <CardBody>
                  <Box>
                    <Heading size={'md'}>Max Attempts Reached!</Heading>
                    <Text>
                      That&apos;s Ok! Losing is part of the game. If you never lose, you are never truly tested, and never forced to grow.
                    </Text>
                  </Box>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Button float={'right'} colorScheme='yellow' onClick={() => setState(getInitialState())}>Play Again</Button>
                  <Button
                    onClick={() => router.push(`/projects/${Project.SnakeAndLadder.toLocaleLowerCase()}`)}
                    float={'right'}
                    ml={6}
                    rightIcon={<ArrowForwardIcon />}>View more projects</Button>
                </CardFooter>
              </Stack>
            </Card>
            </Container>}
          </div>
        </ProjectContainer>
        <HowToPlayModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </main>
      {<Show below="md">
        <Box pt={'175px'} />
        <Box position='fixed' bottom={0} w='100%' m={0}>
          <AlphabetOnlyKeypad onKeyPress={(key) => handleInput(key)} colorMode={colorMode} />
        </Box>
      </Show>}
    </>)
}

const WordlySingleInput = ({ str, result }: { str: string, result?: 'GRAY' | 'YELLOW' | 'GREEN' }) => {
  const { colorMode } = useColorMode();
  return <Flex w='50px' h='50px'
    border='1.5px solid'
    borderRadius='5px'
    mx='7px'
    bg={result ? colorMap[result][colorMode == 'dark' ? 1 : 0] : undefined}
  >
    <Center w='100%'>
      <Text>{str.toLocaleUpperCase()}</Text>
    </Center>
  </Flex>
}

const getInitialState = (): WordlyState => ({
  words: [{}],
  currentTurn: 0,
  input: '',
  CURR_WORD: WordlyConfig.words[Math.floor(Math.random() * 1000) % WordlyConfig.words.length],
});

const colorMap: { [key: string]: string[] } = {
  GRAY: ['gray.100', 'gray.600'],
  GREEN: ['green.100', 'green.600'],
  YELLOW: ['yellow.100', 'yellow.600'],
}

const manageToast = (newState: WordlyState, CURR_WORD: string, toast: { (options?: UseToastOptions): ToastId, isActive: (id: string) => boolean }) => {
  /*if (newState.currentTurn == 1 && !toast.isActive('pre-hint-toast')) {
    toast({
      id: 'pre-hint-toast',
      description: 'You are almost there!',
      status: 'info',
      duration: 1500,
      isClosable: true,
      position: "top-right"
    });
  }
  else */
  if (newState.currentTurn == 0 && !toast.isActive('hint-toast')) {
    toast({
      id: 'hint-toast',
      title: 'Here is the hint for you 🤫',
      description: <Text colorScheme={'green'} fontWeight={600} fontSize={30} my={4}>
        {WordlyConfig.wordHints[CURR_WORD]}
      </Text>,
      status: 'info',
      duration: null,
      isClosable: true,
      position: "top-right"
    });
  }
}

const HowToPlayModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>How to play ?</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text mb={4}>
          Guess the <b>WORDLE</b> in max {WordlyConfig.maxAttempt} tries.
        </Text>
        <UnorderedList mb={6}>
          <ListItem>Each guess must be a valid 5 letter word. Hit the enter button to submit.</ListItem>
          <ListItem>After each guess, the color of the tiles will change to show how close your guess was to the word.</ListItem>
          <ListItem>Simply type the guess word from your keyboard or virtual keypad to get started!</ListItem>
        </UnorderedList>
        <Image
          src="https://wordlewebsite.com/upload/imgs/wordle-example.png"
        />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
}
export default Wordly;