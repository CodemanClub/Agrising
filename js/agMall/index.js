import React, { Component } from 'react';
import {StyleSheet,Text,ActivityIndicator,View,FlatList,TextInput,Image} from 'react-native';
import {Container,Card,CardItem,Left,Body,List,ListItem,Right,Thumbnail} from 'native-base';
import Swiper from 'react-native-swiper';

import Request from '../common/request';

var styles = StyleSheet.create({
  wrapper: {
    height:200
  },
  image: {
    height:200
  }
})

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products:null,
      swiper:null
    }
  }

  handleLoadMore = (url) => {
    if(url&&url!=this.state.preUrl){
      this.setState({
        preUrl:url
      })//防止重复请求
    fetch(url)
    .then((response) => response.json())
    .then(responseJson=>{
      this.setState({
        products:[...this.state.products,...responseJson.data],
        nexturl:responseJson.next_page_url,
        preurl:null
      });
    })
    }
  };

  searchHandle =(text)=>{
    if (text) {
      api='getProductsByKeyWD/'+encodeURI(text)
    }else {
      api='getProductsByKeyWD/'+encodeURI('agrising1996')
    }
    Request.get(api)
      .then((responseJson) => {
        this.setState({
          products:responseJson.data,
          nexturl:responseJson.next_page_url  //for the next page data
        })
      }).catch((error) => {
        console.error(error);
    });
  };
  //loading compeleted then
  componentDidMount = () => {
    this.searchHandle()
  };

  getSwiper=()=>{
    Request.get('getMallSwiper').then(responseJson=>{
      if (!responseJson.err_code) {
        this.setState({
          swiper:responseJson.data
        });
      }
    })
  };

  rendHeader=()=>{
    if (!this.state.swiper) {
      this.getSwiper()
    }
    var swiper = []
    if (this.state.swiper) {
      this.state.swiper.map((item, key)=>{
        swiper.push(
          <View key={key}>
            <Image
            source={{ uri : item.thumb }}
            style={styles.image} />
          </View>
          )
      });
    }
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        {swiper}
      </Swiper>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.products) {
      return(
        <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
      );
    }else {
      return(
        <Container>
          <TextInput placeholder="输入关键词,可以搜索您需要的商品"/>
          <FlatList
            ListHeaderComponent={this.rendHeader()}
            data={this.state.products}
            renderItem={({item}) =>
            <List style={{marginTop:10,marginBottom:5}}>
                <ListItem avatar style={{marginLeft:0}} onPress={()=>navigate('Product',{id:item.id})}>
                  <Left>
                    <Thumbnail large square source={{ uri: item.thumbnail }} />
                  </Left>
                  <Body>
                     <Text>{item.name}</Text>
                     <Text style={{color:'red'}}>￥{item.min_price/100}</Text>
                     <Text note>已售出：{item.sold}</Text>
                     <Text note>库存：{item.repertory}</Text>
                  </Body>
                </ListItem>
            </List>
          }
          keyExtractor={item => item.id}
          onEndReachedThreshold={1}
          onEndReached={()=>{this.handleLoadMore(this.state.nexturl)}}
        />
      </Container>
      );
    }
  }
}