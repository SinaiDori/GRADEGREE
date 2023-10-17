import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, Keyboard } from 'react-native';
import Modal from "react-native-modal";

export default function EditSectionModal({ sectionName, setSectionName, editSectionDialogVisability, setEditSectionDialogVisability, editSection, deleteSection }) {

    return (
        <Modal isVisible={editSectionDialogVisability} animationIn={'pulse'} animationInTiming={500} animationOut={'zoomOut'} animationOutTiming={500} useNativeDriverForBackdrop={true} statusBarTranslucent>
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
                        placeholder='Year # semester #'
                        onChangeText={(val) => setSectionName(val)}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ flex: 1, borderRightWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                            <Button title='Cancel' color={'#027ff9'} onPress={() => {
                                Keyboard.dismiss();
                                setEditSectionDialogVisability(false);
                                setSectionName('');
                            }} />
                        </View>

                        <View style={{ flex: 1, borderLeftWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                            <Button title='Delete' color={'red'} onPress={() => {
                                Keyboard.dismiss();
                                deleteSection();
                            }} />
                        </View>

                        <View style={{ flex: 1, borderLeftWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                            <Button title='Save' color={'#027ff9'} onPress={() => {
                                Keyboard.dismiss();
                                editSection(sectionName);
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
        width: '90%',
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
