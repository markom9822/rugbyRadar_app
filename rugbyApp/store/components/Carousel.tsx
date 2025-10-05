import { fontFamilies } from "@/constants/tokens"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useCallback, useEffect, useRef, useState } from "react"
import { Dimensions, FlatList, Image, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SharedValue, useSharedValue } from "react-native-reanimated"
import { getItem } from "../utils/asyncStorage"
import { hexToRGB } from "../utils/helpers"
import { CarouselData } from "./CustomBottomPanel"
import { Pagination } from "./Pagination"


type CarouselProps = {
    itemList: CarouselData[],
    currentIndex: number,
    setCurrentIndex: (index: number) => void,
    handleDefaultLeagueSet: (leagueValue: string) => void,

}

export const CarouselPanel = ({ itemList, currentIndex, setCurrentIndex, handleDefaultLeagueSet }: CarouselProps) => {

    const scrollX = useSharedValue(0);
    const [data, setData] = useState(itemList)

    const onViewCallBack = useCallback((viewableItems: any) => {

        if (viewableItems.viewableItems[0].index !== undefined) {
            setCurrentIndex(viewableItems.viewableItems[0].index)
        }

    }, [])
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })

    return (
        <View style={{ alignItems: 'center', height: "45%" }}>

            <FlatList
                data={data}
                renderItem={({ item, index }) => <CarouselItem item={item} index={index} isLastItem={index == itemList.length - 1} scrollX={scrollX}
                    handleDefaultLeagueSet={handleDefaultLeagueSet} />}

                horizontal={true}
                snapToAlignment={"center"}
                decelerationRate={0.9}
                scrollEventThrottle={16}

                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                onViewableItemsChanged={onViewCallBack}
                viewabilityConfig={viewConfigRef.current}
            />

            <Pagination paginationIndex={currentIndex} items={itemList} />

        </View>
    )
}


type CarouselItemProps = {
    item: CarouselData,
    index: number,
    isLastItem: boolean,
    scrollX: SharedValue<number>,
    handleDefaultLeagueSet: (leagueValue: string) => void,

}

const { width } = Dimensions.get('window')

const SPACING = 5;
const ITEM_LENGTH = width * 0.5; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 10;

export const CarouselItem = ({ item, index, scrollX, isLastItem, handleDefaultLeagueSet }: CarouselItemProps) => {

    const leagueButtonColour = hexToRGB("#4d4b4b", '0.8')

    const [isButtonHighligted, setIsButtonHighlighted] = useState<boolean>(false);

    async function updateButtonState() {
        const currentDefaultLeague = await getItem('defaultLeague');
        setIsButtonHighlighted(currentDefaultLeague == item.value);
    }

    useEffect(() => {
        updateButtonState()
    })

    const handlePressButton = async () => {

        const currentDefaultLeague = await getItem('defaultLeague');
        if (currentDefaultLeague != item.value) {
            handleDefaultLeagueSet(item.value);
            setIsButtonHighlighted(true);
        }
    }


    return (
        <View style={[{ width: ITEM_LENGTH, marginLeft: index == 0 ? ITEM_LENGTH * 0.42 : 0, marginRight: isLastItem ? ITEM_LENGTH * 0.42 : 0 }]}>
            <View style={{ marginHorizontal: SPACING * 3, alignItems: 'center', backgroundColor: leagueButtonColour, borderRadius: BORDER_RADIUS + SPACING * 2, padding: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8 }}>
                    <Image source={item.image} style={{ resizeMode: 'contain', width: 60, height: 60, minHeight: 60, minWidth: 60 }} />
                </View>

                <View style={{ position: 'absolute', right: 10, top: 10 }}>
                    <TouchableOpacity onPress={handlePressButton} activeOpacity={0.7}>
                        <FontAwesome name={isButtonHighligted ? "star" : "star-o"} size={24} color="lightgrey" />
                    </TouchableOpacity>
                </View>

                <Text numberOfLines={1} style={{ color: 'lightgrey', textAlign: 'center', fontFamily: fontFamilies.bold }}>{item.title}</Text>
            </View>
        </View>
    )

}