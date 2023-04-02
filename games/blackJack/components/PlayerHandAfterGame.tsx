import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tag, TagLabel, Text } from "@chakra-ui/react";
import { useContext } from "react";
import GameContext from "../state/context";

const PlayerHandAfterGame = ({ id, isOpen, onClose }: { id: number, isOpen: boolean, onClose: () => void }) => {
  const context = useContext(GameContext);
  const playerContext = context.playersContext[id];
  const hasSkippedCard = playerContext.drawnCards.length == playerContext.holdingCards.length + 1;
  return <Modal
    isOpen={isOpen}
    onClose={onClose}
    size='4xl'
    closeOnEsc
    closeOnOverlayClick
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        {context.playersInfo[id].nickName}&apos;s Hand 😀
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody p={[2, 2, 4]}>
        <HStack>
          {playerContext.drawnCards.map((card, i) => <Box
            h={['100px', '100px', '200px']}
          >
            <Image
              src={card.image}
              h={['100px', '100px', '200px']}
              w={['72px', '72px', '144px']}
              opacity={i == playerContext.drawnCards.length - 1 && hasSkippedCard ? 0.3 : 1}
            />
          </Box>
          )}
          {playerContext.drawnCards.length == 0 && <Text>
            You haven't drawn any card 😪
          </Text>}
        </HStack>
        <Tag color='green.400' p={2} mt={4}>
          <TagLabel mr={2}><CheckCircleIcon /></TagLabel>
          <TagLabel>
            <Text fontSize={18} fontWeight={600}>
              Your total score: {playerContext.score}
            </Text>
          </TagLabel>
        </Tag>
      </ModalBody>
    </ModalContent>
  </Modal>
}

export default PlayerHandAfterGame;