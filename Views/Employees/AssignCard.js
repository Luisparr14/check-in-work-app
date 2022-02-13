import axios from 'axios'
import { useEffect, useState } from 'react'
import { Alert, BackHandler, StyleSheet, Text, View, RefreshControl } from 'react-native'
import { PrimaryButton } from '../../components/Buttons'
import SelectPicker from '../../components/Select'
import { apiUrl } from '../../config'
import { useAxios } from '../../Hooks/useAxios'
const firstOptions = [
  {
    description: 'Selecciona una opción'
  }
]
export default function AssignCard ({ navigation, route }) {
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

  const [refreshing, setRefreshing] = useState(false)
  const { data: cards } = useAxios(`${apiUrl}/cards`, refreshing)
  const { data: employees } = useAxios(`${apiUrl}/empleados`, refreshing)

  const [card, setCard] = useState('')
  const [employee, setEmployee] = useState('')

  const handleAssign = () => {
    console.log('Employee', employee)
    console.log('Card', card)
    if (employee === '' || card === '') {
      Alert.alert('Error', 'Debe seleccionar un empleado y una tarjeta')
      return
    }

    Alert.alert('¿Asignar tarjeta?', '¿Estas seguro de asignar la tarjeta?', [
      {
        text: 'Cancelar',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'SI',
        onPress: () => asignarCard()
      }
    ])
  }

  const asignarCard = async () => {
    try {
      setRefreshing(true)
      const res = await axios.post(`${apiUrl}/empleados/assign-card`, { idEmpleado: employee, rfidCard: card })
      setRefreshing(false)
      setEmployee('')
      setCard('')
      // setEmployee({ idEmpleado: employees.length === 0 ? '' : employees.filter(e => e.rfid_card === null)[0].id_empleado, rfidCard: cards.length === 0 ? '' : cards.filter(card => card.en_uso === 0)[0].id_card })
      Alert.alert('¡Éxito!', res.data.message)
    } catch (error) {
      Alert.alert('Error', error.response.data.message)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Asignar Tarjeta</Text>
      </View>
      <View style={styles.main}>
        <SelectPicker
          options={firstOptions.concat(employees.filter(employee => employee.rfid_card === null))}
          title='Empleado'
          type={'employee'}
          textAlign='left'
          value={employee}
          onChange={(value) => {
            console.log('CAMBIOOO EMPLOYEE', value)
            setEmployee(value)
          }
          }
        />
        <SelectPicker
          options={firstOptions.concat(cards.filter(card => card.en_uso === 0))}
          title='Tarjeta a asignar'
          type={'card'}
          textAlign='left'
          value={card}
          onChange={(value) => {
            console.log('CAMBIOOOOOOO CARDDDD', value)
            setCard(value)
          }}
        />
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          title='Asignar Tarjeta'
          onPress={handleAssign}
          topBtn={0}
        />
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
    fontSize: 40,
    textAlign: 'center',
    width: '100%',
    fontFamily: 'cascadia-code-pl'
  },
  main: {
    flex: 0.75,
    width: '100%'
  },
  footer: {
    flex: 0.1,
    width: '100%',
    justifyContent: 'center'
  }
})
