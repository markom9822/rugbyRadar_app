import { fontSize } from "@/constants/tokens"
import { CustomSelectDropdown } from "@/store/components/SelectDropdown"
import { InternationalRugbyTeams } from "@/store/InternationalRugbyTeamsDatabase"
import { PremRugbyTeams } from "@/store/PremiershipRubyTeamsDatabase"
import { Top14RugbyTeams } from "@/store/Top14RugbyTeamsDatabase"
import { URCRugbyTeams } from "@/store/URCRugbyTeamsDatabase"
import { defaultStyles } from "@/styles"
import { useState } from "react"
import { Link } from "expo-router"
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, Image, StyleSheet, Pressable, SectionList } from "react-native"
import { hexToRGB } from "@/store/utils/helpers"

export type SearchTeamInfo = {
    type: string;
    displayName: string;
    abbreviation: string;
    logo: any;
    altLogo: any,
    colour: string;
    id: string;
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

    return(
        filteredItems
    )
    
}

export const filterSectionList = (teamsSections: TeamsSection[], search: string) => {

    var filteredSections = [];
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
    ]

    const [teamSearch, setTeamSearch] = useState<string>('');
    const [searchSections, setSearchSections] = useState<TeamsSection[]>(teamSections);


    const handleOnSearchTextChange = (search: string) => {
        setTeamSearch(search)
        setSearchSections(getFilteredSearchTeams(teamSections, search))
    }

    const sectionHeader = (title: string, data: SearchTeamInfo[]) => {

        if(data.length !== 0)
        {
            return (
                <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                    <Text style={{ fontSize: fontSize.sm, color: 'grey', fontWeight: 300 }}>{title}</Text>
                </View>
            )
        }
        
        return null
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <TextInput
                    style={{ height: 40, margin: 12, borderRadius: 4 , 
                        borderColor: 'grey', borderWidth: 1, padding: 10 }}
                    returnKeyType="search"
                    placeholder="Search teams"
                    onChangeText={(search) => handleOnSearchTextChange(search)}
                    value={teamSearch}

                />

                <SectionList
                    sections={searchSections}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({ item, index }) =>
                        <TeamInfoPanel
                            teamName={item.displayName}
                            teamColour={item.colour}
                            teamLogo={item.logo}
                            teamAltLogo={item.altLogo}
                            teamID={item.id}
                        />}
                    renderSectionHeader={({ section: { title, data } }) => (
                        sectionHeader(title, data)
                    )}
                />

            </View>
        </TouchableWithoutFeedback>
    )
}

type TeamInfoPanelProps = {
    teamName: string,
    teamColour: string,
    teamLogo: any,
    teamAltLogo: any,
    teamID: string,
}

export const TeamInfoPanel = ({ teamName, teamColour, teamLogo, teamAltLogo, teamID }: TeamInfoPanelProps) => {

    const [selected, setSelected] = useState(false);

    const teamBkgRBGA = hexToRGB(teamColour, '0.7')
    const teamBorderRBGA = hexToRGB(teamColour, '0.9')

    const currentTeamLogo = selected ? teamAltLogo : teamLogo;

    return (
        <View style={{ backgroundColor: '#f0f2f0' }}>
            <Link href={`/(tabs)/(teams)/team/${teamID}`} asChild>
                <Pressable onPressIn={() => setSelected(true)} onPressOut={() => setSelected(false)}
                    onBlur={() => setSelected(false)} onHoverOut={() => setSelected(false)}>

                    <View style={[teamInfoPanelStyles.container,
                    { backgroundColor: selected ? teamBkgRBGA : "white", borderColor: selected ? teamBorderRBGA : 'lightgrey', borderWidth: 2 }]}>
                        <View style={{ padding: 5 }}>
                            <Image
                                style={[teamInfoPanelStyles.teamLogo]}
                                source={currentTeamLogo} />
                        </View>
                        <Text style={[teamInfoPanelStyles.teamName, { color: selected ? "white" : "black" }]}>{teamName.toLocaleUpperCase()}</Text>
                    </View>

                </Pressable>
            </Link>

        </View>
    )
}

export const teamInfoPanelStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        textAlign: 'center',
        fontWeight: 600,
        fontSize: 18
    },
})

export default TeamsScreen