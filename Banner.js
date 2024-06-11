import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {ipV4 as ipV4} from'./app.json'
const Banner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Image source={{ uri: ipV4+'/img_react/'+'banner.png' }} style={styles.bannerImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    height: 200,
    marginTop:10,
  },
  bannerImage: {
    width: '100%',
    height: 160,
  },
});

export default Banner;
