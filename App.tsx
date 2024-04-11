import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RotaryPhone from "./src/RotaryPhone";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#181625" }}>
      <RotaryPhone />
    </GestureHandlerRootView>
  );
}
