import React, { useEffect } from 'react'
import { Alert, BackHandler, StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import ListEmployees from './ListEmployees'
import { useAxios } from '../../Hooks/useAxios'
import { url } from '../../config'

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

  const { data } = useAxios(`${url}/empleados`, refreshing)

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#aaa'
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.container}>
          <Text style={styles.title}>Lista empleados</Text>
          <ListEmployees
            employees={data}
          />
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aaa',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontFamily: 'cascadia-code-pl',
    color: '#fff',
    marginTop: 50,
    marginBottom: 50
  }
})
