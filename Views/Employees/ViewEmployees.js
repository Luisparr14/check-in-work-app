import React, { useEffect } from 'react'
import { Alert, BackHandler, StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import ListEmployees from './ListEmployees'
import { useAxios } from '../../Hooks/useAxios'
import { apiUrl } from '../../config'

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

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(200).then(() => {
      setRefreshing(false)
    })
  }, [])

  const { data } = useAxios(`${apiUrl}/empleados`, refreshing)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista empleados</Text>
      </View>
      <View style={styles.main}>
        <ScrollView
          style={{
            width: '100%'
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <View style={styles.listEmployees}>
            <ListEmployees
              employees={data}
            />
          </View>
        </ScrollView>
      </View>

    </View>
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
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    fontFamily: 'cascadia-code-pl'
  },
  main: {
    flex: 0.8,
    width: '100%',
    alignItems: 'center'
  }
})
