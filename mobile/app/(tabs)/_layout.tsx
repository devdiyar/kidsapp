import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 100 + insets.bottom,
          paddingTop: 30,
          paddingBottom: insets.bottom,
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View
                style={{
                  backgroundColor: Colors.tabIconSelectedBg,
                  borderRadius: 50,
                  width: 60,
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather
                  name="search"
                  size={30}
                  color={Colors.tabIconSelected}
                />
              </View>
            ) : (
              <Feather name="search" size={30} color={Colors.tabIconDefault} />
            ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View
                style={{
                  backgroundColor: Colors.tabIconSelectedBg,
                  borderRadius: 50,
                  width: 60,
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="map" size={30} color={Colors.tabIconSelected} />
              </View>
            ) : (
              <Feather name="map" size={30} color={Colors.tabIconDefault} />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View
                style={{
                  backgroundColor: Colors.tabIconSelectedBg,
                  borderRadius: 50,
                  width: 60,
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="user" size={30} color={Colors.tabIconSelected} />
              </View>
            ) : (
              <Feather name="user" size={30} color={Colors.tabIconDefault} />
            ),
        }}
      />
      <Tabs.Screen
        name="_survey"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

