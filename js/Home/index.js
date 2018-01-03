import React, { Component } from 'react';
import { StyleSheet,View,FlatList,TouchableOpacity,Image,SectionList} from 'react-native';
import { Card,Thumbnail,Container, Button, Text,CardItem,Body,H3 } from 'native-base';

import Swiper from '../components/Swiper';
import Menus from './menus';
import Request from '../common/request';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swiper: null,
      videos:null,
      products:null
    }
  };

  componentDidMount = () => {
    Request.get('getIndex').then(responseJson=>{
      if (!responseJson.err_code) {//got the orders succes
        this.setState({
          swiper:responseJson.swiper,
          videos:responseJson.videos,
          products:responseJson.products
        })
      }
    })
  };
  rendHeader=()=>{
    if (this.state.swiper){
      return (
        <View>
          <Swiper swipers={this.state.swiper} navigator={this.props.navigator}/>
          <Menus navigator={this.props.navigator}/>
        </View>
      );
    }else{
      return <Text>正在加载请稍等</Text>
    }
    
  };
  
  render() {
    const { navigate } = this.props.navigator;
    if (this.state.products&&this.state.videos) {
      return (
        <SectionList
          ListHeaderComponent={this.rendHeader()}
          sections={[
            {data: this.state.videos, title: '视频'},
            {data: this.state.products, title: '购物'}
          ]}
          renderItem={({item}) => <TouchableOpacity
            onPress={() => navigate(item.topath,{ id: item.type_id })}>
            <Card>
              <CardItem cardBody>
                <Image source={{uri: item.thumb}} style={{height: 100, flex: 1}}/>
              </CardItem>
              <CardItem cardBody>
                <Text>{item.intro}</Text>
              </CardItem>
            </Card>
          </TouchableOpacity>
          }

          renderSectionHeader={({section}) => <H3>{section.title}</H3>}
          keyExtractor={(item, index) => index}
        />
      );
    }else{
      return (
        <Text>...</Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  container:{
    backgroundColor : '#f9f9f9'
  },
  view_thumb:{
    flex: 1,flexDirection: 'row'
  }
})