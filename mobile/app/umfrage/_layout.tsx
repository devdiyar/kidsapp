import { Stack } from 'expo-router';

export default function UmfrageLayout() {
  return (
    <Stack>
      <Stack.Screen name="survey" options={{ headerShown: false }} />
    </Stack>
  );
}