import { StyleSheet, Text, View } from 'react-native'
import { PrimaryButton } from '../../components/Buttons'

export default function EmployeeCard ({ id, name, secName, lastName, rol, rfidCard, deleteMode, onDelete }) {
  rfidCard === null ? rfidCard = 'Sin tarjeta' : rfidCard.trim()
  return deleteMode
    ? (<View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}><Text style={styles.subText}>Cedula:</Text> {id} </Text>
        <Text style={styles.text}><Text style={styles.subText}>Nombre:</Text> {name} {secName} {lastName}</Text>
        <PrimaryButton
          title='Eliminar'
          width={'50%'}
          backgroundColor={'#f44336'}
          onPress={() => onDelete(id)}
          topBtn={0}
        />
      </View>
    </View>)
    : (<View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}><Text style={styles.subText}>Nombre:</Text> {name} {secName}</Text>
        <Text style={styles.text}><Text style={styles.subText}>Apellido:</Text> {lastName}</Text>
        <Text style={styles.text}><Text style={styles.subText}>Puesto:</Text> {rol}</Text>
        <Text style={styles.text}><Text style={styles.subText}>Id Tarjeta RFID:</Text> {rfidCard}</Text>
      </View>
    </View>)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444',
    margin: 5,
    width: '85%',
    height: 150,
    borderRadius: 10,
    padding: 10
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center' // Susebtible a cambios
  },
  text: {
    fontSize: 20,
    fontFamily: 'cascadia-code-pl-regular' || 'sans-serif-condensed' || 'sans-serif',
    color: '#fff',
    marginBottom: 5,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textDecorationStyle: 'solid'
  },
  subText: {
    color: '#e33',
    fontSize: 23
  }
})
