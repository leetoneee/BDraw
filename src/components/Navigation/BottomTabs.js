import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import HistoryScreen from '../../screens/HistoryScreen';
import ShopScreen from '../../screens/ShopScreen';
import ChooseMode from '../../screens/ChooseMode';
import Icon from 'react-native-vector-icons/AntDesign';
import History from 'react-native-vector-icons/Octicons';
import Inventory from 'react-native-vector-icons/MaterialIcons';
import Cart from 'react-native-vector-icons/AntDesign';
import Setting from 'react-native-vector-icons/SimpleLineIcons';
import { Svg, Path } from 'react-native-svg';

const Tab = createBottomTabNavigator();

const BottomTabs = ({ props }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#F8F9D7',
                    margin: 15,
                    borderBottomEndRadius: 15,
                    borderBottomStartRadius: 15,
                    borderTopEndRadius: 5,
                    borderTopStartRadius: 5,
                    position: 'absolute',
                    height: 50,
                }
            }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => <Icon name="home" size={30} color={focused ? "blue" : ''} />
            }} />
            <Tab.Screen name="History" component={HistoryScreen} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => <History name="history" size={30} color={focused ? "blue" : ''} />
            }} />
            <Tab.Screen name="Inventory" component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => <Inventory name="inventory" size={30} color={focused ? "blue" : ''} />
            }} />
            <Tab.Screen name="Shop" component={ShopScreen} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => <Cart name="shoppingcart" size={30} color={focused ? "blue" : ''} />
            }} />
            <Tab.Screen name="Setting" component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => <Setting name="settings" size={30} color={focused ? "blue" : ''} />
            }} />
            <Tab.Screen name="Play" component={ChooseMode} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={focused ? "blue" : 'white'}
                    stroke="black"
                    strokeWidth={1}
                    width={35}
                    height={35}
                    className="size-6"
                    viewBox="0 0 24 24"
                    {...props}
                >
                    <Path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                    />
                </Svg>
            }} />
        </Tab.Navigator>
    );
}
export default BottomTabs;