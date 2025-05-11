import { colors, fontFamilies } from "@/constants/tokens"
import { Image, Text, View } from "react-native"
import { RugbyRadarIconWhite } from "../Icons/Icons"

type StandingsHeaderBannerProps = {

}

export const StandingsHeaderBanner = ({ }: StandingsHeaderBannerProps) => {

    return (

        <View style={{ flexDirection: 'row', height: "10%", alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: "60%", paddingHorizontal: 5 }}>
                <View style={{ padding: 4 }}>
                    <Image
                        style={{
                            resizeMode: 'contain',
                            width: 50,
                            height: 50,
                            minHeight: 50,
                            minWidth: 50
                        }}
                        source={RugbyRadarIconWhite} />
                </View>

                <View>
                    <Text style={{ fontFamily: fontFamilies.bold, fontSize: 20, color: colors.text }}>Rugby Radar</Text>
                </View>
            </View>
        </View>
    )
}