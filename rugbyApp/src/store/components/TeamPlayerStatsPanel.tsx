import { SeasonStatsInfo } from "@/app/(tabs)/(teams)/team/[teamID]";
import { fontSize } from "@/constants/tokens";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const sortAndFilterStatsArray = (statsArray: SeasonStatsInfo[], statsTab: string) => {

    const arrayLength = 5;

    const filteredArray = statsArray.filter(function(item){

        switch(statsTab) {
            case 'points':
                return Number(item.points) > 0;
            case 'tries':
                return Number(item.tries) > 0;
            case 'tackles':
                return Number(item.tackles) > 0;
            case 'penaltiesConc':
                return Number(item.penaltiesConc) > 0;
            default:
                return
            }

    })

    switch(statsTab) {
        case 'points':
            return filteredArray.sort((a, b) => Number(b.points) - Number(a.points)).slice(0, arrayLength)
        case 'tries':
            return filteredArray.sort((a, b) => Number(b.tries) - Number(a.tries)).slice(0, arrayLength)
        case 'tackles':
            return filteredArray.sort((a, b) => Number(b.tackles) - Number(a.tackles)).slice(0, arrayLength)
        case 'penaltiesConc':
            return filteredArray.sort((a, b) => Number(b.penaltiesConc) - Number(a.penaltiesConc)).slice(0, arrayLength)
        default:
            return
    }

}


type TeamPlayerStatsPanelProps = {
    playerStatsArray: SeasonStatsInfo[] | undefined,
    teamLeagueName: string | undefined,
    currentYear: string | undefined,
}

export const TeamPlayerStatsPanel = ({playerStatsArray, teamLeagueName, currentYear}: TeamPlayerStatsPanelProps) => {

    const [currentStatsTab, setCurrentStatsTab] = useState<string>('points');

    if(playerStatsArray == undefined) return

    const sortedArray = sortAndFilterStatsArray(playerStatsArray, currentStatsTab)

    if(sortedArray == undefined) return

    return (
        <View style={{marginVertical: 10, marginHorizontal: 5, backgroundColor: '#f0f2f0', borderRadius: 4, borderColor: 'lightgrey', borderWidth: 1,
            paddingHorizontal: 5, paddingVertical: 10}}>
            <View style={{paddingBottom: 4, marginHorizontal: 5}}>
                <Text style={{fontWeight: 500}}>{currentYear} {teamLeagueName} Player Stats</Text>
            </View>

            <View style={{justifyContent: 'center', paddingVertical: 5}}>

            <View style={{flexDirection: 'row', marginHorizontal: 5}}>
                <TouchableOpacity onPress={() => setCurrentStatsTab('points')} 
                style={{padding: 1, borderBottomColor: (currentStatsTab === "points") ? ('grey'):('lightgrey'),
                 borderBottomWidth: 2, backgroundColor: (currentStatsTab === "points") ? ('white'):('#f0f2f0') ,
                 borderTopLeftRadius: 4, borderTopRightRadius: 4, width: "20%"}}>
                        <Text style={{textAlign: 'center'}}>Points</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setCurrentStatsTab('tries')} 
                style={{padding: 1, borderBottomColor: (currentStatsTab === "tries") ? ('grey'):('lightgrey'),
                 borderBottomWidth: 2, backgroundColor: (currentStatsTab === "tries") ? ('white'):('#f0f2f0'), 
                 borderTopLeftRadius: 4, borderTopRightRadius: 4, width: "20%"}}>
                    <Text style={{textAlign: 'center'}}>Tries</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCurrentStatsTab('tackles')} 
                style={{padding: 1, borderBottomColor: (currentStatsTab === "tackles") ? ('grey'):('lightgrey'),
                 borderBottomWidth: 2, backgroundColor: (currentStatsTab === "tackles") ? ('white'):('#f0f2f0'), 
                 borderTopLeftRadius: 4, borderTopRightRadius: 4, width: "20%"}}>
                    <Text style={{textAlign: 'center'}}>Tackles</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCurrentStatsTab('penaltiesConc')} 
                style={{padding: 1, borderBottomColor: (currentStatsTab === "penaltiesConc") ? ('grey'):('lightgrey'),
                 borderBottomWidth: 2, backgroundColor: (currentStatsTab === "penaltiesConc") ? ('white'):('#f0f2f0'), 
                 borderTopLeftRadius: 4, borderTopRightRadius: 4, width: "40%"}}>
                    <Text style={{textAlign: 'center'}}>Penalties Conc.</Text>
                </TouchableOpacity>
            </View>
            
            {sortedArray.map((match, index) => {
                return (
                    <PlayerStatsItem
                    key={index}
                    playerName={match.playerName}
                    playerPosition={match.playerPosition}
                    matchInfo={match}
                    matchCount={match.matchCount}
                    currentTab={currentStatsTab}
                    isLastItem={index == sortedArray.length-1}
                    />
                );
            })}
            </View>
        </View>
    )
}

type PlayerStatsItemProps = {
    playerName: string,
    playerPosition: string,
    matchInfo: SeasonStatsInfo,
    matchCount: number,
    currentTab: string,
    isLastItem: boolean,
}

export const PlayerStatsItem = ({ playerName, playerPosition, matchInfo, matchCount, currentTab, isLastItem}: PlayerStatsItemProps) => {

    var currentStat;

    switch(currentTab) {
        case 'points':
            currentStat = matchInfo.points;
            break;
        case 'tries':
            currentStat = matchInfo.tries;
            break;
        case 'tackles':
            currentStat = matchInfo.tackles;
            break;
        case 'penaltiesConc':
            currentStat = matchInfo.penaltiesConc;
            break;
        default:
            return
    }

    const panelBorderRadius = (isLastItem) ? (4):(0);

    return (
        <View style={{flexDirection: 'row', paddingVertical: 2, backgroundColor: 'white', alignItems: 'center', marginHorizontal: 5,
            borderBottomLeftRadius: panelBorderRadius, borderBottomRightRadius: panelBorderRadius
        }}>

            <View style={{paddingHorizontal: 5, width: "15%", borderRightColor: 'grey', borderRightWidth: 1}}>
                <Text style={{fontSize: fontSize.base, fontWeight: 500}}>{currentStat}</Text>
            </View>
            
            <View style={{paddingHorizontal: 3, marginHorizontal: 3, width: "55%", flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{paddingHorizontal: 4}} >{playerName}</Text>
                <Text style={{fontSize: fontSize.xs, fontWeight: 600, color: 'grey' ,paddingHorizontal: 4}}>{playerPosition}</Text>
            </View>

            <View style={{paddingHorizontal: 1, width: "30%"}}>
                <Text style={{fontSize: fontSize.xs, fontWeight: 200}}>Matches: {matchCount}</Text>
            </View>
        </View>
    )
}
