import { View, Text, Image, StyleSheet } from "react-native"
import { getAnyHomeAwayTeamInfo, getHomeAwayTeamInfo } from "../utils/getTeamInfo"
import { colors, fontFamilies, fontSize } from "@/constants/tokens"

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
}

export const TeamEventsPanel = ({ teamEventArray, matchID, leagueName, panelTitle, showWinLoss, isLastItem}: TeamEventPanelProps) => {

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


    return (
        <View style={[teamEventsPanelStyles.container, {marginBottom: isLastItem ? 55: 0}]}>
            <Text style={{color: colors.text, fontFamily: fontFamilies.regular}}>{panelTitle}</Text>

            <View style={{backgroundColor: colors.background, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'lightgrey'}}>

            {notFoundHeader(teamEventArray)}

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

export const TeamEventsItem = ({leagueName, currentTeam, homeTeam, awayTeam, homeTeamScore, awayTeamScore, matchDate, showWinLoss}: TeamEventsItemProps) => {

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
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            
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
