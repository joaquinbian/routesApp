import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermisisonsScreen';
import {PermissionsContext} from '../context/permissionsContext';
import LoadingSreen from '../screens/LoadingSreen';

const StackNavigator = () => {
  const Stack = createStackNavigator();
  const {permissions} = useContext(PermissionsContext);
  const {locationStatus} = permissions;

  if (locationStatus === 'unavailable') {
    return <LoadingSreen />;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* dependiendo del status del permiso, se muestra una pantalla u otra */}
      {locationStatus === 'granted' ? (
        <Stack.Screen name="map" component={MapScreen} />
      ) : (
        <Stack.Screen name="permissions" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
