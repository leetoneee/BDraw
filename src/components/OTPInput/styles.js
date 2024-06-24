import { StyleSheet } from "react-native";
import { height, aspect_ratio } from "../../constants";

const margin_padding_20 = height * aspect_ratio;
const OTP_input_size = height * 0.0622;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: margin_padding_20,
  },

  input: {
    fontSize: 26,
    color: 'black',
    textAlign: 'center',
    borderColor: '#A541E1',
    borderWidth: 3,
    borderRadius: 10,
    height: OTP_input_size,
    width: OTP_input_size,
  }
});

export default styles;
