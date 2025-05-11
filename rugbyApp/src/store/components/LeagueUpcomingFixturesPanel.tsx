import { fontFamilies, fontSize } from "@/constants/tokens"
import { Text, View } from "react-native"
import { hexToRGB } from "../utils/helpers"

type LeagueUpcomingFixturesPanelProps = {
    leagueName: string,
}

export const LeagueUpcomingFixturesPanel = ({ leagueName }: LeagueUpcomingFixturesPanelProps) => {

    const panelColour = hexToRGB("#4d4b4b", '0.6')

    return (
        <View style={{ width: "100%", marginVertical: 10 }}>

            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.regular, textAlign: 'center' }}>Upcoming Fixtures</Text>
            </View>

            <View style={{ backgroundColor: panelColour, paddingVertical: 10, paddingHorizontal: 4, borderRadius: 5, marginHorizontal: 15 }}>

                <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: fontSize.xs }}>Not currently available</Text>

            </View>
        </View>
    )
}