import { colors, fontFamilies } from "@/constants/tokens"
import { Text, TouchableOpacity, View } from "react-native"
import { hexToRGB } from "../utils/helpers"
import { GridView } from "./GridView"

type MultiTabBar = {
    tabsArray: string[]
    OnTabButtonPressed: (key: string) => void,
    currentTabKey: string,
    tabFontSize?: number,
}

export const MultiTabBar = ({ tabsArray, OnTabButtonPressed, currentTabKey, tabFontSize = 15 }: MultiTabBar) => {

    const tabBkgColour = hexToRGB("#4d4b4b", '0.5')

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: tabBkgColour, marginHorizontal: 3, borderRadius: 18 }}>
            <GridView
                data={tabsArray}
                col={tabsArray.length}
                renderItem={(item, index) =>
                    <MultiTabButton title={item} OnPressTab={OnTabButtonPressed} isTabSelected={currentTabKey == item} tabFontSize={tabFontSize} />}
            />
        </View>
    )
}

type MultiTabButton = {
    title: string,
    isTabSelected: boolean,
    tabFontSize: number
    OnPressTab: (key: string) => void
}


export const MultiTabButton = ({ title, isTabSelected, OnPressTab, tabFontSize }: MultiTabButton) => {

    const tabPanelColour = hexToRGB("#292828", '0.6')

    return (
        <TouchableOpacity style={{ marginVertical: 6, marginHorizontal: 4 }} activeOpacity={0.8} onPress={() => OnPressTab(title)}>
            <Text numberOfLines={1} style={{
                color: isTabSelected ? colors.text : 'lightgrey', backgroundColor: isTabSelected ? tabPanelColour : 'transparent', borderRadius: 12,
                fontFamily: isTabSelected ? fontFamilies.bold : fontFamilies.regular, textAlign: 'center', fontSize: tabFontSize, paddingVertical: 3, paddingHorizontal: 3,
            }}>{title}</Text>
        </TouchableOpacity>
    )
}