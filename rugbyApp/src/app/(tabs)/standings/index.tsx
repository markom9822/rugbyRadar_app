import { defaultStyles} from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, FlatList } from "react-native"
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
}

const StandingsScreen = () => {
    const [standingsArray, setStandingsArray] = useState<StandingInfo[]>([]);
    const [leagueName, setLeagueName] = useState<string>('');
    const [seasonName, setSeasonName] = useState<string>('');

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Standings")

        const currentLeagueCode = getLeagueCode(leagueName)

        const apiString = 'https://site.web.api.espn.com/apis/v2/sports/rugby/' + currentLeagueCode + '/standings?lang=en&region=gb&season=' + seasonName + '&seasontype=1&sort=rank:asc&type=0';

        const seasonStandings = await fetch( apiString,).then((res) => res.json())
        const newArray = getAllStandingsData(seasonStandings)

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
            isHeader={item.isHeader}
            teamPool={item.teamPool}
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

export default StandingsScreen