import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Alert, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  ActivityIndicator,
  RefreshControl 
} from 'react-native';
import axios from 'axios';
import moment from 'moment'; // Add this for date formatting

const ManageStudents = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://10.0.2.2:8084/etudiant/all');
      setStudents(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch students');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this student?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`http://10.0.2.2:8084/etudiant/delete?id=${id}`);
              setStudents(students.filter(student => student.id !== id));
              Alert.alert('Success', 'Student deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete student');
              console.error('Error deleting student:', error);
            }
          }
        }
      ]
    );
  };

  const modifyStudent = (student) => {
    navigation.navigate('ModifyStudent', { student });
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return moment(date).format('DD-MM-YYYY');
  };

  const renderItem = ({ item }) => (
    <View style={styles.studentContainer}>
      <View style={styles.studentInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.labelText}>ID:</Text>
          <Text style={styles.studentId}>#{item.id}</Text>
        </View>
        
        <View style={styles.nameContainer}>
          <Text style={styles.labelText}>Name:</Text>
          <Text style={styles.studentName}>{item.nom} {item.prenom}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.labelText}>Date of Birth:</Text>
          <Text style={styles.detailText}>{formatDate(item.dateNais)}</Text>
        </View>

        {item.formation && (
          <View style={styles.detailsContainer}>
            <Text style={styles.labelText}>Formation:</Text>
            <Text style={styles.detailText}>{item.formation.nom || 'N/A'}</Text>
          </View>
        )}

        {item.classe && (
          <View style={styles.detailsContainer}>
            <Text style={styles.labelText}>Class:</Text>
            <Text style={styles.detailText}>{item.classe.nomClass || 'N/A'}</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          onPress={() => modifyStudent(item)} 
          style={styles.modifyButton}
        >
          <Text style={styles.buttonText}>Modify</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => deleteStudent(item.id)} 
          style={styles.deleteButton}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchStudents().finally(() => setRefreshing(false));
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Manage Students</Text>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No students found</Text>
        }
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity 
        onPress={() => navigation.navigate('AddStudent')} 
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Add Student</Text>
      </TouchableOpacity>
    </View>
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
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  studentContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  studentInfo: {
    flex: 1,
    marginBottom: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 100,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  modifyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  separator: {
    height: 12,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ManageStudents;
