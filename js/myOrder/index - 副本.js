import React, { Component } from 'react';
import {FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right , Button} from 'native-base';

import *as userAction from '../action/user';// 导入action方法
import Request from '../common/request';

class Orders extends Component{
	constructor(props) {
	    super(props);
	    this.state = {orders: null}
	};
	getOrders=()=>{
		Request.get('getMyOrder?token='+this.props.token).then(responseJson=>{
			console.log(responseJson.orders)
			if (!responseJson.status_code) {//got the orders succes
				this.setState({
					orders:responseJson.orders
				});
			}
		})
	};
	showOpration = (navigate,item) =>{
		if (item.pay_status) {
			return (<Button primary><Text>查看物流</Text></Button>)
		}else{
			return (<Button primary onPress={() => navigate('PayFromOrder',{ item_id: item.id,token: this.props.token })} ><Text>立即付款</Text></Button>)
		}
	};
	render(){
		const { navigate } = this.props.navigator;
		if (this.props.token) {
			if (!this.state.orders) {
				this.getOrders();
			}
			if (this.state.orders) {
				return(
				<FlatList
				  data={this.state.orders}
				  renderItem={({item}) =>
		          <Card>
		            <CardItem>
		              <Text>购买商品：{item.product_name}</Text>
		              <Text> </Text>
		              <Text>购买规格：{item.product_size}</Text>
		              <Right>
		                <Icon name="arrow-forward" />
		              </Right>
		             </CardItem>
		             <CardItem>
		              <Text>购买数量：{item.buy_num}</Text>
		              <Text>x</Text>
		              <Text>单价：{item.product_price/100}</Text>
		              <Text>=</Text>
		              <Text>总金额：{item.total_money/100}</Text>
		             </CardItem>
		             <CardItem>
		              <Text>收货人：{item.receiver}</Text>
		             </CardItem>
		             <CardItem>
		              <Text>收货电话：{item.receiver_mobile}</Text>
		             </CardItem>
		             <CardItem>
		              <Text>收货地址：{item.receiver_address}</Text>
		             </CardItem>
		             <CardItem>
		              <Text>付款状态：{item.pay_status?'已付款':'未付款'}</Text>
		             </CardItem>
		             <CardItem>
		             	{this.showOpration(navigate,item)}
		             </CardItem>
		           </Card>
				  }
				  keyExtractor={item => item.id}
				  onEndReached={this.handleLoadMore}
				/>
				);
			}else{
				return <Text>您还没有订单</Text>
			}
		}else{
			return(
				<Text>请登录</Text>
				);
		}
	};
}

export default connect(
  (state) => ({
    islogin:state.login.islogin,
    token:state.login.token
  })
)(Orders);