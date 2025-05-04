import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import "react-native-reanimated"
import "../global.css"

import { useColorScheme } from "@/hooks/useColorScheme"
import { QueryProvider } from "@/providers/QueryProvider"
import { ImageBackground, StyleSheet, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <QueryProvider
      defaultOptions={{
        queries: {
          retry: 2,
          staleTime: 1000 * 60 * 5, // 5 minutes
          cacheTime: 1000 * 60 * 30, // 30 minutes
          refetchOnWindowFocus: true,
          refetchOnReconnect: true,
          refetchOnMount: true,
        },
        mutations: {
          retry: 1,
        },
      }}
    >
      <SafeAreaProvider>
        {/* <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack> */}
        <ImageBackground
          className="z-0 flex items-center justify-center"
          source={require("../assets/images/grad.png")}
          resizeMode="cover"
          style={{
            ...(StyleSheet.absoluteFill as any),
            width: "100%",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "black",
              opacity: 0.2,
            }}
          />
          <Slot />
        </ImageBackground>
      </SafeAreaProvider>
    </QueryProvider>
  )
}
