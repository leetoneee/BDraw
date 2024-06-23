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
  
  const GradientBar = ({ x, y, animated }) => {
    return (
      <View style={{ position: 'absolute', left: 45, top: 13, height: 30, width: 100, borderWidth: 1, borderColor: 'black', borderRadius: 100, overflow: 'hidden', }}>
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
    return (
      <View style={{ position: 'relative' }}>
        {/* Thanh điểm dài */}
        <GradientBar x={x} y={y} animated={animated} />
        <Svg style={{ position: 'relative' }}>
          <Polygon
            points={calculateStarPoints(40, 28, 8, 27, 17)}
            fill="#027CD1"
          />
        </Svg>
        <Svg style={{ position: 'absolute', }}>
          <Polygon
            points={calculateStarPoints(40, 28, 8, 19, 11)}
            fill="#0090FF"
            stroke="white"
            strokeWidth="2"
          />
        </Svg>
        <Text style={{ position: 'absolute', fontSize: 20, left: 34, top: 14, fontWeight: '500', color: 'white' }}>
          {number}
        </Text>
      </View>
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
  
    const [currentScore, setCurrentScore] = useState(100);
    const [defaultScore, setDefaultScore] = useState(200);
  
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
          <View style={{ flex: 2.7, elevation: 10, backgroundColor: 'white', }}>
            {/* Nút quay về */}
            <TouchableOpacity
              style={{ alignItems: 'flex-end' }}
              onPress={() => navigation.goBack()}>
              <Icon name="back" size={45} color="black" />
            </TouchableOpacity>
  
            <View style={{ flex: 1, flexDirection: 'row', columnGap: 10, }}>
              <View style={{ flex: 1, marginLeft: 10 }}>
  
                {/* Ảnh đại diện */}
                <LinearGradient
                  colors={["#6F60E7", '#8752E4', '#A541E1']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ padding: 3, borderRadius: 20, width: 140, height: 140, }}>
                  <Image source={{ uri: 'https://res.cloudinary.com/dbfftqigf/image/upload/v1719025015/Platinum.jpg' }}
                    style={{ width: '100%', height: '100%', borderRadius: 17, }} />
                </LinearGradient>
  
                {/* Điểm số theo cấp */}
                <Text style={{ alignSelf: 'center', fontSize: 17, fontWeight: 500, color: '#55DAFF' }}>{currentScore}/{defaultScore}</Text>
  
                {/* Thanh ngôi sao và số */}
                <Badge number={5} x={currentScore} y={defaultScore} animated={animatedLogin} />
              </View>
              <View style={{ flex: 1, }}>
  
                {/* Tên người chơi */}
                <Text style={styles.text}>huy</Text>
  
                {/* Vàng hiện có */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Coin />
                  <Text style={[styles.text, { marginLeft: 5 }]}>2901</Text>
                </View>
  
                {/* Rank hiện tại */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={{ uri: 'https://thumbs.dreamstime.com/b/award-ribbons-white-background-st-rank-55140260.jpg?w=768' }}
                    style={{ width: 40, height: 40, backgroundColor: 'red' }} />
                  <Text style={[{ fontSize: 25, color: 'black' }]}>Challenge</Text>
                </View>
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
  
  export default HistoryScreen