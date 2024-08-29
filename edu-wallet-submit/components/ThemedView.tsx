import {View, type ViewProps} from 'react-native';

import {useThemeColor} from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}



export function FlexView({ style, ...otherProps }: ThemedViewProps) {
  return <View style={[{
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  }, style]} {...otherProps} />;
}
