import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getAllClasses, deleteClass, updateClass, addClass, getAllMatieres, assignMatiereToClass, getMatieresByClass } from './api';

const ManageClasses = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
  const [allMatieres, setAllMatieres] = useState([]); // New state for all available matieres
  const [assignedMatieres, setAssignedMatieres] = useState([]); // New state for class-specific matieres
  const [modalVisible, setModalVisible] = useState(false);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [matieresModalVisible, setMatieresModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedMatiere, setSelectedMatiere] = useState(null);
  const [className, setClassName] = useState('');
  const [classSize, setClassSize] = useState('');
  const [coefMat, setCoefMat] = useState('');
  const [nbrHS, setNbrHS] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchClasses();
    fetchAllMatieres();
  }, []);

  const fetchClasses = async () => {
    try {
      const data = await getAllClasses();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchAllMatieres = async () => {
    try {
      const data = await getAllMatieres();
      setAllMatieres(data);
      if (data.length > 0) {
        setSelectedMatiere(data[0].codMat); // Set initial selected matiere
      }
    } catch (error) {
      console.error('Error fetching matieres:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClass(id);
      setClasses(classes.filter((classe) => classe.codClass !== id));
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedClass = await updateClass({ ...selectedClass, nomClass: className, nbreEtud: classSize });
      setClasses(classes.map((c) => (c.codClass === updatedClass.codClass ? updatedClass : c)));
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const newClass = await addClass({ nomClass: className, nbreEtud: classSize });
      setClasses([...classes, newClass]);
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  const handleAssignMatiere = async () => {
    try {
      await assignMatiereToClass(selectedClass.codClass, selectedMatiere, coefMat, nbrHS);
      // Refresh the assigned matieres for this class
      fetchMatieresForClass(selectedClass.codClass);
      setAssignModalVisible(false);
      setCoefMat('');
      setNbrHS('');
    } catch (error) {
      console.error('Error assigning matiere to class:', error);
    }
  };

  const fetchMatieresForClass = async (classId) => {
    try {
      const data = await getMatieresByClass(classId);
      setAssignedMatieres(data); // Use separate state for assigned matieres
      setMatieresModalVisible(true);
    } catch (error) {
      console.error('Error fetching matieres:', error);
    }
  };

  const openModal = (classe = null) => {
    setSelectedClass(classe);
    setClassName(classe ? classe.nomClass : '');
    setClassSize(classe ? classe.nbreEtud.toString() : '');
    setIsAdding(!classe);
    setModalVisible(true);
  };

  const openAssignModal = (classe) => {
    setSelectedClass(classe);
    if (allMatieres.length > 0) {
      setSelectedMatiere(allMatieres[0].codMat);
    }
    setAssignModalVisible(true);
  };

  const openMatieresModal = (classe) => {
    setSelectedClass(classe);
    fetchMatieresForClass(classe.codClass);
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Class',
      'Are you sure you want to delete this class?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => handleDelete(id) },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.codClass.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nomClass}</Text>
            <Text>{item.nbreEtud} students</Text>
            <Button title="Delete" onPress={() => confirmDelete(item.codClass)} />
            <Button title="Modify" onPress={() => openModal(item)} />
            <Button title="View Students" onPress={() => navigation.navigate('ClassStudents', { classId: item.codClass })} />
            <Button title="Assign Matiere" onPress={() => openAssignModal(item)} />
            <Button title="View Matieres" onPress={() => openMatieresModal(item)} />
          </View>
        )}
      />
      <Button title="Add Class" onPress={() => openModal()} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{isAdding ? 'Add Class' : 'Modify Class'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Class Name"
            value={className}
            onChangeText={setClassName}
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Students"
            value={classSize}
            onChangeText={setClassSize}
            keyboardType="numeric"
          />
          <Button title="Save" onPress={isAdding ? handleAdd : handleUpdate} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={assignModalVisible}
        onRequestClose={() => setAssignModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Assign Matiere to {selectedClass?.nomClass}</Text>
          <Picker
            selectedValue={selectedMatiere}
            style={styles.input}
            onValueChange={(itemValue) => setSelectedMatiere(itemValue)}
          >
            {allMatieres.map((matiere) => (
              <Picker.Item key={matiere.codMat} label={matiere.intMat} value={matiere.codMat} />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Coefficient"
            value={coefMat}
            onChangeText={setCoefMat}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Hours"
            value={nbrHS}
            onChangeText={setNbrHS}
            keyboardType="numeric"
          />
          <Button title="Assign" onPress={handleAssignMatiere} />
          <Button title="Cancel" onPress={() => setAssignModalVisible(false)} />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={matieresModalVisible}
        onRequestClose={() => setMatieresModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Matieres for {selectedClass?.nomClass}</Text>
          <FlatList
            data={assignedMatieres}
            keyExtractor={(item) => item.codMat.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.intMat}</Text>
                <Text>{item.description}</Text>
                <Text>Coefficient: {item.coefMat}</Text>
                <Text>Hours: {item.nbrHS}</Text>
              </View>
            )}
          />
          <Button title="Close" onPress={() => setMatieresModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default ManageClasses;