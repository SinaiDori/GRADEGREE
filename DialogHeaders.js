import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DialogHeaders() {
    return (
        <View style={{ flexDirection: 'row', marginTop: '3%', marginBottom: '1%' }}>
            <Text style={{ ...(styles.text) }}>Type</Text>
            <Text style={{ ...(styles.text), marginLeft: '15.5%' }}>Grade</Text>
            <Text style={{ ...(styles.text), marginLeft: '7%' }}>%</Text>
            <View style={{}}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 20,

    }
})