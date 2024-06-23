import {StyleSheet} from 'react-native';
import {height, width, aspect_ratio} from '../../constants';

const margin_padding_20 = height * aspect_ratio;
const border_radius_value = 10;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ImageContainer: {
    marginRight: margin_padding_20,
    borderColor: '#6a0dad',
    borderRadius: border_radius_value,
    overflow: 'hidden',
    backgroundColor: 'red',
  },

  ImageStyle: {
    width: height * 0.134,
    height: height * 0.091,
    resizeMode: 'cover'
  },

  NameContainer: {
    alignItems: 'center',
  },

  textStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
});

export default styles;
