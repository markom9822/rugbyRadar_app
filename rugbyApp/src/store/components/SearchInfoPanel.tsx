import { MatchInfo } from "@/app/(tabs)/(fixtures)"
import { SearchTeamInfo } from "@/app/(tabs)/teams"
import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import Entypo from '@expo/vector-icons/Entypo'
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { hexToRGB } from "../utils/helpers"
import { FixtureLineups } from "./FixtureLineups"
import { FixtureOverview } from "./FixtureOverview"
import { FixtureStats } from "./FixtureStats"
import { FixtureEvents } from "./FixturesEvents"
import { TeamResultsPanel } from "./TeamResultsPanel"
import { TeamSummaryPanel } from "./TeamSummaryPanel"

type SearchInfoPanelProps = {
    teamInfo: SearchTeamInfo,
    //id: string,
    bottomSheetRef: React.RefObject<BottomSheetModal>
}

export const SearchInfoPanel = ({ teamInfo, bottomSheetRef }: SearchInfoPanelProps) => {

    const fadedGreyColour = hexToRGB('#a4a6a6', '0.8');
    const teamGradientColour = hexToRGB(teamInfo.colour, '0.4')


    const handleCloseBottomSheet = () => {

        bottomSheetRef.current?.close();
    }

    return (
        <LinearGradient colors={[teamGradientColour, 'transparent']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 0.5 }}
            style={[{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', borderRadius: 12 }]}>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: "100%" }}>
                <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 15, marginVertical: 10 }} onPress={handleCloseBottomSheet}>
                    <View style={{ padding: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <Entypo name="chevron-thin-down" size={20} color="lightgrey" />
                    </View>
                </TouchableOpacity>
            </View>


            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ padding: 5 }}>
                    <Image
                        style={[searchInfoPanelStyles.teamLogo]}
                        source={teamInfo.logo} />
                </View>
                <Text style={[{ color: 'lightgrey', fontFamily: fontFamilies.bold, textAlign: 'center', padding: 5 }]}>{teamInfo.abbreviation}</Text>
            </View>


            <TeamSummaryPanel teamInfo={teamInfo} />
            <TeamResultsPanel teamInfo={teamInfo} />

        </LinearGradient>
    )
}

type FixturesInfoPanel = {
    id: string,

}

export const FixtureInfoPanel = ({ id }: FixturesInfoPanel) => {

    const [currentTab, setCurrentTab] = useState<string>('Overview');

    console.info(currentTab)

    return (
        <LinearGradient colors={['#0d0c0c', 'transparent']} start={{ x: 0.5, y: 0.3 }} end={{ x: 0.5, y: 0 }}
            style={[{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }]}>

            <FixturesInfoTabBar OnTabButtonPressed={setCurrentTab} currentTabKey={currentTab} />

            <FixturesInfoBox id={id} currentTabKey={currentTab} />

        </LinearGradient>
    )
}

type FixturesInfoBox = {
    id: string,
    currentTabKey: string

}


export const FixturesInfoBox = ({ id, currentTabKey }: FixturesInfoBox) => {

    return (

        <View>
            <FixtureOverview id={id} isShown={currentTabKey == "Overview"} />
            <FixtureStats id={id} isShown={currentTabKey == "Stats"} />
            <FixtureEvents id={id} isShown={currentTabKey == "Events"} />
            <FixtureLineups id={id} isShown={currentTabKey == "Lineups"} />
        </View>
    )
}

type FixturesInfoTabBar = {
    OnTabButtonPressed: (key: string) => void,
    currentTabKey: string,

}


