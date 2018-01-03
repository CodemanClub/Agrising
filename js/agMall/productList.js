import React, { Component } from 'react';
import {Image,StyleSheet ,Alert, View , Text,FlatList,ActivityIndicator,TextInput,TouchableOpacity} from 'react-native';
import {Container,Card,CardItem,Left,Body,List,ListItem,Right,Thumbnail} from 'native-base';

import Swiper from '../components/Swiper';
import Request from '../common/request';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  isLoading: true,
	  swipers:null
    }
  }

	searchHandle =(text)=>{
		if (text) {
		  api=this.props.api+'/'+encodeURI(text)
		}else {
		  api=this.props.api+'/'+encodeURI('agrising1996')
		}
		Request.get(api)
		  .then((responseJson) => {
		    this.setState({
		      data: responseJson,
		      listData:responseJson.data
		    })
		  }).catch((error) => {
		    console.error(error);
		});
		Request.get('getIndex')
		.then((responseJson) => {
		    this.setState({
		      swipers:responseJson.products,
		      isLoading: false
		    })
		  }).catch((error) => {
		    console.error(error);
		});
	};

	//loading compeleted then
	componentDidMount = () => {
		this.searchHandle()
	};
	//return the header
	renderHeader = () => {
		return (
			<View>
				<TextInput/>
				<Swiper swipers={this.state.swipers} navigator={this.props.navigator}/>
			</View>
		);
	};

  render() {
  	if (this.state.isLoading) {
  		return(
  			<View style={{flex: 1, paddingTop: 20}}>
	          <ActivityIndicator />
	        </View>
  		);
  	}else {
  		const { navigate } = this.props.navigator;
  		return (
	        <FlatList
		  	  ListHeaderComponent={this.renderHeader}
		  	  data={this.state.listData}
		  	  renderItem={({item}) =>
			  	<List>
		            <ListItem avatar onPress={() => navigate(this.props.topath,{ id: item.id })}>
		              <Left>
		                <Thumbnail large square  source={{ uri: item.thumbnail }} />
		              </Left>
		              <Body>
		                 <Text>{item.name}</Text>
		                 <Text note>已售出：{item.sold}</Text>
		                 <Text note>库存：{item.repertory}</Text>
		              </Body>
		              <Right>
		                <Text>￥{item.min_price/100}</Text>
		              </Right>
		            </ListItem>
		        </List>
			  }
			  keyExtractor={item => item.id}
			/>
		);
  	}
  }
}