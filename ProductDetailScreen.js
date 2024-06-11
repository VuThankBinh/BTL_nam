import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from './Header';
import { ipV4 } from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route }) => {
    const { productId } = route.params; // Lấy id sản phẩm từ route.params
    const [product, setProduct] = useState('');
    var [mainImage, setMainImage] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        GetSP();
    }, []);

    const GetSP = async () => {
        try {
            const response = await fetch(ipV4 + `:5000/sanphams/${productId}`);
            const data = await response.json();
            setProduct(data);
            setMainImage(data.anh_dai_dien);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products: ', error);
            setLoading(false);
        }
    };

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (quantity < 10) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const thumbnails = product.hinh_anh;

    const addToCart = async (item) => {
        try {
            let cartItems = await AsyncStorage.getItem('cartItems_Nam');
            cartItems = cartItems ? JSON.parse(cartItems) : [];

            const index = cartItems.findIndex(cartItem => cartItem.id === item.id);
            if (index > -1) {
                cartItems[index].quantity += item.quantity;
            } else {
                cartItems.push(item);
            }

            await AsyncStorage.setItem('cartItems_Nam', JSON.stringify(cartItems));
            alert('Added to cart!');
        } catch (error) {
            console.error('Error adding to cart: ', error);
        }
    };

    const [viewHeight, setViewHeight] = useState(200);
    const [maxHeight, setMaxHeight] = useState(null);

    const handleShowMore = () => {
        if (viewHeight + 200 <= maxHeight) {
            setViewHeight(viewHeight + 200);
        } else {
            setViewHeight(maxHeight);
        }
    };

    const handleShowLess = () => {
        setViewHeight(200); // Đặt lại chiều cao về giá trị ban đầu
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView>
                <Header />
                <View style={styles.container}>
                    <Image source={{ uri: ipV4 + '/img_react/' + mainImage }} style={styles.mainImage} />
                    <ScrollView horizontal={true} style={styles.thumbnailsContainer} showsHorizontalScrollIndicator={false}>
                        {thumbnails && thumbnails.map((thumbnail, index) => (
                            <TouchableOpacity key={index} onPress={() => setMainImage(thumbnail)}>
                                <Image source={{ uri: ipV4 + '/img_react/' + thumbnail }} style={styles.thumbnail} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Text style={styles.productTitle}>{product.ten_sp}</Text>
                    <Text style={styles.productPrice}>{formatPrice(product.gia_ban)}</Text>
                    <Text style={{ marginTop: 20, fontSize: 18, color: 'black' }}>Còn: <Text style={{ fontWeight: 'bold' }}>{product.soluong}</Text></Text>
                    <View style={styles.quantityContainer}>
                        <Text style={styles.quantityText}>Số lượng</Text>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityValue}>{quantity}</Text>
                            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart({ id: product.id, name: product.ten_sp, price: product.gia_ban, quantity: quantity, image: product.anh_dai_dien })}>
                        <Text style={styles.addToCartText}>🛒 THÊM VÀO GIỎ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addToCartButton2}>
                        <Text style={styles.addToCartText}>🛒 MUA NGAY</Text>
                    </TouchableOpacity>
                </View>
                <Image source={{ uri: ipV4 + '/img_react/luu_y.png' }} style={{ width: '100%', height: 162, backgroundColor: '#fff' }}></Image>
                <Image source={{ uri: ipV4 + '/img_react/luu_y2.png' }} style={{ width: '100%', height: 238, marginTop: 20, backgroundColor: '#fff' }}></Image>
                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'condensed', marginTop: 10, marginLeft: 5 }}>Mô tả sản phẩm 🔥</Text>
                <View
                    style={[styles.expandableView, { height: viewHeight > 200 ? viewHeight : 'auto' }]}
                    onContentSizeChange={(width, height) => {
                        if (maxHeight == null) {
                            setMaxHeight(height);
                            setViewHeight(200);
                            console.log('Max height:', height);
                        }
                    }}
                >
                    {thumbnails && thumbnails.map((thumbnail, index) => (
                        <Image key={index} source={{ uri: ipV4 + '/img_react/' + thumbnail }} style={{ width: "100%", height: 400, marginTop: 10 }} />
                    ))}
                    <Text style={styles.text2}>
                        Mô tả: {product.mo_ta}
                    </Text>
                </View>
                {maxHeight !== null && (
                    <Button
                        title={viewHeight < maxHeight ? "Show More" : "Show Less"}
                        onPress={viewHeight < maxHeight ? handleShowMore : handleShowLess}
                    />
                )}
                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'condensed', marginTop: 10, marginLeft: 5 }}>Đánh giá</Text>
                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'condensed', marginTop: 10, marginLeft: 5 }}>Sản phẩm tương tự</Text>
                <Image source={{ uri: ipV4 + '/img_react/footer.png' }} style={{ width: '100%', height: 600, marginTop: 20, backgroundColor: '#fff' }}></Image>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
    },
    mainImage: {
        width: '100%',
        height: 400,
        marginTop: 20,
    },
    thumbnailsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    thumbnail: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginLeft: 10,
    },
    expandableView: {
        overflow: 'hidden',
    },
    text2: {
        marginTop: 10,
        fontSize: 16,
        color: 'black'
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'black',
    },
    productPrice: {
        fontSize: 20,
        color: '#E91E63',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    quantityText: {
        fontSize: 16,
        marginRight: 10,
        color: 'black',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderColor: 'gray',
        borderWidth: 1,
    },
    quantityButtonText: {
        fontSize: 18,
        color: 'black',
    },
    quantityValue: {
        fontSize: 16,
        color: 'black',
        borderColor: 'gray',
        borderWidth: 1,
        paddingVertical: 3,
        paddingHorizontal: 8,
    },
    addToCartButton: {
        backgroundColor: '#1E90FF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    addToCartButton2: {
        backgroundColor: '#FF6347',
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductDetailScreen;
