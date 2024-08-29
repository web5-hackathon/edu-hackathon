import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect} from "react";
import QRCode from "react-qr-code";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import {Brand, Normal} from "@/components/svg";
import * as Clipboard from 'expo-clipboard';
import * as SecureStore from 'expo-secure-store';

const ReceiveInvalid = () => {
  const [address, setAddress] = React.useState('');
  useLayoutEffect(() => {
    setAddress(SecureStore.getItem('address') || 'null');
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(address);
  };

  return (
    <View style={{gap: 20}}>
      <View style={styles.QRContainer1}>
        <View style={styles.QRContainer2}>
          <QRCode
            size={256}
            style={{height: "auto", maxWidth: "auto", width: "100%", margin: 20}}
            value={address}
            viewBox={`0 0 240 240`}
          />
        </View>
      </View>
      <View style={styles.addressContainer}>
        <ThemedText type='muted' size='sm'>Your Wallet Address</ThemedText>
        <ThemedText>{address}</ThemedText>
        <TouchableOpacity style={styles.inlineRow} activeOpacity={0.8}
                          hitSlop={20}
                          onPress={copyToClipboard}
        >
          <ThemedText type='muted'>
            Copy
          </ThemedText><Normal.Copy />
        </TouchableOpacity>
      </View>
      <View style={{paddingTop: 20, justifyContent: "flex-end", alignItems: "center"}}>
        <View style={styles.inlineRow}>
          <Brand.Gray/>
          <ThemedText type='muted'>
            EduWallet
          </ThemedText>
        </View>
      </View>
    </View>
);
};


const styles = StyleSheet.create({
  QRContainer1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: Colors.dark.bgGray,
    padding: 20,
    marginVertical: 20,
  },
  QRContainer2: {
    height: "auto",
    borderRadius: 16,
    padding: 20,
    backgroundColor: "#fff",
  },
  addressContainer: {
    display: "flex",
    backgroundColor: Colors.dark.bgGray,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  inlineRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 4,
    textAlign: "right",
  }
})

export default ReceiveInvalid;
