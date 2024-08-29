import {Image, StyleSheet, View} from 'react-native';
import React from "react";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import {Normal} from "@/components/svg";
import {Input} from "@/components/input";
import {Button} from "@/components/button";

const Request = () => {
  return (
    <View style={{gap: 20, flex: 1}}>
      <View style={{gap: 12, height: 109}}>
        <ThemedText>
          Add a sender address
        </ThemedText>
        <Input placeholder={'Please enter a wallet address'} style={{borderColor: Colors.dark.bgGray}}/>
      </View>
      <View style={[styles.divider, {width: "100%"}]}/>
      <View style={{gap: 20}}>
        <View style={{gap: 12}}>
          <ThemedText>Select a token and enter an amount</ThemedText>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Image source={require('@/assets/currency/ethreum.png')} style={{width: 40, height: 40, marginRight: 8}}/>
            <ThemedText>ETH</ThemedText>
            <Normal.Up style={{marginLeft: 4}} rotation={180} origin={[8, 8]}/>
          </View>
        </View>
        <View style={{height: 240, marginTop: "20%", marginBottom: "10%"}}>
          <ThemedText type='medium' style={styles.number}>0</ThemedText>
        </View>
      </View>
      <ThemedText type='muted' style={{textAlign: 'center'}}>Balance: 16,737.00 ETH</ThemedText>
      <View style={[styles.divider, {marginLeft: -500, width: 1000, marginTop: "auto"}]}/>
      <View style={styles.footer}>
        <Button variant='ghost' style={{width: "47%"}}>
          Cancel
        </Button>
        <Button style={{width: "47%"}}>
          Request
        </Button>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  number: {
    fontSize: 60,
    lineHeight: 90,
    textAlign: 'center',
    marginVertical: "auto"
  },
  divider: {
    height: 1,
    borderTopWidth: 1,
    borderColor: Colors.dark.borderGray
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  }
})


export default Request;