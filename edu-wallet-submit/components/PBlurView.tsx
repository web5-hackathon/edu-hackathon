import type {BlurViewProps} from "expo-blur";
import {BlurView} from "expo-blur";
import getBackgroundColor from "expo-blur/build/getBackgroundColor";
import * as React from "react";
import {Platform, View} from "react-native";

class LegacyAndroidBlurView extends React.Component<BlurViewProps> {
  render() {
    const { tint = "default", intensity = 50, style, ...props } = this.props;
    const backgroundColor = getBackgroundColor(intensity, tint);
    return <View {...props} style={[style, { backgroundColor }]} />;
  }
}

export const PBlurView: React.FC<BlurViewProps> | typeof LegacyAndroidBlurView =
  Platform.OS === "ios" ? BlurView : LegacyAndroidBlurView;