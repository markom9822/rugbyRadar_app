import { View, Text } from "react-native"
import { useGlobalSearchParams } from "expo-router";


const stats = () => {
    const {id} = useGlobalSearchParams();

    return(
        <View>
            <Text>Stats Page: {id}</Text>
        </View>
    )
}

export default stats;