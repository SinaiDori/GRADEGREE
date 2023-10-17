import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, TouchableHighlight, Keyboard } from 'react-native';
import Modal from "react-native-modal";
import Checkbox from 'expo-checkbox';

export default function MergeSectionsModal({ sections, sectionName, setSectionName, mergeSectionsDialogVisability, setMergeSectionsDialogVisability, addMergedSection }) {
    const [isChecked, setIsChecked] = useState(sections.map(section => false));
    return (
        <Modal isVisible={mergeSectionsDialogVisability} animationIn={'pulse'} animationInTiming={500} animationOut={'zoomOut'} animationOutTiming={500} useNativeDriverForBackdrop={true} avoidKeyboard statusBarTranslucent >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.text}>Enter section name:</Text>
                    <TextInput
                        autoComplete="off"
                        autoCorrect={false}
                        spellCheck={false}
                        value={sectionName}
                        style={styles.input}
                        textAlign='center'
                        onChangeText={(val) => setSectionName(val)}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '2%' }}>
                        <View style={{ width: '95%', height: 1, backgroundColor: 'gray' }} />
                    </View>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Select sections to merge:</Text>

                    <FlatList
                        data={sections}
                        renderItem={({ _, index }) => (
                            <TouchableHighlight
                                onPress={() => {
                                    setIsChecked((prev) => {
                                        let temp = [...prev];
                                        temp[index] = !temp[index];
                                        return temp;
                                    });
                                }}
                                underlayColor={'transparent'}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: 200, justifyContent: 'flex-start' }}>
                                    <Checkbox value={isChecked[index]} onValueChange={() => {
                                        setIsChecked((prev) => {
                                            let temp = [...prev];
                                            temp[index] = !temp[index];
                                            return temp;
                                        });
                                    }}
                                        style={{ width: 25, height: 25, marginVertical: 6 }}
                                    />
                                    <Text style={{ fontSize: 20, marginLeft: 10 }}>{sections[index].name}</Text>
                                </View>
                            </TouchableHighlight>
                        )}
                        keyExtractor={(_, index) => index}
                        style={{ height: '33%', width: '95%' }}
                        contentContainerStyle={{ alignItems: 'center' }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ flex: 1, borderRightWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                            <Button title='Cancel' color={'#027ff9'} onPress={() => {
                                Keyboard.dismiss();
                                setMergeSectionsDialogVisability(false);
                                setSectionName('');
                                setIsChecked(sections.map(section => false));
                            }} />
                        </View>

                        <View style={{ flex: 1, borderLeftWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                            <Button title='Create' color={'#027ff9'} onPress={() => {
                                Keyboard.dismiss();
                                addMergedSection(sectionName, isChecked, setIsChecked);
                            }} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: '3%',
        alignItems: 'center',
    },
    input: {
        borderWidth: 2,
        width: '75%',
        height: 30,
        marginVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 4,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});
