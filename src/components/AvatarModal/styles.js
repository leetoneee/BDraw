import { StyleSheet } from "react-native";
import { height, width } from "../../constants";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
    
  },
  modalView: {
    marginVertical: 20,
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    
  },

  textStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 35,
  },

  modalText: {
    fontFamily: 'VarelaRound-Regular',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 25,
    color: '#BDA067'
  },
});