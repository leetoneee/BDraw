import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import ChooseMode from '../../screens/ChooseMode';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    marginVertical: 15,
                    marginHorizontal: 20,
                    borderRadius: 15,
                    position: 'absolute',
                    height: 50,
                }
            }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false,
                tabBarIcon:({focused}) => <Icon name="home" size={30} color={focused ? "blue" : ''}/>
             }} />
            <Tab.Screen name="ChooseMode" component={ChooseMode} options={{ headerShown: false,
                tabBarIcon:({focused}) => <Icon name="home" size={30} color={focused ? "blue" : ''}/>
             }} />
        </Tab.Navigator>
    );
}
export default BottomTabs;