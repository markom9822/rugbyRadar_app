import { defaultStyles} from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, FlatList, StyleSheet } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens"
import { useState } from "react"
import { CustomSelectDropdown, DropdownData } from "@/store/components/SelectDropdown"
import { getLeagueCode } from "@/store/utils/helpers"
import { getAllStandingsData } from "@/store/utils/standingsGetter"
import { StandingPanel } from "@/store/components/StandingPanel"


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
    };

        newArray.push(newRankingInfo)
    }

    return (
        newArray
    )
}

const StandingsScreen = () => {
    const [standingsArray, setStandingsArray] = useState<StandingInfo[]>([]);
    const [leagueName, setLeagueName] = useState<string>('');
    const [seasonName, setSeasonName] = useState<string>('');

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
            const newArray = getAllStandingsData(seasonStandings, false)

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
        { label: 'URC', value: 'urc' },
        { label: 'Premiership', value: 'prem' },
        { label: 'Top 14', value: 'top14' },
        { label: 'Champions Cup', value: 'championsCup' },
        { label: 'Super Rugby', value: 'superRugby' },
        { label: 'Six Nations', value: 'sixNations' },
        { label: 'Rugby World Cup', value: 'rugbyWorldCup' },
        { label: 'World Rankings', value: 'worldRankings'}
    ];

    const seasonRegData = [
        { label: '2023/24', value: '2024' },
        { label: '2022/23', value: '2023' },
        { label: '2021/22', value: '2022' },
        { label: '2020/21', value: '2021' },
        { label: '2019/20', value: '2020' },
        { label: '2018/19', value: '2019' },
        { label: '2017/18', value: '2018' },
        { label: '2016/17', value: '2017' },
        { label: '2015/16', value: '2016' },
        { label: '2014/15', value: '2015' },
        { label: '2013/14', value: '2014' },
        { label: '2012/13', value: '2013' },
        { label: '2011/12', value: '2012' },
        { label: '2010/11', value: '2011' },
        { label: '2009/10', value: '2010' },
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
           currentSeasonData = seasonRegData; 
           break; 
        } 
        case "prem": { 
            currentSeasonData = seasonRegData; 
            break; 
        } 
        case "top14": { 
            currentSeasonData = seasonRegData; 
            break; 
        }
        case "superRugby": { 
            currentSeasonData = seasonRegData; 
            break; 
        }
        case "championsCup": { 
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

    const isSeasonDropdownDisabled = leagueName == "worldRankings"

    const headerRender = (isWorldRanking: boolean) => {

        if (isWorldRanking) {
            return (
                <View style={{ flexDirection: 'row' }}>
                        <Text style={[standingsHeadingStyles.seasonTitle, { width: "60%", textAlign: 'center' }]}>Teams</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "40%" }]}>Points</Text>
                </View>
            )
        }
        else {
            return (
                <>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[standingsHeadingStyles.seasonTitle, { width: "40%", textAlign: 'left' }]}>{seasonName} season</Text>
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

    return <View style={defaultStyles.container}>

        <CustomSelectDropdown
        placeholder="Select League" 
        data={leagueData}
        onChangeSelection={handleOnChangeLeague}
        isDisabled={false}
        value={leagueName}/>

        <CustomSelectDropdown
        placeholder="Select Season" 
        data={currentSeasonData}
        onChangeSelection={handleOnChangeSeason}
        isDisabled={isSeasonDropdownDisabled}
        value={seasonName}/>

        <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
        />

        {headerRender(leagueName == "worldRankings")}
        
    
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
            teamPoints={item.teamPoints} />}
        />

    </View>
}

export const standingsHeadingStyles = StyleSheet.create({
    seasonTitle: {
        textAlign: 'left',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
    },
    headerStat: {
        borderBottomColor: 'grey', 
        borderBottomWidth: 2,
        textAlign: 'center',
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