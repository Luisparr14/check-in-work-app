import { StyleSheet, Text, View } from 'react-native'

export default function Card ({ id, enUso }) {
  id = parseInt(id.trim().replace(' ', ''))
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}><Text style={styles.subText}>Id tarjeta:</Text> {id}</Text>
        <Text style={styles.text}><Text style={styles.subText}>¿En uso?:</Text> {enUso}</Text>
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
    textDecorationStyle: 'solid'
  },
  subText: {
    color: '#e33',
    fontSize: 23
  }
})
