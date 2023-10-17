import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, View, Image } from 'react-native';


export default function AppBar({ navigation, setAddDialogVisability }) {
    return (
        // 1st try of tha appBar - no success of margin the plus icon without the title moving (and thus not being centered)

        // <Appbar.Header style={{ backgroundColor: '#9BCDD2' }} >
        //     <Appbar.Action isLeading={true} icon='menu' onPress={() => { }}></Appbar.Action>
        //     <Appbar.Content title='CampusScore' titleStyle={{ fontWeight: 'bold', fontSize: 30 }}></Appbar.Content>
        //     <Appbar.Action icon='plus' style={{ backgroundColor: 'white' }} onPress={() => setAddDialogVisability(true)}></Appbar.Action>
        // </Appbar.Header>

        //#FFEADD
        //#9BCDD2
        <Appbar.Header style={{ backgroundColor: '#FFEADD' }} >
            <Appbar.Action isLeading={true} icon='menu' onPress={() => navigation.openDrawer()}></Appbar.Action>
            {/* zIndex of the View is -1, that makes the View to be "before" the menu icon component, so that the menu icon will be pressable  */}
            <View style={[StyleSheet.absoluteFill, { alignItems: "center", justifyContent: "center", zIndex: -1 },]}>
                {/* To avoid the top crop of the title, instead of passing a string, we are passing a Text component */}
                <Appbar.Content
                    //<Text style={{ fontWeight: 'bold', fontSize: 30 }}>GRADEGREE</Text>
                    title={<Image source={require('./gradegree-new.png')} style={{ resizeMode: 'contain', height: '50%' }} />}
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                </Appbar.Content>
            </View>
            <View style={{ flex: 1 }} />

            {/* Icons List: https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/MaterialCommunityIcons.json */}
            <Appbar.Action icon='plus' size={18} color='black' style={{ borderWidth: 1, borderColor: 'black', backgroundColor: '#ECF8F9', marginRight: '4%' }} onPress={() => setAddDialogVisability(true)}></Appbar.Action>
        </Appbar.Header >
    );
}