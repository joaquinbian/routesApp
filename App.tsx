import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigator/StackNavigator';
import PermissionContextProvider from './src/context/permissionsContext';

const App = () => {
  return (
    <NavigationContainer>
      <PermissionContextProvider>
        <StackNavigator />
      </PermissionContextProvider>
    </NavigationContainer>
  );
};

export default App;
