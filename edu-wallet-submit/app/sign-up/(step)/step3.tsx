import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button} from "@/components/button";
import {ThemedText} from "@/components/ThemedText";
import {router} from 'expo-router';
import {FlexView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import * as SecureStore from "expo-secure-store";
import {Wallet} from "ethers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingIndicator from "@/app/sign-up/component/loadingIndicator";

export const CreatWallet = async (phase: string) => {
  const wallet = Wallet.fromPhrase(phase);
  await SecureStore.setItemAsync('phase', '');
  await SecureStore.setItemAsync('address', wallet.address);
  await SecureStore.setItemAsync('privateKey', wallet.privateKey);
  await AsyncStorage.setItem('isAuthentificated', 'true');
  return;
}

const Step3 = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selected, setSelected] = useState<Array<string>>([])
  const [checked, setChecked] = useState(false);
  const [wordList, setWordList] = useState<string[]>([])
  const [phase, setPhase] = useState('')

  useEffect(() => {
    SecureStore.getItemAsync('phase').then(value => {
      if (value) {
        setPhase(value)
        setWordList(value.split(' ').sort(() => Math.random() - 0.5))
      }
    });
  }, []);

  useEffect(() => {
    if (selected.join(' ') === phase && selected.length == 12) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [selected]);


  const Item = ({ item }: { item: string}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (selected.includes(item)) {
            setSelected(selected.filter(i => i !== item))
          } else {
            setSelected([...selected, item])
          }
        }}
        style={[styles.item,
        {backgroundColor: selected.includes(item) ? Colors.dark.primary : Colors.dark.bgGray}]}>
        <ThemedText style={{padding: 4, textAlign: "center"}}>{item}</ThemedText>
      </TouchableOpacity>
    );
  };


  return (
    <FlexView style={{ flex: 1, gap: 20}}>
      <View style={styles.formContainer}>
        <ThemedText size="lg">
          Confirm Your Secrete Backup Phrase
        </ThemedText>
        <ThemedText>
          Please select each phrase in order to make sure it is correct.
        </ThemedText>
      </View>
      <View style={styles.secretContainer}>
        {
          selected.map((item, index) => (
            <Pressable key={index}>
              <ThemedText>{item}</ThemedText>
            </Pressable>
          ))
        }
      </View>
      <View style={styles.buttonContainer}>
        <FlatList
          data={wordList}
          numColumns={3}
          renderItem={Item}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
      <View style={{width: "100%", marginTop: "auto"}}>
        <Button size="lg" variant="solid"
                disabled={!checked}
                onPressOut={async () => {
                  setModalVisible(true);
                  await CreatWallet(phase);
                  setTimeout(() => setModalVisible(false), 3000)
                  router.push("/sign-up/complete")
                }}
        >
          Confirm
        </Button>
      </View>
      <LoadingIndicator modalVisible={modalVisible}/>
    </FlexView>
  );
}

const styles = StyleSheet.create(
  {
    formContainer: {
      gap: 20,
      width: "100%",
      display: "flex",
    },
    confirmContainer: {
      display: "flex",
      gap: 20,
      width: "100%",
      flex: 1,
    },
    secretContainer: {
      minHeight: 100,
      minWidth: "100%",
      padding: 20,
      backgroundColor: Colors.dark.bgGray,
      borderRadius: 16,
      gap: 12,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      position: "relative",
      overflow: "hidden",
    },
    buttonContainer: {
      width: "100%",
    },
    columnWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 8,
      marginTop: 8,
      flex: 3,
      width: "100%",
    },
    item: {
      flex: 1,
      backgroundColor: Colors.dark.bgGray,
      borderRadius: 4,
      padding: 4,
      width: "auto",
      textAlign: "center",
    },
    tips: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 8,
      alignItems: "center",
      width: "100%",
      marginTop: 20,
      marginBottom: 20,
    }
  }
)

export default Step3;