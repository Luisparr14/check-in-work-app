import axios from 'axios'
import { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { PrimaryButton } from '../components/Buttons'
import InputText from '../components/InputText'
import { apiUrl } from '../config'

export default function Login ({ navigation }) {
  const [id, setId] = useState('')

  const handleLogin = async () => {
    if (id === '') {
      Alert.alert('Error', 'Ingrese su identificación')
      return
    }
    console.log('id', id)
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { id }, {
        timeout: 500,
        timeoutErrorMessage: 'Error de conexión con el servidor'
      })
      console.log(response)
      if (response.data.ok) {
        Alert.alert(`Bienvenido ${response.data.empleado.name} ${response.data.empleado.lastname}`,
          `${response.data.message}`,
          [
            { text: 'OK', onPress: () => navigation.replace('HomeTabs', { user: response.data.empleado.name }) }
          ])
      }
    } catch (error) {
      console.log(error)
      error.response ? Alert.alert('Error', error.response.data.message) : Alert.alert('Error', error.message)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.textTitle, {
          fontFamily: 'cascadia-code-pl'
        }]}>Check in work</Text>
      </View>
      <InputText
        placeHolder='Numero de empleado (CC)'
        value={id}
        onChangeText={setId}
      />
      <PrimaryButton
        title='Ingresar'
        onPress={handleLogin}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
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
    fontFamily: 'cascadia-code-pl-bold',
    width: '100%'
  },
  logo: {
    alignSelf: 'center',
    height: 200,
    width: '90%',
    marginBottom: 40
  }
})
