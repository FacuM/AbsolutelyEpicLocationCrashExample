import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import * as Location from 'expo-location';

export default function App() {
  const [ message, setMessage ] = useState();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
  
    console.debug('requestForegroundPermissionsAsync:', status);
  
    if (status !== 'granted') {
      setMessage('status: ' + status);
  
      return;
    }
  
    let location;

    try {
      location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low
      });

      console.debug('location:', location);

      setMessage(
        JSON.stringify(location)
      );
    } catch (exception) {
      console.error(exception);

      setMessage(exception.message);

      return;
    }
  };

  useState(() => { getLocation(); }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{
        color: 'black',
        textAlign: 'center'
      }}> {message} </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
