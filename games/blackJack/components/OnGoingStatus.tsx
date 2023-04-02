import { ArrowRightIcon, BellIcon, CheckCircleIcon, ChevronRightIcon, WarningIcon } from "@chakra-ui/icons";
import { TableContainer, Table, TableCaption, Th, Thead, Tr, Tbody, Td, Tag, TagLabel, TagLeftIcon, Text, VStack, Card, CardHeader, CardBody, Button, Divider, Highlight, HStack } from "@chakra-ui/react"
import { useContext } from "react";
import GameContext from "../state/context";

const OnGoingStatus = () => {
  const { playersInfo, status, playersContext, deck, setUiState } = useContext(GameContext);
  return <>
    <HStack>
      <Text fontWeight={600}>
        <Highlight
          query={'Game in progress'}
          styles={{ bg: 'green.400', px: '2', borderRadius: 4 }}
        >
          Game in progress
        </Highlight>
      </Text>
      <Tag>
        <TagLabel>Cards remaining: {deck?.remaining}</TagLabel>
      </Tag>
    </HStack>
    <TableContainer mt={6}>
      <Table variant='simple'>
        <TableCaption>
          <Tag variant='solid' colorScheme={'whatsapp'} fontSize={20} p={2}>
            <TagLeftIcon><BellIcon /></TagLeftIcon>
            <TagLabel fontWeight={600}>
              It&apos; is {playersInfo[status.currentPlayerId].nickName}&apos;s turn to draw
            </TagLabel>
          </Tag>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Nick Name</Th>
            <Th>Cards in Hand</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {playersInfo.map(player => <Tr border={status.currentPlayerId == player.id ? '2px solid rgba(34, 195, 94, 0.6)' : undefined}>
            <Td>{player.nickName}</Td>
            <Td>{playersContext[player.id]?.drawnCards?.length ?? 0}</Td>
            <Td>{!status.skippedPlayers.includes(player.id)
              ? <Tag colorScheme={'green'}>
                <TagLeftIcon>
                  <CheckCircleIcon />
                </TagLeftIcon>
                <TagLabel>
                  Playing
                </TagLabel>
              </Tag>
              : <Tag colorScheme={'yellow'}>
                <TagLeftIcon>
                  <WarningIcon />
                </TagLeftIcon>
                <TagLabel>
                  Skipped
                </TagLabel>
              </Tag>}
            </Td>
          </Tr>)}
        </Tbody>
      </Table>
    </TableContainer>
    <Button
      colorScheme={'blue'}
      mt={6}
      w={'100%'}
      onClick={() => setUiState('DISPLAY_PLAYER_OPTIONS')}
    >
      Start Now
    </Button>
  </>
}

export default OnGoingStatus;