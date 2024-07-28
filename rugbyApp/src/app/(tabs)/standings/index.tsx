import { defaultStyles, fixtureStyles, rankingPanelStyles, standingsPanelStyles } from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, FlatList } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens"
import { InternationalRugbyTeams, getInternationalTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase"
import { useState } from "react"
import { isEnabled } from "react-native/Libraries/Performance/Systrace"
import Entypo from '@expo/vector-icons/Entypo';
import { getURCTeamInfoFromName } from "@/store/URCRugbyTeamsDatabase"
import { getTop14TeamInfoFromName } from "@/store/Top14RugbyTeamsDatabase"
import { getPremTeamInfoFromName } from "@/store/PremiershipRubyTeamsDatabase"
import { CustomSelectDropdown, DropdownData } from "@/store/components/SelectDropdown"
import { enableScreens } from "react-native-screens"
import { getLeagueCode } from "@/store/utils/helpers"


export type StandingInfo = {
    teamName: string
	teamGP: string
    teamWins: string
}

const StandingsScreen = () => {
    const [standingsArray, setStandingsArray] = useState<StandingInfo[]>([]);
    const [leagueName, setLeagueName] = useState<string>('');
    const [seasonName, setSeasonName] = useState<string>('');

    const URCLeagueCode = "270557";
    const PremLeagueCode = "267979";
    const SixNationsLeagueCode = "180659";
    const RugbyChampionshipLeagueCode = "244293";
    const WorldCupLeagueCode = "164205";

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Standings")

        const currentLeagueCode = getLeagueCode(leagueName)

        const apiString = 'https://site.web.api.espn.com/apis/v2/sports/rugby/' + currentLeagueCode + '/standings?lang=en&region=gb&season=' + seasonName + '&seasontype=1&sort=rank:asc&type=0';

        const seasonStandings = await fetch( apiString,).then((res) => res.json())
        const standingsCount = seasonStandings.children[0].standings.entries.length;

        var newArray = [];

        for (let index = 0; index < standingsCount; index++) {

            const teamName = seasonStandings.children[0].standings.entries[index].team.displayName;
            const teamGP = seasonStandings.children[0].standings.entries[index].stats[7].value;
            const teamWins = seasonStandings.children[0].standings.entries[index].stats[18].value;

            let newRankingInfo = {
                teamName: teamName,
                teamGP: teamGP,
                teamWins: teamWins,
             };

            newArray.push(newRankingInfo)
        }

        console.info(newArray)
        setStandingsArray(newArray)
    }

    const handleOnChangeLeague = (item: DropdownData) => {
        setLeagueName(item.value)
    }

    const handleOnChangeSeason = (item: DropdownData) => {
        setSeasonName(item.value)
    }

    const leagueData = [
        { label: 'URC', value: 'urc' },
        { label: 'Premiership', value: 'prem' },
        { label: 'Six Nations', value: 'sixNations' },
        { label: 'Rugby World Cup', value: 'rugbyWorldCup' },
    ];

    const seasonRegData = [
        { label: '2023/24', value: '2024' },
        { label: '2022/23', value: '2023' },
        { label: '2021/22', value: '2022' },
    ];

    const seasonWorldCupData = [
        { label: '2023', value: '2023' },
        { label: '2019', value: '2019' },
        { label: '2015', value: '2015' },
    ];

    var currentSeasonData;

    switch(leagueName) { 
        case "urc": { 
           currentSeasonData = seasonRegData; 
           break; 
        } 
        case "prem": { 
            currentSeasonData = seasonRegData; 
            break; 
        } 
        case "sixNations": { 
            currentSeasonData = seasonRegData; 
            break; 
        } 
        case "rugbyWorldCup": { 
            currentSeasonData = seasonWorldCupData; 
           break; 
        } 
        default: { 
            currentSeasonData = seasonRegData; 
           break; 
        }
    } 


    return <View style={defaultStyles.container}>
        <Text style={defaultStyles.text}>Rugby Standings</Text>

        <CustomSelectDropdown
        placeholder="Select League" 
        data={leagueData}
        onChangeSelection={handleOnChangeLeague}/>

        <CustomSelectDropdown
        placeholder="Select Season" 
        data={currentSeasonData}
        onChangeSelection={handleOnChangeSeason}/>

        <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
        />

        <View style={{flexDirection: 'row'}}>
            <Text style={{width: "50%"}}>{seasonName} season</Text>
            <Text style={{width: "10%"}}>GP</Text>
            <Text style={{width: "10%"}}>W</Text>
            <Text style={{width: "10%"}}>D</Text>
            <Text style={{width: "10%"}}>L</Text>
        </View>
        
        
        <FlatList 
        data={standingsArray}
        renderItem={({item}) => 
        <StandingPanel 
            league={leagueName}
            teamName={item.teamName}
            teamGP={item.teamGP}
            teamWins={item.teamWins} />}
        />

    </View>
}

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

type StandingPanelProps = {
    league: string
	teamName: string
	teamGP: string
    teamWins: string
}

export const StandingPanel = ({league, teamName, teamGP, teamWins}: StandingPanelProps) => {

    var teamInfo;
    if(league === "urc")
    {
        teamInfo = getURCTeamInfoFromName(teamName)
    }
    else if(league === "sixNations")
    {
        teamInfo = getInternationalTeamInfoFromName(teamName)
    }
    else if(league === "prem") 
    {
        teamInfo = getPremTeamInfoFromName(teamName)
    }
    else if(league === "top14")
    {
        teamInfo = getTop14TeamInfoFromName(teamName)
    }
    else
    {
        return
    }
    
    if(teamInfo === null) return
    if(teamInfo === undefined) return

    return(
        <View style={standingsPanelStyles.container}>
            <View style={{width: "50%", backgroundColor: 'yellow', flexDirection: 'row'}}>
                <Image
                style={{flex:1, resizeMode: 'contain', width: 30, height: 30, minHeight: 30, minWidth: 30}}
                source={teamInfo.logo} />
                <Text style={standingsPanelStyles.teamName}>{teamName}</Text>
            </View>
            <Text style={standingsPanelStyles.teamStat}>{teamGP}</Text>
            <Text style={standingsPanelStyles.teamStat}>{teamWins}</Text>
        </View>
    )

}

export default StandingsScreen