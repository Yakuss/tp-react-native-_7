import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('./assets/splash.png')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageSubjects')}>
          <Image source={require('./assets/favicon.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Manage Subjects</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageClasses')}>
          <Image source={require('./assets/favicon.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Manage Classes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageStudents')}>
          <Image source={require('./assets/favicon.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Manage Students</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageMatieres')}>
          <Image source={require('./assets/favicon.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Manage Matieres</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'khaki',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    shadowColor: 'umber',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white coffee',
  },
});

export default HomeScreen;
