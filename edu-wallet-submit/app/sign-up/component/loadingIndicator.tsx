import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

const LoadingIndicator = ({modalVisible}: { modalVisible: boolen }) => {
  return (
    <Modal animationType="slide"
           transparent={true}
           visible={modalVisible}
           style={styles.centeredView}
    >
      <View style={styles.modalView}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create(
  {
    centeredView: {
      flex: 1,
      height: "100%",
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: "auto"
    },
    modalView: {
      borderRadius: 12,
      backgroundColor: 'rgba(21,23,24,0.74)',
      top: '45%',
      width: 100,
      height: 80,
      marginHorizontal: 'auto',
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
  });

export default LoadingIndicator;