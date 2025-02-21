import { fontFamilies } from "@/constants/tokens"
import { Text, View } from "react-native"
import { hexToRGB } from "../utils/helpers"

type LeagueKnockoutsPanelProps = {
    leagueName: string,
    seasonYear: string,
    showKnockouts: boolean,

}

export const LeagueKnockoutsPanel = ({ leagueName, seasonYear, showKnockouts }: LeagueKnockoutsPanelProps) => {

    if (!showKnockouts) {
        return (
            <View style={{ width: "100%", marginVertical: 10, marginBottom: 60 }}></View>
        )
    }

    const panelColour = hexToRGB("#4d4b4b", '0.6')

    return (
        <View style={{ width: "100%", marginVertical: 10, marginBottom: 60 }}>

            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.regular, textAlign: 'center' }}>Knockouts {seasonYear}</Text>
            </View>

            <View style={{ backgroundColor: panelColour, paddingVertical: 10, paddingHorizontal: 4, borderRadius: 5, marginHorizontal: 15 }}>


            </View>
        </View>
    )
}