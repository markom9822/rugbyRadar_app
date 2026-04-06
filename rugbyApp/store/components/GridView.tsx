import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';

interface GridViewProps<T> {
    data: T[];
    renderItem(item: T, index: number): JSX.Element;
    col?: number
}

export const GridView = <T extends any>(props: GridViewProps<T>) => {
    const { data, renderItem, col = 2 } = props;

    // Guard against null/undefined data which might cause map to fail or return 0
    if (!data || !Array.isArray(data)) return null;

    return (
        <View style={styles.container}>{data.map((item, index) => (
            <View key={index} style={{ width: `${100 / col}%` }}>
                {renderItem(item, index)}
            </View>
        ))}</View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
})