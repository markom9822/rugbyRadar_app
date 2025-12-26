import { colors, fontFamilies, fontSize } from "@/constants/tokens";
import { StandingsHeaderBanner } from "@/store/components/StandingsHeaderBanner";
import { getItem, setItem } from "@/store/utils/asyncStorage";
import { hexToRGB } from "@/store/utils/helpers";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react"
import { Switch, Text, TouchableOpacity, View } from "react-native"
import * as Localization from 'expo-localization';

export const TIMEZONES = [
    'Europe/London', 'Europe/Paris', 'Europe/Madrid', 'Pacific/Auckland',
    'Asia/Hong_Kong', 'Asia/Seoul', 'Asia/Tokyo',
    'America/New_York', 'Australia/Sydney', 'UTC'

];

export const getDefaultTimezone = async () => {

    const defaultTimezone = await getItem('defaultTimezone');

    if (defaultTimezone == null) {
        await setDefaultTimezone('Europe/London');
        console.info("Setting to default timezone")
        return 'Europe/London';
    }

    console.info("Returning stored timezone")

    return defaultTimezone;
}

const setDefaultTimezone = async (timezone: string) => {

    await setItem('defaultTimezone', timezone);
}

export const isTimeSyncEnabled = async () => {
    const timeSyncEnabled = await getItem('timeSyncEnabled');

    if (timeSyncEnabled == null || timeSyncEnabled === 'false') { 
        console.info("Time sync not enabled")
        return false;
    }

    console.info("Time sync enabled")
    return true;
}

export const getDeviceLocalTimezone = () => {

    return Localization.getCalendars()[0].timeZone;
}

const SettingsScreen = () => {

    const [currentTimezone, setCurrentTimezone] = useState<string>('Europe/London');
    const [timeSyncEnabled, setTimeSyncEnabled] = useState(false);

    const toggleTimeSyncSwitch = () => {
        setTimeSyncEnabled(prev => !prev);
    };

    const handlePressedTimeZoneOption = (timezone: string) => {

        setCurrentTimezone(timezone)
        setDefaultTimezone(timezone)
    }

    const setDefaultTimezone = async (timezone: string) => {

        await setItem('defaultTimezone', timezone);
    }

    useEffect(() => {
        async function fetchMyAPI() {

            // get is time sync enabled
            const timeSyncEnabled = await isTimeSyncEnabled();
            setTimeSyncEnabled(timeSyncEnabled);

            // get default timezone
            const defaultTimezone = await getDefaultTimezone();
            setCurrentTimezone(defaultTimezone);
        }
        fetchMyAPI()
    }, [])

    useEffect(() => {
        setItem('timeSyncEnabled', timeSyncEnabled.toString());
    }, [timeSyncEnabled]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>

            <StandingsHeaderBanner />

            <View style={{ padding: 10, borderRadius: 4, marginVertical: 5 }}>
                <Text style={{ color: 'white', fontFamily: fontFamilies.title, fontSize: fontSize.sm, paddingBottom: 10 }}>Settings</Text>


                <View style={{ padding: 4, paddingVertical: 10, marginVertical: 5, borderBottomWidth: 0.5, borderColor: 'grey', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <View style={{ width: "70%" }}>
                        <Text style={{ color: 'white', fontFamily: fontFamilies.regular }}>Sync Timezone</Text>
                        <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, fontSize: fontSize.xs }}>Gets timezone from device</Text>
                    </View>

                    <View style={{ width: "30%" }}>
                        <Switch
                            trackColor={{ false: '#767577', true: '#9060acff' }}
                            thumbColor={timeSyncEnabled ? "#c6b2ecff" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e42"
                            onValueChange={toggleTimeSyncSwitch}
                            value={timeSyncEnabled}
                        />
                    </View>
                </View>

                <View style={{ padding: 4, paddingVertical: 10, marginVertical: 5, borderBottomWidth: 0.5, borderColor: 'grey', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <View style={{ width: "50%" }}>
                        <Text style={{ color: timeSyncEnabled ? 'grey' : 'white', fontFamily: fontFamilies.regular }}>Manual Timezone</Text>
                    </View>

                    <View style={{ width: "50%" }}>
                        <SettingsDropdown currentOption={currentTimezone} allOptions={TIMEZONES} isEnabled={!timeSyncEnabled} OnPressOption={handlePressedTimeZoneOption} />
                    </View>
                </View>
            </View>
        </View>
    )
}

type SettingsDropdownProps = {
    currentOption: string
    allOptions: string[],
    isEnabled: boolean,
    OnPressOption: (option: string) => void

}

export const SettingsDropdown = ({ currentOption, allOptions, isEnabled, OnPressOption }: SettingsDropdownProps) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownIconText = showDropdown ? "chevron-up" : "chevron-down"

    const handlePressedPickerOption = (option: string) => {
        OnPressOption(option)
        setShowDropdown(false)
    }

    const dropdownButtonColour = hexToRGB("#4d4b4b", '0.4')

    return (
        <View>
            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} disabled={!isEnabled} activeOpacity={0.8}>

                <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 12, flexDirection: 'row', backgroundColor: dropdownButtonColour }}>
                    <View style={{ paddingHorizontal: 4, justifyContent: 'center', alignContent: 'center', opacity: isEnabled ? 1:0 }}>
                        <Entypo name={dropdownIconText} size={15} color="grey" />
                    </View>
                    <Text style={{ color: isEnabled ? 'lightgrey' : 'grey', fontSize: 12, fontFamily: fontFamilies.regular, textAlign: 'center', paddingHorizontal: 2 }}>{currentOption}</Text>
                </View>
            </TouchableOpacity>
            {showDropdown && (
                <View style={{ position: 'absolute', width: "100%", top: 25, zIndex: 10, borderRadius: 5, backgroundColor: '#4d4b4b' }}>
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
        <TouchableOpacity onPress={() => OnPressButton(optionText)} activeOpacity={0.7} style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <Text style={{ color: 'lightgrey', padding: 3, fontSize: 12, fontFamily: fontFamilies.regular, textAlign: 'right' }}>{optionText}</Text>
        </TouchableOpacity>
    )
}


export default SettingsScreen