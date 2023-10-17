import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Keyboard, Alert } from 'react-native';
import Tile from './Tile';
import CustomAddDialog from './old/AddDialog';
import CustomEditDialog from './old/EditDialog';
import AppBar from './AppBar';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddCourseModal from './AddCourseModal';
import EditCourseModal from './EditCourseModal';

export default function MainScreen({ sectionName, courses, setCourses, fields, setFields, avg, addDialogVisability, setAddDialogVisability, editDialogVisability, setEditDialogVisability, fieldsBeforeEdit, setFieldsBeforeEdit }) {
    // const [courses, setCourses] = useState([]);
    // const [fields, setFields] = useState({ name: '', credits: '', gradeComponents: [] });
    // const [avg, setAvg] = useState(0);
    // const [addDialogVisability, setAddDialogVisability] = useState(false);
    // const [editDialogVisability, setEditDialogVisability] = useState(false);
    // const [fieldsBeforeEdit, setFieldsBeforeEdit] = useState({ name: '', credits: '', gradeComponents: [] });

    const addHandler = () => {
        Keyboard.dismiss();
        if (fields.gradeComponents.length == 0) {
            Alert.alert("Invalid input", "Must have at least 1 grade component!", [
                { text: "Ok" }
            ]);
        } else if (fields.name.length == 0 || fields.credits.length == 0 || fields.gradeComponents.some(item => item.name.length == 0 || item.grade.length == 0 || item.percentage.length == 0)) {
            Alert.alert("Invalid input", "Fields can't be empty!", [
                { text: "Ok" }
            ]);
        } else if (Number(fields.gradeComponents.reduce((acc, item) => acc + Number(item.percentage), 0)) != 100) {
            Alert.alert("Invalid input", "Percentage must add up to 100%", [
                { text: "Ok" }
            ]);
        } else if (courses.filter(course => (course.name === fields.name)).length != 0) {
            Alert.alert("Invalid input", "Course already exists!", [
                { text: "Ok" }
            ]);
        } else {
            setCourses([...courses, { ...fields }]);
            setAddDialogVisability(false);
            setFields({ name: '', credits: '', gradeComponents: [{ name: '', grade: '', percentage: '' }] });
        }
    }
    const editHandler = () => {
        Keyboard.dismiss();
        if (fields.gradeComponents.length == 0) {
            Alert.alert("Invalid input", "Must have at least 1 grade component!", [
                { text: "Ok" }
            ]);
            //setFields({ ...fieldsBeforeEdit });
        } else if (fields.name.length == 0 || fields.credits.length == 0 || fields.gradeComponents.some(item => item.name.length == 0 || item.grade.length == 0 || item.percentage.length == 0)) {
            Alert.alert("Invalid input", "Fields can't be empty!", [
                { text: "Ok" }
            ]);
            //setFields({ ...fieldsBeforeEdit });
        } else if (Number(fields.gradeComponents.reduce((acc, item) => acc + Number(item.percentage), 0)) != 100) {
            Alert.alert("Invalid input", "Percentage must add up to 100%", [
                { text: "Ok" }
            ]);
            //setFields({ ...fieldsBeforeEdit });
        } else if (courses.filter(course => course.name === fields.name && fields.name !== fieldsBeforeEdit.name).length != 0) {
            Alert.alert("Invalid input", "Course already exists!", [
                { text: "Ok" }
            ]);
            //setFields({ ...fieldsBeforeEdit });
        } else {
            const newCoursesList = courses.map(course => {
                if (course.name === fieldsBeforeEdit.name) {
                    return { ...fields };
                } else {
                    return course;
                }
            });
            setCourses(newCoursesList);

            setEditDialogVisability(false);
            setFields({ name: '', credits: '', gradeComponents: [{ name: '', grade: '', percentage: '' }] });
        }
    }


    const deleteTile = (name) => {
        let newCoursesList = [...courses];
        newCoursesList = newCoursesList.filter(course => course.name !== name);
        setCourses(newCoursesList);
    }

    const switchColor = (avg) => {
        if (avg <= 25) {
            return 'red';
        } else if (avg <= 50) {
            return 'orange';
        } else if (avg <= 75) {
            return '#D3D04F';
        } else {
            return 'green';
        }
    }

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                {/* <CustomAddDialog fields={fields} setFields={setFields} addDialogVisability={addDialogVisability} setAddDialogVisability={setAddDialogVisability} addHandler={addHandler} /> */}
                <AddCourseModal fields={fields} setFields={setFields} addDialogVisability={addDialogVisability} setAddDialogVisability={setAddDialogVisability} addHandler={addHandler} />
                {/* <CustomEditDialog fields={fields} setFields={setFields} editDialogVisability={editDialogVisability} setEditDialogVisability={setEditDialogVisability} editHandler={editHandler} deleteTile={deleteTile} /> */}
                <EditCourseModal fields={fields} setFields={setFields} editDialogVisability={editDialogVisability} setEditDialogVisability={setEditDialogVisability} editHandler={editHandler} deleteTile={deleteTile} />
                <View style={styles.avgWrapper}>
                    <Text style={styles.SectionText}>{sectionName}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.avgText}>average is:  </Text>
                        <Text style={{
                            ...(styles.avgText),
                            color: switchColor(avg),
                            // textShadowColor: 'black',
                            // textShadowOffset: { width: 2, height: 2 },
                            // textShadowRadius: 1
                        }}>{avg}</Text>
                    </View>
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={courses}
                        renderItem={({ item }) => (<Tile item={item} setFields={setFields} setEditDialogVisability={setEditDialogVisability} setFieldsBeforeEdit={setFieldsBeforeEdit} />)}
                        keyExtractor={item => item.name}
                        scrollIndicatorInsets={{ right: 1}}
                    />
                </View>
                <StatusBar style="auto" />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#F6F4EB',
        backgroundColor: '#FFEADD',
        alignItems: 'center',
    },
    list: {
        flex: 1,
        marginBottom: 10,
        width: '100%',
    },
    SectionText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        writingDirection: "ltr",
    },
    avgText: {
        fontWeight: "bold",
        fontSize: 28,
        textAlign: "center",
        writingDirection: "ltr",
    },
    avgWrapper: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#ECF8F9",
        overflow: "hidden",
        borderWidth: 3,
        borderRadius: 15,
        padding: 10,
    },
});