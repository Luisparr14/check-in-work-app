import React, { useEffect } from 'react'
import { Alert, BackHandler, StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import ListRecords from './ListRecords'
import { useAxios } from '../../Hooks/useAxios'
import { url } from '../../config'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { PrimaryButton } from '../../components/Buttons'
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export default function ViewEmployees ({ navigation, route }) {
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

  const [showDatePicker, setShowDatePicker] = React.useState(false)
  const [chooseInitialDate, setChooseInitialDate] = React.useState(true)
  const [initialDate, setInitialDate] = React.useState(new Date('2020-01-02'))
  const [finalDate, setFinalDate] = React.useState(new Date())
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(200).then(() => {
      setRefreshing(false)
    })
  }, [])

  const { data } = useAxios(`${url}/registros`, refreshing)

  console.log(data.length)
  const selectInitialDate = () => {
    setChooseInitialDate(true)
    setShowDatePicker(true)
  }

  const selectFinalDate = () => {
    setChooseInitialDate(false)
    setShowDatePicker(true)
  }

  const handleConfirm = (date) => {
    if (chooseInitialDate) {
      setInitialDate(date)
      if (date > finalDate) {
        Alert.alert('Fecha inicial no puede ser mayor a fecha final')
        const newDate = new Date(finalDate)
        setInitialDate(new Date(newDate.setDate(newDate.getDate() - 1)))
      }
    } else {
      setFinalDate(date)
      if (date < initialDate) {
        Alert.alert('Error', 'Fecha final no puede ser menor a fecha inicial')
        const newDate = new Date(initialDate)
        setFinalDate(new Date(newDate.setDate(newDate.getDate() + 1)))
      }
    }
    setShowDatePicker(false)
  }
  const handleCancel = () => {
    setShowDatePicker(false)
  }

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Lista de los registros de ingreso</Text>
        </View>
        <View style={styles.headerButton}>
          <View style={styles.headerButtonTitle}>
            <Text style={styles.date}>
              {initialDate.toLocaleDateString()} - {finalDate.toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.headerButtons}>
            <PrimaryButton
              title='fecha inicio'
              onPress={selectInitialDate}
              topBtn={0}
              backgroundColor='#32db79'
            />
            <PrimaryButton
              title='fecha fin'
              onPress={selectFinalDate}
              topBtn={0}
              backgroundColor='#cf3d23'
            />
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          flex: 0.7,
          backgroundColor: '#aaa'
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
        <View style={styles.container}>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode='date'
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
          <ListRecords
            records={data.sort((a, b) => b.id_registro - a.id_registro).filter(record => {
              const date = new Date(record.dateandtime)
              return date >= initialDate && date <= finalDate
            })
            }
          />
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flex: 0.3,
    backgroundColor: '#bbb'
  },
  container: {
    backgroundColor: '#aaa',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 50,
    marginBottom: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  headerTitle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerButton: {
    display: 'flex',
    flex: 1
  },
  headerButtonTitle: {
    flex: 0.3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111'
  },
  headerButtons: {
    flex: 0.7,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  }
})
