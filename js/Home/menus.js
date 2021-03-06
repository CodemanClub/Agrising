import React, { Component } from 'react';
import {FlatList, StyleSheet , View , TouchableOpacity,ActivityIndicator } from 'react-native';
import { Thumbnail,Text } from 'native-base';

import Request from '../common/request';

const styles = StyleSheet.create({
  view:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  view_thumb:{
    marginTop:10,
    marginLeft:6,
    marginRight:6
  }
});

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  };

  // 加载组件后请求数据
  componentDidMount() {
    return Request.get('menus')
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        })
      }).catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { navigate } = this.props.navigator
    var itema = [];
    var itemb = [];
    if (this.state.isLoading) {
      return(
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
        );
    }else{
      
      this.state.dataSource.map((item, key) => {
        itema.push(
              <View key={key}>
                <TouchableOpacity
                  onPress={() => navigate(item.topath)}>
                  <View style={styles.view_thumb}>
                     <Thumbnail source={{uri:item.thumb }} />
                     <Text>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
          );
      });
      return (
        <View>
          <View style={styles.view}>
            {itema}
          </View>
          <View style={styles.view}>
            {itemb}
          </View>
        </View>
      ); 
    }
  }
}