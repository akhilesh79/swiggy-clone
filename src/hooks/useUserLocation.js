import { useEffect, useState } from 'react';
import { GEOCAGEAPIKEY } from '../constants/common';

const useUserLocation = () => {
  const [location, setLocation] = useState('Fetching location...');
  const fetchLocationFromCoords = (latitude, longitude) => {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${GEOCAGEAPIKEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results && data.results.length > 0) {
          setLocation(data.results[0].formatted);
        } else {
          setLocation('Unknown location');
        }
      })
      .catch(() => setLocation('Unknown location'));
  };

  const updateLocation = () => {
    if (!navigator.geolocation) {
      setLocation('Location unavailable, Enable location services');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchLocationFromCoords(latitude, longitude);
      },
      () => {
        setLocation('Permission denied');
      },
    );
  };

  useEffect(() => {
    updateLocation();
  }, []);

  return location;
};

export default useUserLocation;
