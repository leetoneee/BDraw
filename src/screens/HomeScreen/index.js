import {
    Text,
    View,
    Button
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../redux/counterSlice/counterSlice";
import { Icon, MD3Colors } from 'react-native-paper';
import Background from "../../components/Background";
import styles from "./styles";
import { height, width } from "../../constants";

function HomeScreen({ navigation }) {
    const dispatch = useDispatch();

    const count = useSelector((state) => state.counter.value);

    const handleDecre = () => {
        dispatch(decrement());
    }

    const handleIncre = () => {
        dispatch(increment());
    }

    return (
        <Background>
            <View style={styles.container}>
                <Text style={{ fontFamily: 'VampiroOne-Regular' }}>Count: {count}</Text>
                <Text>Home Screen {height},{width}</Text>
                <Icon
                    source="camera"
                    color={MD3Colors.error50}
                    size={20}
                />
                <Button
                    title="Increment"
                    onPress={() => handleIncre()}
                />
                <Button
                    title="Decrement"
                    onPress={() => handleDecre()}
                />
                <Button
                    title="Go to Draw"
                    onPress={() => navigation.navigate('Draw')}
                />
            </View>
        </Background>
    );
}

export default HomeScreen