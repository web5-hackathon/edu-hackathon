import {FlexView} from "@/components/ThemedView";
import {Brand} from "@/components/svg";
import {ThemedText} from "@/components/ThemedText";
import {BackButton} from "@/components/button";
import {View} from "react-native";
import React from "react";


export default function SignUpHeader () {
  return (
    <View style={{gap: 4,width: "100%"}}>
      <FlexView style={{flexDirection: 'row' ,gap: 4, alignItems: 'center', justifyContent: 'center'}}>
        <Brand.BrandBlackEdge length={32}/>
        <ThemedText type='medium'>EduWallet</ThemedText>
      </FlexView>
      <BackButton />
    </View>
  )
}