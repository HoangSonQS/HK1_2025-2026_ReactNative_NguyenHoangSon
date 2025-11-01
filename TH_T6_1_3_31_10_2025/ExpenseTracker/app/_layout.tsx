import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    // Câu 1a: Bọc toàn bộ app
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Chúng ta sẽ thêm các màn hình Add/Edit ở đây sau */}
      </Stack>
    </SafeAreaProvider>
  );
}