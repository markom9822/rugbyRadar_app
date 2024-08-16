import { fixtureStyles } from "@/styles"
import { View, Text, TouchableOpacity, Image, FlatList, Pressable, Modal } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from "expo-router"
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo";


type ScorePanelProps = {
    league: string
    index: number
    currentIndex: Number | null
	homeTeam: string
	awayTeam: string
    homeScore: string
    awayScore: string
    matchDate: Date
    matchTitle: string
    matchVenue: string
    matchType: string
    matchID: string
    OnPressPanel: (index: Number) => void
}

export const ScorePanel = ({ league, homeTeam, awayTeam, homeScore, awayScore, matchDate,
     index, currentIndex, matchTitle, matchVenue, matchType, matchID, OnPressPanel}: ScorePanelProps) => {

    const homeAwayInfo = getHomeAwayTeamInfo(league, homeTeam, awayTeam);
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

    return(
        <View style={[fixtureStyles.card]}>
              <View style={[fixtureStyles.cardHeaderAllInfo]}>
                <View style={[fixtureStyles.cardHeaderGameInfo]}>
                    <View style={{width: "35%", flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text style={[fixtureStyles.teamName]}>{homeTeamInfo.abbreviation}</Text>
                        <Image
                        style={[fixtureStyles.teamLogo]}
                        source={homeTeamInfo.logo} />
                    </View>
                    
                    <View style={{width: "30%", flexDirection: 'column', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[fixtureStyles.teamScore, {fontWeight: homeScoreWeight }]}>{homeScore}</Text>
                            <Text style={[fixtureStyles.teamScore, {fontWeight: awayScoreWeight}]}>{awayScore}</Text>
                        </View>
                        <Text>{matchTime}</Text>
                    </View>

                    <View style={{width: "35%", flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Image
                        style={[fixtureStyles.teamLogo]}
                        source={awayTeamInfo.logo} />
                        <Text style={[fixtureStyles.teamName]}>{awayTeamInfo.abbreviation}</Text>
                    </View>
                </View>

                <View style={[fixtureStyles.moreInfoView]}>
                    <Link href={`/(tabs)/fixtures/match/${matchID}`} asChild>
                        <Pressable>
                            <Entypo name="chevron-right" size={24} color="black" />
                        </Pressable> 
                    </Link>
                </View>
                
              </View>

              {index === currentIndex && (
                <View style={fixtureStyles.subCategoriesList}>
                  <Text>{matchTitle}</Text>
                  <Text>{matchType}</Text>

                  <Text style={{borderBottomColor: 'grey', borderBottomWidth: 2}}>Match Venue:</Text>
                  <Text>{matchVenue}</Text>

                </View>
              )}

              <View style={fixtureStyles.quickViewButton}>
                <TouchableOpacity key={index} 
                onPress={handlePressedPanel} 
                activeOpacity={0.9}
                style={{width: 100, alignItems: 'center'}}>
                    <Entypo name="chevron-down" size={18} color="black" />
                </TouchableOpacity>
              </View>
            </View>
    )

}