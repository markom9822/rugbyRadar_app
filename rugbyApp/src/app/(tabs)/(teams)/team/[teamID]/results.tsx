import { defaultStyles } from "@/styles";
import { useGlobalSearchParams } from "expo-router";
import { View, Text, ViewStyle, TouchableOpacity, FlatList, Image } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { getAnyTeamInfoFromID, getAnyTeamInfoFromName, getLeagueCodeFromDisplayName, getLeagueInfoFromDisplayName } from "@/store/utils/helpers";
import { colors, fontSize } from "@/constants/tokens";
import { useState } from "react";
import { CustomSelectDropdown, DropdownData } from "@/store/components/SelectDropdown";
import { getTeamSeasonFixtures } from "@/store/utils/getTeamSeasonFixtures";

export type TeamEvent = {
    eventDate: string,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: string,
    awayTeamScore: string,
    leagueName: string,
    eventState: string,
}

const TeamResults = () => {

    const [teamEventsArray, setTeamEventsArray] = useState<TeamEvent[] | undefined>();
    const [seasonYear, setSeasonYear] = useState<string>('');

    const {teamID} = useGlobalSearchParams();

    const handlePressFetchData = async () => {
        console.info("Pressed Fetch Team Results")
        
        const teamSeasonFixtures = await getTeamSeasonFixtures(teamID, seasonYear)
        setTeamEventsArray(teamSeasonFixtures)
    }

    const handleOnChangeSeason = (item: DropdownData) => {
        setSeasonYear(item.value)
        setTeamEventsArray([])
    }

    const seasonRegData = [
        { label: '2024/25', value: '2025' },
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


    return(
        <View style={defaultStyles.container}>

            <CustomSelectDropdown
                placeholder="Select Season"
                data={seasonRegData}
                onChangeSelection={handleOnChangeSeason}
                isDisabled={false}
                value={seasonYear} />

            <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
            />

            <FlatList
                data={teamEventsArray}
                renderItem={({ item, index }) =>
                    <TeamResultsPanel
                    eventDate={item.eventDate}
                    homeTeamName={item.homeTeamName}
                    awayTeamName={item.awayTeamName}
                    homeTeamScore={item.homeTeamScore}
                    awayTeamScore={item.awayTeamScore}
                    leagueName={item.leagueName}
                    eventState={item.eventState}
                        />}
            />


        </View>
    )


}

type TeamResultsPanelProps = {
    eventDate: string,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: string,
    awayTeamScore: string,
    leagueName: string,
    eventState: string,
}

export const TeamResultsPanel = ({eventDate, homeTeamName, awayTeamName, homeTeamScore, awayTeamScore, leagueName, eventState}: TeamResultsPanelProps) => {

    const formattedDate  = new Date(eventDate).toLocaleDateString('en-GB', {weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'})
    const eventTime = new Date(eventDate).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})

    const homeTeamInfo = getAnyTeamInfoFromName(homeTeamName)
    const awayTeamInfo = getAnyTeamInfoFromName(awayTeamName)

    const panelBackgroundColour = (eventState === "pre") ? ('white'):('#f0f2f0');

    const homeScoreWeight = (new Number(homeTeamScore) > new Number(awayTeamScore)) ? ('500'):('300');
    const awayScoreWeight = (new Number(awayTeamScore) > new Number(homeTeamScore)) ? ('500'):('300');


    const scoreRender = (eventNotStarted: boolean) => {

        if (!eventNotStarted) {
            return (
                <View style={{width: "30%", flexDirection:'row', justifyContent: 'center'}}>
                    <Text style={{paddingHorizontal: 5, paddingVertical: 3, fontWeight: homeScoreWeight,
                        fontSize: fontSize.lg, textAlign: 'center', width: "50%"}}>{homeTeamScore}</Text>
                    <Text style={{paddingHorizontal: 5, paddingVertical: 3, fontWeight: awayScoreWeight,
                        fontSize: fontSize.lg, textAlign: 'center', width: "50%"}}>{awayTeamScore}</Text>
                </View>
            )
        }
        else {
            return (
                <View style={{width: "30%"}}>
                    <Text style={{paddingHorizontal: 5, paddingVertical: 3, fontSize: fontSize.base, fontWeight: 300, textAlign: 'center'}}>{eventTime}</Text>
                </View>
            )
        }
    }

    return (
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
         marginVertical: 5, borderColor: 'lightgrey', borderWidth: 1, backgroundColor: panelBackgroundColour, marginHorizontal: 4, borderRadius: 4}}>

            <Text style={{fontSize: fontSize.xs}}>{formattedDate}</Text>

            <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-evenly', alignItems: 'center'}}>
                <View style={{width: "35%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                    <Text style={{ paddingHorizontal: 5, fontSize: fontSize.sm, fontWeight: 500}}>{homeTeamInfo.abbreviation}</Text>

                    <View style={{paddingHorizontal: 5}}>
                        <Image source={homeTeamInfo.logo}
                            style={{
                                resizeMode: 'contain',
                                width: 40,
                                height: 40,
                                minHeight: 40,
                                minWidth: 40,
                            }} />
                    </View>
                    
                </View>

                {scoreRender(eventState === "pre")}

                <View style={{width: "35%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                    <View style={{paddingHorizontal: 5}}>
                        <Image source={awayTeamInfo.logo}
                            style={{
                                resizeMode: 'contain',
                                width: 40,
                                height: 40,
                                minHeight: 40,
                                minWidth: 40,
                            }} />
                    </View>
                    
                    <Text style={{ paddingHorizontal: 5, fontSize: fontSize.sm, fontWeight: 500}}>{awayTeamInfo.abbreviation}</Text>

                </View>

            </View>

            <Text style={{fontSize: fontSize.xs, color: 'grey'}}>{leagueName}</Text>

        </View>  
    )
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
            }}>Fetch Wiki Data</Text>
        </TouchableOpacity>
    </View>
    )
}


export default TeamResults;