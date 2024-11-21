import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { getAllFormations, deleteFormation, updateFormation, addFormation } from './api';

// Color Palette
const COLORS = {
  umber: '#85714D',        // Rich, earthy brown
  khaki: '#C3B091',        // Soft, muted tan
  whiteCoffee: '#F5F5F5',  // Soft, off-white with warmth
  darkText: '#2C2C2C',     // Deep charcoal for text
};

const ManageSubjects = ({ navigation }) => {
  const [formations, setFormations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [formationName, setFormationName] = useState('');
  const [formationDuration, setFormationDuration] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const data = await getAllFormations();
        setFormations(data);
      } catch (error) {
        Alert.alert('Error', 'Could not fetch formations');
      }
    };

    fetchFormations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFormation(id);
      setFormations(formations.filter((formation) => formation.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Could not delete formation');
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedFormation = await updateFormation({ 
        ...selectedFormation, 
        nom: formationName, 
        duree: formationDuration 
      });
      setFormations(formations.map((f) => 
        f.id === updatedFormation.id ? updatedFormation : f
      ));
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Could not update formation');
    }
  };

  const handleAdd = async () => {
    try {
      const newFormation = await addFormation({ 
        nom: formationName, 
        duree: formationDuration 
      });
      setFormations([...formations, newFormation]);
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Could not add formation');
    }
  };

  const openModal = (formation = null) => {
    setSelectedFormation(formation);
    setFormationName(formation ? formation.nom : '');
    setFormationDuration(formation ? formation.duree.toString() : '');
    setIsAdding(!formation);
    setModalVisible(true);
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Formation',
      'Are you sure you want to delete this formation?',
      [
        { text: 'Cancel', style: 'cancel', color: COLORS.umber },
        { text: 'Delete', onPress: () => handleDelete(id), style: 'destructive', color: COLORS.umber },
      ]
    );
  };

  const renderFormationItem = ({ item }) => (
    <View style={styles.formationItem}>
      <View style={styles.formationDetails}>
        <Text style={styles.formationName}>{item.nom}</Text>
        <Text style={styles.formationDuration}>{item.duree} months</Text>
      </View>
      <View style={styles.formationActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.modifyButton]} 
          onPress={() => openModal(item)}
        >
          <Text style={styles.actionButtonText}>Modify</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => confirmDelete(item.id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.viewButton]} 
          onPress={() => navigation.navigate('FormationStudents', { formationId: item.id })}
        >
          <Text style={styles.actionButtonText}>Students</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Formations</Text>
      <FlatList
        data={formations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFormationItem}
        contentContainerStyle={styles.listContainer}
      />
      
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => openModal()}
      >
        <Text style={styles.addButtonText}>+ Add Formation</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isAdding ? 'Add Formation' : 'Modify Formation'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Formation Name"
              placeholderTextColor={COLORS.umber}
              value={formationName}
              onChangeText={setFormationName}
            />
            <TextInput
              style={styles.input}
              placeholder="Duration (months)"
              placeholderTextColor={COLORS.umber}
              value={formationDuration}
              onChangeText={setFormationDuration}
              keyboardType="numeric"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={isAdding ? handleAdd : handleUpdate}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteCoffee,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.umber,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  formationItem: {
    backgroundColor: COLORS.khaki,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'column',
    shadowColor: COLORS.umber,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formationDetails: {
    marginBottom: 10,
  },
  formationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkText,
  },
  formationDuration: {
    fontSize: 14,
    color: COLORS.umber,
  },
  formationActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  modifyButton: {
    backgroundColor: COLORS.umber,
  },
  deleteButton: {
    backgroundColor: '#D14444',
  },
  viewButton: {
    backgroundColor: COLORS.khaki,
  },
  actionButtonText: {
    color: COLORS.whiteCoffee,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: COLORS.umber,
    padding: 15,
    alignItems: 'center',
    margin: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: COLORS.whiteCoffee,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: COLORS.whiteCoffee,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.umber,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: COLORS.umber,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: COLORS.darkText,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: COLORS.umber,
  },
  cancelButton: {
    backgroundColor: '#D14444',
  },
  modalButtonText: {
    color: COLORS.whiteCoffee,
    fontWeight: 'bold',
  },
});

export default ManageSubjects;