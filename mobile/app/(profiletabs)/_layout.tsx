import { Stack } from 'expo-router';

export default function ProfileTabsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="favoriten" 
        options={{ 
          title: 'Favoriten',
          headerBackTitle: 'Zurück'
        }} 
      />
      <Stack.Screen 
        name="angemeldeteVeranstaltungen" 
        options={{ 
          title: 'Angemeldete Veranstaltungen',
          headerBackTitle: 'Zurück'
        }} 
      />
      <Stack.Screen 
        name="BesuchteVeranstaltungen" 
        options={{ 
          title: 'Besuchte Veranstaltungen',
          headerBackTitle: 'Zurück'
        }} 
      />
      <Stack.Screen 
        name="Einstellungen" 
        options={{ 
          title: 'Einstellungen',
          headerBackTitle: 'Zurück'
        }} 
      />
    </Stack>
  );
}
