import { Stack } from "expo-router";
import { AppProvider } from "../src/context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Cafe App" }} />
        <Stack.Screen name="drinks" options={{ title: "Drinks" }} />
        <Stack.Screen name="cart" options={{ title: "Cart" }} />
        <Stack.Screen name="orders" options={{ title: "Orders" }} />
        <Stack.Screen name="shops" options={{ title: "Shops Near Me" }} />
      </Stack>
    </AppProvider>
  );
}
