import {
  Text,
  View,
  Button,
  Image, TouchableOpacity, Animated, ScrollView, FlatList, StyleSheet
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Svg, { Polygon, Defs, Rect, Stop, LinearGradient as LNG } from 'react-native-svg';
import { decrement, increment } from "../../redux/counterSlice/counterSlice";
import { MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import IconOcticons from 'react-native-vector-icons/Octicons';
import Background from "../../components/Background";
import styles from "./styles";
import { height, width } from "../../constants";
import Coin from '../../assets/images/coin.svg'
import First_rank from '../../assets/images/first-rank.svg'
import Second_rank from '../../assets/images/second-rank.svg'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import HistoryMatch from "../HistoryMatch";
import { formatDate } from "../../utils/displayDate";

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

const HistoryItem = ({ rank, score, date, isAFK, matchId, playerId }) => {
  const navigation = useNavigation();

  let backgroundColor = '';
  let isGradient = false;
  if (isAFK === 0) {
    if (rank === 1) {
      isGradient = true;
    } else if (rank === 2) {
      isGradient = true;
    } else if (rank === 3) {
      backgroundColor = '#828282';
    }
    else if (rank === 4) {
      backgroundColor = '#828282';
    }
  }
  else {
    backgroundColor = '#828282';
  }

  return (
    <LinearGradient
      colors={["#6F60E7", '#8752E4', '#A541E1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 30, margin: 10, padding: 3 }}>
      {isGradient ? (
        <LinearGradient
          colors={['#7BE6F0', '#8A97BE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 27 }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 10,
              overflow: 'hidden',
            }}
            onPress={() => navigation.navigate('HistoryMatch', { rank, score, date, isAFK, matchId, playerId })}
          >
            {/* ảnh huân chương Top 1, Top 2 */}
            <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
              {renderTopRank(rank)}
            </View>

            {/* Điểm và Ngày */}
            <View>
              <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>Score: {score}</Text>
              <Text style={{ fontSize: 22, color: 'black', fontWeight: '500' }}>{formatDate(date)}</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor,
            flexDirection: 'row',
            padding: 10,
            borderRadius: 27,
            overflow: 'hidden',
          }}
          onPress={() => navigation.navigate('HistoryMatch', { rank, score, date, isAFK, matchId, playerId })}
        >
          {isAFK === 0 ? (
            <View style={{ flex: 1, height: 60, justifyContent: 'center' }}>
              {/* Chữ Top 3, Top 4 */}
              <Svg>
                <Defs>
                  <LNG id="grad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#e0e0e0" />
                    <Stop offset="1" stopColor="#b0bec5" />
                  </LNG>
                </Defs>
                <Polygon
                  points={calculateStarPoints(55, 30, 4, 25, 15)}
                  fill="url(#grad)"
                />
              </Svg>
              <Text
                style={{
                  fontSize: 25,
                  position: 'absolute',
                  fontWeight: '500',
                  fontFamily: 'verdana',
                  color: 'white',
                  left: 46,
                }}
              >
                {rank}
              </Text>
            </View>
          ) : (
            // AFK
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <IconOcticons name="alert" size={45} color="red" />
            </View>
          )}

          {/* Điểm và Ngày */}
          <View style={{ flex: 2, marginLeft: '7%' }}>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 500 }}>Score: {score}</Text>
            <Text style={{ fontSize: 22, color: 'black', fontWeight: 500 }}>{formatDate(date)}</Text>
          </View>
        </TouchableOpacity>
      )}

    </LinearGradient>

  );
};

const renderTopRank = (rank) => {
  switch (rank) {
    case 1:
      return <First_rank />;
    case 2:
      return <Second_rank />;
  }
};

const HistoryList = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.joinId}
      renderItem={({ item }) => (
        <HistoryItem rank={item.top} score={item.gainedScore} date={item.createdAt} isAFK={item.isAFK} matchId={item.matchId} playerId={item.playerId} />
      )}
    />
  );
};

function HistoryScreen({ navigation }) {

  // useEffect(() => {
  //     axios.get('https://666478dc932baf9032ab2e8d.mockapi.io/api/v1/huhu')
  //     .then((respone) =>
  //     console.log(respone.data)
  //     )
  //     .catch((err) => console.log(err)
  //     )
  // }, []);

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.playerDetail.userDetail);
  const userHistory = useSelector((state) => state.playerHistory.userHistory);

  const [currentScore, setCurrentScore] = useState(userDetail.exp.currentExp);
  const [defaultScore, setDefaultScore] = useState(userDetail.exp.maxExpOfLevel);

  const defaultAvatarUri = 'https://res.cloudinary.com/dbfftqigf/image/upload/v1719194745/avatar-trang-2_byptft.jpg';

  const animatedLogin = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(animatedLogin, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

  }, [animatedLogin]);

  return (
    <Background>
      <View style={styles.container}>

        {/* Header */}
        <View style={{ flex: 3, elevation: 10, backgroundColor: 'white', borderTopEndRadius: 20, borderTopStartRadius: 20, }}>
          {/* Nút quay về */}
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <Icon name="back" size={45} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', columnGap: 10, }}>
            <View style={{ flex: 1, marginLeft: 10 }}>

              {/* Ảnh đại diện */}
              <LinearGradient
                colors={["#6F60E7", '#8752E4', '#A541E1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 3, alignSelf: 'center', borderRadius: 20, width: 140, height: 140, }}>
                <Image
                  source={{ uri: userDetail.currentAvatar ? userDetail.currentAvatar : defaultAvatarUri }}
                  style={{ width: '100%', height: '100%', borderRadius: 17 }}
                />
              </LinearGradient>

              {/* Điểm số theo cấp */}
              <Text style={{ alignSelf: 'center', fontSize: 17, fontWeight: 500, color: '#55DAFF' }}>{currentScore}/{defaultScore}</Text>

              {/* Thanh ngôi sao và level */}
              <Badge number={userDetail.exp.level} x={currentScore} y={defaultScore} animated={animatedLogin} />
            </View>
            <View style={{ flex: 1, }}>

              {/* Tên người chơi */}
              <Text style={styles.text}>{userDetail.name}</Text>

              {/* Vàng hiện có */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Coin />
                <Text style={[styles.text, { marginLeft: 5 }]}>{userDetail.bcoin}</Text>
              </View>

              {/* Rank hiện tại */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: userDetail.rank.url }}
                  style={{ width: 40, height: 40, }} />
                <Text style={[{ fontSize: 20, color: 'black', textTransform: 'uppercase' }]}>{userDetail.rank.name}</Text>
              </View>
              <Text style={{ alignSelf: 'flex-start', fontSize: 20, fontWeight: '500', color: 'black'}}>
                  Score: {userDetail?.score }
                </Text>
            </View>
          </View>
        </View>
        {/* List lịch sử */}
        <View style={{ flex: 4 }}>
          <HistoryList data={userHistory} />
        </View>

        {/* Để trống */}
        <View style={{ flex: 0.5 }}>
        </View>
      </View>
    </Background>
  );
}

export default HistoryScreen