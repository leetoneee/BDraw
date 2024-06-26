import {
  Text,
  View,
  Button,
  Image, TouchableOpacity, Animated, ScrollView, FlatList
} from "react-native";
import Svg, { Polygon, Defs, Rect, Stop, LinearGradient as LNG } from 'react-native-svg';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
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
import axios from '../../services/axios';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { formatDate } from "../../utils/displayDate";

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

const HistoryItem = ({ rank, score, playerId, isAFK }) => {
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

  const [playerName, setPlayerName] = useState([]);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const res = await axios.get(`/player/detail/${playerId}`);
        setPlayerName(res.data.player);
      } catch (error) {
        console.error('Failed to fetch player details:', error);
      }
    };

    fetchPlayerData();
  }, [playerId]);

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
          <View
            style={{
              flex: 1,
              backgroundColor,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 10,
              overflow: 'hidden',
            }}
          >
            {/* ảnh huân chương Top 1, Top 2 */}
            <View style={{ justifyContent: 'center', alignSelf: 'center', }}>
              {renderTopRank(rank)}
            </View>

            {/* Điểm và Tên người dùng */}
            <View style={{ alignItems: 'center', }}>
              <Text style={{ fontSize: 22, color: 'black', fontWeight: '500' }}>{playerName.name}</Text>
              <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>Score: {score}</Text>
            </View>
          </View>
        </LinearGradient>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            overflow: 'hidden',
            borderRadius: 27,
          }}
        >
          {isAFK === 0 ? (
            <View style={{ flex: 2, height: 60, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
              {/* Chữ Top 3, Top 4 */}
              <Svg>
                <Defs>
                  <LNG id="grad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#e0e0e0" />
                    <Stop offset="1" stopColor="#b0bec5" />
                  </LNG>
                </Defs>
                <Polygon
                  points={calculateStarPoints(75, 30, 4, 25, 15)}
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
                  left: width * 0.185,
                }}
              >
                {rank}
              </Text>
            </View>
          ) : (
            // AFK
            <View style={{ flex: 2, alignItems: 'center' }}>
              <IconOcticons name="alert" size={45} color="red" />
            </View>
          )}

          {/* Điểm và Tên người dùng */}
          <View style={{ flex: 2, marginLeft: '7%', alignItems: 'center', }}>
            <Text style={{ fontSize: 22, color: 'black', fontWeight: 500 }}>{playerName.name}</Text>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 500 }}>Score: {score}</Text>
          </View>
        </View>
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
        <HistoryItem rank={item.top} score={item.gainedScore} playerId={item.playerId} isAFK={item.isAFK} />
      )}
    />
  );
};

function HistoryMatch({ navigation }) {

  // useEffect(() => {
  //     axios.get('https://666478dc932baf9032ab2e8d.mockapi.io/api/v1/huhu')
  //     .then((respone) =>
  //     console.log(respone.data)
  //     )
  //     .catch((err) => console.log(err)
  //     )
  // }, []);

  const route = useRoute();
  const { rank, score, date, isAFK, matchId, playerId } = route.params;

  const userDetail = useSelector((state) => state.playerDetail.userDetail);

  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const res = await axios.get(`/match/detail/${matchId}`);
        setHistoryData(res.data.matchResult);
      } catch (error) {
        console.error('Failed to fetch match details:', error);
      }
    };
    fetchHistoryData();
  }, [matchId]);

  return (
    <Background>
      <View style={styles.container}>

        <View style={{ flex: 1, elevation: 10, backgroundColor: 'white', }}>
          {/* Nút quay về */}
          <View style={{ alignItems: 'flex-start', margin: 5 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <Icon name="back" size={45} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.text, { textAlign: 'center', marginTop: 15 }]}>{formatDate(date)}</Text>
        </View>

        {/* List lịch sử */}
        <View style={{ flex: 3 }}>
          <HistoryList data={historyData} />
        </View>

      </View>
    </Background>
  );
}

export default HistoryMatch