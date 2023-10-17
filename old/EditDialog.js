import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Dimensions } from 'react-native';
import Dialog from "react-native-dialog";
import Input from '../Input';
import GradeComponent from '../GradeComponent';
import { IconButton } from 'react-native-paper';
import DialogHeaders from '../DialogHeaders';
import useKeyboardHeight from 'react-native-use-keyboard-height';

export default function CustomEditDialog({ fields, setFields, editDialogVisability, setEditDialogVisability, editHandler, deleteTile }) {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const topForDialog = -screenHeight * 0.375;
    const leftForDialog = -screenWidth * 0.45;
    const keyboardHeight = useKeyboardHeight();
    const dialogHeight = keyboardHeight > 0 ? (screenHeight * 0.85) - keyboardHeight : screenHeight * 0.68;

    return (
        <Dialog.Container visible={editDialogVisability} contentStyle={{ width: '90%', position: 'absolute', top: topForDialog, left: leftForDialog, height: dialogHeight }}>
            <Dialog.Title>Edit course details</Dialog.Title>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 100 }}>
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

            {/* <View style={{ alignItems: 'center' }}>
                {fields.gradeComponents.map((item, index) => (
                    <GradeComponent
                        key={index}
                        fields={fields}
                        index={index}
                        setFields={setFields}
                    />
                ))}
            </View> */}

            <FlatList
                data={fields.gradeComponents}
                renderItem={({ _, index }) => (

                    <GradeComponent fields={fields} index={index} setFields={setFields} />
                )}
                keyExtractor={(_, index) => index}
                style={{ height: 200 }}
            />

            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                <IconButton icon="plus" onPress={() => {
                    setFields((prev) => ({ ...prev, gradeComponents: [...(prev.gradeComponents), { name: '', grade: '', percentage: '' }] }));
                }} />

            </View>

            {/* <Dialog.Button label="Cancel" onPress={() => {
                setEditDialogVisability(false);
                setFields({ name: '', credits: '', gradeComponents: [] });
            }} />
            <Dialog.Button label="Delete" style={{ color: 'red' }} onPress={() => {
                Alert.alert("Wait...", "Are you sure you want to delete this course?", [
                    { text: "No" },
                    {
                        text: "Yes", onPress: () => {
                            setFields({ name: '', credits: '', gradeComponents: [] });
                            deleteTile(fields.name);
                            setEditDialogVisability(false);
                        }
                    }
                ]);
            }} />
            <Dialog.Button label="save" onPress={() => {
                editHandler();
            }} /> */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{ flex: 1, borderRightWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                    <Button title='Cancel' color={'#027ff9'} onPress={() => {
                        setEditDialogVisability(false);
                        setFields({ name: '', credits: '', gradeComponents: [] });
                    }} />
                </View>

                <View style={{ flex: 1, borderRightWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                    <Button title='Delete' color={'red'} onPress={() => {
                        Alert.alert("Wait...", "Are you sure you want to delete this course?", [
                            { text: "No" },
                            {
                                text: "Yes", onPress: () => {
                                    setFields({ name: '', credits: '', gradeComponents: [] });
                                    deleteTile(fields.name);
                                    setEditDialogVisability(false);
                                }
                            }
                        ]);
                    }} />
                </View>

                <View style={{ flex: 1, borderLeftWidth: 0.5, borderTopWidth: 1, borderColor: '#e0e0e5', paddingVertical: '1%' }}>
                    <Button title='Save' color={'#027ff9'} onPress={() => {
                        editHandler();
                    }} />
                </View>
            </View>


        </Dialog.Container >
    );
}

const styles = StyleSheet.create({
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
})