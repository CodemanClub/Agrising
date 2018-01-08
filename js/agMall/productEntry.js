import React, { Component } from 'react';
import {View,Text,ActivityIndicator,StyleSheet,Image,ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import {Container,Card,CardItem,Right,Button} from 'native-base';
import Swiper from 'react-native-swiper';

var styles = StyleSheet.create({
  wrapper: {
    height:200
  },
  image: {
    height:200
  },
  topContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
})

import Request from '../common/request';
class ProductEntry extends Component {
  constructor(props) {
    super(props);
    this.state={
      price:0,
      size:null,
      productInfo:null
    }
  }
  getProductInfoById=(id)=>{
    Request.get('getProductInfoById/'+id).then(responseJson=>{
      if (!responseJson.err_code) {
        this.setState({
          productInfo:responseJson.data,
          price:responseJson.data.min_price
        });
      }
    });
  };

  analysis_get_swipers=(images)=>{//通过解析responseJson的swipers字段获取swipers图片
    var swipers = []
    images.split(",").map((item, key)=>{
      swipers.push(
        <View key={key}>
          <Image
          source={{ uri : item }}
          style={styles.image} />
        </View>
      );
    })
    return swipers;
  };

  product_sizeButtons=(size_price)=>{//通过解析responseJson.size_price字段渲染选择规格按钮
    var buttons = [];
    JSON.parse(size_price).map((item,key)=>{
      buttons.push(
        <Button
        key={key}
        style={{
          height:24,width:80,
          justifyContent: 'center',
          color:'#666',fontsize:8,
          margin:10
        }}
        bordered
        onPress={()=>this.setState({
          price:item.price,
          size:item.size
        })}>
          <Text>{item.size}</Text>
        </Button>
      )
    })
    return buttons;
  };

  goToConfirmPage=()=>{
    const { navigate } = this.props.navigation;
    if (!this.props.token) {
      navigate('My');
    }
    else if (!this.state.size) {
      ToastAndroid.show('请选择商品规格', ToastAndroid.SHORT)
    }else {
      //为confirmPage格式化参数
      var item = {};
      item.product_name=this.state.productInfo.name;
      item.product_size=this.state.size;
      item.buy_num=1;
      item.product_price=this.state.price;
      navigate('ConfirmOrder',{item:item})
    }
  };

  componentDidMount=()=>{
    const { params } = this.props.navigation.state;
    this.getProductInfoById(params.id);
  };
  render() {
    if (!this.state.productInfo) {
      return (
        <ActivityIndicator />
      );
    }

    const swipers = this.analysis_get_swipers(this.state.productInfo.swipers);
    const selectButtons = this.product_sizeButtons(this.state.productInfo.size_price);
    
    return (
      <Container>
        <View style={styles.wrapper}>
          <Swiper showsButtons={true}>
            {swipers}
          </Swiper>
        </View>

        <View style={styles.topContainer}>
           <Card>
            <CardItem>
              <Text style={{fontSize:26,color:'#00c9b2'}}>￥{this.state.price}</Text>
              <Button style={{
                marginLeft:120,
                backgroundColor: '#fe9b00',
                width: 132,
                height: 42,
                borderRadius: 6,
                justifyContent: 'center'
              }}
              onPress={()=>this.goToConfirmPage()}
              >
                <Text style={{fontSize:16,color:'#fff5ff'}}>立即购买</Text>
              </Button>
             </CardItem>
           </Card>
        </View>

        <View style={{
          flexDirection:'row',
          height:44
        }}>
          {selectButtons}
        </View>

        <View>
          <Text>{this.state.productInfo.intro}</Text>
        </View>


      </Container>
    );
  }
}
export default connect(
  (state) => ({
    token:state.login.token
  })
)(ProductEntry);