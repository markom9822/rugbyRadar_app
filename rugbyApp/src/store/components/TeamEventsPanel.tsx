import { View, Text, Image, StyleSheet } from "react-native"
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo"
import { fontSize } from "@/constants/tokens"

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
}

export const TeamEventsPanel = ({ teamEventArray, matchID, leagueName, panelTitle, showWinLoss}: TeamEventPanelProps) => {

    if(teamEventArray === undefined) return

    return (
        <View style={[teamEventsPanelStyles.container]}>
            <Text>{panelTitle}</Text>

            <View style={{backgroundColor: '#ebe9e8', padding: 10, borderRadius: 5}}>

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

    const winLossColour = (winOrLoseText === 'W') ? ('green'):('red');

    if(homeTeamInfo == undefined) return
    if(awayTeamInfo == undefined) return

    return (
        <View style={{flexDirection: 'row'}}>
            
            {(showWinLoss)  && 
                <Text style={{color: winLossColour}}>{winOrLoseText}</Text>
            }

            <Image
            style={[teamEventsPanelStyles.teamLogo]}
            source={homeTeamInfo.logo} />
            <Text style={[teamEventsPanelStyles.teamName]}>{homeTeamInfo?.abbreviation}</Text>

            <Text style={[teamEventsPanelStyles.matchScore]}>{homeTeamScore} - {awayTeamScore}</Text>

            <Text style={[teamEventsPanelStyles.teamName]}>{awayTeamInfo?.abbreviation}</Text>
            <Image
            style={[teamEventsPanelStyles.teamLogo]}
            source={awayTeamInfo.logo} />
            <Text style={[teamEventsPanelStyles.matchDate]}>{formattedDate}</Text>
        </View>
    )
}

export const teamEventsPanelStyles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
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
    },
    matchDate: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontSize: fontSize.xs,
    },
    teamName: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontWeight: 500,
        fontSize: fontSize.xs
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
