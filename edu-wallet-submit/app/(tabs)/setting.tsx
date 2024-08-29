import {Image, Pressable, StyleSheet, TouchableHighlight, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {Normal} from "@/components/svg";
import {Colors} from "@/constants/Colors";
import ThemedModal from "@/components/modal";
import React, {useState} from "react";
import {Input} from "@/components/input";
import {Button} from "@/components/button";
import FormItem from "@/components/FormItem";
import {useForm} from "react-hook-form";
import {Link} from "expo-router";


const Tab = ({title, icon, onPress}: { title: string, icon: React.ReactNode, onPress: () => void }) => {
  return (
    <Pressable style={styles.tab} onPress={onPress}>
      <View style={[styles.inlineRow, {gap: 8}]}>
        {icon}
        <ThemedText>{title}</ThemedText>
        <Normal.RightArrow style={{marginLeft: 'auto'}}/>
      </View>
    </Pressable>
  )
}

export default function Setting() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDirty, setIsDirty] = useState(false)
  const [nextModal, setNextModal] = useState(false)

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
    }
  })

  const Modal1 = () => (
    <View style={{width: '100%'}}>
      <FormItem
        required
        isDirty={isDirty}
        validMessage="Valid email address"
        name="email"
        label="Enter your student email"
        control={control}
        errors={errors.email}
        rules={{
          required: 'Password required.',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu|ac|edu\.cn|gov)$/,
            message: 'Invalid email address'
          }
        }}
        render={({field: {onChange, value, onBlur}}) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder={'Email should end with ‘.edu’'}
            style={{width: '100%'}}
            onBlur={() => {
              setIsDirty(true);
              return onBlur();
            }}
          />
        )}
      />
      <Button size='lg' disabled={!isValid} onPress={() => setNextModal(true)}>Verify</Button>
    </View>
  )

  const Modal2 = () => (
    <>
      <ThemedText>
        A verification notice has been sent to your email ({getValues('email')}). Please follow the instruction to
        verity your email.
      </ThemedText>
      <View style={styles.footer}>
        <Button variant='ghost'
                onPress={() => setNextModal(false)}
                style={{width: "47%"}}>
          Change Email
        </Button>
        <Button style={{width: "47%"}}>
          Resend
        </Button>
      </View>
    </>
  )



  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.userContainer}>
        <Image source={require('@/assets/images/avatar.png')}
               style={styles.avatarImage}
        />
        <View style={styles.inlineRow}>
          <ThemedText type='medium'>akbcut554</ThemedText>
          <Normal.Edit/>
        </View>

        <ThemedModal title={'Verify your email'} modalVisible={modalVisible} setModalVisible={setModalVisible}>
          {nextModal ? <Modal2/> : <Modal1/>}
        </ThemedModal>

        <TouchableHighlight
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <View style={styles.inlineRow}>
            <Normal.WarningIcon color={Colors.dark.ok}/>
            <ThemedText type='link' style={{textDecorationLine: 'underline'}} size='sm'>Verify your student
              email</ThemedText>
          </View>
        </TouchableHighlight>


      </View>
      <Link href='/playground1'>
        <ThemedText type="link" size='lg'>Playground!!!</ThemedText>
      </Link>
      <View style={styles.settingContainer}>
        <View style={[styles.inlineRow, {gap: 10, marginHorizontal: 'auto'}]}>
          <Normal.Settings/>
          <ThemedText type='medium' size='lg'>Settings</ThemedText>
        </View>
        <Tab title='Certificate Issuance' icon={<Normal.Certificate/>} onPress={() => null}/>
        <Tab title='Wallet Instructions' icon={<Normal.Wallet/>} onPress={() => null}/>
        <Tab title='About Us' icon={<Normal.Issue/>} onPress={() => null}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarImage: {
    width: 240,
    height: 240,
    borderRadius: 120,
    marginBottom: 8,
  },
  userContainer: {
    marginTop: "5%",
    alignItems: 'center',
    gap: 4,
  },
  settingContainer: {
    marginTop: "12%",
    width: "100%",
    gap: 20,
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  tab: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: Colors.dark.bgGray,
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  }
});
