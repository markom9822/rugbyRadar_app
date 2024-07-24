import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native"


const MatchDetails = () => {

    const {id} = useLocalSearchParams();

    return(
        <View>
            <Text>Match Details: {id}</Text>
        </View>
    )
}

export default MatchDetails;