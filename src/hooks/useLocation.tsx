import React, {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

interface Location {
  latitude: number;
  longitude: number;
}
const useLocation = () => {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  //va a ser un arreglo de coordenadas para dibujar
  //las lineas
  const [routes, setRoutes] = useState<Location[]>([]);
  const [hasLocation, setHasLocation] = useState(false);
  const isMounted = useRef(false);
  const watchLocation = useRef<number>();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    isMounted.current = true;

    if (isMounted.current) {
      //   Geolocation.getCurrentPosition(
      //     ({coords: {latitude, longitude}}) => setLocation({latitude, longitude}),
      //     error => console.log(error),
      //     {
      //       enableHighAccuracy: true,
      //     },
      //   );
      //   setHasLocation(true);
      getCurrentPosition().then(location => {
        setLocation(location);
        setUserLocation(location); //lo seteamos pq es la misma location cuando abrimos la app
        setRoutes(prevRoutes => [...prevRoutes, location]); //la primer coordenada
        setHasLocation(true);
      });
    }
  }, []);

  const getCurrentPosition = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords: {longitude, latitude}}) => resolve({latitude, longitude}),
        err => reject({err}),
        {enableHighAccuracy: true},
      );
    });
  };

  const followUserLocation = () => {
    //se ejecuta cada vez que el usuario cambia de posicion cada cierto tiempo
    watchLocation.current = Geolocation.watchPosition(
      ({coords: {longitude, latitude}}) => {
        setUserLocation({longitude, latitude}),
          setRoutes(prevRoutes => [...prevRoutes, location]);
      },
      err => console.log(err),
      {
        distanceFilter: 10, //cada 10 metros va a actualizar la posicion del usuario
        enableHighAccuracy: true,
      },
    );
  };

  const stopFollowUserLocation = () => {
    Geolocation.clearWatch(watchLocation.current!);
  };

  return {
    location,
    hasLocation,
    getCurrentPosition,
    userLocation,
    followUserLocation,
    stopFollowUserLocation,
    routes,
  };
};
export default useLocation;
