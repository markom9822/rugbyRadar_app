import { MatchInfo } from "@/app/(tabs)/index"
import { fontFamilies, fontSize } from "@/constants/tokens"
import Entypo from '@expo/vector-icons/Entypo'
import { useEffect, useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { getLeagueCode, getRugbyVizLeagueCode, getRugbyVizPlayoffCutoffFromLeagueName, hexToRGB } from "../utils/helpers"
import { fetchRugbyVizKnockoutFixtures } from "../utils/knockoutFixturesGetter"
import { getAllStandingsData, getAllStandingsDataPlanetRugby, getAllStandingsDataRugbyViz, getAllStandingsDataWorldRugbyAPI } from "../utils/standingsGetter"
import { KnockoutsPanel } from "./KnockoutsPanel"
import { StandingPanel } from "./StandingPanel"


export type StandingInfo = {
    isHeader: boolean
    teamPool: string
    teamName: string
    teamGP: string
    teamWins: string
    teamDraws: string
    teamLosses: string
    teamPD: string
    teamPoints: string
    ranking: number
    isLastItem: boolean
    isEndOfList: boolean
    isPlayoffCutoff: boolean,
}

const getWorldRankingsData = (todaysRankings: any): StandingInfo[] => {

    const rankListLength = 15;

    let newArray = [];

    for (let index = 0; index < rankListLength; index++) {

        const teamName = todaysRankings.entries[index].team.name;
        const rawPoints = todaysRankings.entries[index].pts;
        const teamPoints = parseFloat(rawPoints).toFixed(2);

        const teamPosition = todaysRankings.entries[index].pos;

        let newRankingInfo = {
            isHeader: false,
            teamPool: '',
            teamName: teamName,
            teamGP: '-',
            teamWins: '-',
            teamDraws: '-',
            teamLosses: '-',
            teamPD: '-',
            teamPoints: teamPoints,
            ranking: index,
            isLastItem: index === rankListLength - 1,
            isEndOfList: index === rankListLength - 1,
            isPlayoffCutoff: false,
        };

        newArray.push(newRankingInfo)
    }

    return (
        newArray
    )
}

type LeagueStandingsPanelProps = {
    leagueName: string,
    seasonYear: string,
    leagueSeasonData: string[],
    shouldShowKnockouts: boolean,
    OnChangeSeasonYear: (year: string) => void

}


export const getDefaultRoundButton = (knockoutsArray: MatchInfo[]) => {

    const roundMapping = {
        'R16': 'r16',
        'QF': 'quaterFinals',
        'SF': 'semiFinals',
        'GF': 'final'
    };

    const roundTypes = Object.entries(roundMapping)
        .filter(([key]) => knockoutsArray.some(obj => obj.matchTitle === key))
        .map(([_, value]) => value);

    console.info(`Default Value: ${roundTypes[0]}`)

    return roundTypes[0]
}

export const LeagueStandingsPanel = ({ leagueName, seasonYear, leagueSeasonData, shouldShowKnockouts, OnChangeSeasonYear }: LeagueStandingsPanelProps) => {

    const [standingsArray, setStandingsArray] = useState<StandingInfo[]>([]);
    const [secondaryStandingsArray, setSecondaryStandingsArray] = useState<StandingInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const [knockoutsArray, setKnockoutsArray] = useState<MatchInfo[]>([]);
    const [knockoutRoundName, setKnockoutRoundName] = useState<string>(getDefaultRoundButton(knockoutsArray));


    const handlePressFetchData = async (targetSeasonName: string) => {
        console.info("Pressed Fetch Standings")
        if (leagueName === '' || targetSeasonName === '') {
            return;
        }
        setIsLoading(true)

        const currentLeagueCode = getLeagueCode(leagueName)

        let apiString = '';
        const rugbyVizCode = getRugbyVizLeagueCode(leagueName);

        const planetRugbyStandingsLeagueCodes = [
            { leagueName: 'top14', leagueCodes: ['1310036262'], playoffCutoffIndex: 6 },
            { leagueName: 'sixNations', leagueCodes: ['1310035506'], playoffCutoffIndex: -1 },
            { leagueName: 'rugbyChamp', leagueCodes: ['1310034091'], playoffCutoffIndex: -1 },
            { leagueName: 'u20Championship', leagueCodes: ["1310035680", "1310035681", "1310035682"], playoffCutoffIndex: 2 },
            { leagueName: 'rugbyWorldCup', leagueCodes: ['1310029544', '1310029546', '1310029547', '1310029548'], playoffCutoffIndex: 2 },
        ];

        const ESPNRugbyStandingsLeagueCodes = [
            { leagueName: 'sixNations', leagueCode: '180659', playoffCutoffIndex: -1 },
            { leagueName: 'superRugby', leagueCode: '242041', playoffCutoffIndex: 8 },
            { leagueName: 'rugbyChamp', leagueCode: '244293', playoffCutoffIndex: -1 },
        ];

        if (leagueName === "worldRankings") {
            apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/rankings/mru?language=en';

            const worldRankings = await fetch(apiString,).then((res) => res.json())
            const newArray = getWorldRankingsData(worldRankings)

            console.info(newArray)
            setStandingsArray(newArray)
        }
        else if (leagueName === "u20SixNations") {
            apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match/?states=U,UP,L,CC,C&pageSize=100&sort=asc&events=d7d54b61-12b7-4c98-8fda-84f43efa0b9b';
            const u20SixNationsMatches = await fetch(apiString,).then((res) => res.json())

            const manualWRStandings = await getAllStandingsDataWorldRugbyAPI(u20SixNationsMatches, leagueName);

            setStandingsArray(manualWRStandings)
        }
        // uses rugbyViz API
        else if (rugbyVizCode !== undefined) {
            const seasonNumber = Number(targetSeasonName) - 1;
            apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/tables/' + rugbyVizCode + '?provider=rugbyviz&season=' + seasonNumber + '01';
            console.info(apiString)

            const seasonStandingsRugViz = await fetch(apiString,).then((res) => res.json())
            if (seasonStandingsRugViz.data == undefined) {
                setIsLoading(false)
                return;
            }

            const playoffIndex = getRugbyVizPlayoffCutoffFromLeagueName(leagueName)
            const newArray = getAllStandingsDataRugbyViz(seasonStandingsRugViz, leagueName, playoffIndex)

            console.info(newArray)
            setStandingsArray(newArray)

            if (leagueName === "challengeCup") {
                const champsCupCode = "1008"
                // challenge cup needs secondary standings
                const secondaryApiString = 'https://rugby-union-feeds.incrowdsports.com/v1/tables/' + champsCupCode + '?provider=rugbyviz&season=' + seasonNumber + '01';
                const secondarySeasonStandingsRugViz = await fetch(secondaryApiString,).then((res) => res.json())
                const secondaryArray = getAllStandingsDataRugbyViz(secondarySeasonStandingsRugViz, 'championsCup', playoffIndex)
                setSecondaryStandingsArray(secondaryArray)
            }
        }
        // ESPN rugby API
        else if (ESPNRugbyStandingsLeagueCodes.find((element) => element.leagueName === leagueName) !== undefined) {
            const ESPNRugbyAPILeagueCode = ESPNRugbyStandingsLeagueCodes.find((element) => element.leagueName === leagueName)?.leagueCode;

            const seasonNumber = Number(targetSeasonName);
            apiString = 'https://site.web.api.espn.com/apis/v2/sports/rugby/' + ESPNRugbyAPILeagueCode + '/standings?lang=en&region=gb&season=' + seasonNumber + '&seasontype=1&sort=rank:asc&type=0';
            console.info(apiString)

            const seasonStandingsESPN = await fetch(apiString,).then((res) => res.json())
            const newArray = getAllStandingsData(seasonStandingsESPN)
            setStandingsArray(newArray)
        }
        // use planet rugby API for standings
        else if (planetRugbyStandingsLeagueCodes.find((element) => element.leagueName === leagueName) !== undefined) {
            const planetRugbyAPILeagueCodes = planetRugbyStandingsLeagueCodes.find((element) => element.leagueName === leagueName)?.leagueCodes;
            const planetRugbyAPIPlayoffCutoffIndex = planetRugbyStandingsLeagueCodes.find((element) => element.leagueName === leagueName)?.playoffCutoffIndex;

            if (planetRugbyAPILeagueCodes === undefined) return;

            if (planetRugbyAPILeagueCodes.length > 1) {
                let pooledArray: StandingInfo[] = [];

                for (let index = 0; index < planetRugbyAPILeagueCodes.length; index++) {

                    apiString = 'https://rugbylivecenter.yormedia.com/api/all-league-tables/' + planetRugbyAPILeagueCodes[index];

                    const seasonStandingsPlanetRugby = await fetch(apiString,).then((res) => res.json())
                    const newArray = getAllStandingsDataPlanetRugby(seasonStandingsPlanetRugby, true, index === planetRugbyAPILeagueCodes.length - 1, planetRugbyAPIPlayoffCutoffIndex)
                    pooledArray.push(...newArray)
                }

                console.info(pooledArray)
                setStandingsArray(pooledArray)
                setIsLoading(false)
                return;
            }

            apiString = 'https://rugbylivecenter.yormedia.com/api/all-league-tables/' + planetRugbyAPILeagueCodes[0];

            const seasonStandingsPlanetRugby = await fetch(apiString,).then((res) => res.json())
            const newArray = getAllStandingsDataPlanetRugby(seasonStandingsPlanetRugby, false, true, planetRugbyAPIPlayoffCutoffIndex)

            console.info(newArray)
            setStandingsArray(newArray)

            setIsLoading(false)
        }

        setIsLoading(false)
    }


    useEffect(() => {
        async function fetchMyAPI() {
            await handlePressFetchData(seasonYear)

            const knockoutFixtures = await fetchRugbyVizKnockoutFixtures(leagueName, seasonYear)
            setKnockoutsArray(knockoutFixtures)
            setKnockoutRoundName(getDefaultRoundButton(knockoutFixtures))
        }
        fetchMyAPI()
    }, [])


    const handleNewRoundChosen = (roundName: string) => {
        setKnockoutRoundName(roundName)
    }

    const activityIndicatorHeader = () => {

        if (isLoading) {
            return (
                <View style={{ marginVertical: 20 }}>
                    <ActivityIndicator size='large' color='lightgrey' />
                </View>
            )
        }

        return null
    }

    const panelColour = hexToRGB("#4d4b4b", '0.6')

    const handlePressedSeasonYear = async (year: string) => {

        OnChangeSeasonYear(year)

        if (year !== seasonYear) {
            await handlePressFetchData(year)
            const knockoutFixtures = await fetchRugbyVizKnockoutFixtures(leagueName, year)
            setKnockoutsArray(knockoutFixtures)
            setKnockoutRoundName(getDefaultRoundButton(knockoutFixtures))
        }
    }

    return (
        <View style={{ width: "100%" }}>

            <View style={{ flexDirection: 'row', marginHorizontal: 15, marginVertical: 3 }}>
                <View style={{ justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 5, width: "50%" }}>
                    <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.title, fontSize: 12, textAlign: 'left' }}>Standings</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'flex-end', width: "50%", paddingHorizontal: 5 }}>
                    <SeasonYearPicker currentSeasonYear={seasonYear} seasonYearOptions={leagueSeasonData} OnPressSeasonYear={handlePressedSeasonYear} />
                </View>

            </View>

            <View style={{
                backgroundColor: panelColour, paddingVertical: 10, paddingHorizontal: 4, borderRadius: 5, marginHorizontal: 15,
                marginBottom: shouldShowKnockouts ? 15 : 60
            }}>


                <StandingsHeader />

                <FlatList
                    data={standingsArray}
                    scrollEnabled={false}
                    ListEmptyComponent={
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, fontSize: fontSize.xs, textAlign: 'center' }}>Not currently available</Text>
                        </View>
                    }
                    renderItem={({ item, index }) =>
                        <StandingPanel
                            index={index}
                            league={leagueName}
                            isHeader={item.isHeader}
                            isWorldRanking={leagueName === "worldRankings"}
                            teamPool={item.teamPool}
                            teamName={item.teamName}
                            teamGP={item.teamGP}
                            teamWins={item.teamWins}
                            teamDraws={item.teamDraws}
                            teamLosses={item.teamLosses}
                            teamPD={item.teamPD}
                            teamPoints={item.teamPoints}
                            ranking={item.ranking}
                            isLastItem={item.isLastItem}
                            isEndOfList={item.isEndOfList}
                            isPlayoffCutoff={item.isPlayoffCutoff} />}
                />

                {activityIndicatorHeader()}


            </View>

            {shouldShowKnockouts && (
                <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, width: "100%" }}>
                        <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.title, fontSize: 12, textAlign: 'center' }}>Knockouts {seasonYear}</Text>
                    </View>
                    <View style={{ backgroundColor: panelColour, paddingVertical: 10, paddingHorizontal: 4, borderRadius: 5, marginHorizontal: 15, marginBottom: 60 }}>
                        {activityIndicatorHeader()}

                        {!isLoading && (
                            <KnockoutsPanel
                                standingsArray={standingsArray}
                                secondaryStandingsArray={secondaryStandingsArray}
                                knockoutFixturesArray={knockoutsArray}
                                leagueName={leagueName}
                                chosenKnockoutRound={knockoutRoundName}
                                handleChooseRound={handleNewRoundChosen} />
                        )}
                    </View>
                </View>
            )}
        </View>
    )
}

