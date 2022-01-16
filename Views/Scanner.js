import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button, Pressable, TouchableOpacity, Alert } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default function Inicio ({ navigation }) {
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
      {scanned && <Pressable style={styles.button} onPress={() => setScanned(false)} >
        <Text>PRESIONE PARA VOLVER A ESCANEAR</Text>
      </Pressable>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#344',
    justifyContent: 'center',
    height: '100%'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    zIndex: 10
  },
  scanner: {
    backgroundColor: '#fff',
    height: '80%',
    width: '100%',
    zIndex: 0
  },
  button: {
    display: 'flex',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 40,
    width: '70%',
    borderRadius: 5,
    zIndex: 2
  }
})
