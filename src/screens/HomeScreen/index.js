import {
  Text,
  View,
  Button,
  Image, TouchableOpacity, Animated, ScrollView, FlatList, StyleSheet, BackHandler,
  Alert
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Svg, { Polygon, Defs, Rect, Stop, LinearGradient as LNG } from 'react-native-svg';
import { decrement, increment } from "../../redux/counterSlice/counterSlice";
import { MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Background from "../../components/Background";
import styles from "./styles";
import { height, width } from "../../constants";
import Coin from '../../assets/images/coin.svg'
import First_rank from '../../assets/images/first-rank.svg'
import Second_rank from '../../assets/images/second-rank.svg'
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import HistoryMatch from "../HistoryMatch";
import { getAllItem, reset as resetItem } from '../../redux/items/getAllItemsSlice/getAllItemsSlice';
import { reset as resetLogin } from '../../redux/player/loginSlice/playerLoginSlice';
import { reset as resetDetail } from "../../redux/player/playerDetailSlice/playerDetailSlice";

const GradientBar = ({ x, y, animated }) => {
  return (
    <View style={{ position: 'absolute', left: 45, top: 17, height: 30, width: 100, borderWidth: 1, borderColor: 'black', borderRadius: 100, overflow: 'hidden', }}>
      <Animated.View
        style={{ width: `${x * 100 / y}%`, position: 'absolute', backgroundColor: '#00B8FF', height: '100%', transform: [{ translateX: animated }], }}
      />
    </View>
  );
};

const calculateStarPoints = (centerX, centerY, arms, outerRadius, innerRadius) => {
  let results = '';
  const angle = Math.PI / arms;

  for (let i = 0; i < 2 * arms; i++) {
    const r = (i % 2 === 0) ? outerRadius : innerRadius;
    const currX = centerX + Math.cos(i * angle) * r;
    const currY = centerY + Math.sin(i * angle) * r;
    results += `${currX},${currY} `;
  }
  return results.trim();
};

const Badge = ({ number, x, y, animated }) => {

  const getTextStyle = () => {
    const length = number.toString().length;
    let leftPosition = 34;

    if (length === 1) {
      leftPosition = 36;
    } else if (length === 2) {
      leftPosition = 31;
    } else if (length === 3) {
      leftPosition = 27;
    }

    return {
      position: 'absolute',
      fontSize: 15,
      left: leftPosition,
      top: 21,
      fontWeight: '500',
      color: 'white'
    };
  };

  return (
    <View style={{ position: 'relative' }}>
      {/* Thanh điểm dài */}
      <GradientBar x={x} y={y} animated={animated} />
      <Svg style={{ position: 'relative' }}>
        <Polygon
          points={calculateStarPoints(40, 32, 8, 30, 20)}
          fill="#027CD1"
        />
      </Svg>
      <Svg style={{ position: 'absolute', }}>
        <Polygon
          points={calculateStarPoints(40, 32, 8, 21, 14)}
          fill="#0090FF"
          stroke="white"
          strokeWidth="2"
        />
      </Svg>
      <Text style={getTextStyle()}>
        {number}
      </Text>
    </View>
  );
};

function HomeScreen({ navigation }) {

  const defaultAvatarUri = 'https://res.cloudinary.com/dbfftqigf/image/upload/v1719194745/avatar-trang-2_byptft.jpg';
  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.playerDetail.userDetail);
  const listItem = useSelector((state) => state.getAllItem.listItem);
  const user = useSelector((state) => state.playerLog.user);

  useEffect(() => {
    dispatch(getAllItem(user.playerId));
  }, [user])


  const animatedLogin = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(animatedLogin, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedLogin]);

  const handleIconBack = () => {
    dispatch(resetLogin());
    dispatch(resetItem());
    // dispatch(resetDetail());
    navigation.navigate('Login');
  };

  const handleLogout = () => {
    Alert.alert('Hold on!', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => handleIconBack() },
    ]);
  }

  useEffect(() => {
    const backAction = () => {
      handleLogout();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        {/* Header */}
        <View style={{ flex: 3, elevation: 10, backgroundColor: 'white', borderTopEndRadius: 20, borderTopStartRadius: 20 }}>
          {/* Nút quay về */}
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={handleLogout}>
              <Icon name="back" size={45} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', columnGap: 10 }}>
            <View style={{ flex: 1, marginLeft: 10 }}>
              {/* Ảnh đại diện */}
              <LinearGradient
                colors={["#6F60E7", '#8752E4', '#A541E1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 3, alignSelf: 'center', borderRadius: 20, width: 140, height: 140 }}>
                <Image
                  source={{ uri: userDetail.currentAvatar ? userDetail.currentAvatar : defaultAvatarUri }}
                  style={{ width: '100%', height: '100%', borderRadius: 17 }}
                />
              </LinearGradient>
              {/* Điểm số theo cấp */}
              {userDetail &&
                <Text style={{ alignSelf: 'center', fontSize: 17, fontWeight: '500', color: '#55DAFF' }}>
                  {userDetail?.exp?.currentExp}/{userDetail?.exp?.maxExpOfLevel}
                </Text>
              }
              {/* Thanh ngôi sao và level */}
              {userDetail &&
                <Badge number={userDetail?.exp?.level} x={userDetail?.exp?.currentExp} y={userDetail?.exp?.maxExpOfLevel} animated={animatedLogin} />
              }
            </View>
            <View style={{ flex: 1 }}>
              {/* Tên người chơi */}
              <Text style={styles.text}>{userDetail.name}</Text>
              {/* Vàng hiện có */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Coin />
                <Text style={[styles.text, { marginLeft: 5 }]}>{userDetail.bcoin}</Text>
              </View>
              {/* Rank hiện tại */}
              {userDetail &&
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={{ uri: userDetail?.rank?.url }}
                    style={{ width: 40, height: 40 }} />
                  <Text style={{ fontSize: 20, color: 'black', textTransform: 'uppercase' }}>{userDetail?.rank?.name}</Text>
                </View>
              }
              {userDetail &&
                <Text style={{ alignSelf: 'flex-start', fontSize: 20, fontWeight: '500', color: 'black' }}>
                  BScore: {userDetail?.score}
                </Text>
              }
            </View>
          </View>
        </View>

        {/* List lịch sử */}
        <View style={{ flex: 4 }}>
        </View>

        {/* Để trống */}
        <View style={{ flex: 0.5 }}>
        </View>
      </View>
    </Background>
  );
}

export default HomeScreen;
