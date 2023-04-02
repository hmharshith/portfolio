import { Box, Button, Divider, Heading, Highlight, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import GameContext from "../state/context";
import Business from '../business/functions';
import PlayerHandAfterGame from "./PlayerHandAfterGame";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const GameOverScreen = () => {
  const router = useRouter();
  const context = useContext(GameContext);
  const playersList = Business.getPlayersOrderedListAfterGame(context);
  const [viewMoreModal, setViewMoreModal] = useState<boolean>();
  const [selectedId, setSelectedId] = useState<number>();
  const highestScore = context.playersContext[playersList[0]].score;
  const toast = useToast();
  useEffect(() => {
    if (!toast.isActive('game-over')) {
      toast({
        id: 'game-over',
        position: 'top-right',
        duration: 2000,
        title: <Text fontWeight={600} fontSize={24}>Game Over!</Text>,
        status: 'success',
      });
    }
  }, []);

  return <Box mt={[4, 4, 8]}>
    <Text fontWeight={600} fontSize={28}>
      <Highlight
        styles={{ bg: 'yellow.400', px: '2', }}
        query={'Score Board'}>
        Score Board
      </Highlight>
    </Text>
    <TableContainer mt={2}>
      <Table variant='simple'>
        <TableCaption>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Nick Name</Th>
              <Th>Holding Cards</Th>
              <Th>Score</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {playersList.map(id => <Tr>
              <Td>{context.playersContext[id].score == highestScore ? <Text fontSize={24}>🏆</Text> : ''}</Td>
              <Td>{context.playersInfo[id].nickName}</Td>
              <Td>{context.playersContext[id].holdingCards.length}</Td>
              <Td>{context.playersContext[id].score}</Td>
              <Td>
                <Button onClick={() => {
                  setSelectedId(id);
                  setViewMoreModal(true);
                }}>
                  View More
                </Button>
              </Td>
            </Tr>)}
          </Tbody>
        </TableCaption>
      </Table>
    </TableContainer>
    {
      selectedId != undefined
      && <PlayerHandAfterGame id={selectedId} isOpen={viewMoreModal ?? false} onClose={() => setViewMoreModal(false)} />
    }
    <Box mt={6}>
      <Button
        onClick={() => router.reload()}
      >
        New game with different players
      </Button>
      <Button
        ml={4}
        onClick={context.resetGame}
        colorScheme='green'
        rightIcon={<ArrowRightIcon />}
      >
        Play Again
      </Button>
    </Box>
  </Box >
}

export default GameOverScreen;