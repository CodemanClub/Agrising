import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-swiper';

var styles = StyleSheet.create({
  wrapper: {
    height:100,
    flexDirection: 'row',
    justifyContent: 'center',
    margin:5
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
export default class SwiperDemo extends Component{
  constructor(props) {
    super(props);
  };
  getSwiperList=()=>{
    const { navigate } = this.props.navigator
    var swiperList = [];
    if (this.props.swipers) {
      this.props.swipers.map((item, key) => {
        swiperList.push(
            <View key={key} title={<Text>{item.intro}</Text>}>
            <TouchableOpacity
              onPress={() => navigate(item.topath,{ id: item.type_id })}>
              <Image
                style={{height: 100}}
                source={{uri: item.thumb}}
              />
            </TouchableOpacity>
            </View>
          );
      });
      return swiperList;
    }
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <Swiper
        >
        {this.getSwiperList()}
        </Swiper>
      </View>
    )
  }
}