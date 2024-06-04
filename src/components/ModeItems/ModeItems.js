import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { colors, height, width } from '../../constants';
import Background from '../Background';
import ModeItemModal from '../ModeItemModal';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { setIsGameStarted } from '../../redux/startGameSlice/startGameSlice';
import SinglePlayerGame from '../../screens/SinglePlayerGame';
import { useNavigation } from '@react-navigation/native';

export default ModeItems = ({ item }) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const isGameStarted = useSelector((state) => state.startGame.isGameStarted);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePress = (x) => {
    switch (x) {
      case 'SinglePlayerGame':
        // Perform action A
        // dispatch(setIsGameStarted(true));
        navigation.navigate(x);
        console.log("Performing action A", isGameStarted);
        break;
      case '2':
        // Perform action B
        console.log("Performing action B");
        break;
      case 'RoomScreen':
        // Perform action C
        console.log("Performing action C");
        navigation.navigate(x);
        break;
      default:
        console.log("No action defined for this item.id");
        break;
    }
  };

  return (
    <View style={[styles.container,]}>

      <View>
        <Pressable onPress={() => handlePress(item.href)}>
          <Image source={item.image} style={[styles.image, { resizeMode: 'contain' }]} />
        </Pressable>
      </View>

      <TouchableOpacity style={{ marginTop: 20 }} onPress={toggleModal}>
        <Icon name="question" size={50} color="black" />
      </TouchableOpacity>
      {isModalVisible && <ModeItemModal isVisible={isModalVisible} onClose={toggleModal} item={item} />}
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    // width: wp('94%'),
    width: width * 0.94
  },

  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    marginVertical: 5,
    marginHorizontal: 30,
  },

  linearGradient: {
    borderRadius: 50,
    marginBottom: -25,
  },

});