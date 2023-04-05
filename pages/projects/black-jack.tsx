import ProjectContainer from "@/components/ProjectContainer"
import App from "@/games/blackJack/App"
import { Project } from "@/projectHelpers/util"
import { WordlyConfig } from "@/projectHelpers/wordly"
import { InfoIcon } from "@chakra-ui/icons"
import { Heading, Divider, Button, Link, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, UnorderedList, Text } from "@chakra-ui/react"
import Head from "next/head"
import { useState } from "react"

const BlackJack = () => {
  const [showModal, setShowModal] = useState(false);
  return <>
    <Head>
      <title>My Projects - Black Jack</title>
      <meta name="description" content="Projects by Harshith HM" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    </Head>
    <main>
      <ProjectContainer currentProject={Project.Keypad}>
        <Heading>
          Card game of 21 - Black Jack <Link variant={'link'} ml={4}
            onClick={() => setShowModal(true)}
            textDecoration='underline' textUnderlineOffset={4} size={'sm'}
            fontSize={16}
            fontWeight={400}
          >
            How to play <InfoIcon />
          </Link>
        </Heading>
        <Divider mb={10} mt={2} />
        <App />
      </ProjectContainer>
      <HowToPlayModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  </>
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
        <UnorderedList mb={6}>
          <ListItem>The objective of the game is to beat other participants by getting a total count to 21 or as close to 21 as possible,
            without going over 21. Each player will be randomly assigned a card on their turn.</ListItem>
          <ListItem>If a player chooses to hold the card, their total score will increase by card value/score.</ListItem>
          <ListItem>If a player chooses to skip the card, they&apos;ll be active in the game and will not get any card to deal further.
            They&apos;ll loose the game if another player scores more(≤21). eg. Player 1 chooses to skip their turn at score 18. If Player 2 scores between 19-21, then player 2 wins.</ListItem>
          <ListItem>If the player draws the card whose value exceeds his/her score over 21 then the player will be automatically skipped for any further draws.</ListItem>
          <ListItem>An ace is worth 11. Face cards are worth 10. Any other number card is worth the number.</ListItem>
          <ListItem>Players can view the score board and each player&apos;s drawn cards after the game (i.e when all turns are exhausted)</ListItem>
        </UnorderedList>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
}

export default BlackJack;