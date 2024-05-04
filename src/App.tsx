import "@tamagui/core/reset.css";
import { createTamagui, TamaguiProvider, View } from "tamagui";
import { config } from "@tamagui/config/v2";
import { ExampleComponent } from "./components/ExampleComponent";

// you usually export this from a tamagui.config.ts file:
// this can be as simple as an empty object
const tamaguiConfig = createTamagui(config);

const App = () => (
  <TamaguiProvider config={tamaguiConfig}>
    <View
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <ExampleComponent />
    </View>
  </TamaguiProvider>
);

export default App;
