import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ScrollView, ImageBackgroundBase, ImageBackground } from "react-native"
import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { getLeagueDisplayNameFromValue, getLeagueLogoFromValue } from "@/store/utils/helpers"
import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo"
import { MatchInfo } from "@/app/(tabs)/(fixtures)"
import { Top14AltLogo, URCAltLogo } from "../LeagueLogos/LeagueLogos"
import { StandingInfo } from "@/app/(tabs)/standings"
import { getURCTeamInfoFromName } from "../URCRugbyTeamsDatabase"

type KnockoutsPanelProps = {
    standingsArray: StandingInfo[]
    knockoutFixturesArray: MatchInfo[]
    leagueName: string,
    chosenKnockoutRound: string,
    handleChooseRound: (roundName: string) => void 
}

type KnockoutsFixturePairProps = {
    firstMatch: MatchInfo,
    secondMatch: MatchInfo,
    thisLeagueName: string,
    hasExtraMargin: boolean,
}

export const KnockoutFixturePair = ({ firstMatch, secondMatch, thisLeagueName, hasExtraMargin }: KnockoutsFixturePairProps) => {

    return (
        <View style={{ flexDirection: 'row', marginBottom: hasExtraMargin ? 50 : 0 }}>
            <View style={{ flexDirection: 'column', width: "80%" }}>
                <KnockoutsFixture fixtureInfo={firstMatch} leagueName={thisLeagueName} />
                <KnockoutsFixture fixtureInfo={secondMatch} leagueName={thisLeagueName} />
            </View>

            <View style={{ position: 'absolute', bottom: "25%", right: 0, left: "80%", top: "25%", width: "10%", height: "50%", }}>
                <View style={{
                    height: "100%",
                    borderRightColor: 'white', borderRightWidth: 1, borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1
                }}>
                    <Text></Text>
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: "50%", right: 0, left: "90%", top: "50%", width: "10%", height: "1%" }}>
                <View style={{ borderTopColor: 'white', borderTopWidth: 1 }}>
                    <Text></Text>
                </View>
            </View>
        </View>
    )
}

export const getFixtureFromStandingIndex = (team1Index: number, team2Index: number,
     standingsArray: StandingInfo[], fixturesArray: MatchInfo[], league: string) => {

    const team1Name = standingsArray.find(item => item.ranking + 1 === team1Index)?.teamName;
    const team2Name = standingsArray.find(item => item.ranking + 1 === team2Index)?.teamName;

    console.info(team1Name)
    console.info(team2Name)

    console.info(fixturesArray)

    for (let index = 0; index < fixturesArray.length; index++) {

        var homeTeamSearchName;
        var awayTeamSearchName;

        if(league === "urc")
        {
            homeTeamSearchName = getURCTeamInfoFromName(fixturesArray[index].homeTeam).displayName;
            awayTeamSearchName = getURCTeamInfoFromName(fixturesArray[index].awayTeam).displayName;
        }

        const homeCheck = homeTeamSearchName == team1Name || homeTeamSearchName == team2Name;
        const awayCheck = awayTeamSearchName == team1Name || awayTeamSearchName == team2Name;

        if(homeCheck && awayCheck)
        {
            return fixturesArray[index]
        }
        
    }

    return null
}

