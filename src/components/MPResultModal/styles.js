import { StyleSheet } from "react-native";
import { height, width } from "../../constants";
export const styles = StyleSheet.create({
  modalView: {
    margin: 10,
    minHeight: height - 20,
    backgroundColor: '#FFD139',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
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
  topContainer: {
    flex: 3,
  },
  midContainer: {
    flex: 7,
    width: width - 40,
  },
  scrollview: {
    width: width - 40,

  },
  bottomContainer: {
    // flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    gap: 10,
    width: width - 40,
  },
  roundText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 18,
    color: '#997D26'
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
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'VampiroOne-Regular',
    fontSize: 25,
    color: 'black'
  },
  congraText: {
    marginVertical: 5,
    textAlign: 'center',
    fontFamily: 'Bangers-Regular',
    fontSize: 35,
    color: 'black'
  },
  keywordText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'VampiroOne-Regular',
    fontSize: 40,
    color: 'black',
  },
  startText: {
    fontFamily: 'RobotoMono-Regular',
    color: '#fff',
    fontSize: 18
  },
  btnQuit: {
    alignItems: 'flex-end',
    position: 'absolute',
    zIndex: 1,
    top: 20,
    right: 20
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#2E2E99',
    borderRadius: 15,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-evenly'
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  level: {
    color: '#fff',
    fontSize: 40,
    marginVertical: 5,
    fontFamily: 'Bangers-Regular',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Required for Android shadow
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  statText: {
    color: '#fff',
    fontSize: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    margin: 5,
    maxWidth: 130
  },
  gradientButton: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scoreTxt: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'VarelaRound-Regular'
  },
  aweBtnView: {
    height: 'auto',
    width: 'auto',
    alignSelf: 'flex-start'
  },
  bottomContainerr: {
    width: width - 20,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    // backgroundColor: 'blue'
  },
});