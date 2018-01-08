import React, { Component } from 'react';
import {View,Text ,Picker,ToastAndroid,StyleSheet,TouchableOpacity} from 'react-native';
import { Container,Button,Content,Form,Item,Label,Input,List,ListItem,Body,Right} from 'native-base';
import { connect } from 'react-redux';

import Request from '../common/request';


class MyAddress extends Component {
	constructor(props) {
	    super(props);
	    this.state={
	    	myAddress:null
	    }
	  };
	componentDidMount=()=>{
		Request.get('getMyAddressAll?token='+this.props.token)
		.then(responseJson=>{
			if (!responseJson.err_code) {
				this.setState({
					myAddress:responseJson.data
				});
			}
		})
	};
	selectAddress=(address_id)=>{
		var item = this.props.buy_item;
		item.address_id = address_id;
		const { navigate } = this.props.navigation;
		navigate('ConfirmOrder',{item:item})
	};
	render(){
		const { navigate } = this.props.navigation;
		if (!this.state.myAddress) {
			return(
				<Container>
				    <Content>
				    	<Text>加载中...</Text>
			        </Content>
				</Container>
			);
		}
		return(
			<Container>
			    <Content>
			    	<List
			    		dataArray={this.state.myAddress}
			            renderRow={(item) =>
			            <View style={styles.list}>
			              <ListItem
			              style={styles.ListItem}
			              onPress={()=>this.selectAddress(item.id)}>
			              	  <Body>
				                <Text>收货人(点此处选择)</Text>
				              </Body>
				              <Right>
				                <Text>{item.receiver}</Text>
				              </Right>
			              </ListItem>
			              <ListItem
			              style={styles.ListItem}
			              >
				              <Body>
				                <Text>联系电话</Text>
				              </Body>
				              <Right>
				                <Text>{item.receiver_mobile}</Text>
				              </Right>
			              </ListItem>
			              <ListItem
			              style={styles.ListItem}
			              >
			              	  <Body>
				                <Text>收货区域</Text>
				              </Body>
				              <Right>
				                <Text>{item.receiver_area}</Text>
				              </Right>
			              </ListItem>
			              <ListItem
			              style={{marginLeft:0,marginBottom:30}}
			              >
				              <Body>
				                <Text>详细地址</Text>
				              </Body>
				              <Right>
				                <Text>{item.receiver_address}</Text>
				              </Right>
			              </ListItem>
			            </View>
			            }>
		          	</List>
		          	<Button full style={styles.Button} onPress={()=>navigate('AddAddress')}><Text>添加新地址</Text></Button>
		        </Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
  ListItem: {
    marginLeft:0,
  },
  Button:{
    backgroundColor:'#ff9900',
    marginBottom:20
  }
});

export default connect(
  (state) => ({
    token:state.login.token,
    buy_item:state.buy_item.item
  })
)(MyAddress);