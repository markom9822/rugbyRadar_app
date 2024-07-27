import { fixtureStyles } from "@/styles"
import { View, Text, TouchableOpacity, Image, FlatList, Pressable, Modal } from "react-native"
import { InternationalRugbyTeams, getInternationalTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase"
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from "expo-router"
import { getURCTeamInfoFromName } from "../URCRugbyTeamsDatabase";
import { getPremTeamInfoFromName } from "../PremiershipRubyTeamsDatabase";
import { getTop14TeamInfoFromName } from "../Top14RugbyTeamsDatabase";


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

    var homeInfo;
    var awayInfo;

    if(league === "urc")
    {
        homeInfo = getURCTeamInfoFromName(homeTeam)
        awayInfo = getURCTeamInfoFromName(awayTeam)
    }
    else if(league === "inter")
    {
        homeInfo = getInternationalTeamInfoFromName(homeTeam)
        awayInfo = getInternationalTeamInfoFromName(awayTeam)
    }
    else if(league === "prem") 
    {
        homeInfo = getPremTeamInfoFromName(homeTeam)
        awayInfo = getPremTeamInfoFromName(awayTeam)
    }
    else if(league === "top14")
    {
        homeInfo = getTop14TeamInfoFromName(homeTeam)
        awayInfo = getTop14TeamInfoFromName(awayTeam)
    }
    else
    {
        return
    }

    if(homeInfo === null) return
    if(awayInfo === null) return

    const handlePressedPanel = () => {
        OnPressPanel(index)
    }

    const homeScoreWeight = (new Number(homeScore) > new Number(awayScore)) ? ('600'):('300');;
    const awayScoreWeight = (new Number(awayScore) > new Number(homeScore)) ? ('600'):('300');

    const matchTime = matchDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})

    return(
        <View style={[fixtureStyles.card]}>
              <View style={[fixtureStyles.cardHeaderAllInfo]}>
                <View style={[fixtureStyles.cardHeaderGameInfo]}>
                    <Text style={[fixtureStyles.teamName]}>{homeInfo.abbreviation}</Text>
                    <Image
                        style={[fixtureStyles.teamLogo]}
                        source={homeInfo.logo} />

                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[fixtureStyles.teamScore, {fontWeight: homeScoreWeight }]}>{homeScore}</Text>
                            <Text style={[fixtureStyles.teamScore, {fontWeight: awayScoreWeight}]}>{awayScore}</Text>
                        </View>
                        <Text>{matchTime}</Text>
                    </View>

                    <Image
                        style={[fixtureStyles.teamLogo]}
                        source={awayInfo.logo} />
                    <Text style={[fixtureStyles.teamName]}>{awayInfo.abbreviation}</Text>
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
                  <Text style={{borderBottomColor: 'grey', borderBottomWidth: 2}}>Broadcasters</Text>
                  <Text>Sky Sports</Text>

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