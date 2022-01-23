import axios from 'axios'
import { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { PrimaryButton } from '../components/Buttons'
import InputText from '../components/InputText'
import { url } from '../config'

export default function Login ({ navigation }) {
  const [identification, onChangeIdentification] = useState(null)
  
  const handleLogin = async () => {
    if (identification === '') {
      Alert.alert('Error', 'Ingrese su identificación')
      return
    }

    try {
      const user = await axios.get(`${url}/empleados/${identification}`)
      if (user.data.ok) {
        navigation.replace('HomeTabs', { user: user.data.data })
      }
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
