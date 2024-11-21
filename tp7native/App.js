import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import ManageSubjects from './ManageSubjects';
import ManageClasses from './ManageClasses';
import ManageStudents from './ManageStudents';
import ModifyStudent from './ModifyStudent';
import ClassStudents from './ClassStudents';
import FormationStudents from './FormationStudents';
import AddStudent from './AddStudent';
import ManageMatieres from './ManageMatieres';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ManageSubjects" component={ManageSubjects} />
        <Stack.Screen name="ManageClasses" component={ManageClasses} />
        <Stack.Screen name="ManageStudents" component={ManageStudents} />
        <Stack.Screen name="ModifyStudent"  component={ModifyStudent} options={{ title: "Modify Student" }}/>
        <Stack.Screen name="ClassStudents" component={ClassStudents} />
        <Stack.Screen name="FormationStudents" component={FormationStudents} />
        <Stack.Screen name="AddStudent" component={AddStudent} />
        <Stack.Screen name="ManageMatieres" component={ManageMatieres} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

