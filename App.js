import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import Nav from "./components/Nav";
import { TypeProvider } from "./hooks/useType";

export default function App() {
  return (
    <NavigationContainer>
      <TypeProvider>
        <Nav />
      </TypeProvider>
    </NavigationContainer>
  );
}
