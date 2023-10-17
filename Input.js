import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function Input({ value, setFields, fieldName, keyboardType }) {
    return (
        <TextInput
            autoComplete="off"
            autoCorrect={false}
            spellCheck={false}

            value={value}
            style={styles.input}
            onChangeText={(val) => {
                setFields((prev) => ({ ...prev, [fieldName]: val }));
            }} keyboardType={keyboardType} />
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 17,
        borderWidth: 2,
        width: 150,
        height: 30,
        marginHorizontal: 10,
        borderRadius: 5,
        paddingHorizontal: 4,
    }
})