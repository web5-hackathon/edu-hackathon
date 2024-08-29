import React, {forwardRef, useState} from "react";
import {SafeAreaView, StyleSheet, TextInput, TextInputProps, TouchableOpacity} from 'react-native';
import {Colors} from "@/constants/Colors";
import {Normal} from "@/components/svg";
import {FontAwesome6} from "@expo/vector-icons";


type InputProps = {
  defaultValue?: string;
  icon?: React.ReactNode;
} & TextInputProps;

type TextInputRef = React.ElementRef<typeof TextInput>;


const Input = forwardRef<TextInputRef, InputProps>(
  ({defaultValue, icon, style, ...props}: InputProps, ref) => {
  const [value, onChangeValue] = React.useState(defaultValue??'');
    const Clear = () => {
      return (
        <TouchableOpacity
          pressRetentionOffset={10}
          activeOpacity={0.8}
          onPress={() => onChangeValue('')}
          style={styles.touchable}
        >
          <Normal.Clear/>
        </TouchableOpacity>

      )
    }

  return (
    <SafeAreaView style={[styles.container, style, {width: "100%"}]}>
      {icon}
      <TextInput
        style={[
          styles.input,
          icon ? {paddingLeft: 8} : null,
        ]}
        onChangeText={onChangeValue}
        autoCapitalize="none"
        value={value}
        placeholderTextColor={Colors.dark.textGray}
        ref={ref}
        {...props}
      />
      {value && <Clear/>}
    </SafeAreaView>
  );
  })
const SecureInput = ({defaultValue, ...props}: InputProps) => {
  const [hide, setHide] = useState<boolean>(false);
  const [value, onChangeValue] = React.useState(defaultValue??'');


  return (
    <SafeAreaView style={[styles.container, {borderColor: 'transparent', flexDirection: 'row'}]}>
      <TextInput
        secureTextEntry={hide}
        style={styles.input}
        onChangeText={onChangeValue}
        autoCapitalize="none"
        value={value}
        placeholderTextColor={Colors.dark.textGray}
        {...props}
      />
      <TouchableOpacity
        pressRetentionOffset={10}
        activeOpacity={0.8}
        onPressIn={() => setHide(false)}
        onPressOut={() => setHide(true)}
        style={styles.touchable}
      >
        {hide ? (
            <FontAwesome6 name="eye" size={16} color={Colors.dark.textGray}/>) :
          (<FontAwesome6 name="eye-slash" size={16} color={Colors.dark.textGray}/>)}
      </TouchableOpacity>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
    height: 53,
    borderWidth: 1,
    borderColor: Colors.dark.textGray,
    backgroundColor: Colors.dark.bgGray,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginVertical: 4,
    alignItems: 'center',
  },
  input: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
    height: 21,
    zIndex: 5,
    flex: 1,
  },
  touchable: {
    zIndex: 10,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export{
  Input,
  SecureInput
}