import { fixtureStyles } from "@/styles"
import { View, Text, TouchableOpacity, Image, FlatList, Pressable, Modal } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from "expo-router"
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo";
import { getLeagueNameFromDisplayName } from "../utils/helpers";
import { useState } from "react";
import { colors, fontSize } from "@/constants/tokens";


type ScorePanelProps = {
    leagueDisplayName: string
    index: number
    currentIndex: Number | null
	homeTeam: string
	awayTeam: string
    homeScore: string
    awayScore: string
    matchDate: Date
    matchTitle: string
    matchVenue: string
    matchLeague: string
    matchID: string
    eventState: string
    stateDetail: string
    eventTime: string,
    isLastItem: boolean,
}

export const ScorePanel = ({ leagueDisplayName, homeTeam, awayTeam, homeScore, awayScore, matchDate,
     index, currentIndex, matchTitle, matchVenue, matchLeague, matchID, eventState, stateDetail, eventTime, isLastItem}: ScorePanelProps) => {

    const [selected, setSelected] = useState(false);

    const leagueName = getLeagueNameFromDisplayName(leagueDisplayName)
    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, homeTeam, awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;
    
    if(homeTeamInfo === null) return
    if(awayTeamInfo === null) return
    if(homeTeamInfo === undefined) return
    if(awayTeamInfo === undefined) return

    const homeScoreWeight = (new Number(homeScore) > new Number(awayScore)) ? ('600'):('300');
    const awayScoreWeight = (new Number(awayScore) > new Number(homeScore)) ? ('600'):('300');

    const matchTime = matchDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})

    const currentHomeTeamLogo = selected ? homeTeamInfo.logo : homeTeamInfo.altLogo;
    const currentAwayTeamLogo = selected ? awayTeamInfo.logo : awayTeamInfo.altLogo;

    const panelBackgroundColour = (eventState === "pre") ? (colors.altBackground):(colors.altBackground);

    const scoreRender = (eventState: string) => {

        // not started yet
        if (eventState === "pre") {
            return (
                <View style={{width: "25%", flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={{color: colors.text, fontSize: fontSize.base, fontWeight: 300, textAlign: 'center'}}>{matchTime}</Text>
                </View>  
            )
        }
        // event finished
        else if (eventState === "post")
        {
            return (
            <View style={{width: "25%", flexDirection: 'column', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[fixtureStyles.teamScore, {fontWeight: homeScoreWeight,color: colors.text }]}>{homeScore}</Text>
                        <Text style={[fixtureStyles.teamScore, {fontWeight: awayScoreWeight,color: colors.text}]}>{awayScore}</Text>
                    </View>
                    <Text style={{textAlign: 'center', fontWeight: 500, color: colors.text}}>{stateDetail}</Text>
            </View> 
            )
        }
        // event ongoing
        else { 
            return (
                <View style={{width: "25%", flexDirection: 'column', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[fixtureStyles.teamScore, {fontWeight: homeScoreWeight,color: colors.text }]}>{homeScore}</Text>
                            <Text style={[fixtureStyles.teamScore, {fontWeight: awayScoreWeight,color: colors.text}]}>{awayScore}</Text>
                        </View>
                        <Text style={{textAlign: 'center', fontWeight: 500, color: colors.text}}>{eventTime}</Text>
                </View> 
            )
        }
    }

    const venueRender = (eventNotStarted: boolean) => {

        if (eventNotStarted) {
            return (
                <View style={{paddingVertical: 1}}>
                    <Text style={{textAlign: 'center', fontSize: fontSize.xs, fontWeight: 300, color: colors.text}}>{matchVenue}</Text>
                </View>  
            )
        }
        else {
            return (
                <></>
            )
        }
    }

    return(
        <View style={[fixtureStyles.card, {marginBottom: (isLastItem) ? 50: 0}]}>
              <View style={[fixtureStyles.cardHeaderAllInfo,
                 {backgroundColor: selected ? colors.background : panelBackgroundColour, borderColor: selected ? 'lightgrey' : 'grey', borderWidth: 2, borderRadius: 4}]}>

                <Link href={`/(tabs)/fixtures/match/${matchID}`} asChild>
                <Pressable onPressIn={() => setSelected(true)} onPressOut={() => setSelected(false)}
                    onBlur={() => setSelected(false)} onHoverOut={() => setSelected(false)}>

                <View style={[fixtureStyles.cardHeaderGameInfo]}>
                    <View style={{width: "35%", flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text style={[fixtureStyles.teamName, {color: colors.text}]}>{homeTeamInfo.abbreviation}</Text>
                        <View style={{paddingHorizontal: 2}}>
                            <Image
                            style={[fixtureStyles.teamLogo]}
                            source={currentHomeTeamLogo} />
                        </View>
                        
                    </View>
                    
                    {scoreRender(eventState)}

                    <View style={{width: "35%", flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <View style={{paddingHorizontal: 2}}>
                            <Image
                            style={[fixtureStyles.teamLogo]}
                            source={currentAwayTeamLogo} />
                        </View>
                        <Text style={[fixtureStyles.teamName, {color: colors.text}]}>{awayTeamInfo.abbreviation}</Text>
                    </View>

                </View>

                {venueRender(eventState === "pre")}

                </Pressable> 
                </Link>
              </View>
            </View>
    )

}