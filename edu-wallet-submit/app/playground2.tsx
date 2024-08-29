import React, {useState} from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import ThemedModal from "@/components/modal";


const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <ThemedModal title={'Verify your email'} modalVisible={modalVisible} setModalVisible={setModalVisible} >
        <ThemedText>Hello 👋</ThemedText>
      </ThemedModal>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.dark.bgGray,
    width: 350,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dark.borderGray,
    padding: 16,
    gap: 24,
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  closeButton: {
    width: "100%",
    height: 37,
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: Colors.dark.borderGray,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default App;