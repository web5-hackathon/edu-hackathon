/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const primaryColor = '#121BDF';


export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFFFFF',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    bgGray: '#2A2829',
    textGray: '#A5A5A5',
    borderGray: '#555555',
    fill: '#1C1C1C',
    tabIconDefault: '#9BA1A6',
    warning: '#FB7945',
    ok: '#2AE9B9',
    tabIconSelected: tintColorDark,
    primary: primaryColor,
  },
};
