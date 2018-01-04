import React, { Component } from 'react';
import { Text,FlatList,StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Left, Body, Right, Switch ,Button} from 'native-base';

import Request from '../common/request';
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state={
    	carts:null
    }
  }

  componentDidMount(){
  	Request.get('getMyCarts?token='+this.props.token).then(responseJson=>{
      this.setState({
        carts:responseJson.data
      });
    });
  };

  render() {
  	const { navigate } = this.props.navigation;
  	if (!this.state.carts) {
  		return <Text>加载中...</Text>
  	}else {
   		return (
   		<Container>
	   		<Content>
		      <FlatList
				data={this.state.carts}
				renderItem={({item}) =>
					<List style={styles.list}>

			          <ListItem onPress={()=>navigate('Product',{id:item.product_id})}>
			            <Body>
			              <Text>{item.product_name}</Text>
			            </Body>
			            <Right>
			              <Text>{item.product_size}</Text>
			            </Right>
			          </ListItem>

			          <ListItem>
			            <Body>
			              <Text>￥{item.product_price/100}</Text>
			            </Body>
			            <Right>
			              <Text>x{item.buy_num}</Text>
			            </Right>
			          </ListItem>

			          <ListItem>
			            <Body>
			              <Text>总额</Text>
			            </Body>
			            <Right>
			              <Text>￥{item.buy_num*item.product_price/100}</Text>
			            </Right>
			          </ListItem>

			          <ListItem>
			            <Button full onPress={()=>navigate('ConfirmOrder',{item:item})}>
		                  <Text>立即付款</Text>
		                </Button>
			          </ListItem>
			        </List>
			  	}
				keyExtractor={item => item.id}
				onEndReached={this.handleLoadMore}
			  />
		  	</Content>
		</Container>
	    );
  	}
  }
}
const styles = StyleSheet.create({
  list: {
    marginTop:20
  }
});

export default connect(
  (state) => ({
    token:state.login.token
  })
)(Cart);