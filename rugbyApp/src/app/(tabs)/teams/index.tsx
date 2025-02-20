import { colors, fontFamilies } from "@/constants/tokens"
import { GridView } from "@/store/components/GridView"
import { SearchInfoPanel } from "@/store/components/SearchInfoPanel"
import { InternationalRugbyTeams } from "@/store/InternationalRugbyTeamsDatabase"
import { InternationalLogo, PremiershipAltLogo, SuperRugbyAltLogo, Top14AltLogo, URCAltLogo } from "@/store/LeagueLogos/LeagueLogos"
import { PremRugbyTeams } from "@/store/PremiershipRubyTeamsDatabase"
import { SuperRugbyTeams } from "@/store/SuperRugbyPacificRugbyTeamsDatabase"
import { Top14RugbyTeams } from "@/store/Top14RugbyTeamsDatabase"
import { URCRugbyTeams } from "@/store/URCRugbyTeamsDatabase"
import { hexToRGB } from "@/store/utils/helpers"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { LinearGradient } from "expo-linear-gradient"
import { useCallback, useRef, useState } from "react"
import { Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"

export type SearchTeamInfo = {
    type: string;
    displayName: string;
    abbreviation: string;
    logo: any;
    altLogo: any;
    colour: string;
    id: string;
    defaultLeague: string;
    foundedYear: string;
    seasonType: string;
}

export type TeamsSection = {
    title: string;
    data: SearchTeamInfo[];
};

export const filterTeams = (teamArray: SearchTeamInfo[], searchString: string) => {

    const filteredItems = teamArray.filter(item => {
        return Object.values(item.displayName)
            .join('')
            .toLowerCase()
            .includes(searchString.toLowerCase());
    });

    return (
        filteredItems
    )

}

export const filterSectionList = (teamsSections: TeamsSection[], search: string) => {

    var filteredSections = [];

    if (search == "") {
        return []
    }

    for (let index = 0; index < teamsSections.length; index++) {

        let newSection = {
            title: teamsSections[index].title,
            data: filterTeams(teamsSections[index].data, search)
        }

        filteredSections.push(newSection)
    }

    return (
        filteredSections
    )
}


const getFilteredSearchTeams = (teamSections: TeamsSection[], searchValue: string) => {

    const filteredSections = filterSectionList(teamSections, searchValue)

    return (
        filteredSections
    )
}

const TeamsScreen = () => {

    const teamSections = [
        {
            title: 'International',
            data: InternationalRugbyTeams,
        },
        {
            title: 'United Rugby Championship',
            data: URCRugbyTeams,
        },
        {
            title: 'Premiership',
            data: PremRugbyTeams,
        },
        {
            title: 'Top 14',
            data: Top14RugbyTeams,
        },
        {
            title: 'Super Rugby',
            data: SuperRugbyTeams,
        },
    ]

    const teamLeagueLogos = [
        { displayName: 'United Rugby Championship', leagueLogo: URCAltLogo },
        { displayName: 'Premiership', leagueLogo: PremiershipAltLogo },
        { displayName: 'Top 14', leagueLogo: Top14AltLogo },
        { displayName: 'Super Rugby', leagueLogo: SuperRugbyAltLogo },
        { displayName: 'International', leagueLogo: InternationalLogo },
    ];

    const [teamSearch, setTeamSearch] = useState<string>('');
    const [searchSections, setSearchSections] = useState<TeamsSection[]>([]);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)
    const [currentIndex, setCurrentIndex] = useState<number>(0);


    const getLeagueLogoFromDisplayName = (displayName: string) => {

        const result = teamLeagueLogos.find((element) => element.displayName == displayName)
        return result
    }

    const handleOnSearchTextChange = (search: string) => {
        setTeamSearch(search)
        setSearchSections(getFilteredSearchTeams(teamSections, search))
    }

    // renders
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const snapPoints = ["100%"];

    const handlePresentModalPress = (id: string, index: number) => {

        //setCurrentID(linkID)
        setCurrentIndex(index)
        bottomSheetModalRef.current?.present();
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>

                <TextInput
                    style={{
                        height: 40, margin: 12, borderRadius: 4,
                        borderColor: 'grey', borderWidth: 1, padding: 10, color: colors.text, fontFamily: fontFamilies.light
                    }}
                    returnKeyType="search"
                    placeholder="Search teams"
                    placeholderTextColor={colors.text}
                    cursorColor={'lightgrey'}
                    onChangeText={(search) => handleOnSearchTextChange(search)}
                    value={teamSearch}
                />


                <ScrollView>
                    <View style={{ marginBottom: 50 }}>

                        <GridView
                            data={URCRugbyTeams}
                            col={3}
                            renderItem={(item, index) =>
                                <GridSearchPanel
                                    title={item.abbreviation}
                                    colour={item.colour}
                                    logo={item.logo}
                                    altLogo={item.altLogo}
                                    id={item.id}
                                    index={index}
                                    OnPress={handlePresentModalPress} />
                            }
                        />
                    </View>
                </ScrollView>

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    enableDynamicSizing={false}
                    enableOverDrag={false}
                    backdropComponent={renderBackdrop}
                    handleComponent={null}
                    handleIndicatorStyle={{ backgroundColor: 'lightgrey', width: "10%" }}
                    backgroundStyle={{ backgroundColor: "#0d0c0c" }}
                >
                    <BottomSheetView style={{ flex: 1 }}>
                        <SearchInfoPanel
                            teamInfo={URCRugbyTeams[currentIndex]}
                            bottomSheetRef={bottomSheetModalRef}
                        />
                    </BottomSheetView>
                </BottomSheetModal>

            </View>
        </TouchableWithoutFeedback>
    )
}

type GridSearchPanelProps = {
    title: string,
    colour: string,
    logo: any,
    altLogo: any,
    id: string,
    index: number,
    OnPress: (id: string, index: number) => void

}

export const GridSearchPanel = ({ title, colour, logo, altLogo, id, index, OnPress }: GridSearchPanelProps) => {

    const bkgRBGA = hexToRGB(colour, '0.1')
    const borderRBGA = hexToRGB(colour, '0.4')

    const panelColour = hexToRGB("#4d4b4b", '0.5')

    const handlePressedScorePanel = () => {

        OnPress(id, index)
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={handlePressedScorePanel}>
            <LinearGradient colors={[bkgRBGA, 'transparent']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }}
                style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5, backgroundColor: panelColour, borderRadius: 6, borderColor: 'grey', borderWidth: 0.5 }}>
                <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={[teamInfoPanelStyles.teamLogo]}
                        source={logo} />
                </View>
                <View style={{ padding: 5 }}>
                    <Text style={[{ color: 'lightgrey', fontFamily: fontFamilies.bold }]}>{title}</Text>
                </View>

            </LinearGradient>

        </TouchableOpacity>
    )
}

export const teamInfoPanelStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5,
        margin: 3,
        borderRadius: 4
    },
    teamLogo: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        minHeight: 50,
        minWidth: 50,
    },
    teamName: {
        paddingHorizontal: 10,
        textAlign: 'left',
        fontWeight: 600,
        fontSize: 18,
        fontFamily: fontFamilies.bold
    },
})

export default TeamsScreen