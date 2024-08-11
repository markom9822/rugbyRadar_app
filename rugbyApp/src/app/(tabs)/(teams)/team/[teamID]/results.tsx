
import { useGlobalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const TeamResults = () => {

    const {teamID} = useGlobalSearchParams();


    return(
        <View>
            <Text>Team Results</Text>
            <Text>Team ID: {teamID}</Text>
        </View>
    )


}



export default TeamResults;