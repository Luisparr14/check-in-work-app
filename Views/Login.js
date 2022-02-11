import axios from 'axios'
import { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { PrimaryButton } from '../components/Buttons'
import InputText from '../components/InputText'
import { url } from '../config'

export default function Login ({ navigation }) {
  const [id, setId] = useState('')

  const handleLogin = async () => {
    if (id === '') {
      Alert.alert('Error', 'Ingrese su identificación')
      return
    }

    try {
      const response = await axios.post(`${url}/auth/login`, { id })
      if (response.data.ok) {
        Alert.alert(`Bienvenido ${response.data.empleado.name} ${response.data.empleado.sec_name}`,
          `${response.data.message}`,
          [
            { text: 'OK', onPress: () => navigation.replace('HomeTabs', { user: response.data.empleado.name }) }
          ])
      }
    } catch (error) {
      Alert.alert('Error', error.response.data.message)
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
          value={id}
          onChangeText={setId}
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
