import {StyleSheet, Text, type TextProps} from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs';
  type?: 'default' | 'bold' | 'medium' | 'subtitle' | 'muted' | 'link' | 'BrandName' | 'error';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  size = 'md',
  type = 'default',
  children,
  ...rest
}: ThemedTextProps) {
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const color = 'white';

  return (
    <Text
      style={[
        { color },
        styles[size],
        styles[type],
        style,
      ]}
      {...rest}
    >{children}</Text>
  );
}

const styles = StyleSheet.create({
  xl: {
    fontSize: 24,
    lineHeight: 36,
  },
  lg: {
    fontSize: 18,
    lineHeight: 27,
  },
  md: {
    fontSize: 16,
    lineHeight: 24,
  },
  sm: {
    fontSize: 14,
    lineHeight: 21,
  },
  xs: {
    fontSize: 12,
    lineHeight: 18,
  },
  xxs: {
    fontSize: 10,
    lineHeight: 15,
  },
  default: {
    fontFamily: 'PoppinsRegular',
  },
  medium: {
    fontFamily: 'PoppinsMedium',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'PoppinsBold',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    fontWeight: 'bold',
  },
  muted: {
    fontFamily: 'PoppinsRegular',
    color: '#A5A5A5',
  },
  link: {
    fontFamily: 'PoppinsRegular',
    color: '#2AE9B9',
  },
  error: {
    fontFamily: 'PoppinsRegular',
    color: '#FB7945',
  },
  BrandName: {
    fontSize: 28,
    lineHeight: 42,
    fontFamily: 'PoppinsMedium',
    fontWeight: '500',
  },
});
