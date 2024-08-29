import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from "@/components/button";
import {ThemedText} from "@/components/ThemedText";
import {Link} from 'expo-router';
import {FlexView} from "@/components/ThemedView";
import Secret from "@/app/sign-up/component/secret";

const Step2 = () => {
  return (
    <FlexView style={{flex: 1, gap: 20}}>
      <View style={styles.formContainer}>
        <ThemedText size="lg">
          Create Password
        </ThemedText>
        <ThemedText size='sm'>
          Your secret backup phrase makes it easy to bak up and restore your account.
        </ThemedText>
        <ThemedText size='sm'>
          WARNING: Never disclose your backup phrase. Anyone with this phrase can take your wallet forever.
        </ThemedText>
      </View>

      <Secret/>


      <View style={styles.confirmContainer}>
        <ThemedText style={styles.tips} size='sm'>
          Tips:
        </ThemedText>
        <NumberList data={[
          'Store this phrase in a password manager like 1Password.',
          'Write this phrase on a piece of paper and store in a secure location.',
          'Memorize this phrase.'
        ]}/>
      </View>

      <View style={{width: "100%", marginTop: "auto"}}>
        <Link href="./step3" style={{width: "100%"}} asChild>
          <Button size="lg" variant="solid">
            Next
          </Button>
        </Link>
      </View>
    </FlexView>
  );
}


const NumberList = ({data}: { data: string[] }) => {
  return (
    <View style={{display: "flex", width: "95%", gap: 4}}>
      {
        data.map((item, index) => (
          <View style={{display: "flex", flexDirection: "row"}} key={index}>
            <View style={{width: 12, marginRight: 4}}>
              <ThemedText size='sm' style={{textAlign: 'right'}}>{index + 1}.</ThemedText>
            </View>
            <View>
              <ThemedText size='sm'>{item}</ThemedText>
            </View>
          </View>
        ))
      }
    </View>
  )

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
      width: "100%",
    },
    tips: {
      marginBottom: 21,
    }
  }
)

export default Step2;