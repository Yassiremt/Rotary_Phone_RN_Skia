import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

const useSoundLoader = () => {
  const [keyInSound, setKeyInSound] = useState<Sound>();
  const [keyOutSound, setKeyOutSound] = useState<Sound>();
  useEffect(() => {
    loadSounds();
  }, []);
  const loadSounds = async () => {
    const { sound: keyIn } = await Audio.Sound.createAsync(
      require("../assets/key_in.mp3")
    );
    setKeyInSound(keyIn);
    const { sound: keyOut } = await Audio.Sound.createAsync(
      require("../assets/key_out.mp3")
    );
    setKeyOutSound(keyOut);
  };
  return { keyInSound, keyOutSound };
};

export default useSoundLoader;
