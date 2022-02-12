import axios from 'axios'
import { useEffect, useState } from 'react'
import { Alert, BackHandler, StyleSheet, Text, View, RefreshControl } from 'react-native'
import { PrimaryButton } from '../../components/Buttons'
import InputText from '../../components/InputText'
import SelectPicker from '../../components/Select'
import { url } from '../../config'
import { useAxios } from '../../Hooks/useAxios'

export default function AddEmployee ({ navigation, route }) {
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

  const dataEmployee = { idEmpleado: '', name: '', secName: '', lastName: '', rol: '', rfidCard: null }
  const [employee, setEmployee] = useState(dataEmployee)
  const [refreshing, setRefreshing] = useState(false)
  const { data: cards } = useAxios(`${url}/cards`, refreshing)
  const { data: roles } = useAxios(`${url}/roles`, false)

  const AgregarEmpleado = async () => {
    if (employee.name === '' || employee.secName === '' || employee.lastName === '' || employee.rol === '' || employee.idEmpleado === '') {
      Alert.alert('¡Error!', 'Todos los campos son obligatorios')
      return
    }
    try {
      setRefreshing(true)
      const res = await axios.post(`${url}/empleados/add-employee`, employee)
      setRefreshing(false)
      setEmployee(dataEmployee)
      Alert.alert('¡Éxito!', res.data.message)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <View style={styles.container}

    >
      <View style={styles.header}>
        <Text style={styles.title}>Agregar Empleado</Text>
      </View>
      <View style={styles.main}>
        <InputText
          placeHolder='Cedula'
          onChangeText={(text) => setEmployee({ ...employee, idEmpleado: text })}
          value={employee.idEmpleado}
        />
        <InputText
          placeHolder='Nombre'
          onChangeText={(text) => setEmployee({ ...employee, name: text })}
          value={employee.name}
          type='default'
        />
        <InputText
          placeHolder={'Segundo nombre'}
          onChangeText={(text) => setEmployee({ ...employee, secName: text })}
          value={employee.secName}
          type='default'
        />
        <InputText
          placeHolder='Apellido'
          onChangeText={(text) => setEmployee({ ...employee, lastName: text })}
          value={employee.lastName}
          type='default'
        />
        <SelectPicker
          options={roles}
          title='Rol'
          type={'role'}
          textAlign='left'
          value={employee.rol}
          onChange={(value) => setEmployee({ ...employee, rol: value })}
        />
        <SelectPicker
          options={cards.filter(card => card.en_uso === 0)}
          title='Tarjeta Asignada'
          type={'card'}
          textAlign='left'
          value={employee.rfidCard}
          onChange={(value) => setEmployee({ ...employee, rfidCard: value })}
        />
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          title='Agregar Empleado'
          onPress={AgregarEmpleado}
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
