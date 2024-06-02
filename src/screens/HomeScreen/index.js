import {
    Text,
    View,
    Button,
    Image
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
                <Image
                    style={styles.logo}

                    source={{
                        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                    }}
                />
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
                <Button
                    onPress={() => navigation.navigate('ChooseMode')}
                    title="Play"
                />
                <Button
                    onPress={() => navigation.navigate('SinglePlayerGame')}
                    title="Open SinglePlayerGame"
                />
            </View>
        </Background>
    );
}

export default HomeScreen