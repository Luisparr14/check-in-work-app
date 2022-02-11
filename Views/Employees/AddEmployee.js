import axios from 'axios'
import { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { PrimaryButton } from '../../components/Buttons'
import InputText from '../../components/InputText'
import SelectPicker from '../../components/Select'
import { url } from '../../config'
import { useAxios } from '../../Hooks/useAxios'

export default function AddEmployee ({ navigation, route }) {
  const dataEmployee = { idEmpleado: '', name: '', secName: '', lastName: '', rol: '', rfidCard: '' }
  const [employee, setEmployee] = useState(dataEmployee)
  const { data } = useAxios(`${url}/cards`, false)

  const AgregarEmpleado = async () => {
    if (employee.name === '' || employee.secName === '' || employee.lastName === '' || employee.rol === '' || employee.rfidCard === '' || employee.idEmpleado === '') {
      Alert.alert('¡Error!', 'Todos los campos son obligatorios')
      return
    }
    try {
      const res = await axios.post(`${url}/empleados/add-employee`, employee)
      setEmployee(dataEmployee)
      Alert.alert('¡Éxito!', res.data.message)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <View style={styles.container}>
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
      <InputText
        placeHolder='Puesto'
        onChangeText={(text) => setEmployee({ ...employee, rol: text })}
        value={employee.rol}
        type='default'
      />
      <SelectPicker
        options={data.filter(card => card.en_uso === 0)}
        title='Tarjeta Asignada'
        type={'card'}
        value={employee.rfidCard}
        onChange={(value) => setEmployee({ ...employee, rfidCard: value })}
      />
      <PrimaryButton
        title='Agregar Empledoo'
        onPress={AgregarEmpleado}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