export const FixturesInfoTabBar = ({ OnTabButtonPressed, currentTabKey }: FixturesInfoTabBar) => {

    return (

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 8, marginTop: 30 }}>
            <FixturesInfoTabButton title="Overview" OnPressTab={OnTabButtonPressed} isTabSelected={currentTabKey == "Overview"} />
            <FixturesInfoTabButton title="Stats" OnPressTab={OnTabButtonPressed} isTabSelected={currentTabKey == "Stats"} />
            <FixturesInfoTabButton title="Events" OnPressTab={OnTabButtonPressed} isTabSelected={currentTabKey == "Events"} />
            <FixturesInfoTabButton title="Lineups" OnPressTab={OnTabButtonPressed} isTabSelected={currentTabKey == "Lineups"} />
        </View>
    )
}

type FixturesInfoTabButton = {
    title: string,
    isTabSelected: boolean,
    OnPressTab: (key: string) => void

}


export const FixturesInfoTabButton = ({ title, isTabSelected, OnPressTab }: FixturesInfoTabButton) => {

    return (
        <TouchableOpacity style={{ margin: 4, width: "22%" }} activeOpacity={0.8} onPress={() => OnPressTab(title)}>
            <Text style={{
                color: isTabSelected ? colors.text : 'grey', borderBottomColor: colors.text, borderBottomWidth: isTabSelected ? 2 : 0,
                fontFamily: isTabSelected ? fontFamilies.bold : fontFamilies.regular, textAlign: 'center', fontSize: 15, paddingVertical: 2
            }}>{title}</Text>
        </TouchableOpacity>
    )
}

export const scoreRender = (eventState: string, matchTime: string, matchInfo: MatchInfo, homeFontFamily: string, awayFontFamily: string) => {

    // not started yet
    if (eventState === "pre") {
        return (
            <View style={{ flexDirection: 'column', width: "100%", paddingVertical: 8 }}>
                <Text style={{
                    color: colors.text, fontSize: fontSize.base,
                    textAlign: 'center', fontFamily: fontFamilies.regular
                }}>{matchTime}</Text>
            </View>
        )
    }
    // event finished
    else if (eventState === "post") {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", paddingVertical: 8 }}>
                <Text style={[
                    { fontSize: fontSize.lg, color: colors.text, fontFamily: homeFontFamily, width: "35%", textAlign: 'center' }]}>{matchInfo.homeScore}</Text>

                <Text style={{ textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular, padding: 2, fontSize: fontSize.sm, width: "30%" }}>FT</Text>

                <Text style={[
                    { fontSize: fontSize.lg, color: colors.text, fontFamily: awayFontFamily, width: "35%", textAlign: 'center' }]}>{matchInfo.awayScore}</Text>
            </View>
        )
    }
    // event at halftime
    else if (eventState === "halfTime") {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", paddingVertical: 8 }}>
                <Text style={[
                    { fontSize: fontSize.lg, color: colors.text, fontFamily: homeFontFamily, width: "30%", textAlign: 'center' }]}>{matchInfo.homeScore}</Text>

                <Text style={{ textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular, padding: 2, fontSize: fontSize.sm, width: "40%" }}>HT</Text>

                <Text style={[
                    { fontSize: fontSize.lg, color: colors.text, fontFamily: awayFontFamily, width: "30%", textAlign: 'center' }]}>{matchInfo.awayScore}</Text>
            </View>
        )
    }
    // event ongoing
    else {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", paddingVertical: 8 }}>
                    <Text style={[
                        { fontSize: fontSize.lg, color: colors.text, fontFamily: homeFontFamily, width: "35%", textAlign: 'center' }]}>{matchInfo.homeScore}</Text>

                    <Text style={{ textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular, padding: 2, fontSize: 15, width: "30%" }}>{matchInfo.eventTime}'</Text>

                    <Text style={[
                        { fontSize: fontSize.lg, color: colors.text, fontFamily: awayFontFamily, width: "35%", textAlign: 'center' }]}>{matchInfo.awayScore}</Text>
                </View>

            </View>
        )
    }
}


export const searchInfoPanelStyles = StyleSheet.create({

    teamLogo: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
        minHeight: 70,
        minWidth: 70
    },
})