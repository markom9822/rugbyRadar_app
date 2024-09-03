import { fixtureStyles } from "@/styles"
import { View, Text, TouchableOpacity, Image, FlatList, Pressable, Modal } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from "expo-router"
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo";
import { getLeagueNameFromDisplayName } from "../utils/helpers";
import { useState } from "react";


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
    OnPressPanel: (index: Number) => void
}

export const ScorePanel = ({ leagueDisplayName, homeTeam, awayTeam, homeScore, awayScore, matchDate,
     index, currentIndex, matchTitle, matchVenue, matchLeague, matchID, OnPressPanel}: ScorePanelProps) => {

    const [selected, setSelected] = useState(false);

    const leagueName = getLeagueNameFromDisplayName(leagueDisplayName)
    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, homeTeam, awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;
    
    if(homeTeamInfo === null) return
    if(awayTeamInfo === null) return
    if(homeTeamInfo === undefined) return
    if(awayTeamInfo === undefined) return

    const handlePressedPanel = () => {
        OnPressPanel(index)
    }

    const homeScoreWeight = (new Number(homeScore) > new Number(awayScore)) ? ('600'):('300');
    const awayScoreWeight = (new Number(awayScore) > new Number(homeScore)) ? ('600'):('300');

    const matchTime = matchDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})

    const currentHomeTeamLogo = selected ? homeTeamInfo.altLogo : homeTeamInfo.logo;
    const currentAwayTeamLogo = selected ? awayTeamInfo.altLogo : awayTeamInfo.logo;


    return(
        <View style={[fixtureStyles.card]}>
              <View style={[fixtureStyles.cardHeaderAllInfo,
                 {backgroundColor: selected ? 'grey' : '#f0f2f0', borderColor: selected ? 'black' : 'lightgrey', borderWidth: 2}]}>

                <Link href={`/(tabs)/fixtures/match/${matchID}`} asChild>
                <Pressable onPressIn={() => setSelected(true)} onPressOut={() => setSelected(false)}
                    onBlur={() => setSelected(false)} onHoverOut={() => setSelected(false)}>

                <View style={[fixtureStyles.cardHeaderGameInfo]}>
                    <View style={{width: "35%", flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text style={[fixtureStyles.teamName, {color: selected ? 'white':'black'}]}>{homeTeamInfo.abbreviation}</Text>
                        <Image
                        style={[fixtureStyles.teamLogo]}
                        source={currentHomeTeamLogo} />
                    </View>
                    
                    <View style={{width: "30%", flexDirection: 'column', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[fixtureStyles.teamScore, {fontWeight: homeScoreWeight,color: selected ? 'white':'black' }]}>{homeScore}</Text>
                            <Text style={[fixtureStyles.teamScore, {fontWeight: awayScoreWeight,color: selected ? 'white':'black'}]}>{awayScore}</Text>
                        </View>
                        <Text style={{color: selected ? 'white':'black'}}>{matchTime}</Text>
                    </View>

                    <View style={{width: "35%", flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Image
                        style={[fixtureStyles.teamLogo]}
                        source={currentAwayTeamLogo} />
                        <Text style={[fixtureStyles.teamName, {color: selected ? 'white':'black'}]}>{awayTeamInfo.abbreviation}</Text>
                    </View>
                </View>

                </Pressable> 
                </Link>
              </View>

              {index === currentIndex && (
                <View style={[fixtureStyles.subCategoriesList, {backgroundColor: 'rgba(52, 52, 52, 0.3)'}]}>
                  <Text style={{fontWeight: 500, fontSize: 15, color: 'black'}}>{matchTitle}</Text>
                  <Text style={{fontWeight: 300, color: 'black'}}>{matchLeague}</Text>

                  <Text style={{color: 'black', fontWeight: 400}}>{matchVenue}</Text>

                </View>
              )}

              <View style={fixtureStyles.quickViewButton}>
                <TouchableOpacity key={index} 
                onPress={handlePressedPanel} 
                activeOpacity={0.9}
                style={{width: 100, alignItems: 'center'}}>
                    <Entypo name="chevron-down" size={14} color="black" />
                </TouchableOpacity>
              </View>
            </View>
    )

}