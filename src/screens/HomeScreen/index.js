import {
    Text,
    View,
    Button
} from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../redux/counterSlice/counterSlice";
import { Icon, MD3Colors } from 'react-native-paper';

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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Count: {count}</Text>
            <Text>Home Screen</Text>
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
    );
}

export default HomeScreen