type SeasonYearPickerProps = {
    currentSeasonYear: string
    seasonYearOptions: string[]
    OnPressSeasonYear: (seasonYear: string) => void

}

export const SeasonYearPicker = ({ currentSeasonYear, seasonYearOptions, OnPressSeasonYear }: SeasonYearPickerProps) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const seasonDropdownButtonColour = hexToRGB("#4d4b4b", '0.4')
    const seasonDropdownPanelColour = hexToRGB("#4d4b4b", '0.95')
    const dropdownIconText = showDropdown ? "chevron-up" : "chevron-down"

    const handlePressedPickerOption = (seasonYear: string) => {
        OnPressSeasonYear(seasonYear)
        setShowDropdown(false)
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} activeOpacity={0.8}>

                <View style={{ backgroundColor: seasonDropdownButtonColour, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 12, flexDirection: 'row' }}>
                    <View style={{ paddingHorizontal: 4, justifyContent: 'center', alignContent: 'center' }}>
                        <Entypo name={dropdownIconText} size={15} color="grey" />
                    </View>
                    <Text style={{ color: 'lightgrey', fontSize: 12, fontFamily: fontFamilies.title, textAlign: 'center', paddingHorizontal: 2 }}>{currentSeasonYear}</Text>
                </View>
            </TouchableOpacity>
            {showDropdown && (
                <View style={{ position: 'absolute', width: "50%", backgroundColor: seasonDropdownPanelColour, top: 25, zIndex: 10, borderRadius: 5 }}>
                    <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                        {seasonYearOptions.map((item, index) => {
                            return <SeasonYearOption OnPressButton={handlePressedPickerOption} key={index} yearTitle={item} />
                        })}
                    </View>
                </View>
            )}
        </View>
    )
}

