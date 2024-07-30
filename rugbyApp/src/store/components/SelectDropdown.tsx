import { StyleSheet, View, Text} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons'

export type DropdownData = {
    label: string
	value: string
}

export type CustomSelectDropdownProps = {
    data: DropdownData[];
    onChangeSelection: (item: DropdownData) => void;
    placeholder: string
}

export const CustomSelectDropdown = ({
    data,
    onChangeSelection,
    placeholder,
}: CustomSelectDropdownProps) => {

    const [value, setValue] = useState('');

    return(
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          onChangeSelection(item)
          setValue(item.value);
        }}
        renderLeftIcon={() => (
            <MaterialCommunityIcons name="rugby" style={styles.icon} color="black" size={20} />
        )}
      />
    )
 
}

const styles = StyleSheet.create({
    dropdown: {
      margin: 10,
      height: 50,
      borderBottomColor: 'gray',
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
    },
  });
