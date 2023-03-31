import React, { useState } from 'react';
import Head from "next/head"
import ProjectContainer from "@/components/ProjectContainer";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Divider, Heading, HStack, Input, Link, Text, useColorMode, useToast, VStack } from '@chakra-ui/react';
import { AlphabetOnlyKeypad, SpecialKeys } from 'rc-keypad';
import { SunIcon } from '@chakra-ui/icons';
import { Project } from '@/projectHelpers/util';

const Keypad = () => {
  const { colorMode } = useColorMode();
  const [input, setInput] = useState('');
  const [keypadColorMode, setKeypadColorMode] = useState(colorMode);
  const toast = useToast();

  const handleInput = (key: string | SpecialKeys) => {
    if (key == SpecialKeys.Capslock) {
      return;
    }
    else if (key == SpecialKeys.Enter) {
      toast({
        duration: 2000,
        description: input.length > 0 ? `You have submitted "${input}" 👍` : 'Please enter the input to submit!',
        position: 'top-right',
        status: input.length > 0 ? 'success' : 'warning',
      })
    }
    else if (key == SpecialKeys.Backspace) {
      setInput((prev) => prev.substring(0, prev.length - 1))
    }
    else {
      setInput((prev) => prev + key);
    }
  }

  return <>
    <Head>
      <title>My Projects - Keypad</title>
      <meta name="description" content="rojects by Harshith HM" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    </Head>
    <main>
      <ProjectContainer currentProject={Project.Keypad}>
        <div>
          <Heading>
            Simple Keypad
          </Heading>
          <Divider mb={10} mt={2} />
          <Center>
            <VStack w={400}>
              <HStack w={'100%'}>
                <Input value={input} disabled />
                <SunIcon
                  fontSize={24}
                  cursor='pointer'
                  onClick={() => setKeypadColorMode((prev) => prev == 'dark' ? 'light' : 'dark')}
                />
              </HStack>
              <AlphabetOnlyKeypad onKeyPress={handleInput} colorMode={keypadColorMode} />
            </VStack>
          </Center>
          <Center>
            <Card mt={[12, 20]} maxWidth='750px'>
              <CardHeader>
                <Box
                  onClick={() => window.open('https://www.npmjs.com/package/rc-keypad?activeTab=readme')}
                  cursor='pointer'
                >
                  <svg
                    viewBox="0 0 780 250" width={75} height={40}
                  >
                    <path fill="#CB3837" d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"></path>
                  </svg>
                </Box>
              </CardHeader>
              <Divider />
              <CardBody>
                A simple virtual keypad component which supports dark / light theme. Package is published to npm repository as {' '}
                <b>
                  rc-keypad</b>.
                It&apos;s developed from scratch with bare react, html, css hence there it has 0 additional dependency.
                <Text fontWeight={600} mt={2}>
                  The size of the gzipped package is under 1.5 Kb
                </Text>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button
                  onClick={() => window.open('https://www.npmjs.com/package/rc-keypad?activeTab=readme')}
                >
                  View Package
                </Button>
                <Button
                  onClick={() => window.open('https://bundlephobia.com/package/rc-keypad@1.0.0')}
                  ml={[2, 4]}>
                  View Bundle Size
                </Button>
                <Box
                  ml={[2, 4]}
                  mt={'2px'}
                  onClick={() => window.open('https://github.com/hmharshith/rc-keypad')}
                  cursor='pointer'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' width="30" height="35" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </Box>
              </CardFooter>
            </Card>
          </Center>
        </div>
      </ProjectContainer>
    </main>
  </>
}

export default Keypad;