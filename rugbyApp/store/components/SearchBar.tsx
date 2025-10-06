import { colors, fontFamilies } from "@/constants/tokens"
import Ionicons from '@expo/vector-icons/Ionicons'
import { TextInput, View } from "react-native"
import { hexToRGB } from "../utils/helpers"

type SearchBarProps = {
    searchValue: string,
    OnChangeSearch: (search: string) => void,
}


export const SearchBar = ({ searchValue, OnChangeSearch }: SearchBarProps) => {

    const searchBarBkgColour = hexToRGB("#4d4b4b", '0.7')

    return (
        <View style={{
            marginHorizontal: 5, borderRadius: 12,
            height: 40, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: searchBarBkgColour
        }}>
            <View style={{ width: "6%", justifyContent: 'center', alignContent: 'center', marginHorizontal: 6 }}>
                <Ionicons name="search-sharp" size={24} color="grey" />
            </View>

            <TextInput
                style={{
                    padding: 10, color: colors.text, fontFamily: fontFamilies.light, alignItems: 'center', width: "95%"
                }}
                returnKeyType="search"
                placeholder="Search teams"
                placeholderTextColor={colors.text}
                cursorColor={'lightgrey'}
                onChangeText={(search) => OnChangeSearch(search)}
                value={searchValue}
            />

        </View>
    )
}