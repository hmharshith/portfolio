import { ArrowRightIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Divider, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, Tag, Text } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useState } from "react";
import { GetCellData, getCellBg, getCellWormHoleContent, getWinner } from "./state/functions";
import { CellProps, GameState, Player } from "./types"

export const Board: React.FC<{ gameState: GameState, rollDice: () => void }> = ({ gameState, rollDice }) => {
  const { board, diceValue, currentPlayerId, playerContext, step } = gameState;
  const currPlayerName = playerContext[currentPlayerId].name;
  console.log(step);
  return <Box display={'flex'} flexDirection='column'>
    <Tag
      variant={'solid'}
      colorScheme='green'
      mb={[2, 4]}
      p={[1, 2]}
    >
      <Text fontWeight={600} fontSize={18}>
        {diceValue == 0 || diceValue == null ? `${currPlayerName}'s turn!` : `${currPlayerName} has rolled ${diceValue}`}
      </Text>
    </Tag><Box display='grid' gridTemplateColumns={new Array(Math.sqrt(board.cells.length)).fill('auto').join(' ')}>
      {board.cells.slice().reverse()
        .map(cell => <Cell key={`cell_${cell.value}`} {...GetCellData(cell.value, gameState)} />)}
    </Box>
    <HStack>
      <Button
        isLoading={step != null}
        loadingText={step != null ? `Moving ${diceValue} steps` : undefined}
        onClick={rollDice}
        mt={[4, 8]}
        colorScheme='blue'
        rightIcon={<ArrowRightIcon />}
      >
        Role the Dice
      </Button>
    </HStack>
  </Box>
}

export const Cell: React.FC<CellProps> = (props) => {
  const { value, playerNames } = props;
  return <><Box border='1px solid' h={[16, 20]} bg={getCellBg(props)} p={[1, 2]}>
    <Text fontSize={10}>{value}</Text>
    {playerNames && playerNames.map(player => <Avatar key={player} size={['xs', 'sm']} name={player} />)}
    <Text fontWeight={600} fontSize={12} textAlign='right'>{getCellWormHoleContent(props)}</Text>
  </Box>

  </>
}

export const GameOver: React.FC<{ gameState: GameState }> = ({ gameState }) => {
  const winner = getWinner(gameState);
  const router = useRouter();
  return <>
    <Container mt={[2, 6]}>
      <Text fontWeight={600} mb={[2, 4]}>Game Over!</Text>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        borderRadius={'lg'}
      >
        <Text align={'center'} fontSize={100}>🏆</Text>
        <Stack>
          <CardBody>
            <Box>
              <Heading size={'md'}>Hurray!</Heading>
              <Text>
                {winner?.name} has won! 😀
              </Text>
            </Box>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button float={'right'} colorScheme='yellow' onClick={router.reload}>Play Again</Button>
          </CardFooter>
        </Stack>
      </Card>
    </Container>
  </>
}

export const PlayerInput: React.FC<{ addPlayers: (players: Player[]) => void }> = ({ addPlayers }) => {
  const [playerCount, setPlayerCount] = useState<number>();
  const [nickNames, setNickNames] = useState<string[]>([]);

  const onPlayerCountChange = (count: number) => {
    setPlayerCount(count);
    setNickNames(new Array(count).fill(''))
  }

  const onNickNameChange = (val: string, index: number) => {
    setNickNames((prev) => {
      const newState = [...prev];
      newState[index] = val.trim();
      return newState;
    })
  }

  const onSubmit = () => {
    addPlayers(nickNames.map((name, i) => ({
      id: i,
      name: name
    })));
  }

  return <>
    <Container>
      <Select
        onChange={(e) => onPlayerCountChange(+e.target.value)}
        placeholder='Select the number of players'
        mb={4}
      >
        {new Array(4)
          .fill({})
          .map((_, i) => <option key={`playerop_${i}`} value={i + 2}>{i + 2} Players</option>)}
      </Select>
      {playerCount && <><Card mt={6}>
        <CardHeader>
          Player details
        </CardHeader>
        <Divider />
        <CardBody>
          {new Array(playerCount).fill('').map((_, i) => <FormControl mt={2} isRequired>
            <FormLabel>Player {i + 1}</FormLabel>
            <Input
              type='text'
              placeholder="Nick Name"
              onChange={(e) => onNickNameChange(e.target.value, i)}
            />
          </FormControl>
          )}
        </CardBody>
      </Card>
        <Button
          mt={4}
          float='right'
          colorScheme={'yellow'}
          type='submit'
          onClick={onSubmit}
          rightIcon={<ArrowRightIcon />}>Start Playing</Button>
      </>}
    </Container>
  </>
}