import { useEffect, useState } from "react";

const useKeyPress = (allowed: 'ALPHA' | 'ALPHA_NUM' | 'NUM' | 'ALL' = 'ALL') => {
  const [pressedKey, setPressedKey] = useState<string>();
  const [keyPressCount, setKeyPressCount] = useState(0);
  const regex = {
    'ALPHA': /^[A-Za-z]+$/,
    'ALPHA_NUM': /^[a-zA-Z0-9]+$/,
    'NUM': /^[0-9]+$/,
    'ALL': /^.+$/,
  }
  const onKeyPress = (e: KeyboardEvent) => {
    setKeyPressCount((prevVal) => prevVal + 1);
    if (e.key.match(regex[allowed]) != null) {
      setPressedKey(e.key);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, []);

  return {
    pressedKey,
    keyPressCount,
  }
}

export default useKeyPress;