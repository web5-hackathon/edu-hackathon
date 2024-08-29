import {Tabs} from 'expo-router';
import React from 'react';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import CommonCSS from "@/constants/CommonCSS";
import {Tab as TabsIcon} from "@/components/svg"

const windowHeight = Dimensions.get('window').height;

const Test = ({ focused, ...rest}: {
  focused: boolean;
}) => {
  const width = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(width.value, config),
    };
  });
  width.value = 42;
  if (!focused) {
    width.value = 0;
  }
  return (
    <Animated.View style={[{
      position: 'absolute',
      height: 4,
      width: 0,
      borderRadius: 100,
      bottom: 0,
      backgroundColor: 'blue'
    },style]}>
    </Animated.View>
  )
}


export default function TabLayout() {
  return (
    <Tabs
      sceneContainerStyle={CommonCSS.screen}
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          top: windowHeight - 86,
          marginHorizontal: 20,
          marginBottom: 20,
          borderRadius: 100,
          height: 76,
          paddingHorizontal: 40,
          backgroundColor: "white",
        },
        tabBarItemStyle: {
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          paddingVertical: 16,
          paddingHorizontal: 16,
          position: "relative",
        },
        tabBarLabel: ({focused,...rest})=> <Test focused={focused}/>,
        tabBarActiveTintColor: '#1C1C1C',
        headerShown: false,

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wallet',
          tabBarIcon: ({  focused }) => (
            focused ? <TabsIcon.Asset1 /> : <TabsIcon.Asset2 />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Achievements',
          tabBarIcon: ({  focused }) => (
            focused ? <TabsIcon.Achievements1 /> : <TabsIcon.Achievements2 />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({  focused }) => (
            focused ? <TabsIcon.Setting1 /> : <TabsIcon.Setting2 />
          ),
        }}
      />
    </Tabs>
  );
}
