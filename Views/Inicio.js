import { useEffect } from 'react'
import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native'
import { PrimaryButton } from '../components/Buttons'
export default function Inicio ({ navigation, route }) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('¿SALIR?', '¿Estas seguro de salir?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel'
        },
        { text: 'SI', onPress: () => BackHandler.exitApp() }
      ])
      return true
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.canGoBack() === true ? navigation.goBack() : backAction()
        return true
      }
    )
    return () => backHandler.remove()
  }, [])
  return (
    <View style={styles.container}>
      <Text>Inicio</Text>
      <PrimaryButton
        title='Agregar Nuevo Empleado'
        width={'50%'}
        onPress={() => navigation.navigate('AddEmployee')}
      />
      <PrimaryButton
        title='Eliminar empleado'
        width={'50%'}
        backgroundColor={'#f44336'}
        onPress={() => navigation.navigate('DeleteEmployee')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.98,
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
