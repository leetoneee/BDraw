import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Background from "../../components/Background";
import styles from "./styles";
import { Dropdown } from 'react-native-element-dropdown';
import IconBack from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import Coin from '../../assets/images/coin.svg'

const choice = [
  { label: 'All Spirit', value: '1' },
  { label: 'Owned', value: '2' },
  { label: 'Not Owned', value: '3' },
];

const AvtItem = ({ name, url, price }) => {
  const navigation = useNavigation();

  return (
    <View style={{
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 20,
      marginHorizontal: 10,
      overflow: 'hidden'
    }}>
      <View style={{ width: '100%', height: 240, flexDirection: 'column' }}>
        <FastImage
          source={{ uri: url }}
          style={{ width: '100%', height: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, flex: 1 }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{ flexDirection: 'row', width: '100%', columnGap: 3 }}>

          {/* Tên nhân vật */}
          <View style={{ width: '100%', flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>{name}</Text>
          </View>

          {/* Giá nhân vật */}
          <View style={{ width: '100%', flex: 1, flexDirection: 'row', backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <Coin />
            <Text style={{ color: '#BDA067', fontSize: 30, marginLeft: 10 }}>{price}</Text>
          </View>

        </View>

      </View>
    </View>
  );
};

const ListAvt = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.avatarId.toString()}
      renderItem={({ item }) => (
        <AvtItem name={item.name} url={item.url} price={item.price} />
      )}
    />
  );
};

function ShopScreen({ navigation }) {

  const listItem = useSelector((state) => state.getAllItem.listItem);
  console.log("🚀 ~ ShopScreen ~ listItem:", listItem)

  const [value, setValue] = useState('1');
  const [isFocus, setIsFocus] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    filterItems(value);
  }, [listItem, value]);

  const filterItems = (value) => {
    if (!Array.isArray(listItem)) {
      return [];
    }
    switch (value) {
      case '2':
        setFilteredList(listItem.filter(item => item.isBought));
        break;
      case '3':
        setFilteredList(listItem.filter(item => !item.isBought));
        break;
      case '1':
      default:
        setFilteredList(listItem);
        break;
    }
  };

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemTextStyle}>{item.label}</Text>
        {item.value === value && (
          <IconEntypo
            style={styles.icon}
            color="#72BF00"
            name="check"
            size={25}
          />
        )}
      </View>
    );
  };

  return (
    <Background>
      <View style={styles.container}>

        {/* Header */}
        <View style={{ flex: 1, elevation: 10, backgroundColor: 'white', borderTopEndRadius: 20, borderTopStartRadius: 20 }}>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => navigation.goBack()}>
            <IconBack name="back" size={45} color="black" />
          </TouchableOpacity>

          <LinearGradient
            colors={["#6F60E7", '#8752E4', '#A541E1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 3, borderRadius: 10, marginHorizontal: 10 }}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.placeholderStyle}
              iconStyle={styles.iconStyle}
              iconColor="black"
              data={choice}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Select item'}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
              renderItem={renderItem}
            />
          </LinearGradient>
        </View>

        {/* List avt */}
        <View style={{ flex: 4 }}>
          <ListAvt data={filteredList} />
        </View>

        {/* Để trống */}
        <View style={{ flex: 0.5 }}>
        </View>
      </View>
    </Background>
  );
}

export default ShopScreen
