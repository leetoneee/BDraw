import { StyleSheet } from "react-native";
import { width } from "../../constants";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingVertical: 30
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E0D2CE'
  },
  inputContainer: {
    width: '80%',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FDFFD2'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  joinButton: {
    backgroundColor: '#63676A',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DEE4EC'
  },
  createRoomButton: {
    backgroundColor: '#63676A',
    padding: 10,
    borderRadius: 5,
    borderColor: '#DEE4EC'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  tabContainer: {
    flex: 2,
    width: '100%',
    height: width,
    maxHeight: width,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#6200EE',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 5,
  },
  tabControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#6200EE',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: '#3700B3',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
  },
  tabText: {
    fontFamily: 'VarelaRound-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  screen: {
    flex: 1,
    // height: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  contentText: {
    fontFamily: 'Bangers-Regular',
    fontSize: 24,
    backgroundColor: '#FFA500', // Orange color
    padding: 10,
    borderRadius: 5,
    color: '#FFFFFF', // White text color
    textShadowColor: '#000000', // Black shadow
    textShadowOffset: { width: 2, height: 5 },
    textShadowRadius: 4,
  },
  button: {
    backgroundColor: '#FFA500', // Orange button background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonTextOutline: {
    // position: 'absolute',
    fontFamily: 'Bangers-Regular',
    fontSize: 25,
    // fontWeight: 'bold',
    color: '#000', // Black text for outline
    left: 2,
    top: 2,
  },
  buttonText: {
    fontFamily: 'Bangers-Regular',
    fontSize: 30,
    color: '#000', // White text color
  },
  startText: {
    fontFamily: 'RobotoMono-Regular',
    color: '#fff',
    fontSize: 16
  },
  aweBtnView: {
    height: 'auto',
    width: 'auto',
    alignSelf: 'flex-start'
  }
});