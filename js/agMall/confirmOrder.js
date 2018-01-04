import React, { Component } from 'react';
import { Text,FlatList,StyleSheet,ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Left, Body, Right, Switch ,Button} from 'native-base';

import Request from '../common/request';
class ConfirmOrder extends Component {
  constructor(props) {
    super(props);
    this.order_number=Math.round(Math.random()*10000)
    this.state={
    	address:null
    }
  }

  componentDidMount(){
  	//生成确认订单的信息，需要
  	//1.地址信息，从服务器获得
  	//2.商品信息，可以从navgation参数中获得
  	Request.get('getAddressForApi?token='+this.props.token).then(responseJson=>{
      this.setState({
        address:responseJson.data
      });
    });
  };

  createOrder=(item,address)=>{
  	const { navigate } = this.props.navigation;
  	Request.post('create_Order',{
  		token:this.props.token,
  		cart_id:item.id,
  		product_name:item.product_name,
  		product_size:item.product_size,
  		product_price:item.product_price,
  		buy_num:item.buy_num,
  		total_money:item.product_price*item.buy_num,
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
  };
  render() {
  	if (!this.state.address) {
  		return <Text>加载中...</Text>
  	}else {
  	  const { params } = this.props.navigation.state;
   	  return (
   		<Container>
	   		<Content>
	   			<List style={styles.list}>
		          <ListItem>
		            <Body>
		              <Text>收件人</Text>
		            </Body>
		            <Right>
		              <Text>{this.state.address.receiver}</Text>
		            </Right>
		          </ListItem>

		          <ListItem>
		            <Body>
		              <Text>联系电话</Text>
		            </Body>
		            <Right>
		              <Text>{this.state.address.receiver_mobile}</Text>
		            </Right>
		          </ListItem>

		          <ListItem>
		            <Body>
		              <Text>收货地区</Text>
		            </Body>
		            <Right>
		              <Text>{this.state.address.receiver_area}</Text>
		            </Right>
		          </ListItem>

		          <ListItem>
		            <Body>
		              <Text>详细地址</Text>
		            </Body>
		            <Right>
		              <Text>{this.state.address.receiver_address}</Text>
		            </Right>
		          </ListItem>
		        </List>

		        <List style={styles.list}>
		          <ListItem>
		            <Body>
		              <Text>商品名称</Text>
		            </Body>
		            <Right>
		              <Text>{params.item.product_name}</Text>
		            </Right>
		          </ListItem>

		          <ListItem>
		            <Body>
		              <Text>购买数量</Text>
		            </Body>
		            <Right>
		              <Text>{params.item.buy_num}</Text>
		            </Right>
		          </ListItem>

		          <ListItem>
		            <Body>
		              <Text>商品单价</Text>
		            </Body>
		            <Right>
		              <Text>{params.item.product_price/100}</Text>
		            </Right>
		          </ListItem>

		          <ListItem>
		            <Body>
		              <Text>商品规格</Text>
		            </Body>
		            <Right>
		              <Text>{params.item.product_size}</Text>
		            </Right>
		          </ListItem>

		          <ListItem>
		            <Body>
		              <Text>总金额</Text>
		            </Body>
		            <Right>
		              <Text>￥{params.item.product_price*params.item.buy_num/100}</Text>
		            </Right>
		          </ListItem>
		        </List>
		        <Button full onPress={()=>this.createOrder(params.item,this.state.address)} style={styles.list}>
	                <Text>立即付款</Text>
	            </Button>
		  	</Content>
		</Container>
	    );
  	}
  }
}
const styles = StyleSheet.create({
  list: {
    margin:10
  }
});

export default connect(
  (state) => ({
    token:state.login.token
  })
)(ConfirmOrder);