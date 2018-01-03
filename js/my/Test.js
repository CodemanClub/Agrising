import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label , Button,Text} from 'native-base';

import Request from '../common/request';
export default class Test extends Component {
  constructor(props) {
    super(props);
    this.email = "";
    this.userName = "";
    this.passWord = "";
    this.password_confirmation = "";
  }
  alertmsg = () =>{
  	console.log('zhixingle')
    Request.get('/oauth/clients').then((responseJson) => {
	        console.log(responseJson)
	      })
  };
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item inlineLabel>
              <Label>Email</Label>
              <Input onChangeText={(text) => {this.email = text}}/>
            </Item>
            <Item inlineLabel>
              <Label>Username</Label>
              <Input onChangeText={(text) => {this.userName = text}}/>
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input onChangeText={(text) => {this.passWord = text}}/>
            </Item>
            <Item inlineLabel last>
              <Label>ConfirmPassword</Label>
              <Input onChangeText={(text) => {this.password_confirmation = text}}/>
            </Item>
            <Button primary onPress={this.alertmsg}><Text> Primary </Text></Button>
          </Form>
        </Content>
      </Container>
    );
  }
}