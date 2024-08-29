import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from "react-native";
import {Colors} from "@/constants/Colors";
import React from "react";
import {ThemedText} from "@/components/ThemedText";
import {Normal} from "@/components/svg";
import {router} from 'expo-router';

type ThemeProps = {
  size?: "sm" | "md" | "lg",
  textSize?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs',
  variant?: "solid" | "ghost",
  children?: React.ReactNode,
  disabled?: boolean,
  style?: StyleProp<ViewStyle>
}


type ButtonProps = PressableProps & ThemeProps;


type TouchableOpacityRef = React.ElementRef<typeof TouchableOpacity>;
type PressableRef = React.ElementRef<typeof Pressable>;

const Button = React.forwardRef<TouchableOpacityRef, ThemeProps&TouchableOpacityProps>((
  { style,
    textSize,
    disabled,
    size = 'lg',
    variant = 'solid',
    children,
    ...rest
  }: ThemeProps&TouchableOpacityProps, ref) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      ref={ref}
      style={[
        styles.basic,
        styles[size],
        styles[variant],
        style,
        disabled ? styles.disabled : undefined
      ]}
      {...rest}
    >
      <ThemedText size={textSize??'md'}>
        {children}
      </ThemedText>
    </TouchableOpacity>
  )
})


const IconButton = React.forwardRef<PressableRef, ButtonProps>(({disabled, onPress, size = 'lg', variant = 'solid', children, ...rest}: ButtonProps,ref) => {
  return (
    <Pressable
      ref={ref}
      style={({ pressed }) => [
        styles.basic,
        IconButtonStyles[size],
        IconButtonStyles[variant]
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  )
})
// TODO: 莫名其妙的失效了


const BackButton = ({style, ...rest}: ButtonProps) => {
  function goBack() {
    if (router.canGoBack()) {
      router.back()
    }
  }

  return (
    <Pressable
      style={[{width: 54, height: 54, backgroundColor: Colors.dark.bgGray, borderRadius: 100,alignItems: "center",
      justifyContent: "center",},style]}
      onPress={goBack}


    >
      <Normal.LeftArrow />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  basic: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    alignContent: "center",
  },
  sm: {
    width: 65,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  md: {
    width: 350,
    height: 54,
  },
  lg: {
    width: "100%",
    height: 54,
  },
  solid: {
    borderWidth: 1,
    borderColor: Colors.dark.primary,
    backgroundColor: Colors.dark.primary,
  },
  ghost: {
    borderColor: "#A5A5A5",
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  text: {
    color: Colors.dark.text,
    fontSize: 16
  },
  disabled: {
    opacity: 0.5
  }
});

const IconButtonStyles = StyleSheet.create({
  sm: {
    width: 63,
    height: 54,
  },
  md: {
    width: 54,
    height: 54,
  },
  lg: {
    width: 54,
    height: 54,
  },
  solid: {
    backgroundColor: Colors.dark.bgGray,
  },
  ghost: {
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "transparent",
  },
})

export {
  Button,
  IconButton,
  BackButton
}