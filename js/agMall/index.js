import React, { Component } from 'react';
import {StyleSheet , View , Alert} from 'react-native';
import {Container} from 'native-base';

import ProductList from './productList';

export default class AgMall extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Container style={styles.container}>
          <ProductList api="getProductsByKeyWD" topath="Product" navigator={this.props.navigation}/>
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
  }
})