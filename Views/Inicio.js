import { Pressable, StyleSheet, Text, View, Alert, BackHandler } from 'react-native'
import { useEffect } from 'react'

export default function Inicio ({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      console.log(navigation.canGoBack())
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
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Scanner')} >
        <Text>PRESIONE PARA ESCANEAR SU CODIGO</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#aaa',
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
