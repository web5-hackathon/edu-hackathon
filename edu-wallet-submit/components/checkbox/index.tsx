import {Pressable, StyleSheet, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming,} from 'react-native-reanimated';

type CheckboxProps = {
  checked: boolean,
  onCheckChange: React.Dispatch<boolean>
}
function Checkbox_({checked, onCheckChange}: CheckboxProps) {
  const length = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      height: withTiming(length.value, config),
      width: withTiming(length.value, config),
    };
  });

  function onChange() {
    length.value = checked ? 0 : 14;
    onCheckChange(!checked);
  }

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onChange}>
      {/*{checked && <Ionicons name="checkmark" size={24} color="white" />}*/}
      {/*{checked && }*/}
      <Animated.View
        style={[{width: 0, height: 0, backgroundColor: 'white'},style]}/>
    </Pressable>
  );
}

export default function Checkbox({checked, onCheckChange, children}: CheckboxProps & {children?: React.ReactNode}) {

  return (
    <View style={styles.checkboxContainer}>
      <Checkbox_ checked={checked}
                 onCheckChange={onCheckChange}/>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.dark.textGray,
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  checkboxChecked: {
    borderColor: 'white',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});