import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, Keyboard } from 'react-native';
import Modal from "react-native-modal";

export default function AddSectionModal({ sectionName, setSectionName, addSectionDialogVisability, setAddSectionDialogVisability, addSection }) {

    return (
        <Modal isVisible={addSectionDialogVisability} animationIn={'pulse'} animationInTiming={500} animationOut={'zoomOut'} animationOutTiming={500} useNativeDriverForBackdrop={true} statusBarTranslucent >
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
                                setAddSectionDialogVisability(false);
                                setSectionName('');
                            }} />
                        </View>

                        <View style={{ flex: 1, borderLeftWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                            <Button title='Add' color={'#027ff9'} onPress={() => {
                                Keyboard.dismiss();
                                addSection(sectionName);
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
