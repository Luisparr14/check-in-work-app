import { StyleSheet, Text, View, Alert, BackHandler, Animated, StatusBar } from 'react-native'
import { useEffect } from 'react'
import { PrimaryButton } from '../components/Buttons'

export default function Inicio ({ navigation }) {
  useEffect(() => {
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

  const goToScann = () => {
    navigation.navigate('Scanner')
  }

  return (
    <>
      <StatusBar hidden={false} barStyle='default' backgroundColor={'#ff7711'} />
      <View style={styles.container}>
        <Text style={styles.title}>Check in work</Text>
        <Animated.Image
          resizeMode={'contain'}
          style={styles.logo}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1754/1754534.png'
          }}
        >
        </Animated.Image>
        <PrimaryButton
          onPress={goToScann}
          title="presione para escanear su código QR"
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    display: 'flex',
    justifyContent: 'center',
    height: '100%'
  },
  title: {
    position: 'absolute',
    top: 60,
    width: '100%',
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  },
  logo: {
    alignSelf: 'center',
    height: 200,
    width: '90%',
    marginBottom: 40
  }
})
