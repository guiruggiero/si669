// SI 669 - Final Project
// Developed by Gui Ruggiero
// Repo: https://github.com/SI669-classroom-f20/final-project-guiruggiero

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from './LoginScreen';
import { TimelineScreen } from './TimelineScreen';
import { DiveScreen } from './DiveScreen';
// import { CameraScreen } from './CameraScreen'; // FLAG

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: true
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Timeline" component={TimelineScreen} />

        <Stack.Screen name="Dive" component={DiveScreen} />

        {/* <Stack.Screen name="Camera" component={CameraScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;