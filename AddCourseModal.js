import React from 'react';
import { StyleSheet, View, FlatList, Button, Text, TouchableHighlight, Keyboard } from 'react-native';
import Modal from "react-native-modal";
import Input from './Input';
import DialogHeaders from './DialogHeaders';
import GradeComponent from './GradeComponent';
// import { TouchableHighlight } from 'react-native-gesture-handler';


export default function AddCourseModal({ fields, setFields, addDialogVisability, setAddDialogVisability, addHandler }) {

    return (
        <Modal isVisible={addDialogVisability} animationIn={'pulse'} animationInTiming={500} animationOut={'zoomOut'} animationOutTiming={500} useNativeDriverForBackdrop={true} avoidKeyboard statusBarTranslucent>
            < View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.text}>Add course:</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: '15%' }}>
                        <View style={styles.view1}>
                            <Text style={styles.text}>Course Name:</Text>
                            <Text style={styles.text}>Credits:</Text>

                        </View>

                        <View style={styles.view1}>
                            <Input value={fields.name} setFields={setFields} fieldName={"name"} keyboardType='default' />
                            <Input value={fields.credits} setFields={setFields} fieldName={"credits"} keyboardType='numeric' />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '1%' }}>
                        <View style={{ width: '90%', height: 2, backgroundColor: 'black' }} />
                    </View>

                    <DialogHeaders />

                    <FlatList
                        data={fields.gradeComponents}
                        renderItem={({ _, index }) => (<GradeComponent fields={fields} index={index} setFields={setFields} />)}
                        keyExtractor={(_, index) => index}
                        style={{ height: '33%', width: '90%' }}
                    />

                    {/* <IconButton icon="plus" onPress={() => {
                            setFields((prev) => ({ ...prev, gradeComponents: [...(prev.gradeComponents), { name: '', grade: '', percentage: '' }] }));
                        }} /> */}

                    <TouchableHighlight underlayColor={'#4070BD'} style={{ backgroundColor: '#4E89E8', justifyContent: 'center', alignItems: 'center', marginVertical: 10, borderRadius: 20, padding: '2.5%' }} onPress={() => {
                        setFields((prev) => ({ ...prev, gradeComponents: [...(prev.gradeComponents), { name: '', grade: '', percentage: '' }] }));
                    }}>
                        <Text style={{ fontSize: 20 }}>Add Component</Text>
                    </TouchableHighlight>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ flex: 1, borderRightWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                            <Button title='Cancel' color={'#027ff9'} onPress={() => {
                                Keyboard.dismiss();
                                setAddDialogVisability(false);
                                setFields({ name: '', credits: '', gradeComponents: [{ name: '', grade: '', percentage: '' }] });
                            }} />
                        </View>

                        <View style={{ flex: 1, borderLeftWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                            <Button title='Add' color={'#027ff9'} onPress={() => {
                                Keyboard.dismiss();
                                addHandler();
                            }} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal >
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        // top: '10%',
        // left: '10%',
    },
    modalContent: {
        width: '100%',
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
    view1: {
        justifyContent: 'space-evenly'
    },
    view2: {
        justifyContent: 'space-evenly'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,

    }
});
