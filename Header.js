import React from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerr}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('./menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Image source={require('./logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image source={require('./cart.png')} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          placeholderTextColor="#888"
          onFocus={() => navigation.navigate('Search')}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image source={require('./search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerr: {
    backgroundColor: '#1E90FF',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 100,
    height: 30,
  },
  cartIcon: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    width: '70%',
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});

export default Header;
