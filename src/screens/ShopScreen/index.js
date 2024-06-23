import {
  Text,
  View,
  Button,
  Image, TouchableOpacity, Animated, ScrollView, FlatList,
  TouchableHighlight
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Background from "../../components/Background";
import styles from "./styles";
import { Dropdown } from 'react-native-element-dropdown';
import IconBack from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import IconEntypo from 'react-native-vector-icons/Entypo';

const data = [
  { label: 'All Spirit', value: '1' },
  { label: 'Owned', value: '2' },
  { label: 'Not Owned', value: '3' },
];

function ShopScreen({ navigation }) {

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
            data={data}
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
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
          />
        </LinearGradient>
      </View>
    </Background>
  );
}

export default ShopScreen