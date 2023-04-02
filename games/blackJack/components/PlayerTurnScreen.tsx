import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Card, CardBody, CardHeader, Center, Divider, Grid, GridItem, Highlight, HStack, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Tag, TagLabel, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Motion, spring } from "react-motion";
import config from "../config";
import GameContext from "../state/context";
import Business from '../business/functions'
import { CheckCircleIcon, WarningTwoIcon } from "@chakra-ui/icons";


const PlayerTurnScreen = () => {
  const context = useContext(GameContext);
  const playerContext = context.playersContext[context.status.currentPlayerId];
  const { gameUiState } = context.status;
  const [btnClicked, setBtnClicked] = useState<'DRAW' | 'SKIP'>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const lastDrawnCard = playerContext.drawnCards.length > 0
    ? playerContext.drawnCards[playerContext.drawnCards.length - 1]
    : null;

  useEffect(() => {
    setIsLoading(context.status.networkStatus == 'LOADING');
  }, [context.status.networkStatus]);

  return <PlayerTurnModal isModalOpen={Business.showPlayerTurn(gameUiState)}>
    <Box p={[2, 4]}>
      <PlayersHand />
      <HStack mt={6}>
        <Box
          mr={[0, 0, 10]}
        >
          <Motion
            defaultStyle={{ scale: 0 }}
            style={{ scale: spring(1, { stiffness: 150, damping: 6 }) }}
          >
            {value => <Image
              src={gameUiState == 'DISPLAY_PLAYER_OPTIONS'
                ? 'https://deckofcardsapi.com/static/img/back.png'
                : lastDrawnCard!.image}
              alt='Card'
              h={['100px', '100px', '250px']}
              style={{ transform: `scale(${value.scale})` }}
            />}
          </Motion>
        </Box>
        {gameUiState == 'DISPLAY_PLAYER_OPTIONS' && <Box>
          <Text fontWeight={600}>Take an action</Text>
          <Divider mt={2} mb={6} />
          <Button
            onClick={() => {
              context.drawCard();
              setBtnClicked('DRAW');
            }}
            isLoading={isLoading && btnClicked == 'DRAW'}
            disabled={isLoading && btnClicked == 'SKIP'}
            colorScheme='green'>
            Show Card
          </Button>
          <Button
            onClick={() => {
              context.skipPlayer();
              setBtnClicked('SKIP');
            }}
            ml={4}
            colorScheme='red'
            isLoading={isLoading && btnClicked == 'SKIP'}
            disabled={isLoading && btnClicked == 'DRAW'}
            leftIcon={<WarningTwoIcon />}
          >
            Skip All Draws!
          </Button>
        </Box>}
        {gameUiState == 'HOLD_OR_SKIP_MODE' && <Box>
          <Text fontWeight={600}>What's your call?</Text>
          <Divider mt={1} mb={2} />
          <Text><b>{lastDrawnCard!.value} {lastDrawnCard!.suit}</b> has been drawn!</Text>
          <Text fontSize={16}>
            If you hold this card, your score will be <b>{Business.getScore(lastDrawnCard!) + playerContext.score} </b>
          </Text>
          <Box mt={6}>
            <Button
              onClick={() => {
                context.holdCard();
                setBtnClicked('DRAW');
              }}
              colorScheme='green'
              leftIcon={<CheckCircleIcon />}
            >
              Hold this card
            </Button>
            <Button
              onClick={() => {
                context.skipPlayer();
                setBtnClicked('SKIP');
              }}
              ml={4}
              colorScheme='red'
            >
              Skip All Draws!
            </Button>
          </Box>

        </Box>}
        {gameUiState == 'AUTOMATICALLY_SKIP_ON_DRAW' && <Box>
          <Text fontWeight={600}>😓 Oops, you are skipped!</Text>
          <Divider mt={1} mb={2} />
          <Text><b>{lastDrawnCard!.value} {lastDrawnCard!.suit}</b> has been drawn.</Text>
          <Text fontSize={16}>
            You have been skipped from drawing any card as
            your score will be <b>{Business.getScore(lastDrawnCard!) + playerContext.score} which exceeds {config.targetScore} </b>
          </Text>
          <Box mt={6}>
            <Button
              onClick={() => {
                context.skipPlayer();
                setBtnClicked('SKIP');
              }}
              ml={4}
              colorScheme='red'
            >
              Close & Proceed
            </Button>
          </Box>

        </Box>}
      </HStack>
    </Box >
  </PlayerTurnModal >
}

const PlayerTurnModal: React.FC<{ isModalOpen: boolean, children: React.ReactNode }> = (props) => {
  const { status, playersInfo } = useContext(GameContext);
  return <Modal
    isOpen={props.isModalOpen}
    onClose={() => { }}
    size={'4xl'}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{playersInfo[status.currentPlayerId].nickName}&apos; turn</ModalHeader>
      <ModalBody>
        {props.children}
      </ModalBody>
    </ModalContent>
  </Modal>
}

const PlayersHand = () => {
  const context = useContext(GameContext);
  const { playersContext, status } = context;
  const playerContext = playersContext[status.currentPlayerId];
  const emptyCardsCount = config.maxCardsAllowedPerUser - playerContext.drawnCards.length;
  return <Accordion defaultIndex={0} allowToggle>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex='1' textAlign='left'>
            View My Drawn Cards
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <HStack>
          {playerContext.drawnCards.map(card => <Box
            h={['100px', '100px', '200px']}
          >
            <Image
              src={card.image}
              h={['100px', '100px', '200px']}
              w={['72px', '72px', '144px']}
            />
          </Box>
          )}
          {new Array(emptyCardsCount).fill({}).map(_ => <Box
            h={['100px', '100px', '200px']}
            w={['72px', '72px', '144px']}
            border='1px dotted'
          />)}
        </HStack>
        <Tag color='green.400' p={2} mt={4}>
          <TagLabel mr={2}><CheckCircleIcon /></TagLabel>
          <TagLabel>
            <Text fontSize={18} fontWeight={600}>
              Your current score: {playerContext.score}
            </Text>
          </TagLabel>
        </Tag>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
}

export default PlayerTurnScreen;