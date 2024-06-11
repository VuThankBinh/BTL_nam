import React from 'react';
import { View, Image, Text, StyleSheet, TextInput } from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerr}>
      <View style={styles.headerContainer}>
        <Image source={require('./menu.png')} style={styles.menuIcon} />
        <Image source={require('./logo.png')} style={styles.logo} />
        <Image source={require('./cart.png')} style={styles.cartIcon} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          placeholderTextColor="#888"
        />
        <Image source={require('./search.png')} style={styles.searchIcon} />
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
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    width: '60%',
    alignSelf: 'center'
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    width:'70%'
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
