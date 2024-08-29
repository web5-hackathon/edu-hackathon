import React from 'react'
import {Controller, ControllerProps, FieldPath, FieldValues, GlobalError, UseControllerProps} from 'react-hook-form'

import {TextStyle, View, ViewStyle} from 'react-native'
import {ThemedText} from "@/components/ThemedText";
import {Normal} from "@/components/svg";

type FormItemProps<T extends FieldValues, TName extends FieldPath<T>> = {
  label?: string
  isDirty?: boolean
  required?: boolean
  errors?: GlobalError
  validMessage?: string
  style?: ViewStyle
  labelStyle?: TextStyle
  border?: boolean
} & ControllerProps<T, TName> &
  UseControllerProps<T, TName>

const FormItem = <T extends FieldValues, TName extends FieldPath<T>>(
  props: FormItemProps<T, TName>
) => {
  const {
    name,
    isDirty,
    control,
    rules,
    label,
    required,
    errors,
    validMessage,
    style = {},
    labelStyle = {},
    border = true,
    render
  } = props

  return (
    <View key={name} style={[style,{
      width: "100%",
      height: 109,
    }]}>
      {label && (
        <ThemedText
          style={[labelStyle, { marginBottom: 8 }]}
        >
          {label}
        </ThemedText>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={render}
      />
      {rules && errors && errors?.message && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4
          }}
        >
          <Normal.WarningIcon/>
          <ThemedText
            type='error'
            size='xxs'
          >
            {errors?.message}
          </ThemedText>
        </View>
        )}

      {validMessage && !errors && isDirty && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4
          }}
        >
          <Normal.OK/>
          <ThemedText
            type='link'
            size='xxs'
          >
            {validMessage}
          </ThemedText>
        </View>
      )}
    </View>
  )
}

export default FormItem
