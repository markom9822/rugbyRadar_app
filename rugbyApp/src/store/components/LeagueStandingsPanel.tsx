import { fontFamilies } from "@/constants/tokens"
import { Text, View } from "react-native"
import { hexToRGB } from "../utils/helpers"

type LeagueStandingsPanelProps = {

}

export const LeagueStandingsPanel = ({ }: LeagueStandingsPanelProps) => {

    const panelColour = hexToRGB("#4d4b4b", '0.8')

    return (
        <View style={{ width: "100%", marginVertical: 10 }}>

            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.regular, textAlign: 'center' }}>Standings</Text>
            </View>

            <View style={{ backgroundColor: panelColour, paddingVertical: 6, paddingHorizontal: 4, borderRadius: 5, marginHorizontal: 15 }}>


            </View>
        </View>
    )
}