export const KnockoutsPanel = ({ standingsArray, knockoutFixturesArray, leagueName, chosenKnockoutRound, handleChooseRound }: KnockoutsPanelProps) => {

    const knockoutRoundRender = (knockoutRoundName: string) => {

        if (knockoutRoundName == "r16") {

            const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle == "R16");

            if(filteredArray.length == 0)
            {
                return null
            }

            const R1_FirstFixture = getFixtureFromStandingIndex( 1, 8, standingsArray, filteredArray, leagueName)
            const R1_SecondFixture = getFixtureFromStandingIndex( 1, 8, standingsArray, filteredArray, leagueName)

            const R2_FirstFixture = getFixtureFromStandingIndex( 1, 8, standingsArray, filteredArray, leagueName)
            const R2_SecondFixture = getFixtureFromStandingIndex( 4, 5, standingsArray, filteredArray, leagueName)

            const R3_FirstFixture = getFixtureFromStandingIndex( 2, 7, standingsArray, filteredArray, leagueName)
            const R3_SecondFixture = getFixtureFromStandingIndex( 3, 6, standingsArray, filteredArray, leagueName)

            const R4_FirstFixture = getFixtureFromStandingIndex( 2, 7, standingsArray, filteredArray, leagueName)
            const R4_SecondFixture = getFixtureFromStandingIndex( 3, 6, standingsArray, filteredArray, leagueName)

            if(R1_FirstFixture == null) return;
            if(R1_SecondFixture == null) return;
            if(R2_FirstFixture == null) return;
            if(R2_SecondFixture == null) return;
            if(R3_FirstFixture == null) return;
            if(R3_SecondFixture == null) return;
            if(R4_FirstFixture == null) return;
            if(R4_SecondFixture == null) return;

            return (
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <KnockoutFixturePair firstMatch={R1_FirstFixture} secondMatch={R1_SecondFixture}
                        thisLeagueName={leagueName} hasExtraMargin={false} />

                    <KnockoutFixturePair firstMatch={R2_FirstFixture} secondMatch={R2_SecondFixture}
                        thisLeagueName={leagueName} hasExtraMargin={false} />

                    <KnockoutFixturePair firstMatch={R3_FirstFixture} secondMatch={R3_SecondFixture}
                        thisLeagueName={leagueName} hasExtraMargin={false} />

                    <KnockoutFixturePair firstMatch={R4_FirstFixture} secondMatch={R4_SecondFixture}
                        thisLeagueName={leagueName} hasExtraMargin={true} />
                </View>
            )
        }
        else if (knockoutRoundName == "quaterFinals") {

            const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle == "QF");

            if(filteredArray.length == 0)
            {
                return null
            }

            const QF1_FirstFixture = getFixtureFromStandingIndex( 1, 8, standingsArray, filteredArray, leagueName)
            const QF1_SecondFixture = getFixtureFromStandingIndex( 4, 5, standingsArray, filteredArray, leagueName)

            const QF2_FirstFixture = getFixtureFromStandingIndex( 2, 7, standingsArray, filteredArray, leagueName)
            const QF2_SecondFixture = getFixtureFromStandingIndex( 3, 6, standingsArray, filteredArray, leagueName)

            if(QF1_FirstFixture == null) return;
            if(QF1_SecondFixture == null) return;
            if(QF2_FirstFixture == null) return;
            if(QF2_SecondFixture == null) return;
    
            return (
                <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                    <KnockoutFixturePair firstMatch={QF1_FirstFixture} secondMatch={QF1_SecondFixture}
                     thisLeagueName={leagueName} hasExtraMargin={false}/>

                    <KnockoutFixturePair firstMatch={QF2_FirstFixture} secondMatch={QF2_SecondFixture}
                     thisLeagueName={leagueName} hasExtraMargin={false}/>
                </View>
                
            )
        }
        else if (knockoutRoundName == "semiFinals") {

            const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle == "SF");

            if(filteredArray.length == 0)
            {
                return null
            }

            const SF1_Option1Fixture = getFixtureFromStandingIndex( 1, 4, standingsArray, filteredArray, leagueName)
            const SF1_Option2Fixture = getFixtureFromStandingIndex( 1, 5, standingsArray, filteredArray, leagueName)
            const SF1_Option3Fixture = getFixtureFromStandingIndex( 8, 4, standingsArray, filteredArray, leagueName)
            const SF1_Option4Fixture = getFixtureFromStandingIndex( 8, 5, standingsArray, filteredArray, leagueName)

            const SF2_Option1Fixture = getFixtureFromStandingIndex( 2, 3, standingsArray, filteredArray, leagueName)
            const SF2_Option2Fixture = getFixtureFromStandingIndex( 2, 6, standingsArray, filteredArray, leagueName)
            const SF2_Option3Fixture = getFixtureFromStandingIndex( 7, 3, standingsArray, filteredArray, leagueName)
            const SF2_Option4Fixture = getFixtureFromStandingIndex( 7, 6, standingsArray, filteredArray, leagueName)

            function isValidFixture<T>(fixture: T | null | undefined): fixture is T {
                return fixture !== null && fixture !== undefined;
            }
            
            const validFixtures = [
                SF1_Option1Fixture,
                SF1_Option2Fixture,
                SF1_Option3Fixture,
                SF1_Option4Fixture,
                SF2_Option1Fixture,
                SF2_Option2Fixture,
                SF2_Option3Fixture,
                SF2_Option4Fixture,
            ].filter(isValidFixture);
        

            return (
                <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                    <KnockoutFixturePair firstMatch={validFixtures[0]} secondMatch={validFixtures[1]}
                     thisLeagueName={leagueName} hasExtraMargin={false}/>
                </View>
            )
        }
        else if (knockoutRoundName == "final") {

            const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle == "GF");
            if(filteredArray.length == 0)
            {
                return null
            }

            return (
                <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ flexDirection: 'column', width: "100%"}}>
                            <KnockoutsFixture fixtureInfo={filteredArray[0]} leagueName={leagueName} />
                        </View>
                    </View>

                </View>
                
            )
        }
    }

    const knockoutRoundButtonsRender = (knockoutFixturesArray: MatchInfo[]) => {

        const hasR16Fixtures = knockoutFixturesArray.find(obj => obj.matchTitle === "R16") !== undefined;
        const hasQFFixtures = knockoutFixturesArray.find(obj => obj.matchTitle === "QF") !== undefined;
        const hasSFFixtures = knockoutFixturesArray.find(obj => obj.matchTitle === "SF") !== undefined;
        const hasGFFixtures = knockoutFixturesArray.find(obj => obj.matchTitle === "GF") !== undefined;

        return (
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {hasR16Fixtures && (
                    <TouchableOpacity style={[knockoutPanelStyles.roundButton, {backgroundColor: chosenKnockoutRound == 'r16' ? 'lightgrey' : 'grey'}]} 
                    onPress={() => handlePressRoundButton('r16')}>
                        <Text style={[knockoutPanelStyles.roundText, {color: chosenKnockoutRound == 'r16' ? 'black':'white'}]}>R16</Text>
                    </TouchableOpacity>   
                )}
                {hasQFFixtures && (
                    <TouchableOpacity style={[knockoutPanelStyles.roundButton, {backgroundColor: chosenKnockoutRound == 'quaterFinals' ? 'lightgrey' : 'grey'}]} 
                    onPress={() => handlePressRoundButton('quaterFinals')}>
                        <Text style={[knockoutPanelStyles.roundText, {color: chosenKnockoutRound == 'quaterFinals' ? 'black':'white'}]}>QUARTER FINALS</Text>
                    </TouchableOpacity>   
                )}
                {hasSFFixtures && (
                    <TouchableOpacity style={[knockoutPanelStyles.roundButton, {backgroundColor: chosenKnockoutRound == 'semiFinals' ? 'lightgrey' : 'grey'}]}
                    onPress={() => handlePressRoundButton('semiFinals')}>
                        <Text style={[knockoutPanelStyles.roundText, {color: chosenKnockoutRound == 'semiFinals' ? 'black':'white'}]}>SEMI FINALS</Text>
                    </TouchableOpacity>  
                )}
                {hasGFFixtures && (
                   <TouchableOpacity style={[knockoutPanelStyles.roundButton, {backgroundColor: chosenKnockoutRound == 'final' ? 'lightgrey' : 'grey'}]}
                   onPress={() => handlePressRoundButton('final')}>
                       <Text style={[knockoutPanelStyles.roundText, {color: chosenKnockoutRound == 'final' ? 'black':'white'}]}>FINAL</Text>
                   </TouchableOpacity>  
                )}

            </View>
        )
    }

    const handlePressRoundButton = (roundName: string) => {
        handleChooseRound(roundName)
    }

    const leagueDisplayName = getLeagueDisplayNameFromValue(leagueName)
    const leagueLogo = getLeagueLogoFromValue(leagueName)

    return (
        <ImageBackground resizeMode="cover" imageStyle={{opacity: 0.05}} 
                style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}} 
                source={leagueLogo} >
            <View>
                <Text style={{color: colors.text, fontFamily: fontFamilies.bold, textAlign: 'center', fontSize: fontSize.sm}}>KNOCKOUTS</Text>
            </View>

            <View style={{marginVertical: 5}}>
                <Text style={{color: colors.text, fontFamily: fontFamilies.regular, textAlign: 'center', fontSize: 14}}>{leagueDisplayName}</Text>
            </View>

            {knockoutFixturesArray.length == 0 && (
                <View style={{marginVertical: 20}}>
                    <ActivityIndicator size='large' color='lightgrey' />
                </View>
            )}

            <View style={{marginVertical: 8}}>
                {knockoutRoundButtonsRender(knockoutFixturesArray)}
            </View>
        
            <BottomSheetScrollView>
                {knockoutRoundRender(chosenKnockoutRound)}    
            </BottomSheetScrollView>
                       
        </ImageBackground>  
    )
}

