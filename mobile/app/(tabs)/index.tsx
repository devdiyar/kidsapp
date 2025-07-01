import { useEffect } from "react";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    router.replace("/(auth)/login");
  }, []);

  return null;
}