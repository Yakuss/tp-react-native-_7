import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getStudentsByFormation } from './api';

// Color Palette
const COLORS = {
  umber: '#85714D',        // Rich, earthy brown
  khaki: '#C3B091',        // Soft, muted tan
  whiteCoffee: '#F5F5F5',  // Soft, off-white with warmth
  darkText: '#2C2C2C',     // Deep charcoal for text
};

const FormationStudents = ({ route, navigation }) => {
  const { formationId } = route.params;
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const data = await getStudentsByFormation(formationId);
        setStudents(data);
      } catch (error) {
        Alert.alert('Error', 'Could not fetch students');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [formationId]);

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentItem}>
      <View style={styles.studentDetails}>
        <Text style={styles.studentName}>{item.nom} {item.prenom}</Text>
        <Text style={styles.studentBirthdate}>
          Born: {new Date(item.dateNais).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.detailButton}
        onPress={() => navigation.navigate('StudentDetails', { studentId: item.id })}
      >
        <Text style={styles.detailButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {isLoading ? 'Loading students...' : 'No students in this formation'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students in Formation</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudentItem}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles.listContainer}
      />
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
  studentItem: {
    backgroundColor: COLORS.khaki,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: COLORS.umber,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentDetails: {
    flex: 1,
    marginRight: 10,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkText,
  },
  studentBirthdate: {
    fontSize: 14,
    color: COLORS.umber,
  },
  detailButton: {
    backgroundColor: COLORS.umber,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  detailButtonText: {
    color: COLORS.whiteCoffee,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.umber,
  },
});

export default FormationStudents;