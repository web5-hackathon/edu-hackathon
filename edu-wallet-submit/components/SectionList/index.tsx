import {FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";
import ThemedModal from "@/components/modal";
import React, {useState} from "react";

type ItemProps = {
  thumbnail: any,
  cover: any,
  NTF: string,
  course: string
}

type SectionProps = {
  time: string,
  data: ItemProps[]
}


const Item = ({item, time}: { item: ItemProps, time: string }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.card}>
          <Image source={item.thumbnail} style={styles.thumbnail}/>
          <View style={styles.description}>
            <ThemedText size='sm'>{item.NTF}</ThemedText>
            <ThemedText type='muted' style={{fontSize: 12, lineHeight: 15}}>{item.course}</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
      <ThemedModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <Image source={item.cover} style={{width: "100%", borderRadius: 12}}/>
        <View>
          <ThemedText type='muted' style={{fontSize: 14, lineHeight: 17.5}}>
            NFT Name
          </ThemedText>
          <ThemedText>{item.NTF}</ThemedText>
        </View>
        <View>
          <ThemedText type='muted' style={{fontSize: 14, lineHeight: 17.5}}>
            NFT Name
          </ThemedText>
          <ThemedText>{time}</ThemedText>
        </View>
        <View>
          <ThemedText type='muted' style={{fontSize: 14, lineHeight: 17.5}}>
            NFT Name
          </ThemedText>
          <ThemedText>{item.course}</ThemedText>
        </View>
      </ThemedModal>
    </>
  )
}


const Section = ({item}: { item: SectionProps }) => {
  return (
    <View style={styles.section}>
      <View style={styles.time}>
        <ThemedText type='medium'>{item.time}</ThemedText>
      </View>
      <View style={{gap: 8}}>
        {item.data.map((data, index) => (
          <Item item={data} time={item.time} key={index}/>
        ))}
      </View>
    </View>
  )
}


export default function SectionList({data}: { data: SectionProps[] }) {
  return (
    <FlatList
      data={data}
      renderItem={Section}/>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20
  },
  time: {
    width: 120,
    marginTop: 8,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.borderGray,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.dark.bgGray,
    padding: 8,
    borderRadius: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  description: {
    width: 150,
    marginHorizontal: "auto",
    gap: 4
  },
});