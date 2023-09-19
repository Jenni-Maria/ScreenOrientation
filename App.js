import * as ScreenOrientation from 'expo-screen-orientation';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';

export default function App() {

  const [screenOrientation, setScreenOrientation] = useState('portrait')
  const [isPortrait, setIsPortrait] = useState(true)

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener((value) => {
      if (value.orientationInfo === ScreenOrientation.Orientation.PORTRAIT_UP) {
        setScreenOrientation('PORTRAIT')
        setIsPortrait(true)
      } else if (value.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || value.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
        setScreenOrientation('LANDSCAPE')
        setIsPortrait(false)
      }
    })
    
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription)
    }

  }, [])

  const lockToPortrait = async () => {
    await ScreenOrientation.lockAsync( ScreenOrientation.OrientationLock.PORTRAIT )
  }
  const release = async() => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
  }

  return (
    <View style={[styles.container,isPortrait ? styles.portrait : styles.landscape]}>
      <Text>{screenOrientation}</Text>

        <View style={styles.button1}>
          <Button title="Lock to portrait" onPress={lockToPortrait}></Button>
            <View style={styles.button2}>
              <Button title='Release' onPress={release} />
            </View>
           
        </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button1: {

    padding: 20,
  },
  button2: {

    padding: 10,
  },
  portrait: {
    backgroundColor: '#ccc'
  },
  landscape: {
  backgroundColor: '#999'
},
});
