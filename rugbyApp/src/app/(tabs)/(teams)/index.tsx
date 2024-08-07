import { CustomSelectDropdown } from "@/store/components/SelectDropdown"
import { defaultStyles } from "@/styles"
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native"
import { SearchBar } from "react-native-screens"


const TeamsScreen = () => {


    
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={defaultStyles.container}>
            <Text style={defaultStyles.text}>Teams Screen</Text>

                <TextInput
                    style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
                    returnKeyType="search"
                    placeholder="Search teams"
                />

        </View>
        </TouchableWithoutFeedback>
)
}

export default TeamsScreen