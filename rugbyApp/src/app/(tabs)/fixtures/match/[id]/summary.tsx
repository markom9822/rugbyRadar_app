import { View, Text } from "react-native"
import { useGlobalSearchParams } from "expo-router";


const summary = () => {
    const {id} = useGlobalSearchParams();

    return(
        <View>
            <Text>Summary Page: {id}</Text>
        </View>
    )
}

export default summary;