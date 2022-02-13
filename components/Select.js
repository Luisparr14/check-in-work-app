import { Picker } from '@react-native-picker/picker'
import { StyleSheet, Text, View } from 'react-native'
export default function SelectPicker ({ onChange, value, options, type, title, textAlign, width }) {
  type = type.toLowerCase()
  return (
    <>
      <Text style={[styles.text, {
        textAlign: textAlign === undefined ? 'center' : textAlign,
        width: width === undefined ? '90%' : width
      }]}>{title}</Text>
      <View style={[styles.pickerContainer, {
        width: width === undefined ? '90%' : width
      }]}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={{
            width: '100%',
            fontFamily: 'cascadia-code-pl',
            color: '#000'
          }}
        >
          {options && options.map((item, index) => {
            if (type === 'card') {
              if (item.id_card === undefined) {
                return <Picker.Item key={index} label={item.description} value={''} />
              }
              return (<Picker.Item key={item.id_card} label={item.id_card} value={item.id_card} />)
            } else if (type === 'role') {
              return (<Picker.Item key={item.idrol} label={item.nombre_rol} value={item.idrol} />)
            } else if (type === 'employee') {
              if (item.name === undefined) {
                return (<Picker.Item key={index} label={item.description} value={''} />)
              }
              return (<Picker.Item key={item.id_empleado} label={` ${item.id_empleado} - ${item.name} ${item.last_name}`} value={item.id_empleado} />)
            } else {
              return <Picker.Item label={item} value={item} key={index} />
            }
          }
          )}
        </Picker>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: 'cascadia-code-pl',
    color: '#000',
    marginBottom: 5,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textDecorationStyle: 'solid',
    alignSelf: 'center'
  },
  pickerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 20
  }
})
