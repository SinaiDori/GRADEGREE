import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Tile({ item, setFields, setEditDialogVisability, setFieldsBeforeEdit }) {
    return (

        <Pressable style={{ alignItems: 'center' }} onPress={() => {
            setFields({ name: item.name, credits: item.credits, gradeComponents: item.gradeComponents });
            setFieldsBeforeEdit({ name: item.name, credits: item.credits, gradeComponents: item.gradeComponents });
            setEditDialogVisability(true);
        }}>
            <View style={styles.view}>
                <View style={styles.row}>
                    <Text numberOfLines={5} style={styles.item}>Course Name: {item.name}</Text>
                    <Text style={styles.item}> Credits: {item.credits} </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 5 }}>
                    <View style={{ width: '100%', height: 1, backgroundColor: 'black' }} />
                </View>

                {item.gradeComponents.map(gradeComponent => (
                    <View key={gradeComponent.name} style={styles.row}>
                        <Text style={styles.item}>{gradeComponent.name}</Text>
                        <Text style={styles.item}>Grade: {gradeComponent.grade}</Text>
                        <Text style={styles.item}>{gradeComponent.percentage}%</Text>
                    </View>
                ))}

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 2,
        borderStyle: "solid",
        backgroundColor: "#FFDCB6",
        borderRadius: 10,
        maxWidth: '95%',
        padding: 10,
        marginBottom: 7,
    },
    row: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    item: {
        textAlign: "center",
        flex: 1,
        fontWeight: "bold",
        fontSize: 18,
    }
})