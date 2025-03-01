import { colors, fontFamilies } from "@/constants/tokens"
import { BALionsAltLogo } from "@/store/InternationalTeamLogos/InternationalTeams"
import { AutumnNationsAltLogo, ChallengeCupAltLogo, ChampionsCupAltLogo, PacificNationsCupAltLogo, PremiershipAltLogo, RugbyChampAltLogo, SixNationsAltLogo, SuperRugbyAltLogo, Top14AltLogo, U20SixNationsAltLogo, URCAltLogo, WorldCupAltLogo } from "@/store/LeagueLogos/LeagueLogos"
import Entypo from '@expo/vector-icons/Entypo'
import { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { RugbyRadarIconWhite } from "../Icons/Icons"
import { hexToRGB } from "../utils/helpers"

type LeagueDataItem = {
    label: string;
    value: string;
    logo: React.ReactNode | null;
};

export const leagueData: LeagueDataItem[] = [
    { label: 'All Leagues', value: 'all', logo: null },
    { label: 'URC', value: 'urc', logo: URCAltLogo },
    { label: 'Premiership', value: 'prem', logo: PremiershipAltLogo },
    { label: 'Top 14', value: 'top14', logo: Top14AltLogo },
    { label: 'Super Rugby', value: 'superRugby', logo: SuperRugbyAltLogo },
    { label: 'Champions Cup', value: 'championsCup', logo: ChampionsCupAltLogo },
    { label: 'Challenge Cup', value: 'challengeCup', logo: ChallengeCupAltLogo },
    { label: 'Six Nations', value: 'sixNations', logo: SixNationsAltLogo },
    { label: 'U20 Six Nations', value: 'u20SixNations', logo: U20SixNationsAltLogo },
    { label: 'Autumn Nations Series', value: 'autumnNations', logo: AutumnNationsAltLogo },
    { label: 'Rugby Championship', value: 'rugbyChamp', logo: RugbyChampAltLogo },
    { label: 'Rugby World Cup', value: 'rugbyWorldCup', logo: WorldCupAltLogo },
    { label: 'U20 Championship', value: 'u20Championship', logo: WorldCupAltLogo },
    { label: 'Pacific Nations Cup', value: 'pacificNationsCup', logo: PacificNationsCupAltLogo },

    { label: 'Lions Tour', value: 'BILTour', logo: BALionsAltLogo },
];

type FixturesHeaderBannerProps = {

    currentLeague: string,

    OnPressLeague: (league: string) => void

}

export const FixturesHeaderBanner = ({ currentLeague, OnPressLeague }: FixturesHeaderBannerProps) => {

    return (

        <View style={{ flexDirection: 'row', height: "10%", alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: "60%", paddingHorizontal: 5 }}>
                <View style={{ padding: 4 }}>
                    <Image
                        style={{
                            resizeMode: 'contain',
                            width: 50,
                            height: 50,
                            minHeight: 50,
                            minWidth: 50
                        }}
                        source={RugbyRadarIconWhite} />
                </View>

                <View>
                    <Text style={{ fontFamily: fontFamilies.bold, fontSize: 20, color: colors.text }}>Rugby Radar</Text>
                </View>
            </View>


            <View style={{ justifyContent: 'center', alignItems: 'flex-end', width: "40%", paddingHorizontal: 10 }}>
                <LeaguePicker currentLeague={currentLeague} leagueOptions={leagueData} OnPressLeague={OnPressLeague} />
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

    const currentOption = leagueOptions.find((element) => element.value == currentLeague)

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