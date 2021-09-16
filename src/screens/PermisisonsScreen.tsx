import React, {useContext} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
import {PermissionsContext} from '../context/permissionsContext';

const PermissionsScreen = () => {
  const {askPermissions, permissions} = useContext(PermissionsContext);
  const checkPermissions = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      //esta funcion check sirve para ver si x permisos estan aceptados, denegados, etc.
      // permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      //esto lo que hace es preguntarle al usuairio si desea aceptar estos permisos
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      // permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }
    askPermissions();
    console.log({permissionStatus});
  };

  return (
    <View style={styles.container}>
      <Text>Soy la permissions screen</Text>
      <Button title="permissions" onPress={checkPermissions} />
      <Text>{JSON.stringify(permissions, null, 5)}</Text>
    </View>
  );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
