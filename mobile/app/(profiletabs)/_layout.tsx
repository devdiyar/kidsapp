  import { Stack } from 'expo-router';

export default function ProfileTabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="favoriten" 
        options={{ 
        }}
      />
      <Stack.Screen 
        name="angemeldeteVeranstaltungen" 
        options={{ 
        }}
      />
      <Stack.Screen 
        name="BesuchteVeranstaltungen" 
        options={{ 
        }}
      />
      <Stack.Screen 
        name="Einstellungen" 
        options={{ 
        }}
      />
    </Stack>
  );
}
