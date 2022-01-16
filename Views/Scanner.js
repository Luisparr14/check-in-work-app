import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import { PrimaryButton } from '../components/Buttons'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default function Inicio({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    Alert.alert('Code read successfully', `Bar code with type ${type} and data ${data} has been scanned!`, [{ text: 'OK', onPress: () => navigation.replace('Home') }])
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INGRESO LABORAL</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
      {scanned && <PrimaryButton position={'absolute'} title='PRESIONE PARA VOLVER A ESCANEAR' onPress={() => setScanned(false)} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#344',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
  },
  title: {
    color: '#fff',
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  scanner: {
    flex: 7,
    height: '80%',
    width: '100%',
    bottom: 0,
    alignSelf: 'center'
  }
})
