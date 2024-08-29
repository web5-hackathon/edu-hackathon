import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ThemedText} from "@/components/ThemedText";
import {Brand} from "@/components/svg";


const Loading = () => {
  return (
    <View style={styles.container}>
      <Brand.BrandBlackEdge length={150}/>
      <ThemedText type="BrandName">Welcome</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "auto",
    backgroundColor: "black"
  }
});

export default Loading;