import {Button, StyleSheet, View} from 'react-native';


import {ThemedText} from '@/components/ThemedText';
import {Link} from "expo-router";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";


export default function HomeScreen() {
  const [refresh, setRefresh] = useState(false)
  const [items, setItems] = useState<any>({
    phase: undefined,
    address: undefined,
    privateKey: undefined,
    isAuthentificated: undefined,
    password: undefined
  })
  useEffect(() => {
    const phase = SecureStore.getItem('phase') || undefined;
    const address = SecureStore.getItem('address') || undefined;
    const privateKey = SecureStore.getItem('privateKey') || undefined;
    const password = SecureStore.getItem('password') || undefined;
    AsyncStorage.getItem('isAuthentificated').then(value => {
      setItems({phase, address, privateKey, isAuthentificated: value, password})
    });
  }, [refresh]);

  async function ClearAllState() {
    await SecureStore.deleteItemAsync('phase');
    await SecureStore.deleteItemAsync('address');
    await SecureStore.deleteItemAsync('privateKey');
    await AsyncStorage.setItem('isAuthentificated', 'false');
    setRefresh(!refresh)
  }


  return (
    <View style={{padding: 40, backgroundColor: '#191970', flex: 1, gap: 20}}>
      <ThemedText type='bold' size='xl'>Test PlayGround !!!</ThemedText>
      <ThemedText type='bold' size='lg'>Welcome!</ThemedText>
      <View style={{gap: 12}}>
        <Link href="/sign-up"><ThemedText type='link'>Sign up</ThemedText></Link>
        <Link href="/sign-up/step2"><ThemedText type='link'>Sign up/Step2</ThemedText></Link>
        <Link href="/asset"><ThemedText type='link'>Asset</ThemedText></Link>
        {/*<Link href="/playground1"><ThemedText type='link'>PlayGround1</ThemedText></Link>*/}
        <Link href="/playground2"><ThemedText type='link'>PlayGround2</ThemedText></Link>
      </View>

      <Button title="Clear All State" onPress={ClearAllState}/>


      <View style={{gap: 12}}>
        <ThemedText type='bold' size='xl'>Status</ThemedText>
        <ThemedText type='medium'>phase={items.phase}</ThemedText>
        <ThemedText type='medium'>address={items.address}</ThemedText>
        <ThemedText type='medium'>privateKey={items.privateKey}</ThemedText>
        <ThemedText type='medium'>isAuthentificated={items.isAuthentificated}</ThemedText>
        <ThemedText type='medium'>password={items.password}</ThemedText>
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
