import { colors, fontFamilies, fontSize } from "@/constants/tokens";
import { StandingsHeaderBanner } from "@/store/components/StandingsHeaderBanner";
import { hexToRGB } from "@/store/utils/helpers";
import { defaultStyles } from "@/styles/index"
import { Entypo } from "@expo/vector-icons";
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"


const SettingsScreen = () => {

    const [lastRefresh, setLastRefresh] = useState('');

    const handlePressedTimeZoneOption = () => {

    }
    

   return (
            <View style={{ flex: 1, backgroundColor: colors.background }}>

                <StandingsHeaderBanner />

                <View style={{padding: 10, borderWidth: 1, borderColor: 'grey', borderRadius: 4, marginVertical: 5}}>
                    <Text style={{color: 'white', fontFamily: fontFamilies.title, fontSize: fontSize.sm, paddingBottom: 10}}>Settings</Text>

                    <View style={{padding: 4, paddingVertical: 10, marginVertical: 5, borderBottomWidth: 0.5, borderColor: 'grey', flexDirection: 'row', justifyContent: 'space-between'}}>
                        
                        <View style={{width: "50%"}}>
                          <Text style={{color: 'white', fontFamily: fontFamilies.regular}}>Timezone</Text>  
                        </View>
                        
                        <View style={{ width: "50%"}}>
                            <SettingsDropdown currentOption="GMT" allOptions={["GMT", "EST", "PST"]} OnPressOption={handlePressedTimeZoneOption}/>
                        </View>
                    </View>
                </View>
            </View>
    )
}

type SettingsDropdownProps = {
    currentOption: string
    allOptions: string[]
    OnPressOption: (option: string) => void

}

export const SettingsDropdown = ({ currentOption, allOptions, OnPressOption }: SettingsDropdownProps) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownIconText = showDropdown ? "chevron-up" : "chevron-down"

    const handlePressedPickerOption = (option: string) => {
        OnPressOption(option)
        setShowDropdown(false)
    }

    const dropdownButtonColour = hexToRGB("#4d4b4b", '0.4')

    return (
        <View>
            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} activeOpacity={0.8}>

                <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 12, flexDirection: 'row', backgroundColor: dropdownButtonColour }}>
                    <View style={{ paddingHorizontal: 4, justifyContent: 'center', alignContent: 'center' }}>
                        <Entypo name={dropdownIconText} size={15} color="grey" />
                    </View>
                    <Text style={{ color: 'lightgrey', fontSize: 12, fontFamily: fontFamilies.regular, textAlign: 'center', paddingHorizontal: 2 }}>{currentOption}</Text>
                </View>
            </TouchableOpacity>
            {showDropdown && (
                <View style={{ position: 'absolute', width: "100%", top: 25, zIndex: 10, borderRadius: 5,  backgroundColor: '#4d4b4b'}}>
                    <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                        {allOptions.map((item, index) => {
                            return <SettingsDropdownOption OnPressButton={handlePressedPickerOption} key={index} optionText={item} />
                        })}
                    </View>
                </View>
            )}
        </View>
    )
}

type SettingsDropdownOptionProps = {
    optionText: string
    OnPressButton: (option: string) => void

}

export const SettingsDropdownOption = ({ optionText, OnPressButton }: SettingsDropdownOptionProps) => {

    return (
        <TouchableOpacity onPress={() => OnPressButton(optionText)} activeOpacity={0.7} style={{ paddingHorizontal: 5, paddingVertical: 2}}>
            <Text style={{ color: 'lightgrey', padding: 3, fontSize: 12, fontFamily: fontFamilies.regular, textAlign: 'right' }}>{optionText}</Text>
        </TouchableOpacity>
    )
}


export default SettingsScreen