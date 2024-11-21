import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet,  Alert } from 'react-native';
import { addStudent, getAllClasses, getAllFormations } from './api'; // Adjust the import path as needed
import {Picker} from '@react-native-picker/picker';
const AddStudent = ({ navigation }) => {
  const [studentName, setStudentName] = useState('');
  const [studentSurname, setStudentSurname] = useState('');
  const [studentDOB, setStudentDOB] = useState('');
  const [studentFormation, setStudentFormation] = useState('');
  const [studentClasse, setStudentClasse] = useState('');
  const [classes, setClasses] = useState([]);
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classesData = await getAllClasses();
        const formationsData = await getAllFormations();
        setClasses(classesData);
        setFormations(formationsData);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch classes or formations');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      const newStudent = await addStudent({ 
        nom: studentName, 
        prenom: studentSurname, 
        dateNais: studentDOB, 
        formation: { id: studentFormation }, 
        classe: { codClass: studentClasse } 
      });
      Alert.alert('Success', 'Student added successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add student');
      console.error('Error adding student:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Student</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={studentName}
        onChangeText={setStudentName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={studentSurname}
        onChangeText={setStudentSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (DD-MM-YYYY)"
        value={studentDOB}
        onChangeText={setStudentDOB}
      />
      <Picker
        selectedValue={studentFormation}
        style={styles.picker}
        onValueChange={(itemValue) => setStudentFormation(itemValue)}
      >
        <Picker.Item label="Select Formation" value="" />
        {formations.map((formation) => (
          <Picker.Item key={formation.id} label={formation.nom} value={formation.id} />
        ))}
      </Picker>
      <Picker
        selectedValue={studentClasse}
        style={styles.picker}
        onValueChange={(itemValue) => setStudentClasse(itemValue)}
      >
        <Picker.Item label="Select Class" value="" />
        {classes.map((classe) => (
          <Picker.Item key={classe.codClass} label={classe.nomClass} value={classe.codClass} />
        ))}
      </Picker>
      <Button title="Save" onPress={handleAdd} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
});

export default AddStudent;
