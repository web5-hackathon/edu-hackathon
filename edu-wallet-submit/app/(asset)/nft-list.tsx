import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from "react";
import {ThemedText} from "@/components/ThemedText";
import ThemedModal from "@/components/modal";

const NFTList = () => {
  return (
    <View style={{gap: 20, flex: 1}}>
      {/*<ThemedText style={{textAlign: "center"}}>2 items</ThemedText>*/}
      <FlatList data={data}
                numColumns={2}
                renderItem={NFTItem}
                columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};


type Item = {
  time: string,
  thumbnail: any,
  cover: any,
  NTF: string,
  course: string
}

const data = [
  {
    time: "Jun 6, 2024",
    thumbnail: require("@/assets/nft-c/1.png"),
    cover: require("@/assets/nft-c/1.png"),
    NTF: 'Super Penguin 2450',
    course: 'Investing in NFTs: Trends, Risks, and Opportunities'
  },
  {
    time: "Jun 5, 2024",
    thumbnail: require("@/assets/nft-c/2.png"),
    cover: require("@/assets/nft-c/2.png"),
    NTF: 'Super Penguin 2450',
    course: 'Investing in NFTs: Trends, Risks, and Opportunities'
  },
  {
    time: "Jun 3, 2024",
    thumbnail: require("@/assets/nft-c/3.png"),
    cover: require("@/assets/nft-c/3.png"),
    NTF: 'Super Penguin 1540',
    course: 'Investing in NFTs: Trends, Risks, and Opportunities'
  },
  {
    time: "May 4, 2024",
    thumbnail: require("@/assets/nft-c/4.png"),
    cover: require("@/assets/nft-c/4.png"),
    NTF: 'Super Penguin 3577',
    course: 'Investing in NFTs: Trends, Risks, and Opportunities'
  },
  {
    time: "Mar 6, 2024",
    thumbnail: require("@/assets/nft-c/5.png"),
    cover: require("@/assets/nft-c/5.png"),
    NTF: 'Super Penguin 2450',
    course: 'Investing in NFTs: Trends, Risks, and Opportunities'
  },
  {
    time: "Jan 6, 2024",
    thumbnail: require("@/assets/nft-c/6.png"),
    cover: require("@/assets/nft-c/6.png"),
    NTF: 'Super Penguin 0419',
    course: 'Investing in NFTs: Trends, Risks, and Opportunities'
  },
  {
    time: "Jan 3, 2024",
    thumbnail: require("@/assets/nft-c/6.png"),
    cover: require("@/assets/nft-c/6.png"),
    NTF: 'Super Penguin 0328',
    course: 'Investing in NFTs: Trends, Risks, and Opportunities'
  },
  {
    time: "Jan 1, 2024",
    thumbnail: require("@/assets/nft-c/6.png"),
    cover: require("@/assets/nft-c/6.png"),
    NTF: 'Super Penguin 0213',
    course: 'Investing in NFTs: Trends, Risks, and Opportunities'
  },
]


function NFTItem({item}: { item: Item }) {
  return <Item item={item}/>
}

// 不嵌套一层疑似会违反hook规则
function Item({item}: { item: Item }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} style={{gap: 8, flex: 1}}>
        <View style={{flex: 1}}>
          <Image source={item.thumbnail} style={{width: "100%", borderRadius: 12, objectFit: "cover", height: 200}}/>
          <View>
            <ThemedText size='sm'>{item.NTF}</ThemedText>
            <ThemedText type='muted' style={{fontSize: 12, lineHeight: 15, fontWeight: 300}}>{item.time}</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
      <ThemedModal modalVisible={visible} setModalVisible={setVisible}>
        <Image source={item.cover} style={{width: "100%", borderRadius: 12}}/>
        <View>
          <ThemedText type='muted' style={{fontSize: 14, lineHeight: 17.5}}>
            NFT Name
          </ThemedText>
          <ThemedText>{item.NTF}</ThemedText>
        </View>
        <View>
          <ThemedText type='muted' style={{fontSize: 14, lineHeight: 17.5}}>
            Time
          </ThemedText>
          <ThemedText>{item.time}</ThemedText>
        </View>
        <View>
          <ThemedText type='muted' style={{fontSize: 14, lineHeight: 17.5}}>
            Course
          </ThemedText>
          <ThemedText>{item.course}</ThemedText>
        </View>
      </ThemedModal>
    </>
  )
}

const styles = StyleSheet.create({
  columnWrapper: {
    gap: 16,
    justifyContent: 'space-around'
  },
})


export default NFTList;