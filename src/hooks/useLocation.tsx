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
  const [hasLocation, setHasLocation] = useState(false);
  const isMounted = useRef(false);

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
        setHasLocation(true);
      });
    }
    return () => {
      isMounted.current = false;
    };
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

  return {location, hasLocation, getCurrentPosition};
};
export default useLocation;
