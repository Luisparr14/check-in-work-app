import { StyleSheet, Text, View } from 'react-native'

export default function RecordCard ({ number, card, fechaHora }) {
  if (card === null) {
    card = 'La tarjeta fue borrada'
  }
  const dateTime = new Date(fechaHora)
  const date = dateTime.toLocaleDateString()
  const time = dateTime.toLocaleTimeString()
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}><Text style={styles.subText}>Numero de registro:</Text> {number}</Text>
        <Text style={styles.text}><Text style={styles.subText}>Tarjeta:</Text> {card}</Text>
        <Text style={styles.text}><Text style={styles.subText}>Fecha y hora de ingreso:</Text> {'\n' + `${date} ${time}`}</Text>
      </View>
    </View>
  )
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
    fontFamily: 'sans-serif-condensed' || 'sans-serif',
    color: '#fff',
    marginBottom: 5,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textDecorationStyle: 'solid',
    textAlign: 'center'
  },
  subText: {
    color: '#e33',
    fontSize: 23
  }
})
