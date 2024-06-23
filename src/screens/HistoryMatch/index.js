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
import Background from "../../components/Background";
import styles from "./styles";
import { height, width } from "../../constants";
import Coin from '../../assets/images/coin.svg'
import First_rank from '../../assets/images/first-rank.svg'
import Second_rank from '../../assets/images/second-rank.svg'
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

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

const HistoryItem = ({ rank, score, date }) => {
  let backgroundColor = '';
  let isGradient = false;

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
          style={{ borderRadius: 27, }}
        >
          <TouchableOpacity
            style={{
              backgroundColor,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 10,
              overflow: 'hidden',
            }}
            onPress={() => {
              console.log('View pressed');
            }}
          >
            {/* ảnh huân chương Top 1, Top 2 */}
            <View style={{ justifyContent: 'center', }}>
              {renderTopRank(rank)}
            </View>

            {/* Điểm và Ngày */}
            <View>
              <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>Score: {score}</Text>
              <Text style={{ fontSize: 22, color: 'black', fontWeight: '500' }}>{date}</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <TouchableOpacity style={{
          backgroundColor, flexDirection: 'row', justifyContent: 'space-around',
          padding: 10, borderRadius: 27, overflow: 'hidden',
        }}
          onPress={() => { console.log('View pressed'); }}
        >

          {/* Chữ Top 3, Top 4 */}
          <Svg style={{}}>
            <Defs>
              <LNG id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#e0e0e0" />
                <Stop offset="1" stopColor="#b0bec5" />
              </LNG>
            </Defs>
            <Polygon
              points={calculateStarPoints(97, 30, 4, 25, 15)}
              fill="url(#grad)"
            />
          </Svg>
          <Text style={{ position: 'absolute', fontSize: 25, left: 53.5, top: 22, fontWeight: '500', fontFamily: 'verdana', color: 'white' }}>
            {rank}
          </Text>

          {/* Điểm và Ngày */}
          <View>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 500 }}>Score: {score}</Text>
            <Text style={{ fontSize: 22, color: 'black', fontWeight: 500 }}>{date}</Text>
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
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <HistoryItem rank={item.rank} score={item.score} date={item.date} />
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

  const historyData = [
    { id: '1', rank: 1, score: 150, date: '30/05/2024 20:30' },
    { id: '2', rank: 2, score: 100, date: '30/05/2024 20:00' },
    { id: '3', rank: 3, score: 75, date: '30/05/2024 19:30' },
    { id: '4', rank: 4, score: 50, date: '30/05/2024 19:00' },
    // Thêm dữ liệu khác ở đây
  ];

  return (
    <Background>
      <View style={styles.container}>

        <View style={{ flex: 1, elevation: 10, backgroundColor: 'white', }}>
          {/* Nút quay về */}
          <TouchableOpacity
            style={{ alignItems: 'flex-start', margin: 5 }}
            onPress={() => navigation.goBack()}>
            <Icon name="back" size={45} color="black" />
          </TouchableOpacity>
          <Text style={[styles.text, { textAlign: 'center' }]}>MatchID</Text>
          <Text style={[styles.text, { textAlign: 'center' }]}>MatchID</Text>
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