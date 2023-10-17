import React from 'react';
import { StyleSheet, View, TextInput, Button, Dimensions } from 'react-native';
import Dialog from "react-native-dialog";

export default function EditSectionDialog({ sectionName, setSectionName, editSectionDialogVisability, setEditSectionDialogVisability, editSection, deleteSection }) {

    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const topForDialog = -screenHeight * 0.2;
    const leftForDialog = -screenWidth * 0.45;

    return (
        <Dialog.Container visible={editSectionDialogVisability} contentStyle={{ width: '90%', position: 'absolute', top: topForDialog, left: leftForDialog, height: screenHeight / 5.4 }}>

            <Dialog.Title>Enter section name:</Dialog.Title>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '6%' }}>
                <TextInput value={sectionName} style={styles.input} textAlign='center' onChangeText={(val) => setSectionName(val)} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{ flex: 1, borderRightWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                    <Button title='Cancel' color={'#027ff9'} onPress={() => {
                        setEditSectionDialogVisability(false);
                        setSectionName('');
                    }} />
                </View>

                <View style={{ flex: 1, borderLeftWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                    <Button title='Delete' color={'red'} onPress={() => {
                        deleteSection();
                    }} />
                </View>

                <View style={{ flex: 1, borderLeftWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                    <Button title='Save' color={'#027ff9'} onPress={() => {
                        editSection(sectionName);
                    }} />
                </View>
            </View>

        </Dialog.Container>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        width: '50%',
        height: 30,
        marginHorizontal: 10,
        borderRadius: 5,
        paddingHorizontal: 4,
    }
})