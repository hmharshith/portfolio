import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'

type TypeWriterProps = {
  delay?: number,
  speed?: number,
  content: string,
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  delay = 0,
  speed = 300,
  content,
}) => {
  const [text, setText] = useState('');

  if (text !== content) {
    setTimeout(() => {
      setText((prevText) => content.substring(0, prevText.length + 1))
    }, text == '' ? speed + delay : speed);
  }

  return <span className={styles.typewriter}>
    {text}
  </span>
}

export default TypeWriter;