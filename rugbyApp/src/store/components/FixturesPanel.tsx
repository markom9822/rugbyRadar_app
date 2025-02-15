import { MatchInfo } from "@/app/(tabs)/(fixtures)"
import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { LinearGradient } from "expo-linear-gradient"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo"
import { getLeagueNameFromDisplayName, hexToRGB } from "../utils/helpers"
import { FixtureOverview } from "./FixtureOverview"


type FixturesPanelProps = {
    matchInfo: MatchInfo,
    id: string,
}

export const FixturesPanel = ({ matchInfo, id }: FixturesPanelProps) => {

    const leagueName = getLeagueNameFromDisplayName(matchInfo.matchLeague)
    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, matchInfo.homeTeam, matchInfo.awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;
        
    if(homeTeamInfo === null) return
    if(awayTeamInfo === null) return
    if(homeTeamInfo === undefined) return
    if(awayTeamInfo === undefined) return

    var homeAbbreviation = homeTeamInfo.abbreviation;
    var awayAbbreviation = awayTeamInfo.abbreviation;

    const homeFontFamily = (new Number(matchInfo.homeScore) > new Number(matchInfo.awayScore)) ? (fontFamilies.bold):(fontFamilies.light);
    const awayFontFamily = (new Number(matchInfo.awayScore) > new Number(matchInfo.homeScore)) ? (fontFamilies.bold):(fontFamilies.light);

    const matchTime = matchInfo.matchDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})

    if(matchInfo.homeTeam.includes("U20"))
    {
        homeAbbreviation += " U20"
    }
    if(matchInfo.awayTeam.includes("U20"))
    {
        awayAbbreviation += " U20"
    }

    const homeGradientColour = hexToRGB(homeTeamInfo.colour, '0.4');
    const awayGradientColour = hexToRGB(awayTeamInfo.colour, '0.4');

    const fadedGreyColour = hexToRGB('#a4a6a6', '0.8');


    return (
        <LinearGradient colors={[homeGradientColour,awayGradientColour]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} 
                            style={[{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', borderRadius: 12}]}>
            
            <View style={{width: 35, height: 5, backgroundColor: fadedGreyColour, margin: 10, borderRadius: 5}}/>

            <View style={{padding: 10}}>
                <Text style={[{color: fadedGreyColour, fontFamily: fontFamilies.light, textAlign: 'center', fontSize: fontSize.xs}]}>{matchInfo.matchLeague}</Text>
            </View>


            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                <View style={{width: "30%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{paddingVertical: 2}}>
                        <Image
                        style={[fixturesPanelStyles.teamLogo]}
                        source={homeTeamInfo.logo} />
                    </View>
                    <Text style={[{color: colors.text, fontFamily: fontFamilies.bold, textAlign: 'center'}]}>{homeAbbreviation}</Text>            
                </View>

                <View style={{width: "40%", flexDirection: 'column', alignItems: 'center', justifyContent :'center'}}>
                        {scoreRender(matchInfo.eventState, matchTime, matchInfo, homeFontFamily, awayFontFamily)}
                </View>

                <View style={{width: "30%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{paddingVertical: 2}}>
                        <Image
                        style={[fixturesPanelStyles.teamLogo]}
                        source={awayTeamInfo.logo} />
                    </View>
                    <Text style={[{color: colors.text, fontFamily: fontFamilies.bold, textAlign: 'center'}]}>{awayAbbreviation}</Text>            
                </View>

            </View>

            <FixtureInfoPanel id={id}/>


        </LinearGradient>
    )
}

type FixturesInfoPanel = {
    id: string,

}

export const FixtureInfoPanel = ({ id  }: FixturesInfoPanel) => {

    return (
        <LinearGradient colors={['#0d0c0c','transparent']} start={{ x: 0.5, y: 0.3 }} end={{ x: 0.5, y: 0 }} 
                            style={[{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}]}>

            <FixturesInfoTabBar/>

            <FixturesInfoBox id={id}/>

        </LinearGradient>
    )
}

type FixturesInfoBox = {
    id: string,

}


export const FixturesInfoBox = ({ id }: FixturesInfoBox) => {

    return (

        <View>
            <FixtureOverview id={id}/>
        </View>
    )
}

type FixturesInfoTabBar = {

}


export const FixturesInfoTabBar = ({ }: FixturesInfoTabBar) => {

    return (

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 5, marginTop: 30}}>
                <FixturesInfoTabButton title="Overview"/>
                <FixturesInfoTabButton title="Stats"/>
                <FixturesInfoTabButton title="Events"/>
                <FixturesInfoTabButton title="Lineups"/>
        </View>
    )
}

type FixturesInfoTabButton = {
    title: string

}


export const FixturesInfoTabButton = ({ title }: FixturesInfoTabButton) => {

    return (
        <TouchableOpacity style={{margin: 4, width: "22%"}}>
                    <Text style={{color: colors.text, fontFamily: fontFamilies.regular, textAlign: 'center', fontSize: 15}}>{title}</Text>
        </TouchableOpacity>
    )
}

export const scoreRender = (eventState: string, matchTime: string, matchInfo: MatchInfo, homeFontFamily: string, awayFontFamily: string) => {
    
    // not started yet
    if (eventState === "pre") {
        return (  
            <View style={{flexDirection: 'column', width: "100%", paddingVertical: 8}}>
                    <Text style={{color: colors.text, fontSize: fontSize.base,
                         textAlign: 'center', fontFamily: fontFamilies.regular}}>{matchTime}</Text> 
            </View>
        )
    }
    // event finished
    else if (eventState === "post")
    {
        return (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", paddingVertical: 8}}>
                    <Text style={[
                         {fontSize: fontSize.lg, color: colors.text, fontFamily: homeFontFamily, width: "35%", textAlign: 'center'}]}>{matchInfo.homeScore}</Text>

                    <Text style={{textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular, padding: 2, fontSize: fontSize.sm, width: "30%"}}>FT</Text>

                    <Text style={[
                        {fontSize: fontSize.lg, color: colors.text, fontFamily: awayFontFamily, width: "35%", textAlign: 'center'}]}>{matchInfo.awayScore}</Text>
                </View>
        )
    }
    // event at halftime
    else if (eventState === "halfTime") {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", paddingVertical: 8}}>
                    <Text style={[
                         {fontSize: fontSize.lg, color: colors.text, fontFamily: homeFontFamily, width: "30%", textAlign: 'center'}]}>{matchInfo.homeScore}</Text>

                    <Text style={{textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular, padding: 2, fontSize: fontSize.sm, width: "40%"}}>HT</Text>

                    <Text style={[ 
                        {fontSize: fontSize.lg, color: colors.text, fontFamily: awayFontFamily, width: "30%", textAlign: 'center'}]}>{matchInfo.awayScore}</Text>
            </View>
        )
    }
    // event ongoing
    else { 
        return (
            <View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", paddingVertical: 8}}>
                    <Text style={[
                         {fontSize: fontSize.lg, color: colors.text, fontFamily: homeFontFamily, width: "35%", textAlign: 'center'}]}>{matchInfo.homeScore}</Text>

                    <Text style={{textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular, padding: 2, fontSize: 15, width: "30%"}}>{matchInfo.eventTime}'</Text>

                    <Text style={[
                        {fontSize: fontSize.lg, color: colors.text, fontFamily: awayFontFamily, width: "35%", textAlign: 'center'}]}>{matchInfo.awayScore}</Text>
                </View>
                    
            </View> 
        )
    }
}


export const fixturesPanelStyles = StyleSheet.create({

    teamLogo: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
        minHeight: 60,
        minWidth: 60
    },
})