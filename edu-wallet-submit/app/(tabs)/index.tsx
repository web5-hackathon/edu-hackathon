import React, {useLayoutEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ThemedText} from "@/components/ThemedText";
import {Normal} from "@/components/svg";
import {Colors} from "@/constants/Colors";
import {Link} from "expo-router";
import List from "@/components/List";
import Animated, {FlipInEasyX, FlipOutEasyX} from "react-native-reanimated";
import {ethers} from "ethers";
import * as SecureStore from "expo-secure-store";


const AssetPage = () => {
  const [balance, setBalance] = useState('0')

  const provider = new ethers.InfuraProvider('sepolia');

  useLayoutEffect(() => {
    const address = SecureStore.getItem('address') as string;
    provider.getBalance(address)
      .then(ethers.formatEther)
      .then(setBalance)
  }, []);


  return (
    <View style={styles.container}>
      <View style={[styles.row,{paddingBottom: 40}]}>
        <Image source={require("@/assets/images/avatar.png")} width={68} height={68} style={styles.avatar}/>
        <View>
          <ThemedText>Hi, akbcut554</ThemedText>
          <ThemedText type='muted'>Good Morning 👋</ThemedText>
        </View>
        <View style={{
          flexDirection: "row",
          flex: 1,
          gap: 16 ,
          display: "flex",
          justifyContent: "flex-end",
        }}>
          <Link href="/transaction">
            <Normal.Clock length={32}/>
          </Link>
          <Normal.Scan length={32}/>
        </View>
      </View>
      <Animated.View style={styles.balance} entering={FlipInEasyX} exiting={FlipOutEasyX}>
        <ThemedText style={{fontSize: 40, lineHeight: 60}} type="bold"
                    numberOfLines={1} ellipsizeMode='tail'
        >${balance}</ThemedText>
        <ThemedText type="muted">Your Balance</ThemedText>
        <View style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: 16,
          gap: 4,
          alignItems: "center",
          alignSelf: "flex-end",
        }}>
          <ThemedText type="muted">Profit</ThemedText>
          <ThemedText size='sm' type='medium'>$0</ThemedText>
        </View>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Link href='/transfer' asChild>
          <TouchableOpacity style={buttonStyle.buttonWarp1} activeOpacity={0.85}>
            <View style={styles.buttonIcon}>
              <Normal.LeftArrow color={Colors.dark.fill} transform="rotate(135 7 6)"/>
            </View>
            <ThemedText size='sm' type='medium'>Transfer</ThemedText>
          </TouchableOpacity>
        </Link>
        <Link href='/request' asChild>
          <TouchableOpacity style={buttonStyle.buttonWarp2} activeOpacity={0.85}>
            <View style={styles.buttonIcon}>
              <Normal.LeftArrow color={Colors.dark.fill} transform="rotate(-45 7 6)"/>
            </View>
            <ThemedText size='sm' style={{color: Colors.dark.fill}} type='medium'>Request</ThemedText>
          </TouchableOpacity>
        </Link>
        <Link href='/receive-invalid' asChild>
          <Pressable style={{width: 54, height: 54, backgroundColor: Colors.dark.bgGray, borderRadius: 100,alignItems: "center",
            justifyContent: "center",}} >
            <Normal.QRCode />
          </Pressable>
        </Link>
      </View>
      <List />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    position: 'relative',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 50,
    marginRight: 12,
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  balance: {
    display: "flex",
    backgroundColor: Colors.dark.bgGray,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 16,
    padding: 16,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    paddingVertical: 24,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 54,
    gap: 4,
    paddingVertical: 16,
    paddingLeft: 60,
    paddingRight: 22,
    borderRadius: 100,
    position: "relative",
  },
  buttonIcon: {
    ...StyleSheet.absoluteFillObject,
    top: 3,
    left: 3,
    width: 48,
    height: 48,
    borderWidth: 12,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});


const buttonStyle = StyleSheet.create({
  buttonWarp1: {
    ...styles.button,
    backgroundColor: '#121BDF',
  },
  buttonWarp2: {
    ...styles.button,
    backgroundColor: '#2AE9B9',
  },
})

export default AssetPage;