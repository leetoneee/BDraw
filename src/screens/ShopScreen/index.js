import {
  Text,
  View,
  Button,
  Image, TouchableOpacity, Animated, ScrollView, FlatList
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Background from "../../components/Background";
import styles from "./styles";
import { Dropdown } from 'react-native-element-dropdown';
import IconBack from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

function ShopScreen({ navigation }) {

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
          style={{ padding: 3, borderRadius: 10, marginHorizontal: 10}}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select item'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
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