type SeasonYearOptionProps = {
    yearTitle: string
    OnPressButton: (seasonYear: string) => void

}

export const SeasonYearOption = ({ yearTitle, OnPressButton }: SeasonYearOptionProps) => {

    return (
        <TouchableOpacity onPress={() => OnPressButton(yearTitle)} activeOpacity={0.7} style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <Text style={{ color: 'lightgrey', padding: 3, fontSize: 12, fontFamily: fontFamilies.title, textAlign: 'right' }}>{yearTitle}</Text>
        </TouchableOpacity>
    )
}

type StandingsHeaderProps = {

}

export const StandingsHeader = ({ }: StandingsHeaderProps) => {

    return (
        <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
            <Text style={{ width: "6%", fontSize: fontSize.xs, color: 'grey', fontFamily: fontFamilies.bold }}></Text>
            <Text style={{ width: "32%", textAlign: 'left', fontSize: 10, color: 'grey', fontFamily: fontFamilies.title }}>TEAM</Text>
            <Text style={{ width: "10%", textAlign: 'center', fontSize: 10, color: 'grey', fontFamily: fontFamilies.title }}>GP</Text>
            <Text style={{ width: "10%", textAlign: 'center', fontSize: 10, color: 'grey', fontFamily: fontFamilies.title }}>W</Text>
            <Text style={{ width: "8%", textAlign: 'center', fontSize: 10, color: 'grey', fontFamily: fontFamilies.title }}>D</Text>
            <Text style={{ width: "10%", textAlign: 'center', fontSize: 10, color: 'grey', fontFamily: fontFamilies.title }}>L</Text>
            <Text style={{ width: "14%", textAlign: 'center', fontSize: 10, color: 'grey', fontFamily: fontFamilies.title }}>PD</Text>
            <Text style={{ width: "10%", textAlign: 'center', fontSize: 10, color: 'grey', fontFamily: fontFamilies.title }}>P</Text>
        </View>
    )

}