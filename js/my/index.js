import React, { Component } from 'react';
import {View, StyleSheet,AsyncStorage,ToastAndroid,ActivityIndicator,Text} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label , Button,Tabs,Tab,Thumbnail,List, ListItem, Icon, Left, Body, Right, Switch} from 'native-base';
import { connect } from 'react-redux';

import *as Action from '../action';
import Request from '../common/request';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.email = "";
    this.name="";
    this.passWord = "";
    this.password_confirmation="";
    this.state = {
      show: 'login',
      animating: false,
      user: null
    }
  };
  getUser=(token)=>{
    Request.get('getAuthenticatedUser?token='+token).then(responseJson=>{
      this.setState({
        user:responseJson.user
      });
    });
  };
  login = () =>{
    this.setState({show:'loading'});
    Request.post('login',{
      email:this.email,
      password:this.passWord,
    }).then(responseJson => {
      if (!responseJson.err_code) {
        AsyncStorage.setItem('token',responseJson.token);
        const { loginAction } = this.props;
        loginAction(responseJson.token)
        this.getUser(responseJson.token);
      }else{
        this.setState({show:'login'});
        ToastAndroid.show(responseJson.err_msg, ToastAndroid.SHORT);
      }
    });
  };
  logout=()=>{
    this.props.logout()
    this.setState({show:'login'});
  };
  regist= () =>{
    this.setState({animating:true });
    Request.post('regist',{
      email:this.email,
      name:this.name,
      password:this.passWord,
      password_confirmation:this.password_confirmation
    }).then(responseJson => {
      if (responseJson.err_code) {
        this.setState({animating:false})
        ToastAndroid.show(responseJson.err_msg, ToastAndroid.SHORT);
      }else {
        ToastAndroid.show("恭喜您成功注册，请登录", ToastAndroid.SHORT);
        this.setState({show:'login',animating:false})
      }
    });
  };
  loginComponent = () =>{
    return(
      <Content>
        <Tabs initialPage={1}>
          <Tab heading="邮箱登陆">
            <Form>
              <Item inlineLabel>
                <Input onChangeText={(text) => {this.email = text}} placeholder="邮箱"/>
              </Item>
              <Item inlineLabel>
                <Input onChangeText={(text) => {this.passWord = text}} placeholder="密码"/>
              </Item>
              <View style={styles.button}>
                <Button full onPress={()=>this.login()}>
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
          </Tab>
          <Tab heading="手机登录">
            <Text>手机登录</Text>
          </Tab>
        </Tabs>
          
        </Content>
        );
  };
  registComponent= () =>{
    return(
        <Content>
          <Form>
            <Item inlineLabel>
              <Input onChangeText={(text) => {this.email = text}} placeholder="邮箱"/>
            </Item>
             <Item inlineLabel>
              <Input onChangeText={(text) => {this.passWord = text}} placeholder="密码"/>
            </Item>
            <Item inlineLabel>
              <Input onChangeText={(text) => {this.password_confirmation = text}} placeholder="确认密码"/>
            </Item>
            <Item inlineLabel>
              <Input onChangeText={(text) => {this.name = text}} placeholder="用户名"/>
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
            <View>
              {this.state.animating && <ActivityIndicator size="large" animating={this.state.animating} />}
            </View>
          </Form>
        </Content>
      );
  };
  userComponent=()=>{
    const {navigate} = this.props.navigator
    return (
      <Content>
        <Thumbnail large source={{uri: this.state.user.avatar}} />
        <Text>{this.state.user.name}</Text>
         <List>
            <ListItem icon onPress={()=>navigate('Cart')}>
              <Left>
                <Icon name="cart" />
              </Left>
              <Body>
                <Text>我的购物车</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem icon onPress={()=>{console.log('test')}}>
              <Left>
                <Icon name="pulse" />
              </Left>
              <Body>
                <Text>问题反馈</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem icon onPress={()=>{console.log('test')}}>
              <Left>
                <Icon name="logo-whatsapp" />
              </Left>
              <Body>
                <Text>客服电话</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

          </List>
        <Button full onPress={()=>this.logout()} style={styles.button}>
          <Text>注销用户</Text>
        </Button>
      </Content>
      );
  };
  render() {
    if (this.props.token) {
      if (!this.state.user) {
        this.getUser(this.props.token)
        return (<Text> </Text>)
      }else {
        return (
          <Container>
            {this.userComponent()}
          </Container>
        );
      }
      
    }else if (this.state.show == 'login') {
      return (
        <Container>
          {this.loginComponent()}
        </Container>
      ); 
    }else if (this.state.show==='loading') {
      return(
        <ActivityIndicator size="large" color="#0000ff" />
      )
    }
    else {
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

export default connect(
  (state) => ({
    islogin:state.login.islogin,
    token:state.login.token
  }),
  (dispatch) => ({
    loginAction: (token) => dispatch(Action.login(token)),
    logout: ()=>{
      dispatch(Action.logout());
      dispatch(Action.clearOrders());
    }
  })
)(MyPage);