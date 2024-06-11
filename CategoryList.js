
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native';
import { ipV4 as ipV4 } from './app.json'
import { useNavigation } from '@react-navigation/native';
const CategoryList = () => {
  const navigation=useNavigation();
  const [category, setCategory] = useState([]);
  useEffect(() => { GetCategory(); }, []);
  const GetCategory = async () => {
    try {
      const response = await fetch(ipV4 + `:5000/loaisanpham`);
      const data = await response.json();
      // console.log(data);
      setCategory(data);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=> {navigation.navigate('Category',{id: item.MaLoai});}}>
      <View style={styles.categoryItem}>
        <Image source={{ uri: `${ipV4}/img_react/${item.HinhAnhMinhHoa}` }} style={styles.categoryIcon} />
        <Text style={styles.categoryName}>{item.TenLoai}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={category}
      renderItem={renderItem}
      keyExtractor={(item) => item.MaLoai}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryList}
    />
  );
};

const styles = StyleSheet.create({
  categoryList: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  categoryName: {
    marginTop: 5,
    textAlign: 'center',
    color: 'black'
  },
});

export default CategoryList;
