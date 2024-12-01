import { SeasonStatsInfo } from "@/app/(tabs)/teams/team/[teamID]";
import { colors, fontSize } from "@/constants/tokens";
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
        <View style={{marginBottom: 50}}>
        <View style={{marginVertical: 10, marginHorizontal: 5, backgroundColor: colors.altBackground, borderRadius: 4, borderColor: 'lightgrey', borderWidth: 1,
            paddingHorizontal: 5, paddingVertical: 10}}>
            <View style={{paddingBottom: 4, marginHorizontal: 5}}>
                <Text style={{fontWeight: 500, color: colors.text}}>{currentYear} {teamLeagueName} Player Stats</Text>
            </View>

            <View style={{justifyContent: 'center', paddingVertical: 5}}>

            <View style={{flexDirection: 'row', marginHorizontal: 5}}>
                <TouchableOpacity onPress={() => setCurrentStatsTab('points')} 
                style={{padding: 1, borderBottomColor: (currentStatsTab === "points") ? ('lightgrey'):(colors.background),
                 borderBottomWidth: 2, backgroundColor: colors.altBackground ,
                 borderTopLeftRadius: 4, borderTopRightRadius: 4, width: "20%"}}>
                        <Text style={{textAlign: 'center', color: (currentStatsTab === "points") ? (colors.text):('lightgrey')}}>Points</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setCurrentStatsTab('tries')} 
                style={{padding: 1, borderBottomColor: (currentStatsTab === "tries") ? ('lightgrey'):(colors.background),
                 borderBottomWidth: 2, backgroundColor: colors.altBackground, 
                 borderTopLeftRadius: 4, borderTopRightRadius: 4, width: "20%"}}>
                    <Text style={{textAlign: 'center', color: (currentStatsTab === "tries") ? (colors.text):('lightgrey')}}>Tries</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCurrentStatsTab('tackles')} 
                style={{padding: 1, borderBottomColor: (currentStatsTab === "tackles") ? ('lightgrey'):(colors.background),
                 borderBottomWidth: 2, backgroundColor: colors.altBackground, 
                 borderTopLeftRadius: 4, borderTopRightRadius: 4, width: "20%"}}>
                    <Text style={{textAlign: 'center', color: (currentStatsTab === "tackles") ? (colors.text):('lightgrey')}}>Tackles</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCurrentStatsTab('penaltiesConc')} 
                style={{padding: 1, borderBottomColor: (currentStatsTab === "penaltiesConc") ? ('lightgrey'):(colors.background),
                 borderBottomWidth: 2, backgroundColor: colors.altBackground, 
                 borderTopLeftRadius: 4, borderTopRightRadius: 4, width: "40%"}}>
                    <Text style={{textAlign: 'center', color: (currentStatsTab === "penaltiesConc") ? (colors.text):('lightgrey')}}>Penalties Conc.</Text>
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
        <View style={{flexDirection: 'row', paddingVertical: 2, backgroundColor: colors.altBackground, alignItems: 'center', marginHorizontal: 5,
            borderBottomLeftRadius: panelBorderRadius, borderBottomRightRadius: panelBorderRadius
        }}>

            <View style={{paddingHorizontal: 5, width: "15%", borderRightColor: 'lightgrey', borderRightWidth: 1}}>
                <Text style={{fontSize: fontSize.base, fontWeight: 500, color: colors.text}}>{currentStat}</Text>
            </View>
            
            <View style={{paddingHorizontal: 3, marginHorizontal: 3, width: "60%", flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{paddingHorizontal: 4, color: colors.text}} >{playerName}</Text>
                <Text style={{fontSize: fontSize.xs, fontWeight: 600, color: 'lightgrey' ,paddingHorizontal: 4}}>{playerPosition}</Text>
            </View>

            <View style={{paddingHorizontal: 1, width: "30%"}}>
                <Text style={{fontSize: fontSize.xs, fontWeight: 200, color: colors.text}}>Matches: {matchCount}</Text>
            </View>
        </View>
    )
}
