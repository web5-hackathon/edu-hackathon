import {Dimensions, Image, StyleSheet, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import {Normal} from "@/components/svg";
import {Input} from "@/components/input";
import {Button} from "@/components/button";
import {ethers} from "ethers";
import * as SecureStore from 'expo-secure-store';
import FormItem from "@/components/FormItem";
import {useForm} from "react-hook-form";

const windowHeight = Dimensions.get('window').height;

const Transfer = () => {
  const [isDirty, setIsDirty] = useState(false);
  const [amount, setAmount] = useState('0')
  const [valid, setValid] = useState(false)
  const [balance, setBalance] = useState('0')
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      address: '',
    }
  })

  const provider = new ethers.InfuraProvider('sepolia');

  useLayoutEffect(() => {
    const address = SecureStore.getItem('address') as string;
    provider.getBalance(address)
      .then(ethers.formatEther)
      .then(setBalance)
  }, []);

  useEffect(() => {
    if (isValid && Number(amount) > 0) setValid(true);
    else setValid(true);
  }, [isValid]);


  const handleAmount = useCallback((e: string) => {
    if (e === '' || /^\d*\.?\d*$/.test(e)) {
      if (e[0] === '.' && e.length > 1) setAmount(`0${e}`) // .1 = 0.1
      else if (e.length === 2 && e === '00') setAmount('0') // 00000 -> 0
      else if (e.length === 2 && e[0] === '0' && e[1] !== '0' && e[1] !== '.') setAmount(e.slice(1, 2)) // 0123 -> 123
      else setAmount(e)
    }
  }, [])


  const sendTx = async (amount: string) => {
    if (amount === '' || amount === '.' || amount === '0.')
      amount = '0';
    const pk = await SecureStore.getItemAsync('privateKey') as string;
    const wallet = new ethers.Wallet(pk, provider)
    try {
      const tx = await wallet.sendTransaction({
        to: getValues('address'),
        value: ethers.parseEther(amount),
      })
      await tx.wait()
      console.log(tx)
      return null;
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={{gap: 20, height: "100%"}}>
      <View style={{gap: 12, height: 109}}>
        <FormItem
          required
          isDirty={isDirty}
          validMessage="Valid address"
          label="Add the receiver address"
          control={control}
          name="address"
          rules={{
            required: 'Address required.',
            validate: {
              conform: (value) => {
                try {
                  ethers.getAddress(value);
                  return true;
                } catch (err) {
                  return "Invalid address";
                }
              },
            }
          }}
          errors={errors.address}
          render={({field: {onChange, value, onBlur}}) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder={'Please enter a wallet address'}
              style={{borderColor: Colors.dark.bgGray}}
              onBlur={() => {
                setIsDirty(true);
                return onBlur();
              }}
            />
          )}
        />
      </View>
      <View style={[styles.divider, {width: "100%"}]}/>
      <View style={{gap: 20, flex: 1}}>
        <View style={{gap: 12}}>
          <ThemedText>Select a token and enter an amount</ThemedText>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Image source={require('@/assets/currency/ethreum.png')} style={{width: 40, height: 40, marginRight: 8}}/>
            <ThemedText>ETH</ThemedText>
            <Normal.Up style={{marginLeft: 4}} rotation={180} origin={[8, 8]}/>
          </View>
        </View>
        <View style={{flex: 2}}/>
        <View style={{minHeight: 100}}>
          <TextInput value={amount} onChangeText={handleAmount} style={[styles.number]}
                     defaultValue={'0'} inputMode='decimal'/>
        </View>
        <View style={{flex: 1}}/>
        <ThemedText type='muted' style={{textAlign: 'center'}}>Balance: {balance} ETH</ThemedText>
        <View style={{flex: 3}}/>
      </View>
      <View style={[styles.divider, {
        ...StyleSheet.absoluteFillObject,
        top: windowHeight - 170,
        marginLeft: -500, width: 1000, marginTop: "auto"
      }]}/>
      <View style={styles.footer}>
        <Button variant='ghost' style={{width: "47%"}} onPress={() => setAmount('0')}>
          Cancel
        </Button>
        <Button style={{width: "47%"}} disabled={!valid}
                onPress={() => sendTx(amount)}
        >
          Transfer
        </Button>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  number: {
    fontSize: 60,
    lineHeight: 90,
    textAlign: 'center',
    marginVertical: "auto",
    fontFamily: 'PoppinsMedium',
    fontWeight: '500',
    color: 'white'
  },
  divider: {
    height: 1,
    borderTopWidth: 1,
    borderColor: Colors.dark.borderGray
  },
  footer: {
    ...StyleSheet.absoluteFillObject,
    top: windowHeight - 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  }
})

export default Transfer;