import { useState } from "react";
import { Text } from "@chakra-ui/react";

type TypeWriterProps = {
  typeAfter?: number,
  typingDelay?: number,
  content: string,
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  typeAfter = 0,
  typingDelay = 100,
  content,
}) => {
  const [text, setText] = useState('');

  if (text !== content) {
    setTimeout(() => {
      setText(content.substring(0, text.length + 1))
    }, text == '' ? typeAfter : typingDelay);
  }

  return <Text className='typewriter'>
    {text}
  </Text>
}

export default TypeWriter;