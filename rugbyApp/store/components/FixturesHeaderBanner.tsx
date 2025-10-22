import { colors, fontFamilies } from "@/constants/tokens"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { RugbyRadarIconWhite } from "../Icons/Icons"
import { hexToRGB } from "../utils/helpers"
import { useRouter } from 'expo-router';
import { getRugbyEventInfoFromValue } from "../RugbyLeaguesDatabase"

type FixturesHeaderBannerProps = {
    currentLeague: string,
}

export const FixturesHeaderBanner = ({ currentLeague }: FixturesHeaderBannerProps) => {

    const chooseLeagueButtonColour = hexToRGB("#4d4b4b", '0.6');
    const router = useRouter();

    const currentEventImage = getRugbyEventInfoFromValue(currentLeague)?.logo;

    return (

        <View style={{ flexDirection: 'row', height: "10%", alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: "60%", paddingHorizontal: 5 }}>
                <View style={{ padding: 4 }}>
                    <Image
                        style={{
                            resizeMode: 'contain',
                            width: 36,
                            height: 36,
                            minHeight: 36,
                            minWidth: 36
                        }}
                        source={RugbyRadarIconWhite} />
                </View>

                <View>
                    <Text style={{ fontFamily: fontFamilies.title, fontSize: 16, color: colors.text }}>Rugby Radar</Text>
                </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-end', width: "40%", paddingHorizontal: 10 }}>
                <TouchableOpacity style={{ padding: 5, backgroundColor: chooseLeagueButtonColour, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }} onPress={() => router.navigate('/modal')}>
                    <View style={{ padding: 4, backgroundColor: chooseLeagueButtonColour, marginHorizontal: 3, borderRadius: 4 }}>
                        <Image source={currentEventImage} style={{ resizeMode: 'contain', height: 20, width: 20, minHeight: 20, minWidth: 20 }} />
                    </View>
                    <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.regular, fontSize: 13 }}>Choose League</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}