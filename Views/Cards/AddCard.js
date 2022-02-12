import { useEffect, useState } from 'react'
import { Alert, BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native'
import SelectPicker from '../../components/Select'
import { PrimaryButton } from '../../components/Buttons'
import axios from 'axios'
import { url } from '../../config'

export default function AddCard ({ navigation, route }) {
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
  const hexadecimal = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F'
  ]

  const card = { primerValor: hexadecimal[0], segundoValor: hexadecimal[0], tercerValor: hexadecimal[0], cuartoValor: hexadecimal[0], quintoValor: hexadecimal[0], sextoValor: hexadecimal[0], septimoValor: hexadecimal[0], octavoValor: hexadecimal[0] }
  const [cardNumber, setCardNumber] = useState(card)

  const uuidCard = cardNumber.primerValor + '' + cardNumber.segundoValor + ' ' + cardNumber.tercerValor + '' + cardNumber.cuartoValor + ' ' + cardNumber.quintoValor + '' + cardNumber.sextoValor + ' ' + cardNumber.septimoValor + '' + cardNumber.octavoValor

  const SendCardToServer = async () => {
    try {
      const res = await axios.post(`${url}/cards/add-card`, { idCard: uuidCard })
      setCardNumber(card)
      Alert.alert('¡Éxito!', res.data.message)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: 19 }]}>Codigo:</Text>
      <Text style={styles.text}>{uuidCard}</Text>
      <ScrollView style={{ width: '100%', height: '70%' }}>
        <SelectPicker
          options={hexadecimal}
          onChange={(itemValue) => {
            setCardNumber({ ...cardNumber, primerValor: itemValue })
          }}
          value={cardNumber.primerValor}
          title='Primer valor hexadecimal de la tarjeta (0-F)'
        />
        <SelectPicker
          options={hexadecimal}
          onChange={(itemValue) => {
            setCardNumber({ ...cardNumber, segundoValor: itemValue })
          }}
          value={cardNumber.segundoValor}
          title='Segundo valor hexadecimal de la tarjeta (0-F)'
        />
        <SelectPicker
          options={hexadecimal}
          onChange={(itemValue) => {
            setCardNumber({ ...cardNumber, tercerValor: itemValue })
          }}
          value={cardNumber.tercerValor}
          title='Tercer valor hexadecimal de la tarjeta (0-F)'
        />
        <SelectPicker
          options={hexadecimal}
          onChange={(itemValue) => {
            setCardNumber({ ...cardNumber, cuartoValor: itemValue })
          }}
          value={cardNumber.cuartoValor}
          title='Cuarto valor hexadecimal de la tarjeta (0-F)'
        />
        <SelectPicker
          options={hexadecimal}
          onChange={(itemValue) => {
            setCardNumber({ ...cardNumber, quintoValor: itemValue })
          }}
          value={cardNumber.quintoValor}
          title='Quinto valor hexadecimal de la tarjeta (0-F)'
        />
        <SelectPicker
          options={hexadecimal}
          onChange={(itemValue) => {
            setCardNumber({ ...cardNumber, sextoValor: itemValue })
          }}
          value={cardNumber.sextoValor}
          title='Sexto valor hexadecimal de la tarjeta (0-F)'
        />
        <SelectPicker
          options={hexadecimal}
          onChange={(itemValue) => {
            setCardNumber({ ...cardNumber, septimoValor: itemValue })
          }}
          value={cardNumber.septimoValor}
          title='Septimo valor hexadecimal de la tarjeta (0-F)'
        />
        <SelectPicker
          options={hexadecimal}
          onChange={(itemValue) => {
            setCardNumber({ ...cardNumber, octavoValor: itemValue })
          }}
          value={cardNumber.octavoValor}
          title='Octavo valor hexadecimal de la tarjeta (0-F)'
        />
      </ScrollView>
      <PrimaryButton
        title='Registrar tarjeta'
        onPress={SendCardToServer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    width: '100%',
    height: 50,
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 40,
    fontFamily: 'cascadia-code-pl-regular' || 'sans-serif-condensed' || 'sans-serif',
    color: '#fff',
    marginBottom: 5,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 30
  }
})
