import { colors, fontFamilies } from "@/constants/tokens"
import Entypo from '@expo/vector-icons/Entypo'
import { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { RugbyRadarIconWhite } from "../Icons/Icons"
import { hexToRGB } from "../utils/helpers"
import { useRouter } from 'expo-router';
import { getRugbyEventInfoFromValue } from "../RugbyLeaguesDatabase"


type LeagueDataItem = {
    label: string;
    value: string;
    logo: React.ReactNode | null;
};

type FixturesHeaderBannerProps = {
    currentLeague: string,
}

export const FixturesHeaderBanner = ({ currentLeague }: FixturesHeaderBannerProps) => {

    const chooseLeagueButtonColour = hexToRGB("#4d4b4b", '0.6');
    const router = useRouter();

    const currentEventImage = getRugbyEventInfoFromValue(currentLeague)?.logo;

    return (

        <View style={{ flexDirection: 'row', height: "10%", alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: "60%", paddingHorizontal: 5 }}>
                <View style={{ padding: 4 }}>
                    <Image
                        style={{
                            resizeMode: 'contain',
                            width: 36,
                            height: 36,
                            minHeight: 36,
                            minWidth: 36
                        }}
                        source={RugbyRadarIconWhite} />
                </View>

                <View>
                    <Text style={{ fontFamily: fontFamilies.title, fontSize: 16, color: colors.text }}>Rugby Radar</Text>
                </View>
            </View>


            <View style={{ justifyContent: 'center', alignItems: 'flex-end', width: "40%", paddingHorizontal: 10 }}>
                <TouchableOpacity style={{ padding: 5, backgroundColor: chooseLeagueButtonColour, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }} onPress={() => router.navigate('/modal')}>
                    <View style={{ padding: 4, backgroundColor: chooseLeagueButtonColour, marginHorizontal: 3, borderRadius: 4 }}>
                        <Image source={currentEventImage} style={{ resizeMode: 'contain', height: 20, width: 20, minHeight: 20, minWidth: 20 }} />
                    </View>
                    <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.regular, fontSize: 13 }}>Choose League</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

type LeaguePickerProps = {
    currentLeague: string
    leagueOptions: LeagueDataItem[]
    OnPressLeague: (league: string) => void

}

export const LeaguePicker = ({ currentLeague, leagueOptions, OnPressLeague }: LeaguePickerProps) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const seasonDropdownButtonColour = hexToRGB("#4d4b4b", '0.4')
    const seasonDropdownPanelColour = hexToRGB("#4d4b4b", '0.95')

    const dropdownIconText = showDropdown ? "chevron-up" : "chevron-down"

    const handlePressedPickerOption = (league: string) => {
        OnPressLeague(league)
        setShowDropdown(false)
    }

    const currentOption = leagueOptions.find((element) => element.value === currentLeague)

    return (
        <View>
            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} activeOpacity={0.8}>

                <View style={{ backgroundColor: seasonDropdownButtonColour, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 12, flexDirection: 'row' }}>
                    <View style={{ paddingHorizontal: 4, justifyContent: 'center', alignContent: 'center' }}>
                        <Entypo name={dropdownIconText} size={15} color="grey" />
                    </View>
                    <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, textAlign: 'center', paddingHorizontal: 2 }}>{currentOption?.label}</Text>
                </View>
            </TouchableOpacity>

            {showDropdown && (
                <View style={{ position: 'absolute', width: "120%", backgroundColor: seasonDropdownPanelColour, top: 25, zIndex: 10, right: 5, borderRadius: 5 }}>
                    <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                        {leagueOptions.map((item, index) => {
                            return <LeagueOption OnPressButton={handlePressedPickerOption} key={index} leagueTitle={item.label} leagueValue={item.value} />
                        })}
                    </View>
                </View>
            )}
        </View>
    )
}

type LeagueOptionProps = {
    leagueTitle: string
    leagueValue: string,
    OnPressButton: (seasonYear: string) => void

}

export const LeagueOption = ({ leagueTitle, leagueValue, OnPressButton }: LeagueOptionProps) => {

    return (
        <TouchableOpacity onPress={() => OnPressButton(leagueValue)} activeOpacity={0.7} style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <Text style={{ color: 'lightgrey', padding: 3, fontFamily: fontFamilies.regular, textAlign: 'right' }}>{leagueTitle}</Text>
        </TouchableOpacity>
    )
}