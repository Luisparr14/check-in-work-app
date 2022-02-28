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
      <View style={styles.header}>
        <Text style={styles.title}>Inicio</Text>
      </View>
      <View style={styles.main}>
        <PrimaryButton
          title='Asignar tarjeta'
          width={'50%'}
          backgroundColor={'#00b894'}
          onPress={() => navigation.navigate('AssignCard')}
        />
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
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          FOOOTER
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa'
  },
  header: {
    flex: 0.2,
    width: '100%',
    justifyContent: 'center'
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    width: '100%',
    fontFamily: 'cascadia-code-pl'
  },
  main: {
    flex: 0.7,
    width: '100%',
    justifyContent: 'center'
  },
  footer: {
    flex: 0.1,
    width: '100%',
    justifyContent: 'center'
  }
})
