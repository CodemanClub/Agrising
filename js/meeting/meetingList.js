import React, { Component } from 'react';
import {ActivityIndicator,TextInput,View,FlatList,Text,Image ,TouchableOpacity } from 'react-native';
import { Container , Card , CardItem ,Left ,Body} from 'native-base';

import Swiper from '../components/Swiper';
import Request from '../common/request';


export default class SimpleList extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  isLoading: true
	    }
	};
	searchHandle =(text)=>{
	    if (text) {
	      api=this.props.api+'/'+encodeURI(text)
	    }else {
	      api=this.props.api+'/'+encodeURI('agrising1996')
	    }
	    Request.get(api)
	      .then((responseJson) => {
	        this.setState({
	          isLoading: false,
	          data: responseJson,
	          listData:responseJson.data
	        })
	      }).catch((error) => {
	        console.error(error);
	    });
  	};

  //loading compeleted then
  componentDidMount = () => {
    this.searchHandle()
  };

	handleLoadMore = () => {
		if(this.state.data.next_page_url&&this.state.data.next_page_url!=this.state.preUrl){
			
			this.setState({
				preUrl:this.state.data.next_page_url
			})//防止重复请求
			
			fetch(this.state.data.next_page_url)
				.then((response) => response.json())
		      	.then((responseJson) => {
		          this.setState({
			          data: responseJson,
			          listData:[...this.state.listData,...responseJson.data]
			        });
		      }).catch((error) => {
		        console.error(error);
		      });
		}
	};

	render() {
		const { navigate } = this.props.navigator;
		if (this.state.isLoading) {
	      return(
	        <View style={{flex: 1, paddingTop: 20}}>
	          <ActivityIndicator />
	        </View>
	      );
	    }else {
			return (
				<View>
				<TextInput style={{height: 40}}
		            placeholder="在这里输入关键字查找!"
		            onChangeText={(text) => this.searchHandle(text)}/>
			  	<FlatList
				  data={this.state.listData}
				  renderItem={({item}) =>
				  	<TouchableOpacity
	                  onPress={() => navigate(this.props.topath,{ id: item.id })}>
					  <Card>
					  	<CardItem>
					  		  <Left>
				                <Body>
				                  <Text>{item.name}</Text>
				                </Body>
				              </Left>
					  	</CardItem>
					  	<CardItem cardBody>
			              <Image source={{uri: item.cover}} style={{height: 100, width: null, flex: 1}}/>
			            </CardItem>
			          </Card>
			        </TouchableOpacity>
				  }
				  keyExtractor={item => item.id}
				  onEndReached={this.handleLoadMore}
				/>
				</View>
			);
		}
	}
}