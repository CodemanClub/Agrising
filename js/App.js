import React, { Component } from 'react';
import { View ,StyleSheet,Text,AsyncStorage} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';


import Home from './Home';
import My from './my';
import Orders from './myOrder';
import *as userAction from './action';// 导入action方法

class AppDemo extends Component{
  constructor(props) {
    super(props);
    this.state = {selectedTab: 'home' }
  };
  componentDidMount = () => {

    try {
      AsyncStorage.getItem('token').then((res)=>{
          const { loginAction } = this.props;
          loginAction(res)

          console.log(res)
        });
    } catch (error) {
      console.log('App页面的AsynacStorage出错了')
    }
  };

  render(){
    const { navigate } = this.props.navigation;
    return(
      <Container>
        <TabNavigator tabBarStyle={{ backgroundColor: '#fcfcfc'}}>
          {/*首页*/}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="首页"
            titleStyle={styles.title}
            selectedTitleStyle={styles.title_selected}
            renderIcon= {() => <Icon style={styles.icon_unselected} name="ios-home-outline" />}
            renderSelectedIcon={() => <Icon style={styles.icon_selected} name="ios-home"/>}
            onPress={() => this.setState({ selectedTab: 'home' })}            
          >
          <Home navigator={this.props.navigation} />
          </TabNavigator.Item>
          {/*订单*/}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Order'}
            title="订单"
            titleStyle={styles.title}
            selectedTitleStyle={styles.title_selected}
            renderIcon={() => <Icon style={styles.icon_unselected} name="ios-reorder-outline"/>}
            renderSelectedIcon={() => <Icon style={styles.icon_selected} name="ios-reorder"/>}
            onPress={() => this.setState({ selectedTab: 'Order' })}
          >
          
          <Orders navigator={this.props.navigation} />

          </TabNavigator.Item>
          {/*我的*/}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'My'}
            title="我的"
            titleStyle={styles.title}
            selectedTitleStyle={styles.title_selected}
            renderIcon={() => <Icon style={styles.icon_unselected} name="ios-person-outline"/>}
            renderSelectedIcon={() => <Icon style={styles.icon_selected} name="ios-person"/>}
            onPress={() => this.setState({ selectedTab: 'My' })}
          >
          <My navigation={this.props.navigation} />
          </TabNavigator.Item>
        </TabNavigator>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  icon_unselected: {
    color: '#989898',
    fontSize : 30
  },
  icon_selected: {
    color: '#fec437',
    fontSize : 30
  },
  title : {
    color:'#9c9c9c'
  },
  title_selected:{
    color:'#333333'
  },
  red: {
    color: 'red',
  },
});

export default connect(
  (state) => ({
    islogin:state.login.islogin,
    token:state.login.token
  }),
  (dispatch) => ({
    loginAction: (token) => dispatch(userAction.login(token)),
  })
)(AppDemo);