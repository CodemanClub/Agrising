import React, { Component } from 'react';
import { Text,FlatList,StyleSheet,ToastAndroid,TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Left, Body, Right, Switch ,Button} from 'native-base';

import *as Action from '../action';
import Request from '../common/request';

class ConfirmOrder extends Component {
  constructor(props) {
    super(props);
    this.order_number=Math.round(Math.random()*10000)
    this.state={
    	address:null,
    	buy_num:1
    }
  }

  componentDidMount=()=>{
  	//生成确认订单的信息，需要
  	//1.地址信息，从服务器获得
  	//2.商品信息，可以从navgation参数中获得
    const { params } = this.props.navigation.state;
    
    this.props.saveBuy_Item(params.item)

    var getAddressApi = '';
    if (params.item.address_id) {
      getAddressApi = 'getAddressById/'+params.item.address_id
    }else {
      getAddressApi = 'getAddressByToken?token='+this.props.token
    }
  	Request.get(getAddressApi).then(responseJson=>{
      this.setState({
        address:responseJson.data
      });
    });
  };

  createOrder=(item,address)=>{
    if(!address){
      ToastAndroid.show('请填写或选择收货地址', ToastAndroid.SHORT);
    }else {
      const { navigate } = this.props.navigation;
      Request.post('create_Order',{
        token:this.props.token,
        cart_id:item.id,
        product_name:item.product_name,
        product_size:item.product_size,
        product_price:item.product_price,
        buy_num:this.state.buy_num,
        total_money:item.product_price*this.state.buy_num,
        receiver:address.receiver,
        receiver_mobile:address.receiver_mobile,
        receiver_area:address.receiver_area,
        receiver_address:address.receiver_address,
        order_number:this.order_number
      }).then(responseJson=>{
        if (!responseJson.err_code) {
          //创建订单成功
          navigate('Pay',{order:responseJson.data});
        }else {
          //创建订单失败
          ToastAndroid.show(responseJson.err_msg, ToastAndroid.SHORT);
        }
      }) 
    }
  };

  render_address=()=>{
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
  	if (!this.state.address||this.state.address==[]) {
  		return <Button full style={styles.Button} onPress={()=>navigate('AddAddress')}><Text>新增地址</Text></Button>
  	}else {
  	return(
		<List>
      <ListItem style={styles.ListItem}>
        <Body>
          <Text>收件人</Text>
        </Body>
        <Right>
          <Text>{this.state.address.receiver}</Text>
        </Right>
      </ListItem>

      <ListItem style={styles.ListItem}>
        <Body>
          <Text>联系电话</Text>
        </Body>
        <Right>
          <Text>{this.state.address.receiver_mobile}</Text>
        </Right>
      </ListItem>

      <ListItem style={styles.ListItem}>
        <Body>
          <Text>收货地区</Text>
        </Body>
        <Right>
          <Text>{this.state.address.receiver_area}</Text>
        </Right>
      </ListItem>
      <ListItem style={styles.ListItem}>
        <Body>
          <Text>详细地址</Text>
        </Body>
        <Right>
          <Text>{this.state.address.receiver_address}</Text>
        </Right>
      </ListItem>
      <Button style={styles.Button} full onPress={()=>navigate('SelectAddress')}>
        <Text>选择其他地址</Text>
      </Button>
		</List>);
  	}
  };
  render() {
  	  const { params } = this.props.navigation.state;
   	  return (
   		<Container>
	   		<Content>
	   			{this.render_address()}
		        <List>
		          <ListItem style={styles.ListItem}>
		            <Body>
		              <Text>商品名称</Text>
		            </Body>
		            <Right>
		              <Text>{params.item.product_name}</Text>
		            </Right>
		          </ListItem>

		          <ListItem style={styles.ListItem}>
		            <Body>
		              <Text>购买数量</Text>
		            </Body>
		            <Right style={{
                  flexDirection:'row'
                }}>
		              <Button
                    style={styles.buyNum}
                    bordered
                    onPress={()=>{
		              	if (this.state.buy_num>1) {
		              		this.setState({buy_num:this.state.buy_num-1})
		              	}
		              }}>
                  <Text>-</Text>
                  </Button>
		              <Text style={{
                    height:30,
                    width:30,
                    textAlign:'center',
                  }}>{this.state.buy_num}</Text>
		              <Button
                    style={styles.buyNum}
                    bordered
                    onPress={()=>this.setState({buy_num:this.state.buy_num+1})}
                  >
                    <Text>+</Text>
                  </Button>
		            </Right>
		          </ListItem>

		          <ListItem style={styles.ListItem}>
		            <Body>
		              <Text>商品单价</Text>
		            </Body>
		            <Right>
		              <Text>{params.item.product_price/100}</Text>
		            </Right>
		          </ListItem>

		          <ListItem style={styles.ListItem}>
		            <Body>
		              <Text>商品规格</Text>
		            </Body>
		            <Right>
		              <Text>{params.item.product_size}</Text>
		            </Right>
		          </ListItem>

		          <ListItem style={styles.ListItem}>
		            <Body>
		              <Text>总金额</Text>
		            </Body>
		            <Right>
		              <Text>￥{params.item.product_price*this.state.buy_num/100}</Text>
		            </Right>
		          </ListItem>
              <ListItem style={styles.ListItem}>
                <Body>
                  <TextInput placeholder="如需发票请在此备注"/>
                </Body>
              </ListItem>
		        </List>
		        <Button
            full
            style={styles.Button}
            onPress={()=>this.createOrder(params.item,this.state.address)}>
	                <Text>立即付款</Text>
	          </Button>
		  	</Content>
		</Container>
	);
  }
}
const styles = StyleSheet.create({
  ListItem: {
    marginLeft:0,
    marginBottom:10
  },
  Button:{
    backgroundColor:'#ff9900',
    marginBottom:20
  },
  buyNum:{
    height:30,
    width:30,
    justifyContent:'center'
  }
});

export default connect(
  (state) => ({
    token:state.login.token
  }),
  (dispatch) => ({
    saveBuy_Item: (item) => dispatch(Action.buyItem(item))  })
)(ConfirmOrder);