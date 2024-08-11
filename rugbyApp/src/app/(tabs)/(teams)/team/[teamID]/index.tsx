import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const TeamSummary = () => {

    const {teamID} = useLocalSearchParams();

    return(
        <View>
            <Text>Team Name</Text>
            <Text>Team ID {teamID}</Text>
        </View>
    )


}



export default TeamSummary;