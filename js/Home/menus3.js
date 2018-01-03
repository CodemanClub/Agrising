import React, { Component } from 'react';
import {FlatList, StyleSheet , View , TouchableOpacity,ActivityIndicator } from 'react-native';
import { Thumbnail,Text } from 'native-base';
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

export default class SearchBarExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  // 加载组件后请求数据
  componentDidMount() {
    return fetch('http://192.168.10.11/api/menus')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        })
      }).catch((error) => {
        console.error(error);
      });
  }

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
        console.log(item);
        itema.push(
              <View key={key}>
                <TouchableOpacity
                  onPress={() => navigate(item.topath)}>
                  <View style={styles.view_thumb}>
                     <Thumbnail source={{uri:item.thumb }} />
                     <Text>农技视频</Text>
                  </View>
                </TouchableOpacity>
              </View>
          );
      });
      return (
        <View>
          <View style={styles.view}>
            {itemb}
          </View>
          <View style={styles.view}>
            {itemb}
          </View>
        </View>
      ); 
    }
  }
}