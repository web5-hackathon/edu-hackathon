import React, {PropsWithChildren} from "react";
import {Modal, StyleSheet, TouchableHighlight, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import {Normal} from "@/components/svg";

type Props = PropsWithChildren<{
  title?: string,
  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}>



export default function ThemedModal ({title ,modalVisible, setModalVisible,children}:Props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.View}>
        <View style={styles.modalView}>
          {title && <ThemedText size='lg' type='medium'>{title}</ThemedText>}
          <View style={styles.content}>
            {children}
          </View>
          <TouchableHighlight
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            underlayColor={Colors.dark.borderGray}
          >
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Normal.Close />
              <ThemedText type='muted' size='sm'>CLOSE</ThemedText>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )

}

const styles = StyleSheet.create({
  View: {
    flex: 1,
    alignItems: "center",
    marginTop: "20%"
  },
  modalView: {
    backgroundColor: Colors.dark.bgGray,
    width: 350,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dark.borderGray,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeButton: {
    width: "100%",
    height: 37,
    justifyContent: "flex-end",
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: Colors.dark.borderGray,
    marginTop: 24
  },
  content: {
    gap: 24,
    width: "100%",
  }
});