import { SearchLeagueInfo } from "@/app/(tabs)/teams"
import { fontFamilies } from "@/constants/tokens"
import Entypo from '@expo/vector-icons/Entypo'
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { LinearGradient } from "expo-linear-gradient"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { hexToRGB } from "../utils/helpers"

type SearchLeagueInfoPanelProps = {
    leagueInfo: SearchLeagueInfo,
    //id: string,
    bottomSheetRef: React.RefObject<BottomSheetModal>
}

export const SearchLeagueInfoPanel = ({ leagueInfo, bottomSheetRef }: SearchLeagueInfoPanelProps) => {

    const fadedGreyColour = hexToRGB('#a4a6a6', '0.8');
    const teamGradientColour = hexToRGB(leagueInfo.colour, '0.4')

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
                        source={leagueInfo.logo} />
                </View>
                <Text style={[{ color: 'lightgrey', fontFamily: fontFamilies.bold, textAlign: 'center', padding: 5 }]}>{leagueInfo.displayName}</Text>
            </View>

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