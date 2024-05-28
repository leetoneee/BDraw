import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react'
import { Button, Text, View } from 'react-native';

function DetailResultScreen({ route }) {
    const navigation = useNavigation();

    const { index } = route.params;

    const handleGoBack = () => {
        const popAction = StackActions.pop(1);
        navigation.dispatch(popAction);
    };

    console.log("🚀 ~ DetailResultScreen ~ index:", index)

    return (
        <View>
            <Text>DetailResultScreen</Text>
            <Button title="Go back" onPress={handleGoBack} />
        </View>
    )
}

export default DetailResultScreen