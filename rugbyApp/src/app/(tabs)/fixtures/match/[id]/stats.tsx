import { View, Text, TouchableOpacity, ViewStyle, StyleSheet, Image, ScrollView, FlatList } from "react-native"
import { useGlobalSearchParams } from "expo-router";
import { getLeagueName } from "@/store/utils/helpers";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens";
import { getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo";
import { useState } from "react";


export type StatsInfo = {
    homeTeamName: string,
    awayTeamName: string,
    homeTeamPossession: string,
    awayTeamPossession: string,
    homeTeamTerritory: string,
    awayTeamTerritory: string,
    homeTeamTries: string,
    awayTeamTries: string,
    homeTeamConversions: string,
    awayTeamConversions: string,
    homeTeamPenalties: string,
    awayTeamPenalties: string,

    homeTeamTackles: string,
    awayTeamTackles: string,
    homeTeamMissedTackles: string,
    awayTeamMissedTackles: string,

    homeTeamMetres: string,
    awayTeamMetres: string,
    homeTeamPasses: string,
    awayTeamPasses: string,
    homeTeamDefendersBeaten: string,
    awayTeamDefendersBeaten: string,

    homeTeamScrumsWon: string,
    awayTeamScrumsWon: string,
    homeTeamScrumsTotal: string,
    awayTeamScrumsTotal: string,
    homeTeamLineoutsWon: string,
    awayTeamLineoutsWon: string,
    homeTeamLineoutsTotal: string,
    awayTeamLineoutsTotal: string,

    homeTeamPensConceded: string,
    awayTeamPensConceded: string,
    homeTeamYellowCards: string,
    awayTeamYellowCards: string,
    homeTeamRedCards: string,
    awayTeamRedCards: string,

}

export const getMatchStats = (matchStats: any) => {

    const homeTeamName = matchStats.boxscore.teams[0].team.displayName;
    const awayTeamName = matchStats.boxscore.teams[1].team.displayName;

    const homeTeamPossession = matchStats.boxscore.teams[0].statistics[0].stats[20].value;
    const awayTeamPossession = matchStats.boxscore.teams[1].statistics[0].stats[20].value;

    const homeTeamTerritory = matchStats.boxscore.teams[0].statistics[0].stats[28].value;
    const awayTeamTerritory = matchStats.boxscore.teams[1].statistics[0].stats[28].value;

    const homeTeamTries = matchStats.boxscore.teams[0].statistics[0].stats[31].value
    const awayTeamTries = matchStats.boxscore.teams[1].statistics[0].stats[31].value

    const homeTeamConversions = matchStats.boxscore.teams[0].statistics[0].stats[1].value
    const awayTeamConversions = matchStats.boxscore.teams[1].statistics[0].stats[1].value

    const homeTeamPenalties = matchStats.boxscore.teams[0].statistics[0].stats[19].value
    const awayTeamPenalties = matchStats.boxscore.teams[1].statistics[0].stats[19].value

    const homeTeamTackles = matchStats.boxscore.teams[0].statistics[0].stats[27].value
    const awayTeamTackles = matchStats.boxscore.teams[1].statistics[0].stats[27].value
    const homeTeamMissedTackles = matchStats.boxscore.teams[0].statistics[0].stats[11].value
    const awayTeamMissedTackles = matchStats.boxscore.teams[1].statistics[0].stats[11].value

    const homeTeamMetres = matchStats.boxscore.teams[0].statistics[0].stats[10].value
    const awayTeamMetres = matchStats.boxscore.teams[1].statistics[0].stats[10].value
    const homeTeamPasses = matchStats.boxscore.teams[0].statistics[0].stats[13].value
    const awayTeamPasses = matchStats.boxscore.teams[1].statistics[0].stats[13].value
    const homeTeamDefendersBeaten = matchStats.boxscore.teams[0].statistics[0].stats[2].value
    const awayTeamDefendersBeaten = matchStats.boxscore.teams[1].statistics[0].stats[2].value

    const homeTeamScrumsWon = matchStats.boxscore.teams[0].statistics[0].stats[26].value
    const awayTeamScrumsWon = matchStats.boxscore.teams[1].statistics[0].stats[26].value
    const homeTeamScrumsTotal = matchStats.boxscore.teams[0].statistics[0].stats[25].value
    const awayTeamScrumsTotal = matchStats.boxscore.teams[1].statistics[0].stats[25].value
    const homeTeamLineoutsWon = matchStats.boxscore.teams[0].statistics[0].stats[6].value
    const awayTeamLineoutsWon = matchStats.boxscore.teams[1].statistics[0].stats[6].value
    const homeTeamLineoutsTotal = matchStats.boxscore.teams[0].statistics[0].stats[30].value
    const awayTeamLineoutsTotal = matchStats.boxscore.teams[1].statistics[0].stats[30].value

    const homeTeamPensConceded = matchStats.boxscore.teams[0].statistics[0].stats[18].value
    const awayTeamPensConceded = matchStats.boxscore.teams[1].statistics[0].stats[18].value
    const homeTeamYellowCards = matchStats.boxscore.teams[0].statistics[0].stats[34].value
    const awayTeamYellowCards = matchStats.boxscore.teams[1].statistics[0].stats[34].value
    const homeTeamRedCards = matchStats.boxscore.teams[0].statistics[0].stats[21].value
    const awayTeamRedCards = matchStats.boxscore.teams[1].statistics[0].stats[21].value

    const newArray = [
        {
            homeTeamName: homeTeamName,
            awayTeamName: awayTeamName,
            homeTeamPossession: homeTeamPossession,
            awayTeamPossession: awayTeamPossession,
            homeTeamTerritory: homeTeamTerritory,
            awayTeamTerritory: awayTeamTerritory,
            homeTeamTries: homeTeamTries,
            awayTeamTries: awayTeamTries,
            homeTeamConversions: homeTeamConversions,
            awayTeamConversions: awayTeamConversions,
            homeTeamPenalties: homeTeamPenalties,
            awayTeamPenalties: awayTeamPenalties,

            homeTeamTackles: homeTeamTackles,
            awayTeamTackles: awayTeamTackles,
            homeTeamMissedTackles: homeTeamMissedTackles,
            awayTeamMissedTackles: awayTeamMissedTackles,

            homeTeamMetres: homeTeamMetres,
            awayTeamMetres: awayTeamMetres,
            homeTeamPasses: homeTeamPasses,
            awayTeamPasses: awayTeamPasses,
            homeTeamDefendersBeaten: homeTeamDefendersBeaten,
            awayTeamDefendersBeaten: awayTeamDefendersBeaten,

            homeTeamScrumsWon: homeTeamScrumsWon,
            awayTeamScrumsWon: awayTeamScrumsWon,
            homeTeamScrumsTotal: homeTeamScrumsTotal,
            awayTeamScrumsTotal: awayTeamScrumsTotal,
            homeTeamLineoutsWon: homeTeamLineoutsWon,
            awayTeamLineoutsWon: awayTeamLineoutsWon,
            homeTeamLineoutsTotal: homeTeamLineoutsTotal,
            awayTeamLineoutsTotal: awayTeamLineoutsTotal,

            homeTeamPensConceded: homeTeamPensConceded,
            awayTeamPensConceded: awayTeamPensConceded,
            homeTeamYellowCards: homeTeamYellowCards,
            awayTeamYellowCards: awayTeamYellowCards,
            homeTeamRedCards: homeTeamRedCards,
            awayTeamRedCards: awayTeamRedCards,  
        }
    ];

    return(
        newArray
    )
}

export type HeadToHeadStatsInfo = {
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: string,
    awayTeamScore: string,
}

export const getHeadToHeadStats = (matchStats: any) => {

    var headToHeadArray = [];

    const gamesLength = matchStats.headToHeadGames[0].events.length;

    for (let index = 0; index < gamesLength; index++) {

        const eventScore = matchStats.headToHeadGames[0].events[index].score;
        const mainTeam = matchStats.headToHeadGames[0].team.displayName;
        const mainTeamID = matchStats.headToHeadGames[0].team.id;

        const opponentTeam = matchStats.headToHeadGames[0].events[index].opponent.displayName;
        const opponentID = matchStats.headToHeadGames[0].events[index].opponent.id;

        const homeTeamID = matchStats.headToHeadGames[0].events[index].homeTeamId;
        const homeTeamScore = matchStats.headToHeadGames[0].events[index].homeTeamScore;
        const awayTeamScore = matchStats.headToHeadGames[0].events[index].awayTeamScore;

        var homeTeam;
        var awayTeam;

        if(homeTeamID === mainTeamID)
        {
            homeTeam = mainTeam;
            awayTeam = opponentTeam;
        }
        else
        {
            homeTeam = opponentTeam;
            awayTeam = mainTeam;
        }


        console.info(eventScore)

        const newArray = {
                homeTeamName: homeTeam,
                awayTeamName: awayTeam,
                homeTeamScore: homeTeamScore,
                awayTeamScore: awayTeamScore,
        };
    

        headToHeadArray.push(newArray)
    }

    return(
        headToHeadArray
    )


}

const MatchSummary = () => {
    const [matchStatsArray, setMatchStatsArray] = useState<StatsInfo[] | undefined>();
    const [headToHeadStatsArray, setHeadToHeadStatsArray] = useState<HeadToHeadStatsInfo[] | undefined>();


    const {id} = useGlobalSearchParams();

    const eventID = new String(id).substring(0,6);
    const leagueID = new String(id).slice(6)
    const leagueName = getLeagueName(leagueID);

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + leagueID + '/summary?contentorigin=espn&event=' + eventID + '&lang=en&region=gb';

        const statsDetails = await fetch( apiString,).then((res) => res.json())

        console.info(statsDetails.boxscore.teams[0].team.displayName)

        const matchStats = getMatchStats(statsDetails)
        const headToHeadStats = getHeadToHeadStats(statsDetails)

        setMatchStatsArray(matchStats)
        setHeadToHeadStatsArray(headToHeadStats)
    }

    return(
        <View style={{flex: 1}}>
            <Text>Event ID: {eventID}</Text>
            <Text>League ID: {leagueID}</Text>

            <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
            />

 
            <ScrollView >
                <StatsPanel
                matchInfoArray={matchStatsArray}
                matchID={id}
                leagueName={leagueName} />

                <HeadToHeadPanel 
                headToHeadArray={headToHeadStatsArray}
                matchID={id}
                leagueName={leagueName}
                />
            </ScrollView>
            
        </View>
    )
}

