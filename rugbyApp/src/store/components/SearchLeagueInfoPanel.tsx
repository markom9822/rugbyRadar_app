import { SearchLeagueInfo } from "@/app/(tabs)/search"
import { fontFamilies } from "@/constants/tokens"
import Entypo from '@expo/vector-icons/Entypo'
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ChallengeCupAltLogo, ChampionsCupAltLogo, PremiershipAltLogo, RankingsLogo, RugbyChampAltLogo, SixNationsAltLogo, SuperRugbyAltLogo, Top14AltLogo, U20SixNationsAltLogo, U20WorldChampsAltLogo, URCAltLogo, WorldCupAltLogo } from "../LeagueLogos/LeagueLogos"
import { hexToRGB } from "../utils/helpers"
import { LeagueKnockoutsPanel } from "./LeagueKnockoutsPanel"
import { LeagueStandingsPanel } from "./LeagueStandingsPanel"
import { LeagueUpcomingFixturesPanel } from "./LeagueUpcomingFixturesPanel"

type SearchLeagueInfoPanelProps = {
    leagueInfo: SearchLeagueInfo,
    //id: string,
    bottomSheetRef: React.RefObject<BottomSheetModal>
}

export const SearchLeagueInfoPanel = ({ leagueInfo, bottomSheetRef }: SearchLeagueInfoPanelProps) => {


    const seasonManualData = ['2025', '2024', '2023', '2022'];
    const seasonSingleData = ['2025'];
    const seasonSingleWorldCupData = ['2023'];

    const leagueData = [
        { label: 'URC', value: 'urc', logo: URCAltLogo, seasonData: seasonManualData, hasKnockouts: true, knockoutsYears: ['2025', '2024', '2023', '2022'] },
        { label: 'Premiership', value: 'prem', logo: PremiershipAltLogo, seasonData: seasonManualData, hasKnockouts: true, knockoutsYears: ['2025', '2024', '2023', '2022'] },
        { label: 'Top 14', value: 'top14', logo: Top14AltLogo, seasonData: seasonSingleData, hasKnockouts: true, knockoutsYears: ['2025', '2024', '2023', '2022'] },
        { label: 'Champions Cup', value: 'championsCup', logo: ChampionsCupAltLogo, seasonData: seasonManualData, hasKnockouts: true, knockoutsYears: ['2025', '2024'] },
        { label: 'Challenge Cup', value: 'challengeCup', logo: ChallengeCupAltLogo, seasonData: seasonManualData, hasKnockouts: true, knockoutsYears: ['2025', '2024'] },

        { label: 'Super Rugby', value: 'superRugby', logo: SuperRugbyAltLogo, seasonData: seasonSingleData, hasKnockouts: false, knockoutsYears: [] },
        { label: 'Six Nations', value: 'sixNations', logo: SixNationsAltLogo, seasonData: seasonManualData, hasKnockouts: false, knockoutsYears: [] },
        { label: 'U20 Six Nations', value: 'u20SixNations', logo: U20SixNationsAltLogo, seasonData: seasonSingleData, hasKnockouts: false, knockoutsYears: [] },
        { label: 'Rugby Championship', value: 'rugbyChamp', logo: RugbyChampAltLogo, seasonData: seasonManualData, hasKnockouts: false, knockoutsYears: [] },
        { label: 'Rugby World Cup', value: 'rugbyWorldCup', logo: WorldCupAltLogo, seasonData: seasonSingleWorldCupData, hasKnockouts: true, knockoutsYears: ['2025', '2024', '2023', '2022'] },
        { label: 'U20 Championship', value: 'u20Championship', logo: U20WorldChampsAltLogo, seasonData: seasonSingleData, hasKnockouts: true, knockoutsYears: ['2025', '2024', '2023', '2022'] },
        { label: 'World Rankings', value: 'worldRankings', logo: RankingsLogo, seasonData: seasonSingleData, hasKnockouts: false, knockoutsYears: [] }
    ];

    const targetIndex = leagueData.findIndex(item => item.value === leagueInfo.value);
    const leagueSeasonData = leagueData[targetIndex].seasonData;

    const [seasonName, setSeasonName] = useState<string>(leagueSeasonData[0]);

    const shouldShowKnockouts = leagueData[targetIndex].hasKnockouts && leagueData[targetIndex].knockoutsYears.includes(seasonName);

    const fadedGreyColour = hexToRGB('#a4a6a6', '0.8');
    const teamGradientColour = hexToRGB(leagueInfo.colour, '0.4')

    const handleCloseBottomSheet = () => {

        bottomSheetRef.current?.close();
    }

    const handleChangedSeasonYear = (year: string) => {

        setSeasonName(year)
    }


    return (
        <BottomSheetScrollView>
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
                            source={leagueInfo.logo} />
                    </View>
                    <Text style={[{ color: 'lightgrey', fontFamily: fontFamilies.bold, textAlign: 'center', padding: 5 }]}>{leagueInfo.displayName}</Text>
                </View>

                <LeagueUpcomingFixturesPanel leagueName={leagueInfo.value} />

                <LeagueStandingsPanel leagueName={leagueInfo.value} seasonYear={seasonName} leagueSeasonData={leagueSeasonData} OnChangeSeasonYear={handleChangedSeasonYear} />

                <LeagueKnockoutsPanel leagueName={leagueInfo.value} seasonYear={seasonName} showKnockouts={shouldShowKnockouts} />


            </LinearGradient>
        </BottomSheetScrollView>
    )
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