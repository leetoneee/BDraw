import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  ImageBackground,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import background_pen from '../../assets/images/background_pen.png';
import InstructModal from '../../components/InstructModal';
import Background from '../../components/Background';
import Slides from '../../components/Slide/Slides';
import ModeItems from '../../components/ModeItems/ModeItems';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

function ChooseMode() {
  const navigation = useNavigation();
  const instructRef = useRef();
  const [showInstruct, setShowInstruct] = useState(true);
  const width = Dimensions.get('window').width;
  return (
    <Background>
      <View style={styles.container}>
        <ImageBackground
          source={background_pen}
          resizeMode="contain"
          style={styles.imagebackground}>
          <Text
            style={{
              fontSize: 55,
              fontFamily: 'VampiroOne-Regular',
              textAlign: 'center',
              color: '#9b23d0',
            }}>
            BDraw
          </Text>

          <FlatList
            data={Slides}
            renderItem={({ item }) => <ModeItems item={item} />}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
          />

          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => navigation.goBack()}>
            <Icon name="back" size={45} color="black" />
          </TouchableOpacity>
        </ImageBackground>

        {showInstruct && <InstructModal ref={instructRef} />}
      </View>
    </Background>
  );
}

export default ChooseMode;
