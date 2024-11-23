import { StyleSheet, View, Text, Image, StatusBar} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontFamilies } from "@/constants/tokens";

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
        placeholderStyle={[styles.placeholderStyle, {color: textColour, opacity: textOpacity, fontFamily: fontFamilies.regular}]}
        selectedTextStyle={[styles.selectedTextStyle, {color: textColour, opacity: textOpacity, fontFamily: fontFamilies.regular}]}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={[styles.iconStyle]}
        itemContainerStyle={{backgroundColor: colors.background}}
        itemTextStyle={{color: colors.text, fontFamily: fontFamilies.regular}}
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

export type LeagueDropdownData = {
  label: string
  value: string
  logo: any
}

export type LeagueSelectDropdownProps = {
  data: LeagueDropdownData[];
  onChangeSelection: (item: LeagueDropdownData) => void;
  placeholder: string
  isDisabled: boolean
  value: string
  iconName: keyof typeof MaterialCommunityIcons.glyphMap
}

export const LeagueSelectDropdown = ({
  data,
  onChangeSelection,
  placeholder,
  isDisabled,
  value,
  iconName,
}: LeagueSelectDropdownProps) => {

  const textColour = (isDisabled) ? ('grey'):(colors.text);
  const textOpacity = (isDisabled) ? (0.5):(1);

  const iconColour = (isDisabled) ? ('grey'):(colors.icon);
  const iconOpacity = (isDisabled) ? (0.5):(1);



  return(
      <Dropdown
      style={styles.dropdown}
      placeholderStyle={[styles.placeholderStyle, {color: textColour, opacity: textOpacity, fontFamily: fontFamilies.regular}]}
      selectedTextStyle={[styles.selectedTextStyle, {color: textColour, opacity: textOpacity, fontFamily: fontFamilies.regular}]}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={[styles.iconStyle]}
      itemContainerStyle={{backgroundColor: colors.background}}
      itemTextStyle={{color: colors.text, fontFamily: fontFamilies.regular}}
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

      renderItem={(item) => {
        return(
          <View style={{flexDirection: 'row', marginVertical: 10, marginHorizontal: 5}}>
           <View style={{paddingHorizontal: 10}}>
              <Image
                style={[styles.leagueLogo]}
                source={item.logo} />
            </View>
            <Text style={{color: colors.text, paddingHorizontal: 3, fontFamily: fontFamilies.regular}}>{item.label}</Text>
          </View>
        )
      }}
      
    />
  )

}

export const TestLeagueSelectDropdown = ({
  data,
  onChangeSelection,
  placeholder,
  isDisabled,
  value,
  iconName,
}: LeagueSelectDropdownProps) => {

  const textColour = (isDisabled) ? ('grey'):(colors.text);
  const textOpacity = (isDisabled) ? (0.5):(1);

  const iconColour = (isDisabled) ? ('grey'):(colors.icon);
  const iconOpacity = (isDisabled) ? (0.5):(1);

  return(
      <Dropdown
      style={[{margin: 10, height: 50, borderBottomColor: 'grey', borderBottomWidth: 0.5, width: "50%"
      }]}
      placeholderStyle={[{color: textColour, opacity: textOpacity, fontFamily: fontFamilies.regular, fontSize: 14}]}
      selectedTextStyle={[{color: textColour, opacity: textOpacity, fontFamily: fontFamilies.regular, fontSize: 14}]}
      inputSearchStyle={[{height: 40, fontSize: 13, color: colors.text, borderColor: 'grey', borderRadius: 3,}]}
      iconStyle={[{width: 20,height: 20,}]}
      itemContainerStyle={{backgroundColor: colors.background}}
      itemTextStyle={{color: colors.text, fontFamily: fontFamilies.regular, fontSize: 14}}
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
          <MaterialCommunityIcons name={iconName} style={[styles.icon, {opacity: iconOpacity}]} color={iconColour} size={15} />
        </View>  
      )}

      renderItem={(item) => {
        return(
          <View style={{flexDirection: 'row', marginVertical: 10, marginHorizontal: 5}}>
           <View style={{paddingHorizontal: 10}}>
              <Image
                style={[styles.leagueLogo]}
                source={item.logo} />
            </View>
            <Text style={{color: colors.text, paddingHorizontal: 3, fontFamily: fontFamilies.regular, fontSize: 13, width: 150}}>{item.label}</Text>
          </View>
        )
      }}
      
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
    leagueLogo: {
      resizeMode: 'contain',
      width: 20,
      height: 20,
      minHeight:20,
      minWidth: 20
  },
  });
