import React, { Component } from 'react';
import {StyleSheet,Image,View} from 'react-native';
import {Content,H1,H3,Text} from 'native-base';
import Request from '../common/request';

export default class PediaEntry extends Component {
	constructor(props) {
		super(props);
		this.state={
			item:null
		}
	}
	show_imgs = (imgurls) => {
		item = [];
		var imgurls_arr = imgurls.split(",")
		imgurls_arr.map((imgurl, key) => {
	        item.push(
				<View key={key}>
					<Image source={{uri:imgurl}} style={{height: 200, width: null, flex: 1}}/>
				</View>
	        );
      	})
      	return item;
	};
	componentDidMount = () => {
		const { params } = this.props.navigation.state;
	    Request.get('getPediaById/'+params.id)
	      .then((responseJson) => {
	        this.setState({
	          item:responseJson.data
	        })
	      }).catch((error) => {
	        console.error(error);
	    });
	};

	render() {
		if (this.state.item) {
			var imgs = this.show_imgs(this.state.item.imgurls);
			return (
				<Content>
		          <H1>{this.state.item.title}</H1>
		          <H3>{this.state.item.englishname}</H3>
		          <H3>{this.state.item.othername}</H3>
		          <Text>{this.state.item.introduction}</Text>
		          <View>{imgs}</View>
		          <Text>{this.state.item.damage_status}</Text>
		          <Text>{this.state.item.pathogen}</Text>
		          <Text>{this.state.item.cycle}</Text>
		          <Text>{this.state.item.factor}</Text>
		          <Text>{this.state.item.morphology}</Text>
		          <Text>{this.state.item.habits}</Text>
		          <Text>{this.state.item.prevent_method}</Text>
		        </Content>
			);
		}else{
			return (<Text>加载中......</Text>);
		}
		
	}
}
const styles = StyleSheet.create({
  
});