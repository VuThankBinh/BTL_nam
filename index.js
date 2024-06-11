/**
 * @format
 */

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, AppRegistry, FlatList, TouchableOpacity, Image } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import { name as appName } from './app.json';
import Header from './Header';
import Banner from './Banner';
import CategoryList from './CategoryList';
import { ipV4 } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailScreen from './ProductDetailScreen';
import OffersScreen from './OffersScreen';
import MembershipScreen from './MembershipScreen';
import Cart from './CartScreen';
import AccountScreen from './AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Register from './Register';


const TrangChu = ({ navigation }) => {
    const [products1, setProducts1] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetSP1();
        GetSP2();
    }, []);

    const GetSP1 = async () => {
        try {
            const response = await fetch(ipV4 + `:5000/sanphams/loai/1?pageNumber=1&pageSize=4`);
            const data = await response.json();
            setProducts1(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products: ', error);
            setLoading(false);
        }
    };

    const GetSP2 = async () => {
        try {
            const response = await fetch(ipV4 + `:5000/sanphams/loai/2?pageNumber=1&pageSize=4`);
            const data = await response.json();
            setProducts2(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products: ', error);
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.product} onPress={() => navigation.navigate('Details', { productId: item.id })}>
            <View>
                <Image source={{ uri: ipV4 + '/img_react/' + item.anh_dai_dien }} style={styles.productImage} />
                <Card.Divider />
                <Text style={styles.productName} numberOfLines={1}>{item.ten_sp.length > 30 ? item.ten_sp.slice(0, 25) + '...' : item.ten_sp}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{formatPrice(item.gia_ban)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView>
            <Header />
            <Banner />
            <CategoryList />
            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'condensed', alignSelf: 'center' }}>Bút 🔥</Text>
            <FlatList
                data={products1}
                renderItem={renderItem}
                keyExtractor={item => item.id} // Thêm keyExtractor
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={{ alignItems: 'flex-start' }}
            />
            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'condensed', alignSelf: 'center', marginTop: 20, }}>Văn phòng phẩm 🔥</Text>
            <FlatList
                data={products2}
                renderItem={renderItem}
                keyExtractor={item => item.id} // Thêm keyExtractor
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={{ alignItems: 'flex-start' }}
            />
            <Image source={{ uri: ipV4 + '/img_react/footer.png' }} style={{ width: '100%', height: 600 }}></Image>
        </ScrollView>
    );
}
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
    // <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ title: '', headerShown: false, }} />
        <Stack.Screen name="Register" component={Register} options={{ title: '', headerShown: false, }} />
        <Stack.Screen name="TrangChu" component={TrangChu} options={{ title: '', headerShown: false, }} />
        <Stack.Screen name="Details" component={ProductDetailScreen} options={{ title: '', headerShown: false, }} />
    </Stack.Navigator>
    /* </NavigationContainer> */
);

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? require('./home.png') : require('./home.png');
                        } else if (route.name === 'Offers') {
                            iconName = focused ? require('./discount.png') : require('./discount.png');
                        } else if (route.name === 'Membership') {
                            iconName = focused ? require('./member-card.png') : require('./member-card.png');
                        } else if (route.name === 'Cart') {
                            iconName = focused ? require('./cart.png') : require('./cart.png');
                        } else if (route.name === 'Account') {
                            iconName = focused ? require('./user.png') : require('./user.png');
                        }

                        return <Image source={iconName} style={styles.icon} />;
                    },
                    tabBarActiveTintColor: '#00f',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={({ navigation }) => ({ headerShown: false, })}
                />
                <Tab.Screen name="Offers" component={OffersScreen} options={{ headerShown: false, }} />
                <Tab.Screen name="Membership" component={MembershipScreen} options={{ headerShown: false, }} />
                <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false, }} />
                <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false, }} />
                {/* <Tab.Screen name='detail' component={ProductDetailScreen} options={{ headerShown: false, title:''}}></Tab.Screen> */}
            </Tab.Navigator>
        </NavigationContainer>
    );
}


export default App;
AppRegistry.registerComponent(appName, () => Login);
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 16,
        backgroundColor: '#fff',
        zIndex: 1000,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    banner: {
        height: 200,
        backgroundColor: '#00f',
        marginVertical: 16,
    },
    subheader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    dealSection: {
        height: 200,
        backgroundColor: '#f00',
        marginVertical: 16,
    },
    product: {
        borderRadius: 10,
        position: 'relative',
        width: '45%',
        margin: '2.5%',
        borderColor: '#ddd',
        backgroundColor: '#fff',
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
    discountText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    productImage: {
        width: 150,
        height: 150,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        alignSelf: 'center', // Căn giữa hình ảnh
    },
    productName: {
        fontSize: 12,
        color: 'black',

    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
    },

    title: {
        color: 'black', // Set text color to black
        fontSize: 24,
        fontWeight: 'bold',
    },
    productId: {
        color: 'black', // Set text color to black
        fontSize: 18,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});
