import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, Feather } from '@expo/vector-icons'
import Login from './Views/Login'
import Inicio from './Views/Inicio'
import AddCard from './Views/Cards/AddCard'
import { useEffect } from 'react'
import { Alert, BackHandler, StyleSheet, StatusBar } from 'react-native'
import ViewEmployees from './Views/Employees/ViewEmployees'
import ViewCards from './Views/Cards/ViewCards'
import ViewRecords from './Views/Records/ViewRecords'
import AddEmployee from './Views/Employees/AddEmployee'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MyTabs () {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        height: 55
      },
      tabBarActiveTintColor: '#ff7711'
    }}>
      <Tab.Screen name='Home' component={Inicio} options={{
        tabBarLabel: 'Inicio',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
        tabBarLabelStyle: styles.tabText
      }} />
      <Tab.Screen name='Employee' component={ViewEmployees} options={{
        tabBarLabel: 'Empleados',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
        ),
        tabBarLabelStyle: styles.tabText
      }} />
      <Tab.Screen name='Cards' component={ViewCards} options={{
        tabBarLabel: 'Tarjetas',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="card" size={size} color={color} />
        ),
        tabBarLabelStyle: styles.tabText
      }} />
      <Tab.Screen name='Records' component={ViewRecords} options={{
        tabBarLabel: 'Registros',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Feather name="user-check" size={size} color={color} />
        ),
        tabBarLabelStyle: styles.tabText
      }} />
    </Tab.Navigator>
  )
}

function Stacks () {
  return (
    <>
      <StatusBar hidden={false} barStyle='default' backgroundColor={'#ff7711'} />
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AddCard" component={AddCard} options={{ headerShown: false }} />
        <Stack.Screen name="AddEmployee" component={AddEmployee} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  )
}

export default function App ({ navigation }) {
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
    BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )
  }, [])

  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabText: {
    fontSize: 15
  }
})
