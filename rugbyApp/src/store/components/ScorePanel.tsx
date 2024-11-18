import { fixtureStyles } from "@/styles"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { Link } from "expo-router"
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo";
import { getLeagueNameFromDisplayName, getRugbyVizLeagueCode, isLeagueInPlanetRugbyAPI, isLeagueInRugbyViz, isLeagueInWorldRugbyAPI } from "../utils/helpers";
import { colors, fontFamilies, fontSize } from "@/constants/tokens";

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
    lastRefreshTime: string
}

export const ScorePanel = ({ leagueDisplayName, homeTeam, awayTeam, homeScore, awayScore, matchDate,
     index, currentIndex, matchTitle, matchVenue, matchLeague, matchID, eventState, stateDetail, eventTime, isLastItem, lastRefreshTime}: ScorePanelProps) => {

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
    const homeFontFamily = (new Number(homeScore) > new Number(awayScore)) ? (fontFamilies.bold):(fontFamilies.light);
    const awayFontFamily = (new Number(awayScore) > new Number(homeScore)) ? (fontFamilies.bold):(fontFamilies.light);

    const matchTime = matchDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})

    const scoreRender = (eventState: string) => {

        // not started yet
        if (eventState === "pre") {
            return (
                <View style={{width: "25%", flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={{color: colors.text, fontSize: fontSize.base, fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light}}>{matchTime}</Text>
                </View>  
            )
        }
        // event finished
        else if (eventState === "post")
        {
            return (
            <View style={{width: "25%", flexDirection: 'column', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[fixtureStyles.teamScore, {fontWeight: homeScoreWeight, color: colors.text, fontFamily: homeFontFamily }]}>{homeScore}</Text>
                        <Text style={[fixtureStyles.teamScore, {fontWeight: awayScoreWeight, color: colors.text, fontFamily: awayFontFamily}]}>{awayScore}</Text>
                    </View>
                    <Text style={{textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular}}>FT</Text>
            </View> 
            )
        }
        // event at halftime
        else if (eventState === "halfTime") {
            return (
                <View style={{ width: "25%", flexDirection: 'column', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[fixtureStyles.teamScore, { fontWeight: homeScoreWeight, color: colors.text, fontFamily: homeFontFamily }]}>{homeScore}</Text>
                        <Text style={[fixtureStyles.teamScore, { fontWeight: awayScoreWeight, color: colors.text, fontFamily: awayFontFamily }]}>{awayScore}</Text>
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular }}>HT</Text>
                </View>
            )
        }
        // event ongoing
        else { 
            return (
                <View style={{width: "25%", flexDirection: 'column', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[fixtureStyles.teamScore, {fontWeight: homeScoreWeight,color: colors.text, fontFamily: homeFontFamily }]}>{homeScore}</Text>
                            <Text style={[fixtureStyles.teamScore, {fontWeight: awayScoreWeight,color: colors.text, fontFamily: awayFontFamily}]}>{awayScore}</Text>
                        </View>
                        <Text style={{textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular}}>{eventTime}'</Text>
                </View> 
            )
        }
    }

    const venueRender = (eventNotStarted: boolean) => {

        if (eventNotStarted) {
            return (
                <View style={{paddingVertical: 1}}>
                    <Text style={{textAlign: 'center', fontSize: fontSize.xs, fontWeight: 300, color: colors.text, fontFamily: fontFamilies.light}}>{matchVenue}</Text>
                </View>  
            )
        }
        else {
            return (
                <></>
            )
        }
    }

    const lastRefreshHeader = (time: string) => {

        if (isLastItem) {
            return (
                <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{textAlign: 'center', color: 'grey', fontSize: fontSize.xs, fontFamily: fontFamilies.light}}>Last Refresh: {time}</Text>
                </View>
            )
        }

        return null
    }

    var linkID
    if(isLeagueInRugbyViz(leagueDisplayName))
    {
        linkID = matchID + leagueName + "_RugbyViz"
    }
    else if(isLeagueInWorldRugbyAPI(leagueDisplayName))
    {
        linkID = matchID + "_" + leagueName + "_WorldRugbyAPI"
    }
    else if(isLeagueInPlanetRugbyAPI(leagueDisplayName))
    {
        linkID = matchID + "_" + leagueName + "_PlanetRugbyAPI"
    }
    else
    {
        linkID = matchID;
    }

    return(
        <View style={[fixtureStyles.card, {marginBottom: (isLastItem) ? 60: 3}]}>
              <View style={[fixtureStyles.cardHeaderAllInfo,
                 {backgroundColor: colors.background, borderColor: 'grey', borderWidth: 2, borderRadius: 4}]}>

                <Link href={`/(tabs)/fixtures/match/${linkID}`} asChild>
                <TouchableOpacity activeOpacity={0.5} >

                <View style={[fixtureStyles.cardHeaderGameInfo]}>
                    <View style={{width: "35%", flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text style={[fixtureStyles.teamName, {color: colors.text, fontFamily: fontFamilies.bold}]}>{homeTeamInfo.abbreviation}</Text>
                        <View style={{paddingHorizontal: 2}}>
                            <Image
                            style={[fixtureStyles.teamLogo]}
                            source={homeTeamInfo.logo} />
                        </View>
                        
                    </View>
                    
                    {scoreRender(eventState)}

                    <View style={{width: "35%", flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <View style={{paddingHorizontal: 2}}>
                            <Image
                            style={[fixtureStyles.teamLogo]}
                            source={awayTeamInfo.logo} />
                        </View>
                        <Text style={[fixtureStyles.teamName, {color: colors.text, fontFamily: fontFamilies.bold}]}>{awayTeamInfo.abbreviation}</Text>
                    </View>

                </View>

                {venueRender(eventState === "pre")}

                </TouchableOpacity> 
                </Link>
              </View>
              {lastRefreshHeader(lastRefreshTime)}
            </View>
    )

}