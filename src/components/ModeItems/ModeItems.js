import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React , { useState }from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { colors, height } from '../../constants';
import Background from '../Background';
import ModeItemModal from '../ModeItemModal';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { setIsGameStarted } from '../../redux/startGameSlice/startGameSlice';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4'
const TO_COLOR = '#6F60E7';

export default ModeItems = ({ item }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const isGameStarted = useSelector((state) => state.startGame.isGameStarted);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const dispatch = useDispatch();

  const handlePress = (x) => {
    switch (x) {
        case '1':
            // Perform action A
            dispatch(setIsGameStarted(true));
            console.log("Performing action A", isGameStarted);
            break;
        case '2':
            // Perform action B
            console.log("Performing action B");
            break;
        case '3':
            // Perform action C
            console.log("Performing action C");
            break;
        default:
            console.log("No action defined for this item.id");
            break;
    }
};

  return (
    <View style={[styles.container,]}>
      <TouchableOpacity style={{marginTop: -20, }} onPress={toggleModal}>
        <Icon name="question" size={50} color="black" />
      </TouchableOpacity>
      {isModalVisible && <ModeItemModal isVisible={isModalVisible} onClose={toggleModal} item={item} />}

      <Image source={item.image} style={[styles.image, {  resizeMode: 'contain' }]} />

      <TouchableOpacity onPress={() => handlePress(item.id)}>
          <LinearGradient
              colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
              style={styles.linearGradient}>
              <Text style={styles.textStyle}>Let's Draw</Text>
          </LinearGradient>
      </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        flex: 0.75,
        margin:20
    },

    textStyle: {
      color: 'white',
      textAlign: 'center',
      fontSize: 25,
      marginVertical: 5,
      marginHorizontal:30,
    },

    linearGradient: {
      borderRadius: 50,
      marginBottom: -25,
    },

});