import * as React from "react"
import Svg, {Path, SvgProps} from "react-native-svg"
import {ColorValue} from "react-native";

export type SvgComponentProps = SvgProps & {
  length?: number
}

export type ColorSvgProps = SvgComponentProps & {
  color?: ColorValue
}

const TransparentBrand = ({length, color, ...props}: ColorSvgProps) => (
  <Svg
    width={length??48}
    height={length??48}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <Path
      stroke={color??"#000"}
      strokeLinecap="round"
      strokeWidth={2}
      d="m5.4 15.781 18.207 25.337c.137.191.434.092.434-.145V22.765m18.6-6.984L24.433 41.118c-.137.191-.433.092-.433-.145V22.765"
    />
    <Path
      stroke={color??"#000"}
      strokeLinecap="round"
      strokeWidth={2}
      d="m6.05 12.725 14.724-5.77a8.828 8.828 0 0 1 6.452 0l14.723 5.77c1.54.604 1.54 2.828 0 3.432l-14.723 5.77a8.828 8.828 0 0 1-6.452 0l-14.723-5.77c-1.54-.604-1.54-2.828 0-3.432Z"
    />
  </Svg>
)
const BrandWhiteEdge = ({length, ...props}: SvgComponentProps) => (
  <Svg
    width={length??48}
    height={length??48}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <Path
      fill="#080FA5"
      d="M21.64 13.652H8.03c-2.007 0-3.127 2.303-1.88 3.866l17.463 23.675c.14.177.428.078.428-.148V16.036a2.392 2.392 0 0 0-2.4-2.384Z"
    />
    <Path
      fill="#2AE9B9"
      d="M26.44 13.652h13.61c2.008 0 3.128 2.303 1.88 3.866L24.47 41.193c-.142.177-.428.078-.428-.148V16.036a2.392 2.392 0 0 1 2.4-2.384Z"
    />
    <Path
      fill="#121BDF"
      d="M20.56 7.345 5.835 12.96c-2.053.783-2.053 3.668 0 4.451l14.724 5.615a9.66 9.66 0 0 0 6.881 0l14.723-5.615c2.053-.783 2.053-3.668 0-4.451L27.441 7.345a9.66 9.66 0 0 0-6.881 0Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={2}
      d="m5.4 16.49 18.207 24.652c.137.186.434.09.434-.14V23.285m18.6-6.795L24.433 41.142c-.137.186-.433.09-.433-.14V23.285"
    />
    <Path
      stroke="#fff"
      strokeWidth={2}
      d="M6.05 13.516 20.775 7.9a9.056 9.056 0 0 1 6.452 0l14.723 5.615c1.54.587 1.54 2.751 0 3.338L27.226 22.47a9.056 9.056 0 0 1-6.452 0L6.051 16.854c-1.54-.587-1.54-2.75 0-3.338Z"
    />
  </Svg>
)
const BrandBlackEdge = ({length, ...props}: SvgComponentProps) => (
  <Svg
    width={length??48}
    height={length??48}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <Path
      fill="#080FA5"
      d="M21.64 13.652H8.03c-2.007 0-3.127 2.303-1.88 3.866l17.463 23.675c.14.177.428.078.428-.148V16.036a2.392 2.392 0 0 0-2.4-2.384Z"
    />
    <Path
      fill="#2AE9B9"
      d="M26.44 13.652h13.61c2.008 0 3.128 2.303 1.88 3.866L24.47 41.193c-.142.177-.428.078-.428-.148V16.036a2.392 2.392 0 0 1 2.4-2.384Z"
    />
    <Path
      fill="#121BDF"
      d="M20.56 7.345 5.835 12.96c-2.053.783-2.053 3.668 0 4.451l14.724 5.615a9.66 9.66 0 0 0 6.881 0l14.723-5.615c2.053-.783 2.053-3.668 0-4.451L27.441 7.345a9.66 9.66 0 0 0-6.881 0Z"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={2}
      d="m5.4 16.49 18.207 24.652c.137.186.434.09.434-.14V23.285m18.6-6.795L24.433 41.142c-.137.186-.433.09-.433-.14V23.285"
    />
    <Path
      stroke="#000"
      strokeWidth={2}
      d="M6.05 13.516 20.775 7.9a9.056 9.056 0 0 1 6.452 0l14.723 5.615c1.54.587 1.54 2.751 0 3.338L27.226 22.47a9.056 9.056 0 0 1-6.452 0L6.051 16.854c-1.54-.587-1.54-2.75 0-3.338Z"
    />
  </Svg>
)

const BlackBrand = ({length, ...props}: SvgComponentProps) => (
  <Svg
    width={length??48}
    height={length??48}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M21.64 13.652H8.03c-2.007 0-3.127 2.303-1.88 3.866l17.463 23.675c.14.177.428.078.428-.148V16.036a2.392 2.392 0 0 0-2.4-2.384ZM26.44 13.652h13.61c2.008 0 3.128 2.303 1.88 3.866L24.47 41.193c-.142.177-.428.078-.428-.148V16.036a2.392 2.392 0 0 1 2.4-2.384Z"
    />
    <Path
      fill="#000"
      d="M20.56 7.345 5.835 12.96c-2.053.783-2.053 3.668 0 4.451l14.724 5.615a9.66 9.66 0 0 0 6.881 0l14.723-5.615c2.053-.783 2.053-3.668 0-4.451L27.441 7.345a9.66 9.66 0 0 0-6.881 0Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={2}
      d="m5.4 16.49 18.207 24.652c.137.186.434.09.434-.14V23.285m18.6-6.795L24.433 41.142c-.137.186-.433.09-.433-.14V23.285"
    />
    <Path
      stroke="#fff"
      strokeWidth={2}
      d="M6.05 13.516 20.775 7.9a9.056 9.056 0 0 1 6.452 0l14.723 5.615c1.54.587 1.54 2.751 0 3.338L27.226 22.47a9.056 9.056 0 0 1-6.452 0L6.051 16.854c-1.54-.587-1.54-2.75 0-3.338Z"
    />
  </Svg>
)

const Gray = (props: SvgProps) => (
  <Svg
    width={16}
    height={17}
    viewBox="0 0 16 17"
    fill="none"
    {...props}
  >
    <Path
      fill="#A5A5A5"
      d="m1.8 5.76 6.069 8.446c.046.064.144.031.144-.048v-6.07m6.2-2.327-6.069 8.445C8.1 14.27 8 14.237 8 14.158v-6.07"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={0.85}
      d="m1.8 5.76 6.069 8.446c.046.064.144.031.144-.048v-6.07m6.2-2.327-6.069 8.445C8.1 14.27 8 14.237 8 14.158v-6.07"
    />
    <Path
      fill="#A5A5A5"
      stroke="#000"
      strokeWidth={0.85}
      d="m2.017 4.741 4.908-1.923a2.943 2.943 0 0 1 2.15 0l4.908 1.923c.513.202.513.943 0 1.144L9.075 7.81a2.943 2.943 0 0 1-2.15 0L2.017 5.885c-.513-.2-.513-.942 0-1.144Z"
    />
  </Svg>
)

export {
  TransparentBrand,
  BrandWhiteEdge,
  BrandBlackEdge,
  BlackBrand,
  Gray
}