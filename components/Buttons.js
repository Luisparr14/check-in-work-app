import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const PrimaryButton = ({ onPress, title, position, topBtn, marginBtn, paddingBtn, backgroundColor, width }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.button, {
      position: position || 'relative',
      width: width === undefined ? undefined : width,
      top: topBtn === 0 ? 0 : topBtn || 20,
      margin: marginBtn === 0 ? 0 : marginBtn || 10,
      padding: paddingBtn === 0 ? 0 : paddingBtn || 10,
      backgroundColor: backgroundColor === undefined ? '#32db79' : backgroundColor
    }]}>
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
    borderRadius: 5
  },
  text: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold'
  }
})
