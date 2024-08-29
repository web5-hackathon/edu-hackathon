import {Dimensions, Image, Pressable, StyleSheet, TouchableOpacity, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {Normal} from "@/components/svg";
import React, {useEffect, useMemo, useState} from "react";
import {Colors} from "@/constants/Colors";
import Animated, {
  interpolateColor,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Input} from "@/components/input";
import {Link} from "expo-router";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


function search<T, K extends keyof T>(items: T[], searchProperties: K[], searchValue: string): T[] {
  return items.filter(item => searchProperties.some(property => String(item[property]).includes(searchValue)));
}

export default function List() {
  const [tab, setTab] = useState<'assets' | 'nft'>('assets')
  const [viewAll, setViewAll] = useState<boolean>(false);
  const initialHeight = windowHeight - 520;
  const height = useSharedValue(initialHeight);
  const searchHeight = useSharedValue(0);
  const progress = useSharedValue(1);


  const [searchAsset, setSearchAsset] = useState('')
  const [searchNFT, setSearchNFT] = useState('')


  useEffect(() => {
    searchHeight.value = withDelay(150, withTiming(viewAll ? 80 : 0, {duration: 500}))
  }, [viewAll]);


  const handlePress = () => {
    setViewAll(!viewAll);
    height.value = viewAll ?  initialHeight : windowHeight - 40;
    setSearchNFT('');
    setSearchNFT('');
  };

  const animatedStyles = useAnimatedStyle(() => (
    {
      height: withSpring(height.value, {damping: 20, stiffness: 100}),
      top: withSpring(viewAll ?  0 : 360 ),
    }
  ));


  const button1Styles = useAnimatedStyle(() => {
    return (
      {
        borderWidth: 1,
        borderColor: interpolateColor(
          progress.value,
          [0, 1],
          ['#A5A5A5', '#121BDF'],
          'RGB', {
            gamma: 10,
          }
        ),
        backgroundColor: interpolateColor(
          progress.value,
          [0, 1],
          ['rgba(0,0,0,0)', '#121BDF'],
          'RGB',
          {
            gamma: 10,
          }
        ),
      }
    )
  });

  const button2Styles = useAnimatedStyle(() => {
    return (
      {
        borderWidth: 1,
        borderColor: interpolateColor(
          progress.value,
          [0, 1],
          ['#121BDF', '#A5A5A5'],
          'RGB', {
            gamma: 10,
          }
        ),
        backgroundColor: interpolateColor(
          progress.value,
          [0, 1],
          ['#121BDF', 'rgba(0,0,0,0)'],
          'RGB',
          {
            gamma: 10,
          }
        ),
      }
    )
  });


  type state<T> = {
    value: T,
    setValue: React.Dispatch<React.SetStateAction<T>>,
  }

  const Search = useMemo(() => ({value, setValue, counter}: state<string> & { counter: number }) => {
    return (
      <>
        <Animated.View style={{overflow: 'hidden', maxHeight: searchHeight, width: windowWidth - 72}}>
          <Input
            placeholder='Search asset'
            icon={<Normal.Search/>}
            value={value}
            onChange={e => {
              setValue(e.nativeEvent.text);
            }}
          />
          {value && <ThemedText style={{textAlign: 'center'}}>{counter} results for <ThemedText
            type='muted'>“{value}”</ThemedText></ThemedText>}
        </Animated.View>
      </>
    )
  }, [searchHeight])

  const Footer = useMemo(() => () => {
    return (
      <View style={{
        marginHorizontal: "auto",
        overflow: 'hidden',
        paddingTop: 20,
        height: viewAll ? 150 : 0,
      }}>
        <ThemedText type='muted'>
          You have reached the bottom~
        </ThemedText>
      </View>
    )
  }, [])


  const AssetPressed = () => {
    setTab('assets');
    progress.value = withTiming(1, {duration: 500});
  }

  const NFTPressed = () => {
    setTab('nft');
    progress.value = withTiming(0, {duration: 500})
  }


  return (
    <Animated.View
      style={[styles.assetContainer, animatedStyles]}>
      <View style={[styles.row,{gap: 8, alignItems: "center"}]}>
        <Pressable onPress={AssetPressed}>
          <Animated.View style={[styles.button, button1Styles]}>
            <ThemedText size='xs'>Assets</ThemedText>
          </Animated.View>
        </Pressable>

        <Pressable onPress={NFTPressed}>
          <Animated.View style={[styles.button, button2Styles]}>
            <ThemedText size='xs'>NFT</ThemedText>
          </Animated.View>
        </Pressable>

        <Pressable
          onPress={handlePress}
          style={{display: "flex",flexDirection: "row",gap: 4, alignSelf: "center",marginLeft: "auto"}}
        >
          <ThemedText size='sm'>View All</ThemedText>
          <Normal.Up rotation={viewAll ? 180 : 0} origin={[8, 8]}/>
        </Pressable>
      </View>
      {tab == 'assets' ? (
        <Animated.FlatList data={searchAsset ? search(assetsList, ['name', 'code'], searchAsset) : assetsList}
                           renderItem={AssetItem}
                           ListHeaderComponent={<Search setValue={setSearchAsset} value={searchAsset}
                                                        counter={search(assetsList, ['name', 'code'], searchAsset).length}/>}
                           ListFooterComponent={assetsList.length > 0 ? Footer : undefined}
                           ListEmptyComponent={assetsList.length === 0 ? Empty : undefined}
                           initialNumToRender={5}
                           ItemSeparatorComponent={Separator}
                           entering={SlideInLeft} exiting={SlideOutLeft}
                           style={{flex: 1}}
        />
      ) : (
        <>
          <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
            <Animated.FlatList data={searchNFT ? search(NFTList, ['title'], searchNFT) : NFTList}
                               renderItem={NFTItem}
                               ListHeaderComponent={<Search setValue={setSearchNFT} value={searchNFT}
                                                            counter={search(NFTList, ['title'], searchNFT).length}/>}
                               ListFooterComponent={NFTList.length > 3 ? Footer : undefined}
                               ListEmptyComponent={NFTList.length === 0 ? Empty : undefined}
                               initialNumToRender={5}
                               ItemSeparatorComponent={Separator}
            />
          </Animated.View>

        </>
      )}
    </Animated.View>
  );
}

type asset = {
  icon: any,
  name: string,
  code: string,
  amount: number,
  changePercent: number,
}

const assetsList = [
  {
    icon: require("@/assets/currency/ethreum.png"),
    name: "Ethreum",
    code: "ETH",
    amount: 16737,
    changePercent: 2.67,
  },
  {
    icon: require("@/assets/currency/bitcoin.png"),
    name: "Bitcoin",
    code: "BTC",
    amount: 533.89,
    changePercent: 0.67,
  },
  {
    icon: require("@/assets/currency/chainlink.png"),
    name: "ChainLink",
    code: "LINK",
    amount: 1225.31,
    changePercent: -0.08,
  },
  {
    icon: require("@/assets/currency/apecoin.png"),
    name: "ApeCoin",
    code: "APE",
    amount: 10.12,
    changePercent: 0.05,
  },
  {
    icon: require("@/assets/currency/decentraland.png"),
    name: "Decentraland",
    code: "MANA",
    amount: 988.05,
    changePercent: 0.72,
  },
  {
    icon: require("@/assets/currency/enjin-coin.png"),
    name: "Enjin Coin",
    code: "ENJ",
    amount: 0.08,
    changePercent: 0.2,
  },
]

type NFT = {
  avatar: any,
  title: string,
  number: number
}



const NFTList = [
  {
    avatar: require("@/assets/nft/1.png"),
    title: "Web3",
    number: 2
  },
]

const AssetItem = ({item}: {item: asset}) => {
  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingVertical: 16,
      paddingRight: 6
    }}>
      <Image source={item.icon} style={{width: 54, height: 54, marginRight: 8, borderRadius: 50}}/>
      <View style={{flex: 1, gap: 4}}>
        <View style={styles.inlineRow}>
          <ThemedText type='medium'>{item.name}</ThemedText>
          <ThemedText type='medium'>${item.amount}</ThemedText>
        </View>
        <View  style={styles.inlineRow}>
          <ThemedText>{item.code}</ThemedText>
          <ThemedText type='medium' style={
            item.changePercent > 0 ?
              {color: Colors.dark.ok} :
              {color: Colors.dark.warning}
          }>
            {item.changePercent > 0 ?
              <Normal.LeftArrow color={Colors.dark.ok} transform="rotate(135 7 6)"/> :
              <Normal.LeftArrow color={Colors.dark.warning} transform="rotate(-135 7 6)"/>}
            {' '}
            {Math.abs(item.changePercent)}%
          </ThemedText>
        </View>
      </View>
    </View>
  )
}

