import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";


type ProgressBarProps = {
  level: number;
}
export const ProgressBar = (
  {level}: ProgressBarProps) => {
  const width = useSharedValue<number>(0);

  const level2 = useAnimatedStyle(() => {
    return {
      backgroundColor: level>=2 ? Colors.dark.primary : Colors.dark.bgGray,
    };
  });

  const level3 = useAnimatedStyle(() => {
    return {
      backgroundColor: level>=3 ? Colors.dark.primary : Colors.dark.bgGray,
    };
  });


  const springConfig = {
    duration: 1500,
    dampingRatio: 0.1,
  }

  if (level === 1) width.value = withSpring(78, springConfig);
  if (level === 2) width.value = withSpring(246, springConfig);
  if (level === 3) width.value = withTiming(330, {duration: 500})

  return (
    <View style={styles.container}>
      <View style={styles.node}>
        <ThemedText size='xs' type="bold" style={styles.text}>1</ThemedText>
      </View>
      <Animated.View style={[styles.node, level2]}>
        <ThemedText size='xs' type="bold" style={styles.text}>2</ThemedText>
      </Animated.View>
      <Animated.View style={[styles.node, level3]}>
        <ThemedText size='xs' type="bold" style={styles.text}>3</ThemedText>
      </Animated.View>
      <Animated.View style={{ ...styles.bar, width, backgroundColor: "#080FA5",zIndex: 5 }} />
      <View style={styles.bar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    width: 350,
    height: 23,
    marginVertical: 40,
    marginHorizontal: "auto"
  },
  bar: {
    borderRadius: 1,
    height: 3,
    width: 327,
    backgroundColor: Colors.dark.bgGray,
    position: 'absolute',
    top: 10,
    left: 11.5,
    zIndex: 1,
  },
  node: {
    height: 23,
    width: 23,
    backgroundColor: Colors.dark.primary,
    borderRadius: 20,
    zIndex: 10,
    // shadow for ios & android
    elevation: 6,
    shadowRadius: 4,
    shadowColor: '#00000040',
  },
  text: {
    lineHeight: 17,
    zIndex: 15,
    textAlign: 'center',
    marginVertical: "auto",
  },
});
