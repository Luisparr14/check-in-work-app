import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const PrimaryButton = ({ onPress, title, position }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.button, { position: position }]}>
      <Text style={styles.text}>
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  )
}

export { PrimaryButton }

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    margin: 10
  },
  text: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold'
  }
})
