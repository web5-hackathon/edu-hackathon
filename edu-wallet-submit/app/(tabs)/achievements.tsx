import {StyleSheet, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {Normal} from "@/components/svg";
import React, {useState} from "react";
import {Input} from "@/components/input";
import SectionList from "@/components/SectionList";


type SearchResult<T> = T[];

interface Searchable<T> {
  time: string;
  data: T[];
}

type SearchFields<T> = keyof T;

function search<T extends Record<string, any>>(
  data: Searchable<T>[],
  query: string,
  fields?: SearchFields<T>[]
): { result: Searchable<T>[], counter: number } {
  const lowerCaseQuery = query.toLowerCase();
  const result: Searchable<T>[] = [];
  let counter = 0;
  data.forEach((group) => {
    const list: SearchResult<T> = [];
    group.data.forEach((item) => {
      const isMatch = fields
        ? fields.some((field) =>
          item[field]?.toString().toLowerCase().includes(lowerCaseQuery)
        )
        : Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(lowerCaseQuery)
        );
      if (isMatch) {
        counter++;
        list.push(item);
      }
    });
    if (list.length > 0) {
      group.data = list;
      result.push(group);

    }
  });
  console.log(result)
  return {result, counter};
}

export default function Achievements() {
  const [searchParam, setSearchParam] = useState('')

  return (
    <View style={{flex: 1, alignItems: 'center', gap: 20}}>
      <View style={styles.header}>
        <Normal.Achievement/>
        <ThemedText>Education Achievements</ThemedText>
      </View>
      <Input
        placeholder="Search nft"
        icon={<Normal.Search/>}
        onChange={e => {
          setSearchParam(e.nativeEvent.text);
        }}
      />
      {searchParam && <ThemedText>{search(data, searchParam).counter} results for <ThemedText
        type='muted'>“{searchParam}”</ThemedText></ThemedText>}
      <SectionList
        data={searchParam ? search(data, searchParam).result : data}/>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: "auto"
  },
});

const data = [
  {
    time: 'Jun 6, 2024',
    data: [
      {
        thumbnail: require("@/assets/achievements/1_sm.png"),
        cover: require("@/assets/achievements/1.png"),
        NTF: 'Blue Pig',
        course: 'NFT Fundamentals: From Creation to Collection'
      },
    ]
  },
  {
    time: 'Jun 5, 2024',
    data: [
      {
        thumbnail: require("@/assets/achievements/2_sm.png"),
        cover: require("@/assets/achievements/2.png"),
        NTF: 'Crying Monkey',
        course: 'Mastering NFT Art: Techniques and Market Insights'
      },
      {
        thumbnail: require("@/assets/achievements/3_sm.png"),
        cover: require("@/assets/achievements/3.png"),
        NTF: 'Angry Monster',
        course: 'Blockchain and NFTs: A Comprehensive Guide'
      },
      {
        thumbnail: require("@/assets/achievements/4_sm.png"),
        cover: require("@/assets/achievements/4.png"),
        NTF: 'Super Penguin 2450',
        course: 'Investing in NFTs: Trends, Risks, and Opportunities'
      },
    ]
  },
  {
    time: 'Jun 5, 2024',
    data: [
      {
        thumbnail: require("@/assets/achievements/5_sm.png"),
        cover: require("@/assets/achievements/5.png"),
        NTF: 'Digital Dreamscapes',
        course: 'Creating and Minting NFTs: A Step-by-Step Workshop'
      },
    ]
  },
  {
    time: 'Jun 3, 2024',
    data: [
      {
        thumbnail: require("@/assets/achievements/6_sm.png"),
        cover: require("@/assets/achievements/6.png"),
        NTF: 'Pixel Portfolio',
        course: 'Mastering NFT Art: Techniques and Market Insights'
      },
    ]
  },
]
