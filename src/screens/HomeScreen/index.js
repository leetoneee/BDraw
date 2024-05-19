import {
    Text,
    View,
    Button
} from "react-native";

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Draw"
                onPress={() => navigation.navigate('Draw')}
            />
        </View>
    );
}

export default HomeScreen