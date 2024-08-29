import Animated, {useSharedValue, withTiming} from "react-native-reanimated";
import {Pressable, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {BlurView} from "expo-blur";
import {Normal} from "@/components/svg";
import React, {useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
// @ts-ignore NO TYPE FOR THIS
import {randomBytes} from "react-native-randombytes";
import {Colors} from "@/constants/Colors";
import {Mnemonic} from "ethers";


const Secret = () => {
  const [phase, setPhase] = useState<string[]>([])
  const opacity = useSharedValue(1);


  useEffect(() => {
    const entropy = randomBytes(16)
    let secret = Mnemonic.fromEntropy(entropy).phrase
    setPhase(secret.split(' '))
    SecureStore.setItemAsync('phase', secret);
  }, []);

  if (phase != null) return (
    <Pressable
      style={{borderRadius: 16, overflow: "hidden"}}
      onPress={() => {
        opacity.value = withTiming(0, {duration: 800})
      }}
    >
      <View style={styles.secretContainer}>
        {
          phase.map((item, index) => (
            <ThemedText key={index}>{item}</ThemedText>
          ))
        }
      </View>
      <Animated.View style={{
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        opacity
      }}
      >
        <BlurView
          intensity={11}
          tint='systemUltraThinMaterialDark'
          experimentalBlurMethod={'dimezisBlurView'}
          style={styles.blurContainer}
        >
          <Normal.LockIcon/>
          <ThemedText>
            CLICK HERE TO REVEAL SECRET WORDS
          </ThemedText>
        </BlurView>
      </Animated.View>
    </Pressable>
  )
};


const styles = StyleSheet.create(
  {
    secretContainer: {
      padding: 20,
      backgroundColor: Colors.dark.bgGray,
      gap: 12,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      position: "relative",
      overflow: "hidden",
    },
    blurContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      overflow: "hidden",
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },

  }
)


export default Secret;