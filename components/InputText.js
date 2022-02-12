import { StyleSheet, TextInput, View } from 'react-native'
export default function InputText ({ placeHolder, value, onChangeText, type }) {
  return (
    <View style={styles.constainer}>
      <TextInput
        placeholder={placeHolder}
        onChangeText={onChangeText}
        value={value}
        keyboardType={type || 'number-pad'}
        style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    // bottom: '30%',
    // position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255,0)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 20,
    fontFamily: 'cascadia-code-pl',
    width: '90%'
  }
})
