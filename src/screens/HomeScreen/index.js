import {
    Text,
    View,
    Button
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../redux/counterSlice/counterSlice";

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