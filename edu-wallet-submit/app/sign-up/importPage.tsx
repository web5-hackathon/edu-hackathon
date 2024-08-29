import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button} from "@/components/button";
import {ThemedText} from "@/components/ThemedText";
import {Link} from 'expo-router';
import {FlexView} from "@/components/ThemedView";
import Checkbox from "@/components/checkbox";
import {Colors} from "@/constants/Colors";
import {TrueSheet} from "@lodev09/react-native-true-sheet";
import SignUpHeader from "@/app/sign-up/component/Header";
import * as Clipboard from 'expo-clipboard';
import {CreatWallet} from "@/app/sign-up/(step)/step3";
import {isValidSeedPhrase, sanitizeSeedPhrase} from "@/utils/formatters";
import LoadingIndicator from "@/app/sign-up/component/loadingIndicator";

const ImportPage = () => {
  const [checked, setChecked] = useState(false);
  const [isValid, setIsValid] = useState(false)
  const [phase, setPhase] = useState('')
  const sheet = useRef<TrueSheet>(null)
  const [modalVisible, setModalVisible] = useState(false)



  useEffect(() => {
    if (isValidSeedPhrase(phase) && checked) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [phase, checked]);

  const present = async () => {
    await sheet.current?.present()
  }
  const dismiss = async () => {
    await sheet.current?.dismiss()
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setPhase(sanitizeSeedPhrase(text));
  };


  return (
    <FlexView style={{gap: 40, flex: 1, paddingTop: 60, marginHorizontal: 20, paddingBottom: 20}}>
      <SignUpHeader/>
      <View style={styles.formContainer}>
        <View style={{gap: 20, width: "100%"}}>
          <ThemedText size="lg">
            Import Account
          </ThemedText>
          <ThemedText size="sm">
            Paste your private key string
          </ThemedText>
          <TouchableOpacity style={styles.form} activeOpacity={0.8}
                            onPress={fetchCopiedText}
          >
            {
              phase.split(' ').map((item, index) => (
                <ThemedText key={index} size='sm'>
                  {item}
                </ThemedText>
              ))
            }
          </TouchableOpacity>
        </View>

        <View style={styles.confirmContainer}>
          <Checkbox checked={checked} onCheckChange={setChecked}>
            <ThemedText size='sm'>
              I have read and agree to the{' '}
            </ThemedText>
            <Pressable onPress={present}>
              <ThemedText size='sm' type='link'>
                Terms of Use
              </ThemedText>
            </Pressable>
            <TrueSheet
              ref={sheet}
              sizes={['auto', 'large']}
              style={styles.sheet}
              cornerRadius={24}
            >
              <View style={{padding: 20, marginTop: 20}}>
                <ThemedText type='bold' size='xl' style={{textAlign: 'center'}}>Terms of Use</ThemedText>
                <ThemedText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam blandit lorem molestie metus feugiat
                  faucibus. Proin facilisis risus sit amet metus rutrum cursus. Nulla vitae ornare tortor. Nunc
                  scelerisque tellus eu lacus pharetra, ac cursus ex porta. Vestibulum suscipit magna vel iaculis
                  mollis. Aenean iaculis lectus vitae eleifend dignissim. Maecenas tincidunt hendrerit purus eget
                  imperdiet. Aliquam erat volutpat. Nam vitae tellus luctus, pharetra nibh non, molestie ante. Aliquam
                  ornare sollicitudin leo eu tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                  posuere cubilia curae; Maecenas pellentesque tellus eget mattis luctus. Orci varius natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Donec scelerisque ultrices nisl sit amet
                  accumsan. Donec consequat purus dictum orci ullamcorper molestie.
                </ThemedText>

                <Button style={{marginTop: 24}} onPress={dismiss}>
                  Acknowledge
                </Button>
              </View>
            </TrueSheet>

          </Checkbox>
          <Link href="./complete" style={{width: "100%"}} asChild disabled={!isValid}>
            <Button size="lg" variant="solid"
                    onPressOut={async () => {
                      setModalVisible(true);
                      await CreatWallet(phase);
                      setModalVisible(false);
                    }}
            >
              Import
            </Button>
          </Link>
        </View>
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
      flex: 1,
    },
    form: {
      width: "100%",
      minHeight: 94,
      maxHeight: 200,
      borderRadius: 16,
      padding: 20,
      gap: 12,
      overflow: 'hidden',
      backgroundColor: Colors.dark.bgGray,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    confirmContainer: {
      display: "flex",
      gap: 20,
      width: "100%",
      marginTop: "auto"
    },
    sheet: {
      backgroundColor: Colors.dark.background,
    }
  }
)

export default ImportPage;