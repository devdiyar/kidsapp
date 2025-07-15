import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VeranstaltungProvider, useVeranstaltung } from "@/src/context/VeranstaltungContext";
import { AuthProvider } from "@/src/context/authContext";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function NavigationContent() {
  const { isFavorite, toggleFavorite, handleShare } = useVeranstaltung();
  
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(profiletabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details/[id]" 
        options={{
          headerShown: true,
          title: '',
          headerStyle: {
            backgroundColor: '#fff'
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <TouchableOpacity
                onPress={toggleFavorite}
                style={{ marginRight: 15 }}
              >
                <Ionicons
                  name={isFavorite ? "star" : "star-outline"}
                  size={24}
                  color={isFavorite ? "red" : "black"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare}>
                <Ionicons
                  name="share-social-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <VeranstaltungProvider>
          <NavigationContent />
          <StatusBar style="auto"/>
          <Toast />
        </VeranstaltungProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
