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


const getFilteredSearchTeams = (searchValue: string) => {

    //const teamsArray = [...InternationalRugbyTeams, ...URCRugbyTeams, ...PremRugbyTeams, ...Top14RugbyTeams];
    const teamsArray = [...InternationalRugbyTeams, ...URCRugbyTeams];;

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
    const [teamSearch, setTeamSearch] = useState<string>('');
    const [searchArray, setSearchArray] = useState<SearchTeamInfo[]>([]);


    const handleOnSearchTextChange = (search: string) => {
        setTeamSearch(search)
        setSearchArray(getFilteredSearchTeams(search))
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
                        teamLogo={item.logo}
                        teamID={item.id}/>}
                />

            </View>
        </TouchableWithoutFeedback>
    )
}

type TeamInfoPanelProps = {
    teamName: string,
    teamLogo: any,
    teamID: string,

}


export const TeamInfoPanel = ({ teamName, teamLogo, teamID }: TeamInfoPanelProps) => {

    return (
        <TouchableWithoutFeedback onPress={() => { }}>
            <View>
                <Link href={`/(tabs)/(teams)/team/${teamID}`} asChild>
                    <Pressable>

                    <View style={[teamInfoPanelStyles.container]}>


                        <View style={{ padding: 5 }}>
                            <Image
                                style={[teamInfoPanelStyles.teamLogo]}
                                source={teamLogo} />
                        </View>
                        <Text style={[teamInfoPanelStyles.teamName]}>{teamName}</Text>
                    </View>

                    </Pressable>
                </Link>

            </View>
        </TouchableWithoutFeedback>
    )
}

export const teamInfoPanelStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 5,
      margin: 3, 
      borderColor: 'grey', 
      borderWidth: 1,
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
        fontWeight: 500,
        fontSize: fontSize.base
    },
  })

export default TeamsScreen