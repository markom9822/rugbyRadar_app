import { defaultStyles } from "@/styles";
import { useGlobalSearchParams } from "expo-router";
import { View, Text, ViewStyle, TouchableOpacity, FlatList, Image } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { generateSeasonList, getAnyTeamInfoFromName, getLeagueInfoFromDisplayName } from "@/store/utils/helpers";
import { colors, fontSize } from "@/constants/tokens";
import { useState } from "react";
import { CustomSelectDropdown, DropdownData } from "@/store/components/SelectDropdown";
import { getTeamSeasonFixtures } from "@/store/utils/getTeamSeasonFixtures";
import { SeasonDateInfo } from "@/app/(tabs)/standings";
import { getHomeAwayTeamInfo, getTeamInfo } from "@/store/utils/getTeamInfo";

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
    const [seasonDates, setSeasonDates] = useState<SeasonDateInfo[]>(generateSeasonList());

    const {teamID} = useGlobalSearchParams();
    const regex = new RegExp('([0-9]+)|([a-zA-Z]+)','g');
    const splittedArray = new String(teamID).match(regex);
    if(splittedArray == null) return
    const teamIDNum = splittedArray[0];
    const teamIDName = new String(teamID).replace(teamIDNum, '');

    const handlePressFetchData = async () => {
        console.info("Pressed Fetch Team Results")
        
        const teamSeasonFixtures = await getTeamSeasonFixtures(teamIDNum, seasonYear)
        setTeamEventsArray(teamSeasonFixtures)
    }

    const handleOnChangeSeason = (item: DropdownData) => {
        setSeasonYear(item.value)
        setTeamEventsArray([])
    }

    const notFoundHeader = (eventsArray: TeamEvent[] | undefined) => {

        if(eventsArray == undefined || eventsArray.length == 0)
        {
            return (
                <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                    <Text style={{ fontSize: fontSize.sm, color: 'grey', fontWeight: 300, textAlign: 'center' }}>No Events Found</Text>
                </View>
            )
        }
        
        return null
    }

    const findLastItem = (eventsArray: TeamEvent[] | undefined, index: number) => {

        if(eventsArray == undefined || eventsArray.length == 0)
        {
            return false;
        }
        else
        {
            return index === eventsArray.length - 1;
        }

    }

    return(
        <View style={defaultStyles.container}>

            <CustomSelectDropdown
                placeholder="Select Season"
                data={seasonDates}
                onChangeSelection={handleOnChangeSeason}
                isDisabled={false}
                value={seasonYear}
                iconName="calendar-range" />

            <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
            />

            {notFoundHeader(teamEventsArray)}

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
                    isLastItem={findLastItem(teamEventsArray, index)}
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
    isLastItem: boolean,
}

export const TeamResultsPanel = ({eventDate, homeTeamName, awayTeamName, homeTeamScore, awayTeamScore, leagueName, eventState, isLastItem}: TeamResultsPanelProps) => {

    const formattedDate  = new Date(eventDate).toLocaleDateString('en-GB', {weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'})
    const eventTime = new Date(eventDate).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})

    const leagueValue = getLeagueInfoFromDisplayName(leagueName)?.value;

    const homeAwayInfo = getHomeAwayTeamInfo(leagueValue, homeTeamName, awayTeamName);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    if(homeTeamInfo == null) return
    if(awayTeamInfo == null) return

    const panelBackgroundColour = (eventState === "pre") ? (colors.altBackground):(colors.background);

    const homeScoreWeight = (new Number(homeTeamScore) > new Number(awayTeamScore)) ? ('500'):('300');
    const awayScoreWeight = (new Number(awayTeamScore) > new Number(homeTeamScore)) ? ('500'):('300');


    const scoreRender = (eventNotStarted: boolean) => {

        if (!eventNotStarted) {
            return (
                <View style={{width: "30%", flexDirection:'row', justifyContent: 'center'}}>
                    <Text style={{paddingHorizontal: 5, paddingVertical: 3, fontWeight: homeScoreWeight,
                        fontSize: fontSize.lg, textAlign: 'center', width: "50%", color: colors.text}}>{homeTeamScore}</Text>
                    <Text style={{paddingHorizontal: 5, paddingVertical: 3, fontWeight: awayScoreWeight,
                        fontSize: fontSize.lg, textAlign: 'center', width: "50%", color: colors.text}}>{awayTeamScore}</Text>
                </View>
            )
        }
        else {
            return (
                <View style={{width: "30%"}}>
                    <Text style={{paddingHorizontal: 5, paddingVertical: 3, fontSize: fontSize.base, fontWeight: 300, textAlign: 'center', color: colors.text}}>{eventTime}</Text>
                </View>
            )
        }
    }

    return (
        <View style={{marginBottom: (isLastItem) ? 50: 0}}>
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
         marginVertical: 5, borderColor: 'lightgrey', borderWidth: 1, backgroundColor: panelBackgroundColour, marginHorizontal: 4, borderRadius: 4}}>

            <Text style={{fontSize: fontSize.xs, color: colors.text}}>{formattedDate}</Text>

            <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-evenly', alignItems: 'center'}}>
                <View style={{width: "35%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                    <Text style={{ paddingHorizontal: 5, fontSize: fontSize.sm, fontWeight: 500, color: colors.text}}>{homeTeamInfo.abbreviation}</Text>

                    <View style={{paddingHorizontal: 5}}>
                        <Image source={homeTeamInfo.altLogo}
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
                        <Image source={awayTeamInfo.altLogo}
                            style={{
                                resizeMode: 'contain',
                                width: 40,
                                height: 40,
                                minHeight: 40,
                                minWidth: 40,
                            }} />
                    </View>
                    
                    <Text style={{ paddingHorizontal: 5, fontSize: fontSize.sm, fontWeight: 500, color: colors.text}}>{awayTeamInfo.abbreviation}</Text>

                </View>

            </View>

            <Text style={{fontSize: fontSize.xs, color: 'lightgrey'}}>{leagueName}</Text>

        </View>
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