type KnockoutsFixtureProps = {
    leagueName: string,
    fixtureInfo: MatchInfo
    
}

export const KnockoutsFixture = ({ leagueName, fixtureInfo }: KnockoutsFixtureProps) => {

    if(fixtureInfo == undefined || fixtureInfo == null)
    {
        return;
    }

    var homeTeamName;
    var awayTeamName;

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, fixtureInfo.homeTeam, fixtureInfo.awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    homeTeamName = homeTeamInfo?.abbreviation;
    awayTeamName = awayTeamInfo?.abbreviation;

    if(fixtureInfo.homeTeam == "TBC")
    {
        homeTeamName = fixtureInfo.homeTeam;
    }
    if(fixtureInfo.awayTeam == "TBC")
    {
        awayTeamName = fixtureInfo.awayTeam;
    }

    const homeTeamScore = fixtureInfo.homeScore;
    const awayTeamScore = fixtureInfo.awayScore;
    const matchVenue = fixtureInfo.matchVenue;

    if(homeTeamInfo === null) return
    if(awayTeamInfo === null) return
    if(homeTeamInfo === undefined) return
    if(awayTeamInfo === undefined) return

    const homeFontFamily = (new Number(homeTeamScore) > new Number(awayTeamScore)) ? (fontFamilies.bold):(fontFamilies.light);
    const awayFontFamily = (new Number(awayTeamScore) > new Number(homeTeamScore)) ? (fontFamilies.bold):(fontFamilies.light);

    return(
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, marginHorizontal: 10, marginVertical: 10, padding: 5, borderRadius: 4}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{color: colors.text, fontFamily: fontFamilies.bold, fontSize: 12}}>{homeTeamName}</Text>
                 <View style={{paddingHorizontal: 10}}>
                    <Image
                        style={[knockoutPanelStyles.teamLogo]}
                        source={homeTeamInfo.logo} />
                </View>
                <View style={{padding: 4, flexDirection: 'row'}}>
                    <Text style={{color: colors.text, fontFamily: homeFontFamily, paddingHorizontal: 5}}>{homeTeamScore}</Text>
                    <Text style={{color: colors.text, fontFamily: awayFontFamily, paddingHorizontal: 5}}>{awayTeamScore}</Text>
                </View>
                <View style={{paddingHorizontal: 10}}>
                    <Image
                        style={[knockoutPanelStyles.teamLogo]}
                        source={awayTeamInfo.logo} />
                </View>
                <Text style={{color: colors.text, fontFamily: fontFamilies.bold, fontSize: 12}}>{awayTeamName}</Text>
            </View>

            <View style={{padding: 3}}>
                <Text style={{color: 'lightgrey', fontFamily: fontFamilies.light, fontSize: 11}}>{matchVenue}</Text>
            </View>
        </View>
    )
}

export const knockoutPanelStyles = StyleSheet.create({
    roundText: {
        fontFamily: fontFamilies.bold,
        textAlign: 'center',
        fontSize: fontSize.xs, 
        padding: 6
    },

    roundButton: {
       margin: 5,
       borderRadius: 5
    },

    teamLogo: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        minHeight:25,
        minWidth: 25
    },
  })