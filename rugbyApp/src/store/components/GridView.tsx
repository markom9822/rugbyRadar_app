import { StyleSheet, View } from 'react-native';

interface GridViewProps<T> {
    data: T[];
    renderItem(item: T, index: number): JSX.Element;
    col?: number
}

export const GridView = <T extends any>(props: GridViewProps<T>) => {

    const { data, renderItem, col = 2 } = props

    return <View style={styles.container}>
        {data.map((item, index) => {
            return <View key={index} style={{ width: `${100 / col}%` }}>
                {renderItem(item, index)}
            </View>
        })}
    </View>


}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

})