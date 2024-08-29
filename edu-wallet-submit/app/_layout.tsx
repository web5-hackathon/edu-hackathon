import {DarkTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useState} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import useProtectedRoute from "@/utils/auth.hook";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [delay, setDelay] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false);

  useProtectedRoute();

  return (
    // colorScheme === 'dark' ? DarkTheme : DefaultTheme
    <ThemeProvider value={DarkTheme}>
      <Stack initialRouteName={isSignedIn ? "(tabs)" : "sign-up/(step)"} screenOptions={{}}>
        <Stack.Screen name="playground1" options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
          animation: 'slide_from_right',
        }}/>
        <Stack.Screen name="sign-up/index" options={
          {
            title: "Sign Up",
            headerShown: false,
            animation: 'fade_from_bottom',
          }}/>
        <Stack.Screen name="(asset)" options={{headerShown: false, animation: 'slide_from_right',}}/>
        <Stack.Screen name="+not-found" options={{headerShown: false}}/>
        <Stack.Screen name="sign-up/(step)" options={
          {
            title: "Sign Up | Step 1",
            animation: 'slide_from_right',
            headerShown: false,
          }}/>
        <Stack.Screen name="sign-up/importPage" options={
          {
            title: "Import Account",
            animation: 'slide_from_right',
            headerShown: false,
          }}/>
        <Stack.Screen name="sign-up/complete"
                      options={{
                        animation: 'slide_from_right',
                        headerShown: false
                      }}/>
      </Stack>
    </ThemeProvider>
  );
}
