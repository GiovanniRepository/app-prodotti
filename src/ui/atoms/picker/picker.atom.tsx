import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


export const Picker = ({items,onValueChange,placeholder, value}:any) => {
  return (
    <RNPickerSelect
      style={{...styles}}
      onValueChange={(value) => value ? onValueChange(value) : null}
      items={items}
      placeholder={{label:placeholder,value:null}}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  inputIOSContainer: { 
    pointerEvents: "none",width: '100%' 
  },
  viewContainer: {
    width:'100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  }
});