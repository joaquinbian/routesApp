import React, {createContext, useState} from 'react';
import {Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

interface PermissionsState {
  locationStatus: PermissionStatus;
}

const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

//esto es la interface de lo que va a exponer el contexto,
//que es el initialState y las funciones que lo modifican
interface PermissionContextState {
  permissions: PermissionsState;
  askPermissions: () => void;
  checkPermissions: () => void;
}

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const PermissionsContext = createContext({} as PermissionContextState);

const PermissionContextProvider = ({children}: ProviderProps) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  //esta funcion lo que hace es fijarse en la app el estado del permiso
  const askPermissions = async () => {
    console.log('entre al ask');

    let permissionsStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    setPermissions({...permissions, locationStatus: permissionsStatus});
  };

  //esta funcion le pregunta al usuario si desea aceptar los permisos o no
  const checkPermissions = async () => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    askPermissions();
  };

  const data: PermissionContextState = {
    permissions,
    askPermissions,
    checkPermissions,
  };
  return (
    <PermissionsContext.Provider value={data}>
      {children}
    </PermissionsContext.Provider>
  );
};
export default PermissionContextProvider;
