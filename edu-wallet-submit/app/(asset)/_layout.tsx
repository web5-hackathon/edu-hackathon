import {Stack} from "expo-router";
import {Normal} from "@/components/svg";
import Header from "@/app/(asset)/component/header";
import React from "react";


const AssetPageStack = ({children}: { children: React.ReactNode }) => (
  <Stack screenOptions={{
    contentStyle: {
      marginHorizontal: 20,
      paddingBottom: 20
    },
  }}>
    <Stack.Screen name="receive-invalid" options={
      {
        title: "Receive",
        header: () => <Header icon={<Normal.QRCode/>} title={"Receive"}/>
      }}/>
    <Stack.Screen name="transfer" options={
      {
        title: "Transfer",
        header: () => <Header icon={<Normal.Transfer/>} title={"Transfer"}/>
      }}/>
    <Stack.Screen name="request" options={
      {
        title: "Request",
        header: () => <Header icon={<Normal.Request/>} title={"Request"}/>
      }}/>
    <Stack.Screen name="transaction" options={
      {
        title: "Transaction",
        header: () => <Header icon={<Normal.Clock/>} title={"Transaction"}/>
      }}/>
    <Stack.Screen name="nft-list" options={
      {
        title: "NFT-List",
        header: ({route}) => {
          // @ts-ignore
          return <Header icon={null} title={route.params?.title ?? "NFT-List"}/>
        }
      }}/>
  </Stack>
)

export default AssetPageStack;