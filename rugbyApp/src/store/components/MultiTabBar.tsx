import { colors, fontFamilies } from "@/constants/tokens"
import { Text, TouchableOpacity, View } from "react-native"
import { GridView } from "./GridView"

type MultiTabBar = {
    tabsArray: string[]
    OnTabButtonPressed: (key: string) => void,
    currentTabKey: string,
}

export const MultiTabBar = ({ tabsArray, OnTabButtonPressed, currentTabKey }: MultiTabBar) => {

    return (

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GridView
                data={tabsArray}
                col={tabsArray.length}
                renderItem={(item, index) =>
                    <MultiTabButton title={item} OnPressTab={OnTabButtonPressed} isTabSelected={currentTabKey == item} />}
            />
        </View>
    )
}

type MultiTabButton = {
    title: string,
    isTabSelected: boolean,
    OnPressTab: (key: string) => void
}


export const MultiTabButton = ({ title, isTabSelected, OnPressTab }: MultiTabButton) => {

    return (
        <TouchableOpacity style={{ margin: 4 }} activeOpacity={0.8} onPress={() => OnPressTab(title)}>
            <Text style={{
                color: isTabSelected ? colors.text : 'grey', borderBottomColor: colors.text, borderBottomWidth: isTabSelected ? 2 : 0,
                fontFamily: isTabSelected ? fontFamilies.bold : fontFamilies.regular, textAlign: 'center', fontSize: 15, paddingVertical: 2
            }}>{title}</Text>
        </TouchableOpacity>
    )
}