// ModifyStudent.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

const ModifyStudent = ({ route, navigation }) => {
  const { student } = route.params;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: student.id,
    nom: student.nom || '',
    prenom: student.prenom || '',
    dateNais: student.dateNais ? new Date(student.dateNais) : new Date(),
    formation: student.formation?.id || '',
    classe: student.classe?.codClass || ''
  });

  const [formations, setFormations] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchFormationsAndClasses();
  }, []);

  const fetchFormationsAndClasses = async () => {
    try {
      const [formationsRes, classesRes] = await Promise.all([
        axios.get('http://10.0.2.2:8084/formation/all'),
        axios.get('http://10.0.2.2:8084/class/all')
      ]);
      setFormations(formationsRes.data);
      setClasses(classesRes.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data');
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.nom || !formData.prenom) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put('http://10.0.2.2:8084/etudiant/update', {
        ...formData,
        dateNais: moment(formData.dateNais).format('YYYY-MM-DD'),
        formation: { id: formData.formation },
        classe: { codClass: formData.classe }
      });

      if (response.data) {
        Alert.alert('Success', 'Student updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update student');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, dateNais: selectedDate }));
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Modify Student</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>First Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.nom}
          onChangeText={(text) => setFormData(prev => ({ ...prev, nom: text }))}
          placeholder="Enter first name"
        />

        <Text style={styles.label}>Last Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.prenom}
          onChangeText={(text) => setFormData(prev => ({ ...prev, prenom: text }))}
          placeholder="Enter last name"
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{moment(formData.dateNais).format('DD-MM-YYYY')}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={formData.dateNais}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />
        )}

        <Text style={styles.label}>Formation</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.formation}
            onValueChange={(itemValue) =>
              setFormData(prev => ({ ...prev, formation: itemValue }))
            }>
            <Picker.Item label="Select Formation" value="" />
            {formations.map(formation => (
              <Picker.Item 
                key={formation.id} 
                label={formation.nom} 
                value={formation.id} 
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Class</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.classe}
            onValueChange={(itemValue) =>
              setFormData(prev => ({ ...prev, classe: itemValue }))
            }>
            <Picker.Item label="Select Class" value="" />
            {classes.map(classe => (
              <Picker.Item 
                key={classe.codClass} 
                label={classe.nomClass} 
                value={classe.codClass} 
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Update Student</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  dateButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    overflow: 'hidden',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModifyStudent;
