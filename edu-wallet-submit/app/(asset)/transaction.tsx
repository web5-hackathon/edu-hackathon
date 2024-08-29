import {FlatList, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";
import {Separator} from "@/components/List";


const Transaction = () => {
  return (
    <View style={styles.container}>
      <ThemedText>Transactions</ThemedText>
      <FlatList data={TransactionData} renderItem={TransactionItem}
                ItemSeparatorComponent={Separator}


      />
    </View>
  )
}

type TransactionType = {
  address: string,
  time: number
}


const TransactionItem = ({item}: { item: TransactionType }) => {
  return (
    <View style={{gap: 4, paddingVertical: 16}}>
      <ThemedText type='medium' numberOfLines={1} ellipsizeMode='middle'>{item.address}</ThemedText>
      <ThemedText type='muted' size='sm'>{new Date(item.time).toLocaleString()}</ThemedText>
    </View>
  )
}

const testItem = {
  address: "0x12345678900x12345678900x12345678900x12345678900x1234567890",
  time: new Date().getTime()
}


const TransactionData = [
  testItem, testItem, testItem, testItem, testItem, testItem, testItem, testItem, testItem, testItem, testItem

]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.dark.bgGray
  }
})

export default Transaction;