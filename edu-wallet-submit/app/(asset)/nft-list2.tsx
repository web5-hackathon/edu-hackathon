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
  course: string,
  description: string,
  OCID: string
}

const data = [
  {
    thumbnail: require("@/assets/nft-c/1.png"),
    cover: require("@/assets/nft-c/1.png"),
    NTF: 'Web3 Certificate #26',
    course: 'Web3',
    description: 'Certificate for completing the course',
    OCID: 'treesirop.edu',
  },
  {
    thumbnail: require("@/assets/nft-c/3.png"),
    cover: require("@/assets/nft-c/3.png"),
    NTF: 'Web3 Certificate #27',
    course: 'Web3',
    description: 'Certificate for completing the course',
    OCID: 'treesirop.edu',
  },
]


function NFTItem({item}: { item: Item }) {
  return <Item item={item}/>
}


function Item({item}: { item: Item }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} style={{gap: 8, flex: 1}}>
        <View style={{flex: 1}}>
          <Image source={item.thumbnail} style={{width: "100%", borderRadius: 12, objectFit: "cover", height: 200}}/>
          <View>
            <ThemedText size='sm'>{item.NTF}</ThemedText>
            <ThemedText type='muted' style={{fontSize: 12, lineHeight: 15, fontWeight: 300}}>{item.course}</ThemedText>
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
            Description
          </ThemedText>
          <ThemedText>{item.description}</ThemedText>
        </View>
        <View>
          <ThemedText type='muted' style={{fontSize: 14, lineHeight: 17.5}}>
            OCID
          </ThemedText>
          <ThemedText>{item.OCID}</ThemedText>
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