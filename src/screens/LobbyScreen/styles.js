import { StyleSheet } from "react-native";
import { height, width } from '../../constants';

const width_iconback = width - 65; // Move icon_back into the right corner

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20
  },
  iconGoBack: {
    top: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
  displayRoom: {
    position: 'absolute',
    backgroundColor: '#6F60E7',
    top: 5,
    left: 5,
    height: 45,
    width: width / 2,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    flexDirection: 'row',
    justifyContent: 'right',
    alignItems: 'center'
  },
  circle: {
    width: 15,
    height: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginLeft: 5,
    marginTop: 5,
    position: 'absolute',
    top: 0
  },
  textRoom: {
    marginLeft: 30,
    fontSize: 25,
    color: '#fff',
    fontFamily: 'verdana',
    textAlign: 'center',
    width: '70%'
  },
  banner: {
    width: '100%',
    height: 120,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userStatus: {
    fontSize: 16,
    color: '#999',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#2E2E99',
    borderRadius: 15,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    fontSize: 14,
    marginVertical: 5,
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
});