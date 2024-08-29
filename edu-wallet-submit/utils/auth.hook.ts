import {useLayoutEffect, useMemo, useRef, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {useRootNavigationState, useRouter, useSegments} from 'expo-router';
import {useFonts} from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useProtectedRoute = () => {
  const [isAuthentificated, setIsAuthentificated] = useState(false)


  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  const router = useRouter();
  const currentRouteRef = useRef<'auth' | 'tabs' | null>(null);
  const navigationKey = useMemo(() => {
    return rootNavigationState?.key;
  }, [rootNavigationState]);


  const [loaded, error] = useFonts({
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useLayoutEffect(() => {
    AsyncStorage.getItem('isAuthentificated').then(value => {
      return value === 'true';
    }).then(setIsAuthentificated);

    if (!navigationKey) {
      return;
    }

    if (loaded || error) {
      // SplashScreen.hideAsync();
      setTimeout(SplashScreen.hideAsync, 500);
    }

    if (
      !isAuthentificated &&
      currentRouteRef.current !== 'auth'
    ) {
      router.replace('/sign-up');
      currentRouteRef.current = 'auth';
    } else if (isAuthentificated && currentRouteRef.current !== 'tabs') {
      router.replace('/(tabs)');
      currentRouteRef.current = 'tabs';
    }
  }, [isAuthentificated, segments, navigationKey, loaded, error]);
};

export default useProtectedRoute;