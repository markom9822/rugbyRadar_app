import { useCallback } from "react"
import { hexToRGB } from "../utils/helpers"
import { Text, TouchableOpacity, View } from "react-native"
import { lineupPanelStyles } from "@/styles"
import { colors, fontFamilies } from "@/constants/tokens"

type LineupPlayerPanelProps = {
    selectedTeam: string,
    selectedTeamDisplayName: string,
    hometeamPlayer: string,
    hometeamPlayerID: string,
    hometeamPlayerNum: string,
    isHomePlayerCaptain: boolean,
    awayteamPlayer: string,
    awayteamPlayerID: string,
    awayteamPlayerNum: string,
    isAwayPlayerCaptain: boolean,
    teamColour: string,
    isLastItem: boolean,
    bottomSheetRef: any,
    OnPlayerModalShown: (playerName: string, playerID: string, teamName: string, teamColour: string) => void
}


export const LineupPlayerPanel = ({ selectedTeam, selectedTeamDisplayName, hometeamPlayer, hometeamPlayerID, hometeamPlayerNum, isHomePlayerCaptain,
     awayteamPlayer, awayteamPlayerID, awayteamPlayerNum, isAwayPlayerCaptain, teamColour, isLastItem, bottomSheetRef, OnPlayerModalShown }: LineupPlayerPanelProps) => {

    var playerName = ''
    var playerNumber = ''
    var playerID = ''
    var isCaptain = false;
    if(selectedTeam == 'home')
    {
        playerName = hometeamPlayer;
        playerNumber = hometeamPlayerNum;
        playerID = hometeamPlayerID;
        isCaptain = isHomePlayerCaptain;
    }
    else
    {
        playerName = awayteamPlayer;
        playerNumber = awayteamPlayerNum;
        playerID = awayteamPlayerID;
        isCaptain = isAwayPlayerCaptain;
    }

    const panelBackground = hexToRGB(teamColour, '0.1')

    const handlePresentModalPress = useCallback(() => {

        OnPlayerModalShown(playerName, playerID, selectedTeamDisplayName, teamColour)
        bottomSheetRef.current?.present();
      }, [selectedTeam]);


    if (hometeamPlayer === "Substitutes") {
        return (
            <View style={{flexDirection: 'row', backgroundColor: panelBackground}}>
                <Text style={[lineupPanelStyles.substitutesHeader]}>{playerName.toUpperCase()}</Text>
            </View>
        )
    }
    else {
        return ( 
            <TouchableOpacity onPress={handlePresentModalPress} activeOpacity={0.6} style={[{flexDirection: 'row', backgroundColor: panelBackground, paddingVertical: 8, borderBottomColor: 'grey', borderBottomWidth: 1, marginBottom: isLastItem ? 60: 0}]}>
                <Text style={{fontWeight: 500, paddingHorizontal: 4, fontSize: 11, color: colors.text, width: "8%", textAlign: 'center', fontFamily: fontFamilies.bold}}>
                    {playerNumber}
                </Text>
                <Text style={{fontWeight: 500, paddingHorizontal: 6, fontSize: 12, color: colors.text, textAlign: 'left', width: "92%", fontFamily: fontFamilies.regular}}>
                    {playerName.toUpperCase()} {(isCaptain) ? '(c)' : ''}</Text>
            </TouchableOpacity>
        )
    }
}