import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import { getAllMatieres, addMatiere, deleteMatiere, updateMatiere, getClassesByMatiere } from './api'; // Adjust the import path as needed

const ManageMatieres = () => {
  const [matieres, setMatieres] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMatiere, setCurrentMatiere] = useState({ intMat: '', description: '' });
  const [classes, setClasses] = useState([]);
  const [classesModalVisible, setClassesModalVisible] = useState(false);

  useEffect(() => {
    fetchMatieres();
  }, []);

  const fetchMatieres = async () => {
    try {
      const data = await getAllMatieres();
      setMatieres(data);
    } catch (error) {
      console.error('Error fetching matieres:', error);
    }
  };

  const fetchClassesByMatiere = async (matiereId) => {
    try {
      const data = await getClassesByMatiere(matiereId);
      setClasses(data);
      setClassesModalVisible(true);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleAddMatiere = async () => {
    try {
      await addMatiere(currentMatiere);
      fetchMatieres();
      setModalVisible(false);
      setCurrentMatiere({ intMat: '', description: '' });
    } catch (error) {
      console.error('Error adding matiere:', error);
    }
  };

  const handleUpdateMatiere = async () => {
    try {
      await updateMatiere(currentMatiere);
      fetchMatieres();
      setModalVisible(false);
      setCurrentMatiere({ intMat: '', description: '' });
    } catch (error) {
      console.error('Error updating matiere:', error);
    }
  };

  const handleDeleteMatiere = async (id) => {
    try {
      await deleteMatiere(id);
      fetchMatieres();
    } catch (error) {
      console.error('Error deleting matiere:', error);
    }
  };

  const openModal = (matiere = { intMat: '', description: '' }) => {
    setCurrentMatiere(matiere);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Matieres</Text>
      <FlatList
        data={matieres}
        keyExtractor={(item) => item.codMat.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.intMat}</Text>
            <Text>{item.description}</Text>
            <Button title="Edit" onPress={() => openModal(item)} />
            <Button title="Delete" onPress={() => handleDeleteMatiere(item.codMat)} />
            <Button title="View Classes" onPress={() => fetchClassesByMatiere(item.codMat)} />
          </View>
        )}
      />
      <Button title="Add Matiere" onPress={() => openModal()} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Matiere Name"
            value={currentMatiere.intMat}
            onChangeText={(text) => setCurrentMatiere({ ...currentMatiere, intMat: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={currentMatiere.description}
            onChangeText={(text) => setCurrentMatiere({ ...currentMatiere, description: text })}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={currentMatiere.codMat ? handleUpdateMatiere : handleAddMatiere}
          >
            <Text style={styles.buttonText}>{currentMatiere.codMat ? 'Update' : 'Add'} Matiere</Text>
          </TouchableOpacity>
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={classesModalVisible}
        onRequestClose={() => setClassesModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.title}>Classes</Text>
          <FlatList
            data={classes}
            keyExtractor={(item) => item.codClass.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.nomClass}</Text>
              </View>
            )}
          />
          <Button title="Close" onPress={() => setClassesModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ManageMatieres;
