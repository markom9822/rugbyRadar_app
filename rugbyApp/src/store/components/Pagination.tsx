import { View } from "react-native"
import { CarouselData } from "./CustomBottomPanel"

type PaginationProps = {
    items: CarouselData[],
    paginationIndex: number,
}

export const Pagination = ({ items, paginationIndex }: PaginationProps) => {

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {items.map((_, index) => {

                return (
                    <View key={index} style={[{ backgroundColor: paginationIndex === index ? "lightgrey" : "grey", height: 8, width: 8, marginHorizontal: 2, borderRadius: 8 }]} />
                )
            })}

        </View>
    )
}