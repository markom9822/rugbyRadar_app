import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { getAnyHomeAwayTeamInfo, getHomeAwayTeamInfo } from "../utils/getTeamInfo"
import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { getAnyTeamInfoFromName, hexToRGB } from "../utils/helpers"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import Entypo from '@expo/vector-icons/Entypo';


export type TeamEventStatsInfo = {
    currentTeam: string,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: string,
    awayTeamScore: string,
    matchDate: string,
}

export type TeamEventPanelProps = {
	teamEventArray: TeamEventStatsInfo[] | undefined,
    matchID: string | string[] | undefined,
    leagueName: string | undefined,
    panelTitle: string,
    showWinLoss: boolean,
    isLastItem: boolean,
    teamName: string | undefined,
}

export type HeadToHeadTeamEventPanelProps = {
	teamEventArray: TeamEventStatsInfo[] | undefined,
    matchID: string | string[] | undefined,
    leagueName: string | undefined,
    panelTitle: string,
    showWinLoss: boolean,
    isLastItem: boolean,
    teamName1: string | undefined,
    teamName2: string | undefined,
}

export const TeamEventsPanel = ({ teamEventArray, matchID, leagueName, panelTitle, showWinLoss, isLastItem, teamName}: TeamEventPanelProps) => {

    const [isTabOpen, setIsTabOpen] = useState(false);

    if(teamEventArray === undefined) return

    const notFoundHeader = (eventsArray: TeamEventStatsInfo[]) => {

        if(eventsArray == undefined || eventsArray.length == 0)
        {
            return (
                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: fontSize.xs, color: 'lightgrey', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light }}>No Events Found</Text>
                </View>
            )
        }
        
        return null
    }

    const teamFormDisplay = (eventsArray: TeamEventStatsInfo[]) => {

        if(eventsArray == undefined || eventsArray.length == 0)
        {
            return null
        }

        const teamForm = []

        for (let index = 0; index < eventsArray.length; index++) {

            const homeWinner = new Number(eventsArray[index].homeTeamScore) > new Number(eventsArray[index].awayTeamScore);
            const homeCurrentTeam = eventsArray[index].currentTeam === eventsArray[index].homeTeamName;

            var winOrLoseText = '';

            if (homeCurrentTeam) {
                winOrLoseText = (homeWinner) ? ('W') : ('L');
            }
            else {
                winOrLoseText = (!homeWinner) ? ('W') : ('L');
            }
            teamForm.push(winOrLoseText)
        }
        
        return (
            <View style={{flexDirection: 'row', marginHorizontal: 8}}>
                {teamForm.map((item, index) => (
                    <View key={index} style={{paddingHorizontal: 0.5}}>
                        <Text style={{color: colors.text, fontFamily: fontFamilies.light, fontSize: fontSize.xs, textAlign: 'center'}}>{item}</Text>
                    </View>
                ))}
            </View>
        )
    }

    if(teamName === undefined) return;

    const toggleFormTab = () => {
        setIsTabOpen(!isTabOpen)
    }

    const teamInfo = getAnyTeamInfoFromName(teamName)
    const teamBackgroundColour = hexToRGB(teamInfo.colour, "0.5")

    return (
        <View style={[teamEventsPanelStyles.container, {marginBottom: isLastItem ? 55: 0}]}>

            <View style={{backgroundColor: colors.background, margin: 4, borderRadius: 5, borderWidth: 1, borderColor: 'lightgrey', width: "95%"}}>

            {notFoundHeader(teamEventArray)}

                <TouchableOpacity onPress={toggleFormTab}>
                <View style={{flexDirection: 'row', borderBottomColor: 'lightgrey', backgroundColor: teamBackgroundColour,
                    borderBottomWidth: 1, alignItems: 'center', borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                    <View style={{margin: 4, padding: 4,  justifyContent: 'center', alignItems: 'center', width: "10%"}}>
                        <Image
                        style={{ resizeMode: 'contain',
                            width: 25,
                            height: 25,
                            minHeight: 25,
                            minWidth: 25,}}
                            source={teamInfo.altLogo} />
                    </View>
                    
                    <View style={{width: "55%"}}>
                        <Text style={{color: colors.text, fontFamily: fontFamilies.bold, marginHorizontal: 4, paddingHorizontal: 4}}>{teamName.toUpperCase()} FORM</Text>
                    </View>

                    <View style={{width: "25%"}}>
                        {teamFormDisplay(teamEventArray)}
                    </View>

                    <View style={{width: "7%", justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name= {isTabOpen ? "chevron-thin-up": "chevron-thin-down"} size={12} color="white" />
                    </View>
                </View>
                </TouchableOpacity>

                {isTabOpen && (<>
                

                    {teamEventArray.map((match, index) => {
                        return (
                            <TeamEventsItem
                                key={index}
                                leagueName={leagueName}
                                currentTeam={match.currentTeam}
                                homeTeam={match.homeTeamName}
                                awayTeam={match.awayTeamName}
                                homeTeamScore={match.homeTeamScore}
                                awayTeamScore={match.awayTeamScore}
                                matchDate={match.matchDate}
                                showWinLoss={showWinLoss}
                            />
                        );
                    })}

                </>)}  

            

            </View>
        </View>
    )
}

export const HeadToHeadEventsPanel = ({ teamEventArray, matchID, leagueName, panelTitle, showWinLoss, isLastItem, teamName1, teamName2}: HeadToHeadTeamEventPanelProps) => {

    if(teamEventArray === undefined) return

    const notFoundHeader = (eventsArray: TeamEventStatsInfo[]) => {

        if(eventsArray == undefined || eventsArray.length == 0)
        {
            return (
                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: fontSize.xs, color: 'lightgrey', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light }}>No Events Found</Text>
                </View>
            )
        }
        
        return null
    }

    if(teamName1 === undefined || teamName2 === undefined) return;

    const teamInfo1 = getAnyTeamInfoFromName(teamName1)
    const teamBackgroundColour1 = hexToRGB(teamInfo1.colour, "0.5")
    const teamInfo2 = getAnyTeamInfoFromName(teamName2)
    const teamBackgroundColour2 = hexToRGB(teamInfo2.colour, "0.5")

    return (
        <View style={[teamEventsPanelStyles.container, {marginBottom: isLastItem ? 55: 0}]}>

            <View style={{backgroundColor: colors.background, margin: 4, borderRadius: 5, borderWidth: 1, borderColor: 'lightgrey'}}>

            {notFoundHeader(teamEventArray)}

                <LinearGradient colors={[teamBackgroundColour1, teamBackgroundColour2]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} locations={[0.4, 0.6]}
                 style={{flexDirection: 'row', borderBottomColor: 'lightgrey', backgroundColor: 'transparent',
                    borderBottomWidth: 1, alignItems: 'center', borderTopLeftRadius: 5, borderTopRightRadius: 5, justifyContent: 'center', alignContent: 'center'}}>
                    
                    <View style={{margin: 4, padding: 4,  justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                        style={{ resizeMode: 'contain',
                            width: 25,
                            height: 25,
                            minHeight: 25,
                            minWidth: 25,}}
                        source={teamInfo1.altLogo} />
                    </View>
                        <Text style={{color: colors.text, fontFamily: fontFamilies.bold, marginHorizontal: 4, paddingHorizontal: 4}}>HEAD TO HEAD</Text>
                    <View style={{margin: 4, padding: 4,  justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                        style={{ resizeMode: 'contain',
                            width: 25,
                            height: 25,
                            minHeight: 25,
                            minWidth: 25,}}
                        source={teamInfo2.altLogo} />
                    </View>
                    
                </LinearGradient>

            {teamEventArray.map((match, index) => {
                return (
                    <TeamEventsItem
                    key={index}
                    leagueName={leagueName}
                    currentTeam={match.currentTeam}
                    homeTeam={match.homeTeamName}
                    awayTeam={match.awayTeamName}
                    homeTeamScore={match.homeTeamScore}
                    awayTeamScore={match.awayTeamScore}
                    matchDate={match.matchDate}
                    showWinLoss={showWinLoss}
                     />
                );
            })}

            </View>
        </View>
    )
}


type TeamEventsItemProps = {
    leagueName: string | undefined,
    currentTeam: string,
	homeTeam: string,
    awayTeam: string,
    homeTeamScore: string,
    awayTeamScore: string,
    matchDate: string,
    showWinLoss: boolean,
}

export const TeamEventsItem = ({leagueName, currentTeam, homeTeam, awayTeam, homeTeamScore, awayTeamScore, matchDate, showWinLoss,}: TeamEventsItemProps) => {

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, homeTeam, awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    const formattedDate = new Date(matchDate).toLocaleDateString('en-GB')
    const homeWinner = new Number(homeTeamScore) > new Number(awayTeamScore);
    const homeCurrentTeam = currentTeam === homeTeam;

    var winOrLoseText = '';

    if(homeCurrentTeam)
    {
        winOrLoseText = (homeWinner) ? ('W'):('L');
    }
    else
    {
        winOrLoseText = (!homeWinner) ? ('W'):('L');
    }

    const winLossColour = (winOrLoseText === 'W') ? ("#42c765"):("#d94a4a");

    if(homeTeamInfo == undefined) return
    if(awayTeamInfo == undefined) return

    return (
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 3}}>
            
            {(showWinLoss)  && 
                <View style={{flexDirection: 'row', width: "5%", justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: winLossColour, paddingHorizontal: 1, fontSize: 10, fontWeight: 600, fontFamily: fontFamilies.regular}}>{winOrLoseText}</Text>
                </View>
            }

            <View style={{flexDirection: 'row', width: "20%", justifyContent: 'flex-start' }}>
                <Image
                    style={[teamEventsPanelStyles.teamLogo]}
                    source={homeTeamInfo.altLogo} />
                <Text style={[teamEventsPanelStyles.teamName]}>{homeTeamInfo?.abbreviation}</Text>
            </View>

            <View style={{flexDirection: 'row', width: "25%", justifyContent: 'center'}}>
                <Text style={[teamEventsPanelStyles.matchScore]}>{homeTeamScore} - {awayTeamScore}</Text>
            </View>
            
            <View style={{flexDirection: 'row', width: "20%", justifyContent: 'flex-end'}}>
                <Text style={[teamEventsPanelStyles.teamName]}>{awayTeamInfo?.abbreviation}</Text>
                <Image
                style={[teamEventsPanelStyles.teamLogo]}
                source={awayTeamInfo.altLogo} />
            </View>
            
            <View style={{flexDirection: 'row', width: "30%", justifyContent: 'center'}}>
                <Text style={[teamEventsPanelStyles.matchDate]}>{formattedDate}</Text>
            </View>
        </View>
    )
}

export const teamEventsPanelStyles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    teamLogo: {
      resizeMode: 'contain',
      width: 25,
      height: 25,
      minHeight: 25,
      minWidth: 25,
    },
    matchScore: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        color: colors.text,
        fontFamily: fontFamilies.regular
    },
    matchDate: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontSize: fontSize.xs,
        color: colors.text,
        fontFamily: fontFamilies.light
    },
    teamName: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 10,
        color: colors.text,
        fontFamily: fontFamilies.regular
    },
    teamInfoContainer:{
        width: "20%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statsLink: {
      fontWeight: 600,
      color: 'blue'
    }
  })
