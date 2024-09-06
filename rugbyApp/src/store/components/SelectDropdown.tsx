import { StyleSheet, View, Text} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors } from "@/constants/tokens";

export type DropdownData = {
    label: string
	value: string
}

export type CustomSelectDropdownProps = {
    data: DropdownData[];
    onChangeSelection: (item: DropdownData) => void;
    placeholder: string
    isDisabled: boolean
    value: string
    iconName: keyof typeof MaterialCommunityIcons.glyphMap
}

export const CustomSelectDropdown = ({
    data,
    onChangeSelection,
    placeholder,
    isDisabled,
    value,
    iconName,
}: CustomSelectDropdownProps) => {

    const textColour = (isDisabled) ? ('grey'):(colors.text);
    const textOpacity = (isDisabled) ? (0.5):(1);

    const iconColour = (isDisabled) ? ('grey'):(colors.icon);
    const iconOpacity = (isDisabled) ? (0.5):(1);

    return(
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={[styles.placeholderStyle, {color: textColour, opacity: textOpacity}]}
        selectedTextStyle={[styles.selectedTextStyle, {color: textColour, opacity: textOpacity}]}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={[styles.iconStyle]}
        itemContainerStyle={{backgroundColor: colors.background}}
        itemTextStyle={{color: colors.text}}
        containerStyle={{backgroundColor: colors.background, borderColor: 'lightgrey', borderRadius: 1}}
        activeColor={colors.altBackground}

        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        disable={isDisabled}
        onChange={item => {
          onChangeSelection(item)
        }}
        renderLeftIcon={() => (
          <View style={{paddingHorizontal: 3}}>
            <MaterialCommunityIcons name={iconName} style={[styles.icon, {opacity: iconOpacity}]} color={iconColour} size={20} />
          </View>  
        )}
      />
    )
 
}

const styles = StyleSheet.create({
    dropdown: {
      margin: 10,
      height: 50,
      borderBottomColor: 'grey',
      borderBottomWidth: 0.5,
  
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: colors.text,
      borderColor: 'grey',
      borderRadius: 3,
    },
  });
