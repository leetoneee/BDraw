import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Background from "../../components/Background";
import styles from "./styles";
import { Dropdown } from 'react-native-element-dropdown';
import IconBack from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import Coin from '../../assets/images/coin.svg'
import axios from "../../services/axios";
import { Dialog, Portal, Snackbar } from 'react-native-paper';
import { getAllItem } from '../../redux/items/getAllItemsSlice/getAllItemsSlice';
import AvatarModal from '../../components/AvatarModal/index';

const choice = [
  { label: 'All Spirit', value: '1' },
  { label: 'Owned', value: '2' },
  { label: 'Not Owned', value: '3' },
];

const AvtItem = ({ name, url, price, avatarId, isBought, userDetail, item }) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const [isPress, setIsPress] = useState(false);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const hideDialog = async () => {
    setVisible(false);
  }

  useEffect(() => {
    if (status) {
      setSnackbarVisible(true);
    }
  }, [status]);

  const onDismissSnackBar = () => {
    setStatus('');
    setSnackbarVisible(false);
  }

  const handleBuyItem = async () => {

    if (userDetail.bcoin < price) {
      setStatus('Error: Current Bcoin is not enough to purchase this item');
    }

    const dataInput = {
      playerId: userDetail.playerId,
      itemId: avatarId,
    };

    try {
      let res = await axios.post('/player/buy-item', dataInput);
      console.log('Response:', res.data);
      // Xử lý phản hồi từ API nếu cần
    } catch (error) {
      console.error('Failed to buy item:', error);
    }

    setVisible(false);
    dispatch(getAllItem(userDetail.playerId));
  };

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

        {/* Ảnh nhân vật */}
        <TouchableWithoutFeedback onPress={toggleModal}
          style={{   width: '100%', height: '100%', flex: 1, }}>
          <FastImage
            source={{ uri: url }}
            style={{ width: '100%', height: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, flex: 1 }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableWithoutFeedback>

        <View style={{ flexDirection: 'row', width: '100%', columnGap: 3, }}>

          {/* Tên nhân vật */}
          <View style={{ width: '100%', flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 20 }}>
            <Text style={{ color: 'white', fontSize: 20 }}>{name}</Text>
          </View>

          {/* Giá nhân vật */}
          {isBought ? (
            <View
              style={{ width: '100%', flex: 1, flexDirection: 'row', backgroundColor: '#00000099', justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 20, }}>
              <Coin />
              <Text style={{ color: '#BDA067', fontSize: 30, marginLeft: 10 }}>{price}</Text>
              <View style={{ width: '100%', height:'100%', backgroundColor: '#000000b3', borderBottomRightRadius: 20, position: 'absolute' }}/>
            </View>
          ) : (
            <TouchableOpacity
              style={{ width: '100%', flex: 1, flexDirection: 'row', backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 20, }}
              onPress={() => setVisible(true)}>
              <Coin />
              <Text style={{ color: '#BDA067', fontSize: 30, marginLeft: 10 }}>{price}</Text>
            </TouchableOpacity>
          )
          }
        </View>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
      >
        <Text Text style={{ fontFamily: 'verdana', color: '#fff', fontSize: 13 }}>{status}</Text>
      </Snackbar>

      {/* Xác nhận mua */}
      {visible &&
        <Portal>
          <Dialog style={{ width: '80%', alignSelf: 'center', alignItems: 'center' }}
            visible={visible} onDismiss={hideDialog}  >
            <View >
              <IconSimpleLineIcons name='question' color='#6a0dad' size={40} />
            </View>
            <Text style={{ fontSize: 30, color: 'black' }}>Are you sure to buy</Text>
            <Text style={{ fontSize: 30, color: '#BDA067' }}>{name}</Text>
            <View style={{ flexDirection: 'row', columnGap: 5, marginTop: 5 }}>
              <Text style={{ fontSize: 20, color: 'black', }}>Balance:</Text>
              <Coin />
              <Text style={{ fontSize: 20, color: 'black', }}>{userDetail.bcoin}</Text>
            </View>

            <View style={{ flexDirection: 'row', columnGap: 25, marginVertical: 10, }}>
              <TouchableOpacity onPress={handleBuyItem}
                style={{ width: 120, alignItems: 'center', }}>
                <LinearGradient
                  colors={['#A541E1', '#8752E4', '#6F60E7']}
                  style={{ borderRadius: 30 }}>
                  <Text style={{ fontSize: 20, color: 'white', marginVertical: 10, marginHorizontal: 15 }}>Confirm</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ width: 120, backgroundColor: '#6B7E84', alignItems: 'center', borderRadius: 100 }}
                onPress={hideDialog}>
                <Text style={{ fontSize: 20, color: 'white', marginVertical: 10 }}>Cancel</Text>
              </TouchableOpacity>
            </View>

          </Dialog>
        </Portal>
      }
      {isModalVisible && <AvatarModal isVisible={isModalVisible} onClose={toggleModal} item={item} />}
      
    </View>

  );
};

const ListAvt = ({ data, userDetail }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.avatarId.toString()}
      renderItem={({ item }) => (
        <AvtItem name={item.name} url={item.url} price={item.price} avatarId={item.avatarId} isBought={item.isBought} userDetail={userDetail} item={item} />
      )}
    />
  );
};

function ShopScreen({ navigation }) {

  const listItem = useSelector((state) => state.getAllItem.listItem);
  const userDetail = useSelector((state) => state.playerDetail.userDetail);

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
              placeholder={'All Spirit'}
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
          <ListAvt data={filteredList} userDetail={userDetail} />
        </View>

        {/* Để trống */}
        <View style={{ flex: 0.5 }}>
        </View>
      </View>
    </Background>
  );
}

export default ShopScreen
