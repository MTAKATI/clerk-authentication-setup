import {Stack} from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator, View } from "react-native";
import React from "react";


export default function Layout() {
  const {isLoaded, isSignedIn, userId, sessionId, getToken} = useAuth();

  // Debug logging
  //console.log('Auth Debug:', { isLoaded, isSignedIn, userId, sessionId });

  // Wait until Clerk finishes initialising to avoid transient undefined/false guards
  console.log("isSignedIn >>>", isSignedIn);
  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="sign-in" options={{headerShown: false}} />
        <Stack.Screen name="sign-up" options={{headerShown: false}} />
      </Stack.Protected>
    </Stack>
  );
}
