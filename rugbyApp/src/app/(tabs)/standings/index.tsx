import { defaultStyles} from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, FlatList, StyleSheet, LogBox, ImageBackground } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens"
import { useState } from "react"
import { CustomSelectDropdown, DropdownData, LeagueSelectDropdown } from "@/store/components/SelectDropdown"
import { generateSeasonList, getLeagueCode } from "@/store/utils/helpers"
import { getAllStandingsData } from "@/store/utils/standingsGetter"
import { StandingPanel } from "@/store/components/StandingPanel"
import { ChampionsCupAltLogo, PremiershipAltLogo, RankingsLogo, SixNationsAltLogo, SuperRugbyAltLogo, Top14AltLogo, URCAltLogo, WorldCupAltLogo } from "@/store/LeagueLogos/LeagueLogos"


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
}

const getWorldRankingsData = (todaysRankings: any) => {

    const rankListLength = 15;

    var newArray = [];

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
            isLastItem: index == rankListLength - 1
    };

        newArray.push(newRankingInfo)
    }

    return (
        newArray
    )
}

export type SeasonDateInfo = {
    label: string,
    value: string
}


const StandingsScreen = () => {
    const [standingsArray, setStandingsArray] = useState<StandingInfo[]>([]);
    const [leagueName, setLeagueName] = useState<string>('');
    const [seasonName, setSeasonName] = useState<string>('');
    const [seasonDates, setSeasonDates] = useState<SeasonDateInfo[]>(generateSeasonList());

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Standings")

        const currentLeagueCode = getLeagueCode(leagueName)

        var apiString = '';

        if(leagueName == "worldRankings")
        {
            apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/rankings/mru?language=en';

            const worldRankings = await fetch( apiString,).then((res) => res.json())
            const newArray = getWorldRankingsData(worldRankings)

            console.info(newArray)
            setStandingsArray(newArray)
        }
        else
        {
            apiString = 'https://site.web.api.espn.com/apis/v2/sports/rugby/' + currentLeagueCode + '/standings?lang=en&region=gb&season='
             + seasonName + '&seasontype=1&sort=rank:asc&type=0';
            
            const seasonStandings = await fetch( apiString,).then((res) => res.json())
            const newArray = getAllStandingsData(seasonStandings)

            console.info(newArray)
            setStandingsArray(newArray)
        }
    }

    const handleOnChangeLeague = (item: DropdownData) => {
        setLeagueName(item.value)
        setSeasonName('')
        setStandingsArray([])
    }

    const handleOnChangeSeason = (item: DropdownData) => {
        setSeasonName(item.value)
        setStandingsArray([])
    }

    const leagueData = [
        { label: 'URC', value: 'urc', logo: URCAltLogo },
        { label: 'Premiership', value: 'prem', logo: PremiershipAltLogo },
        { label: 'Top 14', value: 'top14', logo: Top14AltLogo },
        { label: 'Champions Cup', value: 'championsCup', logo: ChampionsCupAltLogo },
        { label: 'Super Rugby', value: 'superRugby', logo: SuperRugbyAltLogo },
        { label: 'Six Nations', value: 'sixNations', logo: SixNationsAltLogo },
        { label: 'Rugby World Cup', value: 'rugbyWorldCup', logo: WorldCupAltLogo },
        { label: 'World Rankings', value: 'worldRankings', logo: RankingsLogo}
    ];

    const seasonWorldCupData = [
        { label: '2023', value: '2023' },
        { label: '2019', value: '2019' },
        { label: '2015', value: '2015' },
        { label: '2011', value: '2011' },
        { label: '2007', value: '2007' },
        { label: '2003', value: '2003' },
        { label: '1999', value: '1999' },
        { label: '1995', value: '1995' },
        { label: '1991', value: '1991' },
        { label: '1987', value: '1987' },
    ];

    var currentSeasonData;

    switch(leagueName) { 
        case "urc": { 
           currentSeasonData = seasonDates; 
           break; 
        } 
        case "prem": { 
            currentSeasonData = seasonDates; 
            break; 
        } 
        case "top14": { 
            currentSeasonData = seasonDates; 
            break; 
        }
        case "superRugby": { 
            currentSeasonData = seasonDates; 
            break; 
        }
        case "championsCup": { 
            currentSeasonData = seasonDates; 
            break; 
        }
        case "sixNations": { 
            currentSeasonData = seasonDates; 
            break; 
        } 
        case "rugbyWorldCup": { 
            currentSeasonData = seasonWorldCupData; 
           break; 
        }
        default: { 
            currentSeasonData = seasonDates; 
           break; 
        }
    } 

    const isSeasonDropdownDisabled = leagueName == "worldRankings"

    const headerRender = (isWorldRanking: boolean, eventsArray: StandingInfo[]) => {

        if(eventsArray == undefined || eventsArray.length == 0)
        {
            return;
        }

        if (isWorldRanking) {
            return (
                <View style={{ flexDirection: 'row' }}>
                        <Text style={[standingsHeadingStyles.seasonTitle, { width: "60%", textAlign: 'left' }]}> #        Team</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "40%" }]}>Points</Text>
                </View>
            )
        }
        else {
            return (
                <>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[standingsHeadingStyles.seasonTitle, { width: "40%", textAlign: 'left' }]}> #    Team</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "9%" }]}>GP</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "9%" }]}>W</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "9%" }]}>D</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "9%" }]}>L</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "15%" }]}>PD</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "9%" }]}>P</Text>
                    </View>

                </>
            )
        }
    }

    const notFoundHeader = (eventsArray: StandingInfo[]) => {

        if(eventsArray == undefined || eventsArray.length == 0)
        {
            return (
                <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                    <Text style={{ fontSize: fontSize.sm, color: 'grey', fontWeight: 300, textAlign: 'center' }}>No Standings Found</Text>
                </View>
            )
        }
        
        return null
    }


    return <View style={defaultStyles.container}>

        <LeagueSelectDropdown
        placeholder="Select League" 
        data={leagueData}
        onChangeSelection={handleOnChangeLeague}
        isDisabled={false}
        value={leagueName}
        iconName="trophy-outline"/>

        <CustomSelectDropdown
        placeholder="Select Season" 
        data={currentSeasonData}
        onChangeSelection={handleOnChangeSeason}
        isDisabled={isSeasonDropdownDisabled}
        value={seasonName}
        iconName="calendar-range"/>

        <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
        />

        {headerRender(leagueName == "worldRankings", standingsArray)}

        {notFoundHeader(standingsArray)}
        
        <FlatList 
        data={standingsArray}
        renderItem={({item, index}) => 
        <StandingPanel
            index={index}
            league={leagueName}
            isHeader={item.isHeader}
            isWorldRanking={leagueName == "worldRankings"}
            teamPool={item.teamPool}
            teamName={item.teamName}
            teamGP={item.teamGP}
            teamWins={item.teamWins}
            teamDraws={item.teamDraws}
            teamLosses={item.teamLosses}
            teamPD={item.teamPD}
            teamPoints={item.teamPoints}
            ranking={item.ranking}
            isLastItem={item.isLastItem} />}
        />

    </View>
}

export const standingsHeadingStyles = StyleSheet.create({
    seasonTitle: {
        textAlign: 'left',
        fontSize: 13,
        fontWeight: 500,
        color: 'grey',
    },
    headerStat: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: 500,
        color: 'grey',
    },
  })



type FetchDataButtonProps = {
	style?: ViewStyle
	iconSize?: number
    onPressButton: () => void
}

export const FetchDataButton = ({ style, iconSize = 48, onPressButton}: FetchDataButtonProps) => {

    return (
    <View style={[{ height: 50}, style]}>
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPressButton}
        >
            <MaterialCommunityIcons name="rugby" size={iconSize} color={colors.text} />
            <Text style={{
                fontSize: fontSize.base,
                color: colors.text,
                backgroundColor: '#4287f5',
            }}>Fetch Standings Data</Text>
        </TouchableOpacity>
    </View>
    )
}

export default StandingsScreen