type StatsPanelProps = {
	matchInfoArray: StatsInfo[] | undefined,
    matchID: string | string[] | undefined,
    leagueName: string | undefined,
}

export const StatsPanel = ({ matchInfoArray, matchID, leagueName}: StatsPanelProps) => {

    if(matchInfoArray == undefined) return

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, matchInfoArray[0].homeTeamName, matchInfoArray[0].awayTeamName);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    const homePossessionPercent = (Math.floor(parseFloat(matchInfoArray[0].homeTeamPossession) * 100)).toString() + ' %';
    const awayPossessionPercent = (Math.floor(parseFloat(matchInfoArray[0].awayTeamPossession) * 100)).toString() + ' %';

    const homeTerritoryPercent = (Math.floor(parseFloat(matchInfoArray[0].homeTeamTerritory) * 100)).toString() + ' %';
    const awayTerritoryPercent = (Math.floor(parseFloat(matchInfoArray[0].awayTeamTerritory) * 100)).toString() + ' %';


    return (
        <View style={[statsPanelStyles.container]}>

            <View style={{backgroundColor: '#ebe9e8', padding: 10, borderRadius: 5}}>

                <View style={{ alignItems: 'center' }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 2 }}>
                        <View style={[statsPanelStyles.teamInfoContainer]}>
                            <Image style={[statsPanelStyles.teamLogo]} 
                            source={homeTeamInfo?.logo}/>
                            <Text style={[statsPanelStyles.teamName]}>{homeTeamInfo?.abbreviation}</Text>
                        </View>
                        <Text style={{ paddingHorizontal: 10, paddingVertical: 5, textAlign: 'center', width: "50%"}}></Text>
                        <View style={[statsPanelStyles.teamInfoContainer]}>
                            <Text style={[statsPanelStyles.teamName]}>{awayTeamInfo?.abbreviation}</Text>
                            <Image style={[statsPanelStyles.teamLogo]} 
                            source={awayTeamInfo?.logo}/>
                        </View>
                    </View>
                </View>

                <GameStatsTitlePanel 
                statTitle="Match Events"/>

                <GameStatsPanel 
                homeStat={homePossessionPercent}
                awayStat={awayPossessionPercent}
                statTitle="Possession"/>
                
                <GameStatsPanel 
                homeStat={homeTerritoryPercent}
                awayStat={awayTerritoryPercent}
                statTitle="Territory"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamTries}
                awayStat={matchInfoArray[0].awayTeamTries}
                statTitle="Tries"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamConversions}
                awayStat={matchInfoArray[0].awayTeamConversions}
                statTitle="Conversion Goals"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamPenalties}
                awayStat={matchInfoArray[0].awayTeamPenalties}
                statTitle="Penalty Goals"/>

                <GameStatsTitlePanel 
                statTitle="Defence"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamTackles}
                awayStat={matchInfoArray[0].awayTeamTackles}
                statTitle="Tackles"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamMissedTackles}
                awayStat={matchInfoArray[0].awayTeamMissedTackles}
                statTitle="Missed Tackles"/>

                <GameStatsTitlePanel 
                statTitle="Attack"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamMetres}
                awayStat={matchInfoArray[0].awayTeamMetres}
                statTitle="Metres Run"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamPasses}
                awayStat={matchInfoArray[0].awayTeamPasses}
                statTitle="Passes"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamDefendersBeaten}
                awayStat={matchInfoArray[0].awayTeamDefendersBeaten}
                statTitle="Defenders Beaten"/>

                <GameStatsTitlePanel 
                statTitle="Set Piece"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamScrumsWon + '/' + matchInfoArray[0].homeTeamScrumsTotal}
                awayStat={matchInfoArray[0].awayTeamScrumsWon + '/' + matchInfoArray[0].awayTeamScrumsTotal}
                statTitle="Scrums Won"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamLineoutsWon + '/' + matchInfoArray[0].homeTeamLineoutsTotal}
                awayStat={matchInfoArray[0].awayTeamLineoutsWon + '/' + matchInfoArray[0].awayTeamLineoutsTotal}
                statTitle="Lineouts Won"/>

                <GameStatsTitlePanel 
                statTitle="Discipline"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamPensConceded}
                awayStat={matchInfoArray[0].awayTeamPensConceded}
                statTitle="Pen's Conceded"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamYellowCards}
                awayStat={matchInfoArray[0].awayTeamYellowCards}
                statTitle="Yellow Cards"/>

                <GameStatsPanel 
                homeStat={matchInfoArray[0].homeTeamRedCards}
                awayStat={matchInfoArray[0].awayTeamRedCards}
                statTitle="Red Cards"/>

            </View>
            
        </View>
    )
}

