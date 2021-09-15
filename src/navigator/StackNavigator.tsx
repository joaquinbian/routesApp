import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermisisonsScreen';

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="permissions" component={PermissionsScreen} />
      <Stack.Screen name="map" component={MapScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
