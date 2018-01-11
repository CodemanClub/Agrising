import React, { Component } from 'react';
import {StyleSheet,View ,ScrollView,Text,TextInput,Alert} from 'react-native';
import {Container,Header,Item,Icon} from 'native-base';

import EntryList from '../components/SimpleList';

import BaiduMJT from 'react-native-baidu-mjt';

export default class News extends Component {

  constructor(props) {
    super(props);
    BaiduMJT.eventStart('新闻', 'label')
  }
  render() {
    return (
        <Container style={styles.container}>
        {/*<ScrollView>*/}
          {/*百科条目列表*/}
          {<EntryList api='getNewsByKeyWD' topath='EntryNews' navigator={this.props.navigation}/>}
        {/*</ScrollView>*/}
        </Container>
      );
  }
}

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