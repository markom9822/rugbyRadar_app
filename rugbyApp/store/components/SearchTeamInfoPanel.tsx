import { SearchTeamInfo } from "@/app/(tabs)/search"
import { fontFamilies } from "@/constants/tokens"
import Entypo from '@expo/vector-icons/Entypo'
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { LinearGradient } from "expo-linear-gradient"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { hexToRGB } from "../utils/helpers"
import { TeamResultsPanel } from "./TeamResultsPanel"
import { TeamSummaryPanel } from "./TeamSummaryPanel"

type SearchTeamInfoPanelProps = {
    teamInfo: SearchTeamInfo,
    //id: string,
    bottomSheetRef: React.RefObject<BottomSheetModal | null>
    currentTimezone: string
}

export const SearchTeamInfoPanel = ({ teamInfo, bottomSheetRef, currentTimezone }: SearchTeamInfoPanelProps) => {

    const teamGradientColour = hexToRGB(teamInfo.colour, '0.5')
    const handleCloseBottomSheet = () => {
        bottomSheetRef.current?.close();
    }

    return (
        <LinearGradient colors={[teamGradientColour, 'transparent']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 0.5 }}
            style={[{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', borderRadius: 12 }]}>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: "100%" }}>
                <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 15, marginVertical: 10 }} onPress={handleCloseBottomSheet}>
                    <View style={{ padding: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <Entypo name="chevron-thin-down" size={20} color="lightgrey" />
                    </View>
                </TouchableOpacity>
            </View>


            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ padding: 5 }}>
                    <Image
                        style={[searchInfoPanelStyles.teamLogo]}
                        source={teamInfo.logo} />
                </View>
                <Text style={[{ color: 'lightgrey', fontFamily: fontFamilies.title, textAlign: 'center', padding: 5 }]}>{teamInfo.displayName}</Text>
            </View>

            <TeamSummaryPanel teamInfo={teamInfo} />
            <TeamResultsPanel teamInfo={teamInfo} currentTimezone={currentTimezone}/>

        </LinearGradient>
    )
}

export const searchInfoPanelStyles = StyleSheet.create({

    teamLogo: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
        minHeight: 70,
        minWidth: 70
    },
})