import React, { Component } from 'react';
import { Text ,Picker,ToastAndroid} from 'react-native';
import { Container,Button,Content,Form,Item,Label,Input} from 'native-base';
import { connect } from 'react-redux';

import Request from '../common/request';

class AddAddress extends Component {
	constructor(props) {
	    super(props);
	    this.receiver = "";
	    this.receiver_mobile="";
	    this.receiver_area = "";
	    this.receiver_address="";
	  };

	/**
	1.保存地址的信息，
	2.保存者的id(后台通过token获取)
	*/
	saveTheAddress=()=>{
		ToastAndroid.show('保存中，请稍后...', ToastAndroid.SHORT);
		const { navigate } = this.props.navigation;
		Request.post('saveTheAddress',{
	      receiver:this.receiver,
	      receiver_mobile:this.receiver_mobile,
	      receiver_area:this.receiver_area,
	      receiver_address:this.receiver_address,
	      token:this.props.token
	    }).then(responseJson => {
	    	if (!responseJson.err_code) {
	    		this.props.buy_item.address_id=responseJson.data;
	    		navigate('ConfirmOrder',{item:this.props.buy_item})
	    	}else {
	    		ToastAndroid.show(responseJson.err_msg, ToastAndroid.SHORT);
	    	}
	    });
	};
	render(){
		return(
			<Container>
			    <Content>
		         <Form>
		           <Item inlineLabel>
              		  <Input onChangeText={(text) => {this.receiver = text}} placeholder="收件人"/>
		            </Item>
		             <Item inlineLabel>
		              <Input onChangeText={(text) => {this.receiver_mobile = text}} placeholder="收件人手机号"/>
		            </Item>
		            <Item inlineLabel>
		              <Input onChangeText={(text) => {this.receiver_area = text}} placeholder="收件区域"/>
		            </Item>
		            <Item inlineLabel>
		              <Input onChangeText={(text) => {this.receiver_address = text}} placeholder="详细地址"/>
		            </Item>
					<Button full onPress={()=>this.saveTheAddress()}>
						<Text>保 存</Text>
					</Button>
		         </Form>
		        </Content>
			</Container>
		);
	}
}

export default connect(
  (state) => ({
    token:state.login.token,
    buy_item:state.buy_item.item
  })
)(AddAddress);