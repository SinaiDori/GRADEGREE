import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function GradeComponent({ fields, index, setFields }) {

    return (
        <View style={{ flexDirection: 'row', marginBottom: '1%', marginHorizontal: '3%', alignItems: 'center' }}>
            <TextInput autoComplete="off" autoCorrect={false} spellCheck={false} value={fields.gradeComponents[index].name} keyboardType='default' placeholder='Test, MidTerm, HW...' style={{ ...styles.input, width: '50%', marginLeft: 0 }} onChangeText={(val) => {
                const updatedFields = JSON.parse(JSON.stringify(fields));
                updatedFields.gradeComponents[index].name = val;
                setFields(updatedFields);
            }} />
            <TextInput autoComplete="off" autoCorrect={false} spellCheck={false} value={fields.gradeComponents[index].grade} keyboardType='numeric' placeholder='Grade' style={{ ...styles.input, width: '18%', }} onChangeText={(val) => {
                const updatedFields = JSON.parse(JSON.stringify(fields));
                updatedFields.gradeComponents[index].grade = val;
                setFields(updatedFields);
            }} />
            <TextInput autoComplete="off" autoCorrect={false} spellCheck={false} value={fields.gradeComponents[index].percentage} keyboardType='numeric' placeholder='%' style={{ ...styles.input, width: '18%', marginRight: '-2%' }} onChangeText={(val) => {
                const updatedFields = JSON.parse(JSON.stringify(fields));
                updatedFields.gradeComponents[index].percentage = val;
                setFields(updatedFields);
            }} />
            <IconButton size={30} icon="delete" onPress={() => {
                setFields((prev) => {
                    const updatedFields = JSON.parse(JSON.stringify(prev));
                    updatedFields.gradeComponents.splice(index, 1);
                    return updatedFields;
                });
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        height: '75%',
        marginHorizontal: '1%',
        borderRadius: 5,
        paddingHorizontal: '1.5%',
    }
})