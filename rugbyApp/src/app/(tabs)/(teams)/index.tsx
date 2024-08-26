import { fontSize } from "@/constants/tokens"
import { CustomSelectDropdown } from "@/store/components/SelectDropdown"
import { InternationalRugbyTeams } from "@/store/InternationalRugbyTeamsDatabase"
import { PremRugbyTeams } from "@/store/PremiershipRubyTeamsDatabase"
import { Top14RugbyTeams } from "@/store/Top14RugbyTeamsDatabase"
import { URCRugbyTeams } from "@/store/URCRugbyTeamsDatabase"
import { defaultStyles } from "@/styles"
import { useState } from "react"
import { Link } from "expo-router"
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, Image, StyleSheet, Pressable} from "react-native"

export type SearchTeamInfo = {
    type: string;
    displayName: string;
    abbreviation: string;
    logo: any;
    colour: string;
    id: string;
}


const getFilteredSearchTeams = (teamsArray: SearchTeamInfo[], searchValue: string) => {

    //const teamsArray = [...InternationalRugbyTeams, ...URCRugbyTeams, ...PremRugbyTeams, ...Top14RugbyTeams];

    const filteredData = teamsArray.filter(item => {
          return Object.values(item)
            .join('')
            .toLowerCase()
            .includes(searchValue.toLowerCase());
    });

    return (
        filteredData
    )
}

const TeamsScreen = () => {

    const teamsArray = [...InternationalRugbyTeams, ...URCRugbyTeams];;

    const [teamSearch, setTeamSearch] = useState<string>('');
    const [searchArray, setSearchArray] = useState<SearchTeamInfo[]>(teamsArray);


    const handleOnSearchTextChange = (search: string) => {
        setTeamSearch(search)
        setSearchArray(getFilteredSearchTeams(teamsArray, search))
    }
    
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Text style={defaultStyles.text}>Teams Screen</Text>

                <TextInput
                    style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
                    returnKeyType="search"
                    placeholder="Search teams"
                    onChangeText={(search) => handleOnSearchTextChange(search)}
                    value={teamSearch}
                    
                />

                <FlatList data={searchArray}
                    renderItem={({ item, index }) =>
                        <TeamInfoPanel
                        teamName={item.displayName}
                        teamColour={item.colour}
                        teamLogo={item.logo}
                        teamID={item.id}/>}
                />

            </View>
        </TouchableWithoutFeedback>
    )
}

type TeamInfoPanelProps = {
    teamName: string,
    teamColour: string,
    teamLogo: any,
    teamID: string,
}

export const TeamInfoPanel = ({ teamName, teamColour, teamLogo, teamID }: TeamInfoPanelProps) => {

    const [selected, setSelected] = useState(false);

    const teamBkgRBGA = hexToRGB(teamColour, '0.7')
    const teamBorderRBGA = hexToRGB(teamColour, '0.9')


    return (
            <View style={{backgroundColor: '#f0f2f0'}}>
                <Link href={`/(tabs)/(teams)/team/${teamID}`} asChild>
                    <Pressable onPressIn={() => setSelected(true)} onPressOut={() => setSelected(false)} 
                    onBlur={() => setSelected(false)} onHoverOut={() => setSelected(false)}>

                    <View style={[teamInfoPanelStyles.container, 
                        {backgroundColor: selected ? teamBkgRBGA : "white", borderColor: selected ? teamBorderRBGA : 'lightgrey', borderWidth: 2}]}>
                        <View style={{ padding: 5 }}>
                            <Image
                                style={[teamInfoPanelStyles.teamLogo]}
                                source={teamLogo} />
                        </View>
                        <Text style={[teamInfoPanelStyles.teamName, {color: selected ? "white" : "black" }]}>{teamName.toLocaleUpperCase()}</Text>
                    </View>

                    </Pressable>
                </Link>

            </View>
    )
}

export const hexToRGB = (hexValue: string, alpha: string) => {
    const numericValue = parseInt(hexValue.slice(1), 16);
    const r = numericValue >> 16 & 0xFF;
    const g = numericValue >> 8 & 0xFF;
    const b = numericValue & 0xFF;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
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