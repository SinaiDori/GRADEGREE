import 'react-native-gesture-handler'; //! needs to be first!
import { DrawerItem, createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';

// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { Keyboard, Alert } from 'react-native';
import AppBar from './AppBar';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MainScreen from './MainScreen';

import { IconButton } from 'react-native-paper';
import AddSectionModal from './AddSectionModal';
import EditSectionModal from './EditSectionModal';
import MergeSectionsModal from './MergeSectionsModal';

// import * as SplashScreen from "expo-splash-screen";

const Drawer = createDrawerNavigator();

export default function App() {
  // const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([{ name: 'Year 1 semester A', courses: [], avg: 0 }]);
  const [fields, setFields] = useState({ name: '', credits: '', gradeComponents: [{ name: '', grade: '', percentage: '' }] });
  const [sectionName, setSectionName] = useState('');
  // const [avg, setAvg] = useState(0);
  const [addDialogVisability, setAddDialogVisability] = useState(false);
  const [editDialogVisability, setEditDialogVisability] = useState(false);
  const [addSectionDialogVisability, setAddSectionDialogVisability] = useState(false);
  const [editSectionDialogVisability, setEditSectionDialogVisability] = useState(false);
  const [mergeSectionsDialogVisability, setMergeSectionsDialogVisability] = useState(false);
  const [editSectionIndex, setEditSectionIndex] = useState(-1);
  const [fieldsBeforeEdit, setFieldsBeforeEdit] = useState({ name: '', credits: '', gradeComponents: [] });

  const addSection = (name) => {
    Keyboard.dismiss();
    if (name.length == 0) {
      Alert.alert("Invalid input", "Name can't be empty!", [
        { text: "Ok" }
      ]);
    }
    else if (sections.filter(section => (section.name === name)).length != 0) {
      Alert.alert("Invalid input", "Section already exists!", [
        { text: "Ok" }
      ]);
    } else {
      setSections((prevSections) => {
        const newSections = [...prevSections];
        newSections.push({ name: name, courses: [], avg: 0 });
        return newSections;
      });
      setAddSectionDialogVisability(false);
      setSectionName('');
    }
  }

  const editSection = (name) => {
    Keyboard.dismiss();
    if (name.length == 0) {
      Alert.alert("Invalid input", "Name can't be empty!", [
        { text: "Ok" }
      ]);
    }
    else if (sections.filter((section, index) => section.name === name && index !== editSectionIndex).length != 0) {
      Alert.alert("Invalid input", "Section already exists!", [
        { text: "Ok" }
      ]);
    } else {
      setSections((prevSections) => {
        const newSections = [...prevSections];
        newSections[editSectionIndex].name = name;
        return newSections;
      });
      setEditSectionDialogVisability(false);
      setSectionName('');
    }
  }

  const deleteSection = () => {
    Keyboard.dismiss();
    if (sections.length == 1) {
      Alert.alert("Invalid action", "Must have at least 1 section!", [
        { text: "Ok" }
      ]);
    } else {
      Alert.alert("Wait...", "Are you sure you want to delete this section?", [
        { text: "No" },
        {
          text: "Yes", onPress: () => {
            setSections((prevSections) => {
              const newSections = [...prevSections];
              newSections.splice(editSectionIndex, 1);
              return newSections;
            });
            setEditSectionDialogVisability(false);
            setSectionName('');
          }
        }
      ]);
    }
  }

  // function to calc and save the avg of a specific course in a section
  const avgCalcSpecificCourse = (course) => {
    let tempGradeComponentSum = 0;
    for (let gradeComponent of course.gradeComponents) {
      tempGradeComponentSum += (Number(gradeComponent.grade) * Number(gradeComponent.percentage) / 100);
    }
    course.avg = tempGradeComponentSum.toFixed(2);
    return course.avg;
  }

  const avgCalcSpecificSection = (section) => {
    let courses = section.courses;
    if (courses.length == 0) {
      section.avg = 0;
    } else {
      let creditsSum = 0;
      let gradesSum = 0;
      for (let course of courses) {
        creditsSum += Number(course.credits);

        gradesSum += avgCalcSpecificCourse(course) * Number(course.credits);
      }
      section.avg = (gradesSum / creditsSum).toFixed(2);
    }
  }

  const avgCalc = () => {
    const newSections = [...sections];
    newSections.forEach(section => {
      avgCalcSpecificSection(section);
    }
    );
    setSections(newSections);
  }

  const save = async () => {
    try {
      await AsyncStorage.setItem("sections", JSON.stringify(sections));
    } catch (err) {
      Alert.alert("Error", err.toString(), [{ text: "understood" }]);
    }
  }

  const load = async () => {
    try {
      let sections = await AsyncStorage.getItem("sections");
      if (sections !== null) {
        setSections(JSON.parse(sections));
      } else {
        console.log("null");
      }
    } catch (err) {
      Alert.alert("Error", err.toString(), [{ text: "understood" }]);
    }
  }

  const setCoursesInSection = (courses, sectionName) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      const index = newSections.findIndex(section => section.name === sectionName);
      newSections[index].courses = courses;
      return newSections;
    });
  }

  const addMergedSection = (name, isChecked, setIsChecked) => {
    Keyboard.dismiss();
    if (name.length == 0) {
      Alert.alert("Invalid input", "Name can't be empty!", [
        { text: "Ok" }
      ]);
    }
    else if (sections.filter(section => (section.name === name)).length != 0) {
      Alert.alert("Invalid input", "Section already exists!", [
        { text: "Ok" }
      ]);
    } else if (isChecked.filter(val => val).length < 2) {
      Alert.alert("Invalid action", "Must select at least 2 sections!", [
        { text: "Ok" }
      ]);
    } else {
      let courses = [];
      isChecked.forEach((val, index) => {
        if (val) {
          sections[index].courses.forEach(course => {
            courses.push(course);
          });
        }
      });
      setSections((prevSections) => {
        const newSections = [...prevSections];
        newSections.push({ name: name, courses: courses, avg: 0 });
        avgCalcSpecificSection(newSections[newSections.length - 1]);
        return newSections;
      });
      setMergeSectionsDialogVisability(false);
      setSectionName('');
      setIsChecked(sections.map(section => false));
    }
  }

  useEffect(() => {
    async function loadSections() {
      await load();
    }
    loadSections();
  }, []);

  // // state for keeping the splash screen visible
  // const [appIsReady, setAppIsReady] = useState(false);

  // useEffect(() => {
  //   async function prepare() {
  //     // Keep the splash screen visible
  //     await SplashScreen.preventAutoHideAsync();

  //     setAppIsReady(true);
  //   }
  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     // Hide the splash screen
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }

  useEffect(() => {
    async function calcAvgAndSaveSections() {
      avgCalc();
      await save();
    }
    calcAvgAndSaveSections();
  }, [JSON.stringify(sections.map(section => section.courses))]);

  return (
    <NavigationContainer>
      {/* <AddSectionDialog sectionName={sectionName} setSectionName={setSectionName} addSectionDialogVisability={addSectionDialogVisability} setAddSectionDialogVisability={setAddSectionDialogVisability} addSection={addSection} /> */}
      <AddSectionModal sectionName={sectionName} setSectionName={setSectionName} addSectionDialogVisability={addSectionDialogVisability} setAddSectionDialogVisability={setAddSectionDialogVisability} addSection={addSection} />
      {/* <EditSectionDialog sectionName={sectionName} setSectionName={setSectionName} editSectionDialogVisability={editSectionDialogVisability} setEditSectionDialogVisability={setEditSectionDialogVisability} editSection={editSection} deleteSection={deleteSection} /> */}
      <EditSectionModal sectionName={sectionName} setSectionName={setSectionName} editSectionDialogVisability={editSectionDialogVisability} setEditSectionDialogVisability={setEditSectionDialogVisability} editSection={editSection} deleteSection={deleteSection} />
      <MergeSectionsModal sections={sections} sectionName={sectionName} setSectionName={setSectionName} mergeSectionsDialogVisability={mergeSectionsDialogVisability} setMergeSectionsDialogVisability={setMergeSectionsDialogVisability} addMergedSection={addMergedSection} />
      <Drawer.Navigator

        screenOptions={({ navigation }) => ({

          header: () => {
            return (
              <AppBar navigation={navigation} setAddDialogVisability={setAddDialogVisability} />
            );
          },

          drawerLabelStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: '-15%',
            // color: 'black',
          },

          drawerInactiveTintColor: 'black',

        })}

        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Add Section" labelStyle={{ paddingLeft: '30%', color: 'green', fontWeight: 'bold', fontSize: 20 }} onPress={() => {
                setAddSectionDialogVisability(true);
              }} />
              <DrawerItem label="Merge Sections" labelStyle={{ paddingLeft: '22%', color: 'purple', fontWeight: 'bold', fontSize: 20 }} onPress={() => {
                setMergeSectionsDialogVisability(true);
              }} />
            </DrawerContentScrollView>
          )
        }}
      >

        {/* Screen without arguments: */}
        {/* <Drawer.Screen name="MainScreen" component={MainScreen} /> */}

        {/* Screen with arguments: (https://stackoverflow.com/questions/50432116/how-to-pass-props-to-component-inside-a-react-navigation-navigator) */}

        {sections.map((section, index) => {
          return (
            <Drawer.Screen key={index} name={section.name} options={{
              drawerIcon: ({ focused, size }) => (
                <IconButton
                  icon="pencil"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                  onPress={() => {
                    setEditSectionIndex(index);
                    setSectionName(section.name);
                    setEditSectionDialogVisability(true);
                  }}

                  style={{ position: "absolute", right: '3%', zIndex: 2 }}
                />
              ),
            }}>
              {() => (<MainScreen
                sectionName={section.name}
                courses={section.courses}
                setCourses={(courses) => {
                  setCoursesInSection(courses, section.name);
                }}
                fields={fields}
                setFields={setFields}
                avg={section.avg}
                addDialogVisability={addDialogVisability}
                setAddDialogVisability={setAddDialogVisability}
                editDialogVisability={editDialogVisability}
                setEditDialogVisability={setEditDialogVisability}
                fieldsBeforeEdit={fieldsBeforeEdit}
                setFieldsBeforeEdit={setFieldsBeforeEdit}
              // onLayoutRootView={onLayoutRootView}
              />)}
            </Drawer.Screen>
          );
        })}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}