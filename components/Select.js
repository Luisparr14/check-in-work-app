import { Picker } from '@react-native-picker/picker'
import { StyleSheet, Text } from 'react-native'
export default function SelectPicker ({ onChange, value, options, type, title }) {
  return (
    <>
      <Text style={styles.text}>{title}</Text>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.picker}
      >
        {options && options.map((item, index) => {
          if (type === 'card') {
            return (<Picker.Item key={index} label={item.id_card} value={item.id_card} />)
          } else {
            return <Picker.Item label={item} value={item} key={index} />
          }
        }
        )}
      </Picker>
    </>
  )
}

const styles = StyleSheet.create({
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
  picker: {
    borderWidth: 1,
    borderColor: '#f00',
    borderRadius: 5,
    backgroundColor: '#ccc',
    fontSize: 20,
    width: '90%',
    color: '#000'
  }
})
