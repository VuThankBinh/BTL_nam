import React, { useState, useEffect,useCallback  } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipV4 } from './app.json';
import { useFocusEffect } from '@react-navigation/native';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false); // Add this state variable

  useFocusEffect(
    useCallback(() => {
      const loadCartItems = async () => {
        try {
          let items = await AsyncStorage.getItem('cartItems_Nam');
          items = items ? JSON.parse(items) : [];
          setCartItems(items);
        } catch (error) {
          console.error('Error loading cart items: ', error);
        }
      };

      loadCartItems();
    }, [])
  );

  const updateQuantity = async (item, quantity) => {
    if (quantity <= 0) return;
    try {
      let items = cartItems.map(cartItem => {
        if (cartItem.id === item.id) {
          cartItem.quantity = quantity;
        }
        return cartItem;
      });
      setCartItems(items);
      await AsyncStorage.setItem('cartItems_Nam', JSON.stringify(items));
       // Trigger re-render
    } catch (error) {
      console.error('Error updating quantity: ', error);
    }
  };

  const removeItem = async (item) => {
    try {
      let items = cartItems.filter(cartItem => cartItem.id !== item.id);
      setCartItems(items);
      await AsyncStorage.setItem('cartItems_Nam', JSON.stringify(items));
      alert('Xóa sản phẩm thành công');
    } catch (error) {
      console.error('Error removing item: ', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0).toFixed(2);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Giỏ hàng trống</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: ipV4 + '/img_react/' + item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item, item.quantity - 1)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityButton}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item, item.quantity + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeItem(item)}>
          <Text style={styles.removeButton}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.headerr}>
        <View style={styles.headerContainer}>
          <Image source={require('./menu.png')} style={styles.menuIcon} />
          <Image source={require('./logo.png')} style={styles.logo} />
          <Image source={require('./cart.png')} style={styles.cartIcon} />
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={() => (
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total: {formatPrice(calculateTotal())}</Text>
              <TouchableOpacity style={styles.paymentButton}>
                <Text style={styles.paymentButtonText}>Thanh Toán</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  headerr: {
    height: 60,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 80,
    height: 24,
  },
  cartIcon: {
    width: 24,
    height: 24,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  price: {
    fontSize: 16,
    color: '#E91E63',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  quantityButton: {
    fontSize: 16,
    marginHorizontal: 10,
    color: 'black',
  },
  removeButton: {
    fontSize: 16,
    color: '#FF6347',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    color: 'black',
  },
  paymentButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: 'black',
  },
});

export default Cart;
