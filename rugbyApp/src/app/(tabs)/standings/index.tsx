import { defaultStyles} from "@/styles"
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native"
import { fontFamilies, fontSize } from "@/constants/tokens"
import { useState } from "react"
import { CustomSelectDropdown, DropdownData, LeagueSelectDropdown } from "@/store/components/SelectDropdown"
import { generateSeasonList, getLeagueCode, getRugbyVizLeagueCode } from "@/store/utils/helpers"
import { getAllStandingsData, getAllStandingsDataRugbyViz } from "@/store/utils/standingsGetter"
import { StandingPanel } from "@/store/components/StandingPanel"
import { ChallengeCupAltLogo, ChampionsCupAltLogo, PremiershipAltLogo, RankingsLogo, SixNationsAltLogo, SuperRugbyAltLogo, Top14AltLogo, URCAltLogo, WorldCupAltLogo } from "@/store/LeagueLogos/LeagueLogos"


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
            isLastItem: index == rankListLength - 1,
            isEndOfList: index == rankListLength - 1
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
    const [isLoading, setIsLoading] = useState(false);

    const handlePressFetchData = async (targetSeasonName: string) =>{
        console.info("Pressed Fetch Standings")
        if(leagueName === '' || targetSeasonName === '')
        {
            return;
        }
        setIsLoading(true)

        const currentLeagueCode = getLeagueCode(leagueName)

        var apiString = '';
        const rugbyVizCode = getRugbyVizLeagueCode(leagueName);

        if(leagueName == "worldRankings")
        {
            apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/rankings/mru?language=en';

            const worldRankings = await fetch( apiString,).then((res) => res.json())
            const newArray = getWorldRankingsData(worldRankings)

            console.info(newArray)
            setStandingsArray(newArray)
        }
        // uses rugbyViz API
        else if(rugbyVizCode !== undefined)
        {
            const seasonNumber = Number(targetSeasonName) - 1;
            apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/tables/'+rugbyVizCode+'?provider=rugbyviz&season='+ seasonNumber +'01';

            const seasonStandingsRugViz = await fetch( apiString,).then((res) => res.json())
            if(seasonStandingsRugViz.data == undefined)
            {
                setIsLoading(false)
                return;
            }

            const newArray = getAllStandingsDataRugbyViz(seasonStandingsRugViz, leagueName)

            console.info(newArray)
            setStandingsArray(newArray)
        }
        else
        {
            apiString = 'https://site.web.api.espn.com/apis/v2/sports/rugby/' + currentLeagueCode + '/standings?lang=en&region=gb&season='
             + targetSeasonName + '&seasontype=1&sort=rank:asc&type=0';
            
            const seasonStandings = await fetch( apiString,).then((res) => res.json())
            const newArray = getAllStandingsData(seasonStandings)

            console.info(newArray)
            setStandingsArray(newArray)
        }
        setIsLoading(false)
    }

    const handleOnChangeLeague = (item: DropdownData) => {
        setLeagueName(item.value)
        setSeasonName('')
        setStandingsArray([])
    }

    const handleOnChangeSeason = (item: DropdownData) => {
        setSeasonName(item.value)
        setStandingsArray([])
        handlePressFetchData(item.value)
    }

    const leagueData = [
        { label: 'URC', value: 'urc', logo: URCAltLogo },
        { label: 'Premiership', value: 'prem', logo: PremiershipAltLogo },
        { label: 'Top 14', value: 'top14', logo: Top14AltLogo },
        { label: 'Champions Cup', value: 'championsCup', logo: ChampionsCupAltLogo },
        { label: 'Challenge Cup', value: 'challengeCup', logo: ChallengeCupAltLogo },
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

        if(eventsArray == undefined || eventsArray.length == 0 && !isLoading)
        {
            return (
                <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                    <Text style={{ fontSize: fontSize.sm, color: 'grey', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light }}>No Standings Found</Text>
                </View>
            )
        }
        
        return null
    }

    const activityIndicatorHeader = () => {

        if(isLoading)
        {
            return (
                <View style={{marginVertical: 20}}>
                    <ActivityIndicator size='large' color='lightgrey' />
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

        {activityIndicatorHeader()}
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
            isLastItem={item.isLastItem}
            isEndOfList={item.isEndOfList} />}
        />

    </View>
}

export const standingsHeadingStyles = StyleSheet.create({
    seasonTitle: {
        textAlign: 'left',
        fontSize: 13,
        fontWeight: 500,
        color: 'grey',
        fontFamily: fontFamilies.bold
    },
    headerStat: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: 500,
        color: 'grey',
        fontFamily: fontFamilies.bold
    },
  })


export default StandingsScreen