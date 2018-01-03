import React, { Component } from 'react';
import {View} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right , Button,Tabs,Tab} from 'native-base';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
  }
  showOpration = (navigate,item) =>{
    if (item.pay_status) {
      return (<Button primary onPress={() => navigate('ExpressLook',{ express_num: item.express_num })}><Text>查看物流</Text></Button>)
    }else{
      return (<View>
          <Button primary onPress={() => navigate('PayFromOrder',{ item_id: item.id,token: this.props.token })} ><Text>立即付款</Text></Button>
          <Button primary onPress={() => navigate('PayFromOrder',{ item_id: item.id,token: this.props.token })} ><Text>取消订单</Text></Button>
        </View>)
    }
  };
  render() {
    const { params } = this.props.navigation.state;
     const { navigate } = this.props.navigation;
    item=params.item;
    return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Text>订单序号：{item.order_number}</Text>
           </CardItem>
          <CardItem>
            <Text>购买商品：{item.product_name}</Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
           </CardItem>
           <CardItem>
            <Text>商品规格：{item.product_size}</Text>
           </CardItem>
           <CardItem>
            <Text>收货人：{item.receiver}</Text>
           </CardItem>
           <CardItem>
            <Text>收货地址：{item.receiver_address}</Text>
           </CardItem>
           <CardItem>
            <Text>收货人联系电话：{item.receiver_mobile}</Text>
           </CardItem>
           <CardItem>
            <Text>总金额=</Text>
            <Text>￥{item.product_price/100}</Text>
            <Text> x </Text>
            <Text>{item.buy_num}</Text>
            <Text>=</Text>
            <Text>￥{item.total_money/100}</Text>
           </CardItem>
           <CardItem>
            <Text>付款状态：{item.pay_status?'已付款':'未付款'}</Text>
           </CardItem>
           <CardItem>
            {this.showOpration(navigate,item)}
           </CardItem>
         </Card>
        </Content>
      </Container>
      );
  }
}
export default connect(
  (state) => ({
    islogin:state.login.islogin,
    token:state.login.token
  })
)(OrderDetail);