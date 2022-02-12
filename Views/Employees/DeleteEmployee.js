import axios from 'axios'
import { useEffect, useState } from 'react'
import { Alert, BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native'
import InputText from '../../components/InputText'
import { url } from '../../config'
import { useAxios } from '../../Hooks/useAxios'
import ListEmployees from './ListEmployees'

export default function DeleteEmployee ({ navigation, route }) {
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

  const [employeeId, setEmployeeId] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const { data: employees } = useAxios(`${url}/empleados`, refreshing)

  const deleteEmployee = async (id) => {
    try {
      setRefreshing(true)
      const res = await axios.delete(`${url}/empleados/delete-employee/${id}`)
      setRefreshing(false)
      setEmployeeId('')
      Alert.alert('Exito', res.data.message)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const handleDelete = async (e) => {
    Alert.alert('¿Estas seguro?', '¿Estas seguro de eliminar este empleado?', [
      {
        text: 'Cancelar',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'SI',
        onPress: () => deleteEmployee(e)
      }
    ])
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.title}>Eliminar empleado</Text>
      </View>
      <View style={styles.main}>
        <InputText
          placeHolder='Cedula del empleado'
          onChangeText={(e) => setEmployeeId(e)}
          value={employeeId}
        />
        <ScrollView style={{
          width: '100%'
        }}>
          <View style={styles.listEmployees}>
            <ListEmployees
              deleteMode={true}
              employees={employeeId !== '' ? employees.filter(e => e.id_empleado.toString().startsWith(employeeId)) : employees}
              onDelete={handleDelete}
            />
          </View>
        </ScrollView>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'center'
  },
  listEmployees: {
    flex: 1,
    alignItems: 'center'
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
    flex: 0.8,
    width: '100%',
    alignItems: 'center'
  },
  footer: {
    flex: 0.1,
    width: '100%',
    justifyContent: 'center'
  }
})