type GameStatsPanelProps = {
	homeStat: string,
    statTitle: string,
    awayStat: string,
}

export const GameStatsPanel = ({homeStat, statTitle, awayStat}: GameStatsPanelProps ) => {

    return (
        <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text style={[statsPanelStyles.statsPanelRow,  {width: "20%"}]}>{homeStat}</Text>
                <Text style={[statsPanelStyles.statsPanelRow, {width: "50%", backgroundColor: '#d4d1cf'}]}>{statTitle}</Text>
                <Text style={[statsPanelStyles.statsPanelRow,  {width: "20%"}]}>{awayStat}</Text>
            </View>
        </View>
    )
}

type GameStatsTitleProps = {
    statTitle: string,
}

export const GameStatsTitlePanel = ({statTitle}: GameStatsTitleProps ) => {

    return (
        <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text style={[statsPanelStyles.statsTitle]}>{statTitle}</Text>
            </View>
        </View>
    )
}

type HeadToHeadPanelProps = {
	headToHeadArray: HeadToHeadStatsInfo[] | undefined,
    matchID: string | string[] | undefined,
    leagueName: string | undefined,
}

export const HeadToHeadPanel = ({ headToHeadArray, matchID, leagueName}: HeadToHeadPanelProps) => {

    if(headToHeadArray === undefined) return

    return (
        <View style={[statsPanelStyles.container]}>
            <Text>Head to Head Matches</Text>

            <View style={{backgroundColor: '#ebe9e8', padding: 10, borderRadius: 5}}>

            {headToHeadArray.map((match, index) => {
                return (
                    <HeadToHeadItem
                    key={index}
                    leagueName={leagueName}
                    homeTeam={match.homeTeamName}
                    awayTeam={match.awayTeamName}
                    homeTeamScore={match.homeTeamScore}
                    awayTeamScore={match.awayTeamScore}
                     />
                );
            })}

            </View>
        </View>
    )
}

type HeadToHeadItemProps = {
    leagueName: string | undefined,
	homeTeam: string,
    awayTeam: string,
    homeTeamScore: string,
    awayTeamScore: string,

}

export const HeadToHeadItem = ({leagueName, homeTeam, awayTeam, homeTeamScore, awayTeamScore}: HeadToHeadItemProps) => {

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, homeTeam, awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    return (
        <View style={{flexDirection: 'row'}}>
            <Text>{homeTeamInfo?.abbreviation}</Text>

            <Text>{homeTeamScore}</Text>
            <Text>{awayTeamScore}</Text>

            <Text>{awayTeamInfo?.abbreviation}</Text>
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
            }}>Fetch Summary Data</Text>
        </TouchableOpacity>
    </View>
    )
}

export const statsPanelStyles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    teamLogo: {
      resizeMode: 'contain',
      width: 30,
      height: 30,
      minHeight: 30,
      minWidth: 30,
    },
    statsPanelRow: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
    },
    statsTitle: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontWeight: 500, 
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        width : "90%",
    },
    teamName: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontWeight: 500,
        fontSize: fontSize.base
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

export default MatchSummary;