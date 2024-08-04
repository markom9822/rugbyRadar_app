import { CustomSelectDropdown } from "@/store/components/SelectDropdown"
import { defaultStyles } from "@/styles"
import { View, Text } from "react-native"
import { SearchBar } from "react-native-screens"

const TeamsScreen = () => {
    return <View style={defaultStyles.container}>
        <Text style={defaultStyles.text}>Teams Screen</Text>

        <SearchBar 
        placeholder="Search for Team"/>
        

    </View>
}

export default TeamsScreen