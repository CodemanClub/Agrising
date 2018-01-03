import React, { Component } from 'react';
import {FlatList,TouchableOpacity,View} from 'react-native';
import { connect } from 'react-redux';
import { Card, CardItem, Text, Icon, Right , Button,Tabs,Tab} from 'native-base';

import {saveOrders} from '../action';// 导入action方法
import Request from '../common/request';

class Orders extends Component{
	constructor(props) {
	    super(props);
	};
	getOrders=()=>{
		Request.get('getMyOrder?token='+this.props.token).then(responseJson=>{
			if (!responseJson.status_code) {//got the orders succes
				console.log(responseJson.orders)
				this.props.saveOrders(responseJson.orders)
			}
		})
	};
	showOpration = (navigate,item) =>{
		if (item.pay_status) {
			return (<Button primary onPress={() => navigate('ExpressLook',{ express_num: item.express_num })}><Text>查看物流</Text></Button>)
		}else{
			return (
				<Button primary 
				onPress={() => navigate('PayFromOrder',{ item_id: item.id,token: this.props.token })}>
					<Text>立即付款</Text>
				</Button>
				)
		}
	};

	getListByCondition = (items,condition=null) => {
		var newItems = new Array();
		if (!condition) {
			newItems = items;
		}else if (condition=='account_paid') {
			for (var i = items.length - 1; i >= 0; i--) {
				if (items[i].pay_status) {
					newItems.push(items[i])
				}
			}
		}else{
			for (var i = items.length - 1; i >= 0; i--) {
				if (!items[i].pay_status) {
					newItems.push(items[i])
				}
			}
		}
		const {navigate} = this.props.navigator;
		return(
			<FlatList
			  data={newItems}
			  renderItem={({item}) =>
			  <TouchableOpacity
	                  onPress={() => navigate('OrderDetail',{item:item})}>
	          <Card>
	            <CardItem>
	              <Text>{item.product_name}</Text>
	              <Text>——</Text>
	              <Text>{item.product_size}</Text>
	             </CardItem>
	             <CardItem>
	              <Text>总金额=</Text>
	              <Text>{item.product_price/100}</Text>
	              <Text> x </Text>
	              <Text>￥{item.buy_num}</Text>
	              <Text>=</Text>
	              <Text>￥{item.total_money/100}</Text>
	             </CardItem>
	             <CardItem>
	              <Text>付款状态：{item.pay_status?'已付款':'未付款'}</Text>
	             </CardItem>
	             <CardItem>
	             	{this.showOpration(this.props.navigator.navigate,item)}
	             </CardItem>
	           </Card>
	           </TouchableOpacity>
			  }
			  keyExtractor={item => item.id}
			  onEndReached={this.handleLoadMore}
			  refreshing={false}
			  onRefresh={this.getOrders}
			/>
		);
	};
	render(){
		console.log(this.props.orders)
		console.log(this.props.token)
		if (this.props.token) {
			if (!this.props.orders) {
				this.getOrders();
			}
			if (this.props.orders) {
				return(
				<Tabs initialPage={1}>
		          <Tab heading="全部订单">
		            {this.getListByCondition(this.props.orders)}
		          </Tab>
		          <Tab heading="未付款">
		            {this.getListByCondition(this.props.orders,'non-payment')}
		          </Tab>
		          <Tab heading="已付款">
		            {this.getListByCondition(this.props.orders,'account_paid')}
		          </Tab>
		        </Tabs>
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
  state => ({
    token:state.login.token,
    orders:state.order.orders
  }),
  (dispatch) => ({
    saveOrders: (orders) => dispatch(saveOrders(orders))
  })
)(Orders);