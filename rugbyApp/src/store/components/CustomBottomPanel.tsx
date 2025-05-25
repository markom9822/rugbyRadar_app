import { colors, fontFamilies } from "@/constants/tokens";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { AllLeaguesIcon } from "../Icons/Icons";
import { BALionsLogo } from "../InternationalTeamLogos/InternationalTeams";
import { AutumnNationsLogo, ChallengeCupLogo, ChampionsCupAltLogo, PacificNationsCupLogo, PremiershipAltLogo, RugbyChampLogo, SixNationsLogo, SuperRugbyLogo, Top14Logo, U20SixNationsLogo, U20WorldChampsLogo, URCLogo, WorldCupLogo } from "../LeagueLogos/LeagueLogos";
import { CarouselPanel } from "./Carousel";

export type CarouselData = {

    title: string
    value: string
    image: any
}

export const carouselData: CarouselData[] = [
    {
        title: "All Leagues",
        value: "all",
        image: AllLeaguesIcon,
    },
    {
        title: "URC",
        value: "urc",
        image: URCLogo,
    },
    {
        title: "Premiership",
        value: "prem",
        image: PremiershipAltLogo,
    },
    {
        title: "Top 14",
        value: "top14",
        image: Top14Logo
    },
    {
        title: "Super Rugby",
        value: "superRugby",
        image: SuperRugbyLogo
    },
    {
        title: "Champions Cup",
        value: "championsCup",
        image: ChampionsCupAltLogo
    },
    {
        title: "Challenge Cup",
        value: "challengeCup",
        image: ChallengeCupLogo
    },
    {
        title: "Six Nations",
        value: "sixNations",
        image: SixNationsLogo
    },
    {
        title: "U20 Six Nations",
        value: "u20SixNations",
        image: U20SixNationsLogo
    },
    {
        title: "Rugby Championship",
        value: "rugbyChamp",
        image: RugbyChampLogo
    },
    {
        title: "Rugby World Cup",
        value: "rugbyWorldCup",
        image: WorldCupLogo
    },
    {
        title: "U20 Championship",
        value: "u20Championship",
        image: U20WorldChampsLogo
    },
    {
        title: "Pacific Nations Cup",
        value: "pacificNationsCup",
        image: PacificNationsCupLogo
    },
    {
        title: "Autumn Nations Series",
        value: "autumnNations",
        image: AutumnNationsLogo
    },
    {
        title: "Lions Tour",
        value: "BILTour",
        image: BALionsLogo
    },
]

type CustomBottomPanelProps = {
    panelOpen: boolean,
    setPanelOpenState: (panelOpen: boolean) => void,
    handleLeagueChosen: (leagueValue: string) => void,
    handleDefaultLeagueSet: (leagueValue: string) => void,
    translateY: SharedValue<number>
}

export const CustomBottomPanel = ({ panelOpen, setPanelOpenState, handleLeagueChosen, handleDefaultLeagueSet, translateY }: CustomBottomPanelProps) => {

    const [paginationIndex, setPaginationIndex] = useState(0)

    const handleClose = () => {
        translateY.value = 300;
        setPanelOpenState(false)
    };

    const animatedTranslateStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: withTiming(translateY.value) }],
    }));

    const backgroundAnimatedTranslateStyles = useAnimatedStyle(() => ({
        opacity: withTiming(panelOpen ? 1 : 0, { duration: 400 })
    }));

    const handlePressedConfirmButton = () => {
        handleLeagueChosen(carouselData[paginationIndex].value)
        handleClose()
    }

    return (
        <Animated.View style={[styles.backdrop, { zIndex: panelOpen ? 20 : -1 }, backgroundAnimatedTranslateStyles]}>

            <Animated.View style={[styles.bottomSheet, animatedTranslateStyles, { backgroundColor: "#2b2a2a" }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: "100%", height: "20%" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: colors.text, textAlign: 'center', fontFamily: fontFamilies.bold }}>Choose League</Text>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} onPress={handleClose} style={{ position: 'absolute', right: 0, backgroundColor: colors.background, borderRadius: 15, padding: 5, margin: 4 }}>
                        <AntDesign name="close" size={20} color="lightgrey" />
                    </TouchableOpacity>
                </View>

                <CarouselPanel setCurrentIndex={setPaginationIndex} handleDefaultLeagueSet={handleDefaultLeagueSet} currentIndex={paginationIndex} itemList={carouselData} />

                <View style={{ marginVertical: 10, flexDirection: 'row' }}>

                    <TouchableOpacity onPress={handlePressedConfirmButton} activeOpacity={0.7} style={{ backgroundColor: colors.background, borderRadius: 15, padding: 5, margin: 4 }}>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.regular, paddingVertical: 2, paddingHorizontal: 6 }}>Confirm</Text>
                    </TouchableOpacity>
                </View>

            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        width: "100%",
        height: "100%",
        justifyContent: 'flex-end'
    },

    bottomSheet: {
        width: "100%",
        height: "45%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,

    }
})