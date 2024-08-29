import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {CelebrationWave} from "@/components/HelloWave";
import {FlexView} from "@/components/ThemedView";
import {Button} from "@/components/button";
import {Link} from "expo-router";

export default function complete  () {
  return (
    <View style={{flex: 1, position: 'relative',marginHorizontal: 20}}>
      <FlexView style={styles.main}>
        <CelebrationWave />
        <ThemedText size='xl'>Congratulations!</ThemedText>
        <ThemedText
          style={{textAlign: 'center'}}
        >You passed the test - keep your {'\n'}seedphrase safe, it’s your responsibility!</ThemedText>
      </FlexView>
      <Link href="/(tabs)" asChild>
        <Button style={styles.buttonContainer}>
          Go to my wallet
        </Button>
        {/*<Pressable style={styles.buttonContainer}>*/}
        {/*  */}
        {/*</Pressable>*/}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    top: '30%',
    gap: 8,
    maxHeight: 150,
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    top: '68%',
    // height: 128,
    width: '100%',
  }
})
