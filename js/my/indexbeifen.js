import React, { Component } from 'react';
import {View, StyleSheet,Text,AsyncStorage,ToastAndroid} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label , Button} from 'native-base';

import Request from '../common/request';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.email = "";
    this.name="";
    this.passWord = "";
    this.password_confirmation="";
    this.state = {
      show: 'login',
      token: null,
      user: null
    }
  }


  login = () =>{
    Request.post('login',{
      email:this.email,
      password:this.passWord,
    }).then(responseJson => {
      try {
        AsyncStorage.setItem('token',responseJson.token);
        this.setState({
          token: responseJson.token
        })
      } catch (error) {
        // Error saving data
      }
    });
  };
  regist= () =>{
    Request.post('regist',{
      email:this.email,
      name:this.name,
      password:this.passWord,
      password_confirmation:this.password_confirmation
    }).then(responseJson => {
      if (responseJson.err_code) {
        ToastAndroid.show(responseJson.err_msg, ToastAndroid.SHORT);
      }
    });
  };
  loginComponent = () =>{
    return(<Content>
          <Form>
            <Item inlineLabel>
              <Input onChangeText={(text) => {this.email = text}} placeholder="用户名"/>
            </Item>
            <Item inlineLabel>
              <Input onChangeText={(text) => {this.passWord = text}} placeholder="密码"/>
            </Item>
            <View style={styles.button}>
              <Button full onPress={this.login}>
                <Text>登录</Text>
              </Button>
            </View>
            <View style={styles.button}>
              <Button full success  onPress={() =>{
                this.setState({show:'regist'});
              }}>
                <Text>注册</Text>
              </Button>
            </View>
          </Form>
        </Content>);
  };
  registComponent= () =>{
    return(
        <Content>
          <Form>
            <Item inlineLabel>
              <Input onChangeText={(text) => {this.email = text}} placeholder="邮箱"/>
            </Item>
            <Item inlineLabel>
              <Input onChangeText={(text) => {this.name = text}} placeholder="用户名"/>
            </Item>
            <Item inlineLabel>
              <Input onChangeText={(text) => {this.passWord = text}} placeholder="密码"/>
            </Item>
            <Item inlineLabel>
              <Input onChangeText={(text) => {this.password_confirmation = text}} placeholder="确认密码"/>
            </Item>
            <View style={styles.button}>
              <Button full success  onPress={this.regist}>
                <Text>注册</Text>
              </Button>
            </View>
            <View style={styles.button}>
              <Button full onPress={()=>{this.setState({show:'login'})}}>
                <Text>已有账户?立即登录</Text>
              </Button>
            </View>
          </Form>
        </Content>
      );
  };
  userComponent=()=>{
    return (
      <Content>
        <Text>个人中心</Text>
        <Button full onPress={()=>{
          AsyncStorage.clear()
          this.setState({
            token:null
          })
        }}>
          <Text>注销用户</Text>
        </Button>
      </Content>
      );
  };

  componentDidMount = () => {
    try {
        AsyncStorage.getItem('token').then((res)=>{
          this.setState({
            token:res
          })
        });
      } catch (error) {
        // Error saving data
      }
  };
  
  render() {
    const { navigate } = this.props.navigator;
    if (this.state.token) {
      return (
        <Container>
          {this.userComponent()}
        </Container>
      );
    }else if (this.state.show=='login') {
      return (
        <Container>
          {this.loginComponent()}
        </Container>
      ); 
    }else {
      return (
        <Container>
          {this.registComponent()}
        </Container>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop:20
  }
});