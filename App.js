import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Views/Login'
import Inicio from './Views/Inicio'
import { useEffect } from 'react'
import { Alert, BackHandler } from 'react-native'
const Stack = createNativeStackNavigator()

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
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Inicio} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
