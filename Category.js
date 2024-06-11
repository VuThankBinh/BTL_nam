import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Header, Card, Button, Tile } from 'react-native-elements';
import { APIsURL, ImagesURL, formatPrice } from './Constants';
import { Picker } from '@react-native-picker/picker';

const TestScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const bannerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [sx, setSX] = useState(0);
    const [idloai, setIdloai] = useState(2);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [bannerIndex, setBannerIndex] = useState(0);
    const bannerImages = [
        "https://theme.hstatic.net/1000111569/1001042649/14/slide_index_1.jpg?v=23",
        "https://images.toplist.vn/images/800px/khan-phu-kien-730304.jpg",
        "https://scontent.fhph1-3.fna.fbcdn.net/v/t39.30808-6/353650114_630293449120475_2149482746043363141_n.png?stp=c0.5000x0.5000f_dst-png_e15_p1865x745_q60_tt1_u&efg=eyJ1cmxnZW4iOiJ1cmxnZW5fZnJvbV91cmwifQ&_nc_cid=0&_nc_ad=z-m&_nc_rml=0&_nc_ht=scontent.fhph1-3.fna&_nc_cat=103&_nc_ohc=ZqpmwCTuI1kQ7kNvgGgHS0c&ccb=1-7&_nc_sid=5f2048&oh=00_AYA9Pzw4_eJanBHZQDJ0qrq68GTg5iAZUzcxsArHS4mjZg&oe=666C2804",
    ];
    useEffect(() => {
        if (bannerRef.current) {
            bannerRef.current.scrollToIndex({ index: bannerIndex, animated: true });
        }
        const intervalId = setInterval(() => {
            setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [bannerIndex]);
    useEffect(() => {
        fetchProducts();
    }, [pageIndex, sx, minPrice, maxPrice]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                APIsURL + `/api/products/${idloai}/4/${pageIndex}/${sx}/${minPrice}/${maxPrice}`
            );
            const data = await response.json();
            setProducts(data.products);
            // console.log(data);
            setMaxPage(data.in4.maxPage);
            setMaxPrice(data.in4.maxPrice);
            setMinPrice(data.in4.minPrice);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (pageIndex < maxPage) {
            setPageIndex(pageIndex + 1);
        }
    };

    const handleBack = () => {
        if (pageIndex > 1) {
            setPageIndex(pageIndex - 1);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles2.product} onPress={() => navigation.navigate('BookDetailStackNavigator', { screen: 'BookDetail', params: { id: item.id } })}>
            <View>
                
                <Image source={{ uri: ImagesURL + '/' + item.anh_dai_dien.toString().trim() }} style={styles2.productImage} />
                <Card.Divider />
                <Text style={styles2.productName} numberOfLines={1}>{item.id}</Text>
                <Text style={styles2.productName} numberOfLines={1}>{item.ten_sp.length > 30 ? item.ten_sp.slice(0, 25) + '...' : item.ten_sp}</Text>
                <View style={styles2.priceContainer}>
                    <Text style={styles2.price}>{item.gia_ban}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        <ScrollView style={styles.container}>
            <View style={styles.bannerContainer}>
            <Image source={{ uri: ImagesURL+'/'+'banner.png' }} style={styles.bannerImage} />
            </View>
            <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold', fontSize: 20 }}>Danh sách các sản phẩm</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={sx}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSX(itemValue)}
                >
                    <Picker.Item label="Giá tăng dần" value={1} style={styles.pickerItem} />
                    <Picker.Item label="Giá giảm dần" value={2} style={styles.pickerItem} />
                </Picker>
            </View>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    numColumns={2}
                />
            )}
            <View style={styles.buttonContainer}>
                <Button title="<" onPress={handleBack} disabled={pageIndex === 1} buttonStyle={styles.button} />
                <Text style={styles.pageInfo}>{pageIndex}/{maxPage}</Text>
                <Button title=">" onPress={handleNext} disabled={pageIndex === maxPage} buttonStyle={styles.button} />
            </View>
        </ScrollView>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 10,
        width: '50%',
        alignSelf: 'flex-end',
    },
    picker: {
        height: 50,
        width: '100%',
        color: 'black',
        marginBottom: 5,
    },
    pickerItem: {
        color: 'black',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    sliderContainer: {
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 10,
        width: '30%',
        marginRight:30,
        alignSelf: 'flex-end',
    },
    picker: {
        height: 50,
        width: '100%',
        color: 'black',
        marginBottom: 5,
    },
    pickerItem: {
        color: 'black',
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
    },
    button: {
        backgroundColor: 'black',
        marginHorizontal: 10,
    },
    pageInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: 10,
    },
    bannerContainer: {
        height: 200,
        marginBottom: 10,
    },
    bannerImage: {
        width: Dimensions.get('window').width,
        height: 200,
        resizeMode: 'cover',
    },
});
const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    discountBadge: {
        position: 'absolute',
        top: 20,
        right: -10,
        zIndex: 1000,
        backgroundColor: 'red',
        borderRadius: 100,
        padding: 10,
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
        paddingRight: 5,
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
        alignSelf: 'center',
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
        color: 'purple',
        fontSize: 16,
        fontWeight: 'bold',
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        marginLeft: 10,
        color: 'grey',
    },
});
export default TestScreen;
