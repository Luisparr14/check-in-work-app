import axios from 'axios'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert, BackHandler, StatusBar } from 'react-native'
import { PrimaryButton } from '../components/Buttons'
import InputText from '../components/InputText'
import { url } from '../config'

export default function Login ({ navigation }) {
  useEffect(() => {
    console.log('Inicio.js')
    const backAction = () => {
      !navigation.canGoBack()
        ? Alert.alert('¿SALIR?', '¿Estas seguro de salir?', [
          {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel'
          },
          { text: 'SI', onPress: () => BackHandler.exitApp() }
        ])
        : navigation.goBack()
      return true
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )
    return () => backHandler.remove()
  }, [])

  const [identification, onChangeIdentification] = useState(null)

  const handleLogin = async () => {
    if (identification === '') {
      Alert.alert('Error', 'Ingrese su identificación')
      return
    }

    try {
      const user = await axios.get(`${url}/empleados/${identification}`)
      console.log('Datos', user.data.data)
    } catch (error) {
      if (error.response.status === 404) {
        Alert.alert('Error', 'Usuario no encontrado')
      } else {
        Alert.alert('Error', 'Error en el servidor')
      }
    }
  }
  return (
    <>
      <StatusBar hidden={false} barStyle='default' backgroundColor={'#ff7711'} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>Check in work</Text>
        </View>
        <InputText
          placeHolder='Numero de empleado (CC)'
          value={identification}
          onChangeText={onChangeIdentification}
        />
        <PrimaryButton
          title='Ingresar'
          onPress={handleLogin}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aaa',
    display: 'flex',
    justifyContent: 'center',
    height: '100%'
  },
  titleContainer: {
    bottom: '20%',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: 10
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold'
  },
  logo: {
    alignSelf: 'center',
    height: 200,
    width: '90%',
    marginBottom: 40
  }
})