const NFTItem = ({item}: { item: NFT }) => {
  return (
    <Link href={item.title === 'Web3' ? `/nft-list2` : `/nft-list?title=${item.title}`} asChild>
      <TouchableOpacity style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingVertical: 12,
        // height: 64
      }}>
        <Image source={item.avatar} style={{width: 40, height: 40, marginRight: 8, borderRadius: 50}}/>
        <View style={{flex: 1, justifyContent: "space-between", flexDirection: "row", gap: 8}}>
          <ThemedText size='sm' style={{maxWidth: "85%"}}>{item.title}</ThemedText>
          <ThemedText size='sm'>{item.number}</ThemedText>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

const Empty = () => {
  return (
    <View style={{
      flex: 1,
      width: windowWidth - 72,
      height: 200,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
    }}>
      <ThemedText type='muted' style={{textAlign: "center", textAlignVertical: "center"}}>
        You don’t have any assets yet~
      </ThemedText>
    </View>
  )
}

export const Separator = () => {
  return (
    <View style={{width: "100%", height: 1, backgroundColor: Colors.dark.textGray}}/>
  )
}

const styles = StyleSheet.create({
  assetContainer: {
    position: 'absolute',
    top: 0,
    width: "100%",
    height: windowHeight - 520,
    backgroundColor: Colors.dark.bgGray,
    borderRadius: 16,
    padding: 16,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 16,
    overflow: "hidden"
  },
  inlineRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    alignContent: "center",
    width: 65,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
})