import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Item, Input, Icon, Text } from 'native-base';


const styles = StyleSheet.create({
  header:{
    backgroundColor : '#f9f9f9'
  }
});

export default class SearchBarExample extends Component {
  render() {
    return (
        <Header style={styles.header} searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
        </Header>
    );
  }
}