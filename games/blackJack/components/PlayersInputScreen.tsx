import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardHeader, Container, Divider, FormControl, FormLabel, Input, Select, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import config from "../config";
import GameContext from "../state/context";

const PlayersInputScreen: React.FC = () => {
  const context = useContext(GameContext);
  const [playerCount, setPlayerCount] = useState<number>();
  const [nickNames, setNickNames] = useState<string[]>([]);
  const [isInitiating, setIsInitiating] = useState<boolean>(false);

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

  useEffect(() => {
    setIsInitiating(context.status.networkStatus == 'LOADING');
  }, [context.status.networkStatus]);

  return <Container>
    <Select
      onChange={(e) => onPlayerCountChange(+e.target.value)}
      placeholder='Select the number of players'
      mb={4}
    >
      {new Array(config.maxAllowedPlayers - 1)
        .fill({})
        .map((_, i) => <option value={i + 2}>{i + 2} Players</option>)}
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
        onClick={() => {
          context.onInputSubmit(nickNames);
        }}
        isLoading={isInitiating}
        loadingText='Initializing'
        rightIcon={<ArrowRightIcon />}>Start Playing</Button>
    </>}
  </Container>
}

export default PlayersInputScreen;