import { colors, fontFamilies } from "@/constants/tokens"
import { lineupPanelStyles } from "@/styles"
import { useCallback } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { getFirstName, getLastName, hexToRGB } from "../utils/helpers"
import { useRouter } from 'expo-router';
import { BottomSheetModal } from "@gorhom/bottom-sheet"

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
    bottomSheetRef: React.RefObject<BottomSheetModal | null>
    OnPlayerModalShown: (playerName: string, playerID: string, teamName: string, teamColour: string) => void
}


export const LineupPlayerPanel = ({ selectedTeam, selectedTeamDisplayName, hometeamPlayer, hometeamPlayerID, hometeamPlayerNum, isHomePlayerCaptain,
    awayteamPlayer, awayteamPlayerID, awayteamPlayerNum, isAwayPlayerCaptain, teamColour, isLastItem, bottomSheetRef, OnPlayerModalShown }: LineupPlayerPanelProps) => {

    const router = useRouter();

    let playerName = ''
    let playerNumber = ''
    let playerID = ''
    let isCaptain = false;
    if (selectedTeam === 'home') {
        playerName = hometeamPlayer;
        playerNumber = hometeamPlayerNum;
        playerID = hometeamPlayerID;
        isCaptain = isHomePlayerCaptain;
    }
    else {
        playerName = awayteamPlayer;
        playerNumber = awayteamPlayerNum;
        playerID = awayteamPlayerID;
        isCaptain = isAwayPlayerCaptain;
    }

    const handlePresentModalPress = useCallback(async () => {

        console.info("pressed")

        //bottomSheetRef.current?.present();

        bottomSheetRef.current?.close();

        await OnPlayerModalShown(playerName, playerID, selectedTeamDisplayName, teamColour)

        router.navigate("/playerModal")


    }, [selectedTeam]);

    const displayPlayerName = (playerName: string, isCaptain: boolean) => {

        const playerFirstName = getFirstName(playerName);
        const playerLastName = getLastName(playerName);

        return (
            <View style={{ flexDirection: 'row', paddingHorizontal: 6 }}>
                <Text style={{ fontSize: 13, color: hexToRGB('#FFFFFF', '0.6'), fontFamily: fontFamilies.title, paddingHorizontal: 2 }}>
                    {playerFirstName.toUpperCase()}</Text>

                <Text style={{ fontSize: 13, color: colors.text, fontFamily: fontFamilies.title, paddingHorizontal: 2 }}>
                    {playerLastName.toUpperCase()}</Text>
            </View>
        )
    }


    if (hometeamPlayer === "Substitutes") {
        return (
            <View style={{ flexDirection: selectedTeam === "home" ? 'row' : 'row-reverse', justifyContent: 'flex-start', backgroundColor: 'transparent', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                <Text style={[lineupPanelStyles.substitutesHeader]}>{playerName.toUpperCase()}</Text>
            </View>
        )
    }
    else {
        return (
            <TouchableOpacity onPress={handlePresentModalPress} activeOpacity={0.6} style={[{ flexDirection: selectedTeam === "home" ? 'row' : 'row-reverse', justifyContent: 'flex-start',
             backgroundColor: 'transparent', paddingVertical: 8, borderBottomColor: 'grey', borderBottomWidth: 0.5 }]}>
                <Text style={{ paddingHorizontal: 4, fontSize: 11, color: 'lightgrey', width: "8%", textAlign: 'center', fontFamily: fontFamilies.bold }}>
                    {playerNumber}
                </Text>
                {displayPlayerName(playerName, isCaptain)}
            </TouchableOpacity>
        )
    }
}